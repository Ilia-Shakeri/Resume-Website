"""Run the local example, measure changes, preview drift, and repair it."""

import argparse
from datetime import datetime, timezone
import hashlib
import importlib.metadata
import json
import os
from pathlib import Path
import re
import shutil
import stat
import subprocess
import sys
import tempfile

sys.dont_write_bytecode = True

from guard_path import validate_lab_root

SAMPLE = Path(__file__).resolve().parent
SOURCE_FILES = (
    "README.md", "requirements.txt", "inventory.ini", "ansible.cfg", "playbook.yml",
    "guard_path.py", "test_guard.py", "verify.py", "roles/local_baseline/tasks/main.yml",
    "roles/local_baseline/templates/baseline.conf.j2", "roles/local_baseline/templates/resume-demo.service.j2",
)
RECAP = re.compile(r"localhost\s*:\s*ok=(\d+)\s+changed=(\d+)\s+unreachable=(\d+)\s+failed=(\d+)")


def run_command(arguments, environment):
    result = subprocess.run(arguments, cwd=SAMPLE, env=environment, text=True, capture_output=True, timeout=120)
    if result.returncode:
        raise RuntimeError(result.stdout + result.stderr)
    return result.stdout + result.stderr


def write_receipt(path, receipt):
    path.parent.mkdir(parents=True, exist_ok=True)
    descriptor, temporary = tempfile.mkstemp(prefix=path.name + ".", dir=path.parent)
    try:
        with os.fdopen(descriptor, "w") as handle:
            json.dump(receipt, handle, indent=2)
            handle.write("\n")
        os.replace(temporary, path)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def verify():
    if sys.platform != "linux":
        raise RuntimeError("Use Linux or WSL; this example does not run on Windows directly.")
    executable = Path(sys.executable).parent / "ansible-playbook"
    if not executable.is_file():
        raise RuntimeError("Install requirements.txt in this Python environment first.")

    root = validate_lab_root(tempfile.mkdtemp(prefix="resume-ansible-baseline-", dir="/tmp"))
    controller_temp = root / "controller-temp"
    controller_temp.mkdir(mode=0o700)
    remote_temp = root / "module-temp"
    remote_temp.mkdir(mode=0o700)
    controller_home = root / "controller-home"
    controller_home.mkdir(mode=0o700)
    environment = os.environ.copy()
    environment.update({
        "ANSIBLE_CONFIG": str(SAMPLE / "ansible.cfg"),
        "ANSIBLE_HOME": str(controller_home),
        "ANSIBLE_LOCAL_TEMP": str(controller_temp),
        "ANSIBLE_REMOTE_TEMP": str(remote_temp),
        "ANSIBLE_NOCOLOR": "1",
        "ANSIBLE_FORCE_COLOR": "0",
        "PYTHONDONTWRITEBYTECODE": "1",
    })
    base_command = [str(executable), "-i", str(SAMPLE / "inventory.ini"), str(SAMPLE / "playbook.yml"), "--extra-vars", json.dumps({"lab_root": str(root)})]
    guard_output = run_command([sys.executable, "-B", "-m", "unittest", "test_guard.py"], environment)
    guard_count = re.search(r"Ran (\d+) tests?\b", guard_output)
    if not guard_count:
        raise RuntimeError("Expected a completed guard-test report.")
    run_command(base_command + ["--syntax-check"], environment)
    runs = []

    def play(name, check=False):
        output = run_command(base_command + (["--check", "--diff"] if check else []), environment)
        match = RECAP.search(output)
        if not match:
            raise RuntimeError("Expected one localhost play recap.")
        ok, changed, unreachable, failed = map(int, match.groups())
        if unreachable or failed:
            raise RuntimeError("Local play did not finish cleanly.")
        result = {"name": name, "checkMode": check, "ok": ok, "changed": changed, "unreachable": unreachable, "failed": failed}
        runs.append(result)
        return result

    first = play("first_apply")
    if first["changed"] <= 0:
        raise RuntimeError("First apply must create sample files.")
    if play("second_apply")["changed"] != 0:
        raise RuntimeError("Second apply must be idempotent.")
    policy = root / "config" / "baseline.conf"
    expected_policy = policy.read_text()
    if expected_policy.count("ALLOW_REMOTE=no") != 1:
        raise RuntimeError("The drift fixture requires exactly one ALLOW_REMOTE=no marker.")
    baseline_bytes = policy.read_bytes()
    policy.write_text(expected_policy.replace("ALLOW_REMOTE=no", "ALLOW_REMOTE=yes"))
    policy.chmod(0o666)
    drift = policy.read_bytes()
    if drift == baseline_bytes or stat.S_IMODE(policy.stat().st_mode) != 0o666:
        raise RuntimeError("Both content and permission drift must exist before check mode.")
    if play("drift_check", check=True)["changed"] != 1:
        raise RuntimeError("Check mode must detect the changed policy task.")
    if policy.read_bytes() != drift or stat.S_IMODE(policy.stat().st_mode) != 0o666:
        raise RuntimeError("Check mode must leave drift untouched.")
    if play("drift_repair")["changed"] != 1:
        raise RuntimeError("Repair must change only the drifted policy task.")
    if policy.read_text() != expected_policy or stat.S_IMODE(policy.stat().st_mode) != 0o640:
        raise RuntimeError("Repair must restore policy content and permissions.")
    if play("final_check", check=True)["changed"] != 0:
        raise RuntimeError("The repaired lab must have no remaining changes.")

    expected_modes = {root: 0o700, root / "config": 0o700, root / "data": 0o700, root / "units": 0o700, policy: 0o640, root / "units" / "resume-demo.service": 0o644}
    for target, mode in expected_modes.items():
        if stat.S_IMODE(target.stat().st_mode) != mode:
            raise RuntimeError("Unexpected permissions in the lab.")
    unit = root / "units" / "resume-demo.service"
    unit_text = unit.read_text()
    for directive in ("NoNewPrivileges=yes", "PrivateTmp=yes", "ProtectSystem=strict", "ProtectHome=yes", "ExecStart=/usr/bin/true"):
        if directive not in unit_text:
            raise RuntimeError("Expected inert service policy directive is missing.")
    analyzer = shutil.which("systemd-analyze")
    offline_unit = {"status": "skipped", "reason": "systemd-analyze is not installed"}
    if analyzer:
        run_command([analyzer, "verify", "--man=no", str(unit)], environment)
        offline_unit = {"status": "passed", "command": "systemd-analyze verify --man=no <lab-unit>"}

    return {
        "verifiedAt": datetime.now(timezone.utc).isoformat(),
        "platform": "Linux",
        "python": sys.version.split()[0],
        "ansibleCore": importlib.metadata.version("ansible-core"),
        "labRoot": str(root),
        "guardTests": int(guard_count.group(1)),
        "syntaxCheck": "passed",
        "runs": runs,
        "checkModeLeftDriftUnchanged": True,
        "contentAndPermissionsRepaired": True,
        "offlineUnitValidation": offline_unit,
        "unitInstalledOrStarted": False,
        "hostConfigurationChanged": False,
    }


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--receipt", type=Path, default=Path("qa-artifacts/work-samples/ansible-baseline.json"))
    arguments = parser.parse_args()
    receipt = {
        "status": "running",
        "sample": "New local lab example; not the employer playbook or a production run",
        "startedAt": datetime.now(timezone.utc).isoformat(),
        "sourceCommit": os.environ.get("GITHUB_SHA"),
    }
    write_receipt(arguments.receipt, receipt)
    try:
        receipt["sourceFiles"] = {
            relative: hashlib.sha256((SAMPLE / relative).read_bytes()).hexdigest()
            for relative in SOURCE_FILES
        }
        receipt.update(verify())
        receipt["status"] = "passed"
    except Exception as error:
        receipt.update({"status": "failed", "failedAt": datetime.now(timezone.utc).isoformat(), "error": str(error)[:2000]})
        write_receipt(arguments.receipt, receipt)
        raise
    write_receipt(arguments.receipt, receipt)
    print(json.dumps(receipt, indent=2))


if __name__ == "__main__":
    main()
