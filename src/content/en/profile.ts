import type { Education, ExperienceItem, Profile, Qualification } from "../types";

// Sources for every statement in this file are recorded in
// docs/content-evidence.md. Time-sensitive values (employment status,
// availability, location) are tracked in TODO_CONTENT.md.

export const profile: Profile = {
  name: "Ilia Shakeri",
  role: "DevOps Engineer",
  headline: ["Hi, I’m", "Ilia Shakeri."],
  intro:
    "A DevOps engineer in Tehran. I work across Linux, containers, delivery pipelines, and monitoring, and I like building systems that deploy the same way every time and tell you when something is wrong. I also founded Nerkhbaan and co-founded Dolphin CRM.",
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

export const experienceSummary: string =
  "From hands-on Linux administration to owning delivery and monitoring for production services, and founding products I build and run end to end.";

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
    title: "Founder",
    organization: "Nerkhbaan",
    location: "Tehran, Iran",
    period: "2026 — Present",
    scope: "Founded and built a live gold, currency, and crypto price platform, and run it in production.",
    highlights: [
      "Built the FastAPI, TimescaleDB, and Redis backend, the React web and admin apps, and an Electron desktop app.",
      "Operate it on a Compose stack behind Nginx with two API replicas, Prometheus alerting, and CI gates covering integration tests, browser tests, and Trivy image scans.",
    ],
    tags: ["Product", "FastAPI", "CI/CD", "Prometheus"],
  },
  {
    title: "Co-founder",
    organization: "Dolphin CRM",
    location: "Tehran, Iran",
    period: "2026 — Present",
    scope: "Co-founded a Persian-first CRM/ERP and lead its engineering and delivery.",
    highlights: [
      "Built the Django/PostgreSQL platform with 40 switchable feature modules, shipped as tagged releases.",
      "Designed the deployment model: isolated Compose stacks, a signed feature manifest, least-privilege database roles, scripted rollback, and restore-verified backups.",
    ],
    tags: ["Product", "Django", "Docker Compose", "PostgreSQL"],
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

// Training-course certificates. Dates, IDs, and course periods are read from
// the certificate files in references/ (LPIC-2 has no certificate; its date
// comes from the résumé). None of these are LPI-issued exam certifications.
export const qualifications: Qualification[] = [
  {
    title: "DevOps for Intermediates",
    issuer: "CanDo IT Academy",
    date: "Feb 2026",
    note: "Course completed Jun 2025 – Jan 2026.",
    certId: "04/30289",
    href: "/certificates/cando-devops-intermediates.webp",
  },
  {
    title: "DevOps for Beginners",
    issuer: "CanDo IT Academy",
    date: "Jul 2025",
    note: "Course completed Jan – Jun 2025.",
    certId: "02/20889",
    href: "/certificates/cando-devops-beginners.webp",
  },
  {
    title: "LPIC-2 training course",
    issuer: "TOSINSO",
    date: "Jun 2025",
    note: "Linux administration course following the LPIC-2 curriculum.",
  },
  {
    title: "LPIC-1 training course",
    issuer: "CanDo IT Academy",
    date: "Jan 2025",
    note: "Linux administration course following the LPIC-1 curriculum, Oct 2024 – Jan 2025.",
    certId: "03/17758",
    href: "/certificates/cando-lpic-1.webp",
  },
];

export const resumeSummary: string =
  "DevOps engineer focused on Linux infrastructure, container delivery, and monitoring. I provision and harden servers, package services with Docker Compose, build CI pipelines with security gates, and route Prometheus alerts to the people who act on them. Founder of Nerkhbaan and co-founder of Dolphin CRM: two products I built and run with least-privilege databases, scripted rollbacks, and restore-tested backups.";
