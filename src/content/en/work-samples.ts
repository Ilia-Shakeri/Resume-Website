import type { WorkSample } from "../types";

const NERKHBAAN_REVISION = "025ccbbb236f8c947eef6b0a822cda952033c00b";
const NERKHBAAN_SOURCE = `https://github.com/Ilia-Shakeri/Nerkhbaan/blob/${NERKHBAAN_REVISION}`;
const VERIFIED_RUN = "https://github.com/Ilia-Shakeri/Nerkhbaan/actions/runs/38236359607";

export const workSamples: WorkSample[] = [
  {
    id: "cicd",
    title: "CI/CD from a public project",
    kind: "CI/CD",
    evidenceLabel: "Public project CI · documented workflow",
    intro: "A GitHub Actions workflow from Nerkhbaan, my public product project, with a successful run at the same source revision. This sample is separate from OTICAMP's internal pipeline.",
    sections: [
      {
        heading: "Verified scope",
        items: [
          "The linked run completed all 15 jobs on 12 October 2026 at revision 025ccbbb.",
          "The checks form a job graph, with independent jobs running in parallel. Production deployment is a separate step.",
        ],
      },
      {
        heading: "Five groups of checks",
        items: [
          "Locked Node builds for the web, admin, and desktop apps, plus generated contract checks.",
          "Python static, unit, and API contract-drift checks, plus tests and builds for the Go price-feed worker.",
          "Database checks use TimescaleDB on PostgreSQL 16, plain PostgreSQL 17, and Redis. They cover migrations applied twice, checksums, leases, token races, HTTP behavior, and an isolated restore drill.",
          "Browser checks for authentication and alerts, plus Compose configuration, Prometheus rules, and Nginx syntax checks.",
          "Dependency and secret checks, plus seven SHA-tagged container images scanned with Trivy. HIGH and CRITICAL findings fail the check subject to the committed ignore policy.",
        ],
      },
    ],
    links: [
      { label: "Pinned workflow", href: `${NERKHBAAN_SOURCE}/.github/workflows/ci.yml` },
      { label: "Successful run · 15/15 jobs", href: VERIFIED_RUN },
    ],
  },
  {
    id: "ansible",
    title: "Ansible baseline and drift repair",
    kind: "Ansible lab",
    evidenceLabel: "Reproducible lab example",
    intro: "A files-only portfolio lab for baseline configuration, idempotence checks, and drift repair. It is separate from the company's hardening playbooks.",
    sections: [
      {
        heading: "Scope of the example",
        items: [
          "The playbook uses a local connection without privilege escalation. Its writes stay inside a guarded, user-owned /tmp/resume-ansible-* directory.",
          "It creates private directories, a mode-0640 policy file, and an inert systemd unit illustrating NoNewPrivileges, PrivateTmp, ProtectSystem, ProtectHome, and a restrictive umask.",
          "The unit is not installed or started. The sample does not reload a daemon or edit SSH, firewall, package, user-account, or running-service configuration.",
        ],
      },
      {
        heading: "Reproduction checks",
        items: [
          "On Linux or WSL, use Python 3.12 with pinned ansible-core 2.21.6, and run the verifier using the linked README.",
          "The runner checks syntax and four path-guard cases, then applies the baseline twice to check idempotence.",
          "It introduces policy-content and permission drift. Check mode must detect it without writing; an apply must repair the policy task; the final check must report no changes.",
          "File contents and permissions are checked directly. When available, systemd-analyze checks the unit offline; missing tooling is recorded as skipped.",
          "The JSON receipt records tool versions, change counts, and skipped checks. These lab checks do not establish a production hardening score or a measured company improvement.",
        ],
      },
      {
        heading: "Observed local result",
        items: [
          "The recorded run changed 3 tasks on the first apply, 0 on the second, detected 1 drifted task, repaired 1, and reported 0 on the final check. All four guard tests, syntax checks, and offline unit validation passed; check mode left the drift unchanged.",
        ],
      },
    ],
    links: [
      { label: "Lab guide", href: "/work-samples/ansible-baseline/README.md" },
      { label: "Download lab ZIP", href: "/work-samples/ansible-baseline.zip" },
      { label: "Playbook", href: "/work-samples/ansible-baseline/playbook.yml" },
      { label: "Verifier source", href: "/work-samples/ansible-baseline/verify.py" },
      { label: "Lab verification runs", href: "https://github.com/Ilia-Shakeri/Resume-Website/actions/workflows/ci.yml" },
    ],
  },
  {
    id: "restore",
    title: "Recovering the primary VPS from backups",
    kind: "Backup recovery",
    evidenceLabel: "Real incident · user account",
    intro: "At OTICAMP, the hosting provider unexpectedly deleted the primary VPS. I restored its services from backups.",
    sections: [
      {
        heading: "Evidence boundary",
        items: [
          "This is my first-hand account of a real recovery. The date, duration, exact sequence, loss window, and validation details have not been documented for this sample.",
        ],
      },
      {
        heading: "Suggested checklist — not a reconstruction of the incident",
        items: [
          "Prepare a separate recovery target and check its capacity, access, and application prerequisites before writing data.",
          "Choose a backup and verify its integrity and contents. Keep the original backup unchanged.",
          "Restore in an isolated environment. If the application depends on a database, restore that dependency before starting dependent services.",
          "Check service startup, application health, access, and representative data against known expectations. Investigate failed checks before continuing.",
          "Plan cutover after the checks pass, keep a fallback path, and record the backup used, validation results, and actions taken.",
        ],
      },
      {
        heading: "Related public project drill",
        items: [
          "A separate Nerkhbaan CI drill restores to a fresh isolated target with pg_dump/pg_restore, compares hashes for four selected tables, and checks TimescaleDB metadata. Its scope is that public project, separate from the company recovery account above.",
        ],
      },
    ],
    links: [
      { label: "Public project restore drill", href: `${NERKHBAAN_SOURCE}/scripts/ci-restore-drill.sh` },
      { label: "Matching successful CI run", href: VERIFIED_RUN },
    ],
  },
];
