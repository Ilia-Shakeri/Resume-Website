import type { Education, ExperienceItem, Profile, Qualification } from "./types";

// Sources for every statement in this file are recorded in
// docs/content-evidence.md. Time-sensitive values (employment status,
// availability, location) are tracked in TODO_CONTENT.md.

export const profile: Profile = {
  name: "Ilia Shakeri",
  role: "DevOps Engineer",
  headline: ["Built to ship.", "Built to stay up."],
  intro:
    "I’m Ilia Shakeri, a DevOps engineer working across Linux, containers, delivery pipelines, and monitoring. I build systems that deploy the same way every time, and that tell you when something is wrong.",
  location: "Tehran, Iran",
  timeZone: "IRST · UTC+03:30",
  availability: "Open to remote DevOps & platform roles",
  email: "iliashkr@gmail.com",
  github: { label: "github.com/Ilia-Shakeri", href: "https://github.com/Ilia-Shakeri" },
  linkedin: { label: "linkedin.com/in/ilia-shakeri", href: "https://www.linkedin.com/in/ilia-shakeri/" },
  focus: "Linux · Automation · Reliability",
  languages: ["Persian (native)", "English (professional working)"],
  bio: [
    "I work where code meets servers: hardening Linux hosts, packaging services into containers, wiring CI pipelines, and putting Prometheus, Grafana, and Loki in front of what runs in production. Most of my day-to-day tooling is Bash, Python, Ansible, Docker Compose, and n8n.",
    "I work from evidence: write the runbook, test the restore, record what was actually verified. Outside the terminal, I follow open-source DevOps tooling and have played the piano for more than ten years.",
  ],
  principles: [
    { title: "Automate the repeatable.", detail: "Scripts, playbooks, and workflows over manual steps." },
    { title: "Make reliability visible.", detail: "Health checks, alerts, and evidence you can read." },
  ],
  contactMessage:
    "Looking for a DevOps engineer who treats deployments, backups, and alerts as engineering work? I’d like to hear about the systems you’re running.",
};

export const capabilities = [
  "Linux & hardening",
  "Delivery automation",
  "Reliability & observability",
];

export const experienceSummary =
  "From hands-on Linux administration to owning delivery and monitoring for production services, and building complete products end to end.";

export const experience: ExperienceItem[] = [
  {
    title: "DevOps Engineer",
    organization: "OTICAMP",
    location: "Tehran, Iran",
    period: "Jun 2025 — Present",
    scope:
      "Provisioning, hardening, and monitoring Linux infrastructure for internal and product services.",
    highlights: [
      "Provisioned and hardened Linux VPS environments; Ansible playbooks keep server setup consistent between development and production.",
      "Deployed a Prometheus, Grafana, and Loki stack for system metrics and logs.",
      "Built ChatOps automation in n8n that routes Prometheus alerts and Jira events into Matrix rooms and direct messages.",
      "Deployed and run Keycloak for centralized sign-in across internal services.",
    ],
    tags: ["Ansible", "Observability", "ChatOps", "Keycloak"],
  },
  {
    title: "Product & Platform Engineering",
    organization: "Independent projects",
    location: "Remote",
    period: "2026 — Present",
    scope:
      "Designing, building, and deploying complete products: Dolphin CRM and the Nerkhbaan pricing platform.",
    highlights: [
      "Dolphin CRM: a Django/PostgreSQL CRM shipped as versioned, tagged releases with Compose-based deployment, scripted rollback, and restore-verified backups.",
      "Nerkhbaan: a FastAPI, TimescaleDB, and Redis platform with CI covering integration, browser, and image-scan gates, and Prometheus alerting, running on a live host.",
    ],
    tags: ["Docker Compose", "PostgreSQL", "CI/CD", "Prometheus"],
  },
  {
    title: "Freelance DevOps & Linux Administrator",
    organization: "Self-employed",
    location: "Remote",
    period: "Dec 2024 — Jun 2025",
    scope: "Automation scripts and system administration for client servers.",
    highlights: [
      "Wrote Bash automation for routine maintenance, backups, and log rotation.",
      "Audited client servers; configured firewall rules and TLS certificates.",
      "Tuned Nginx and Apache configurations, including reverse proxying and load balancing.",
    ],
    tags: ["Linux operations", "Bash", "Nginx"],
  },
];

export const education: Education = {
  degree: "B.Sc. Computer Science",
  status: "In progress · since Oct 2026",
  note: "Studying the computer science fundamentals behind the infrastructure work I do every day.",
};

// LPIC exam status confirmed by Ilia (Oct 2026). Dates and training providers
// are from the résumé; certificate IDs are pending (see TODO_CONTENT.md).
export const qualifications: Qualification[] = [
  {
    title: "LPIC-2 certification",
    issuer: "Linux Professional Institute",
    date: "Jun 2025",
    kind: "Certification",
    note: "Advanced Linux administration: kernel, storage, networking, and system services. Trained with TOSINSO.",
  },
  {
    title: "LPIC-1 certification",
    issuer: "Linux Professional Institute",
    date: "Jan 2025",
    kind: "Certification",
    note: "Linux system administration fundamentals. Trained with CanDo.",
  },
  {
    title: "DevOps for Beginners & Intermediate",
    issuer: "CanDo",
    date: "2025",
    kind: "Course completion",
    note: "Two-part DevOps course covering containers, CI/CD, and automation.",
  },
];

export const resumeSummary =
  "DevOps engineer focused on Linux infrastructure, container delivery, and monitoring. I provision and harden servers, package services with Docker Compose, build CI pipelines with security gates, and route Prometheus alerts to the people who act on them. Recent work includes Dolphin CRM and Nerkhbaan: two complete products I built and deploy with least-privilege databases, scripted rollbacks, and restore-tested backups.";
