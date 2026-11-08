import type { WorkSample } from "../types";

const NERKHBAAN_REVISION = "025ccbbb236f8c947eef6b0a822cda952033c00b";
const NERKHBAAN_SOURCE = `https://github.com/Ilia-Shakeri/Nerkhbaan/blob/${NERKHBAAN_REVISION}`;
const VERIFIED_RUN = "https://github.com/Ilia-Shakeri/Nerkhbaan/actions/runs/38236359607";

export const workSamples: WorkSample[] = [
  {
    id: "cicd",
    title: "CI/CD: build, test and security",
    kind: "CI/CD",
    evidenceLabel: "Public project CI",
    intro: "GitHub Actions for Nerkhbaan: all 15 jobs passed on 12 October 2026 across five check groups.",
    sections: [
      {
        heading: "Checks in the linked run",
        items: [
          "Web, admin and desktop builds and API contracts; Python and Go tests.",
          "PostgreSQL/TimescaleDB and Redis checks, migration reruns, and an isolated restore drill.",
          "Browser and deployment-config checks; dependency and secret checks, and Trivy scans of seven images.",
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
    evidenceLabel: "Tested local Ansible lab",
    intro: "A files-only baseline in a private temporary folder; its systemd template is never installed or started.",
    sections: [
      {
        heading: "Observed checks",
        items: [
          "Changed tasks: first apply 3, repeat 0, drift check 1, repair 1, final check 0.",
          "Four path-guard tests, content/permission checks and offline unit validation passed. Check mode left the drift untouched.",
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
    title: "Restoring a deleted VPS",
    kind: "Backup recovery",
    evidenceLabel: "Real recovery · first-hand account",
    intro: "After the hosting provider unexpectedly deleted OTICAMP's primary VPS, I restored its services from backups.",
    sections: [
      {
        heading: "Related public drill",
        items: [
          "A separate Nerkhbaan CI drill checks a restore against four table hashes and TimescaleDB metadata.",
        ],
      },
    ],
    links: [
      { label: "Public project restore drill", href: `${NERKHBAAN_SOURCE}/scripts/ci-restore-drill.sh` },
      { label: "Matching successful CI run", href: VERIFIED_RUN },
    ],
  },
];
