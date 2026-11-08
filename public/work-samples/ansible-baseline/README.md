# Local Ansible baseline example

This is a new, reproducible lab sample written for this portfolio on 8 November 2026. It is not OTICAMP's private playbook, a record of an employer deployment, or evidence that these exact settings were applied to company machines. The employment claim is separate: Ansible hardening across the managed fleet is self-reported work experience.

## Scope

The playbook uses a local connection with no privilege escalation. It only creates files below one user-owned `/tmp/resume-ansible-*` directory. The guard rejects other paths, nested targets and symlinks. The sample manages private directories, a mode-0640 policy file and an inert service-unit template.

The unit demonstrates `NoNewPrivileges`, `PrivateTmp`, `ProtectSystem`, `ProtectHome` and a restrictive umask. It runs only `/usr/bin/true` if manually invoked. This example never copies it into a system service directory, starts it, enables it or reloads a daemon. These directives are an illustration, not a complete production hardening benchmark.

No SSH, firewall, package, user-account or running-service configuration is changed. No remote inventory, credentials or production hosts are used.

## Run on Linux or WSL

Use Python 3.12, the same controller version used in CI. Other Python versions are not verified by this sample. Run these commands from the portfolio repository root. The environment stays in the ignored `.generated` directory; no global Python packages are installed.

```sh
python3 -m venv .generated/work-samples/ansible-baseline/venv
.generated/work-samples/ansible-baseline/venv/bin/python -m pip install --no-cache-dir --index-url https://pypi.org/simple -r public/work-samples/ansible-baseline/requirements.txt
.generated/work-samples/ansible-baseline/venv/bin/python public/work-samples/ansible-baseline/verify.py --receipt qa-artifacts/work-samples/ansible-baseline.json
```

If an existing WSL Python lacks `ensurepip`, but has pip 22.3 or newer, the same isolated environment can be populated without installing an operating-system package:

```sh
python3 -m venv --without-pip .generated/work-samples/ansible-baseline/venv
python3 -m pip --python .generated/work-samples/ansible-baseline/venv/bin/python install --no-cache-dir --index-url https://pypi.org/simple -r public/work-samples/ansible-baseline/requirements.txt
```

Then run the verifier with the environment's Python as above; pip itself need not be installed inside that environment.

## Run an extracted source archive

Extract the downloaded archive outside the website checkout. Enter the extracted directory containing `playbook.yml` and `verify.py`, then run:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install --no-cache-dir --index-url https://pypi.org/simple -r requirements.txt
PYTHONDONTWRITEBYTECODE=1 .venv/bin/python -B verify.py --receipt verification.json
```

For the `ensurepip` limitation described above, create `.venv` with `--without-pip` and use `python3 -m pip --python .venv/bin/python install ... -r requirements.txt` instead. These commands use only the extracted source and its private environment; they do not require the website's application dependencies.

## What verification checks

The runner creates a fresh private lab directory, checks its guard, validates syntax, and runs this sequence:

1. First apply creates the example files.
2. Second apply must report zero changed tasks.
3. A deliberate local policy/content permission drift is introduced.
4. Check mode must detect the drift without changing the file.
5. A normal apply must repair exactly that policy task.
6. A final check must report zero changes. File contents and permissions are checked directly.
7. If available, `systemd-analyze verify` checks the rendered unit offline. Missing tooling is recorded as skipped, not passed.

The JSON receipt records actual change counts, source-file hashes and tool versions. A new run atomically replaces the selected receipt with a running state before validation; a failure records a failed state, so an old pass cannot stand in for the new run. The runner retains the temporary directory for inspection. Nothing in this sample proves incident-response time, fleet compliance, employer CI stages or production recovery results.

## CI

On an Ubuntu 24.04 runner, use Python 3.12, install the pinned requirements into a virtual environment, and run `verify.py` with a job-artifact receipt path. Require the command to succeed; retain the JSON receipt. The receipt includes `GITHUB_SHA` when that environment variable is present. Installing a new tool version or changing the sample requires a fresh run.

The pinned controller is `ansible-core==2.21.6`, checked against its [package release](https://pypi.org/project/ansible-core/2.21.6/) on 8 November 2026. Its Python minimum is 3.12; the newer 2.22 controller requires Python 3.13.
