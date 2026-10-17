import type { Education, ExperienceItem, Profile, Qualification } from "../types";

// Sources for every statement in this file are recorded in
// docs/content-evidence.md. Time-sensitive values (employment status,
// availability, location) are tracked in TODO_CONTENT.md.

export const profile: Profile = {
  name: "Ilia Shakeri",
  role: "DevOps Engineer",
  headline: "DevOps & Backend Engineer",
  stack: ["Linux", "Python", "Go", "Docker", "CI/CD", "Observability"],
  intro:
    "I build backend systems and operate them in production. My work spans Python and Go services, Linux infrastructure, CI/CD, and observability, from development and deployment to monitoring and recovery. Founder of Nerkhbaan and co-founder of Dolphin CRM.",
  study: "Computer Science student (B.Sc.)",
  location: "Tehran, Iran",
  timeZone: "IRST · UTC+03:30",
  availability: "Open to remote DevOps, backend & platform roles",
  email: "iliashkr@gmail.com",
  github: { label: "github.com/Ilia-Shakeri", href: "https://github.com/Ilia-Shakeri" },
  linkedin: { label: "linkedin.com/in/ilia-shakeri", href: "https://www.linkedin.com/in/ilia-shakeri/" },
  telegram: { label: "@ilia_ssh", href: "https://t.me/ilia_ssh" },
  focus: "Backend · Infrastructure · Automation",
  languages: ["Persian (native)", "English (professional working)"],
  bio: [
    "I develop backend services with Python and Go and manage the infrastructure they run on. My work includes Linux administration, containerized deployments, CI/CD, monitoring, security hardening, and backup recovery. When a product needs a frontend, I build it in React or Next.js.",
    "I prioritize reproducible deployments, tested recovery procedures, and operational evidence over assumptions. Outside work, I have played the piano for more than ten years.",
  ],
  principles: [
    { title: "Automate the repeatable.", detail: "Scripts, playbooks, and workflows over manual steps." },
    { title: "Make reliability visible.", detail: "Health checks, alerts, and evidence you can read." },
  ],
  contactMessage:
    "Looking for a DevOps engineer or backend developer who treats deployments, backups, and alerts as engineering work? I’d like to hear about what you’re building.",
  remote: [
    { label: "Time zone", value: "Tehran, UTC+03:30 (no daylight saving)" },
    { label: "Overlap", value: "4+ hours with European working hours; comfortable with async teams" },
    { label: "Engagement", value: "Full-time or contract" },
    { label: "Start", value: "Two weeks’ notice" },
    { label: "Working language", value: "English (professional working proficiency)" },
  ],
};

export const capabilities = [
  "Backend services",
  "Linux & hardening",
  "CI/CD & automation",
  "Observability & recovery",
];

export const experienceSummary: string =
  "A DevOps role at OTICAMP since June 2025, alongside two products I build and run myself: Nerkhbaan, which I founded, and Dolphin CRM, which I co-founded.";

export const experience: ExperienceItem[] = [
  {
    title: "DevOps Engineer",
    type: "Employment",
    organization: "OTICAMP",
    location: "Tehran, Iran",
    period: "Jun 2025 — Present",
    scope:
      "Provisioning, hardening, and monitoring Linux infrastructure for internal and product services.",
    highlights: [
      "Provision and harden Linux infrastructure with Ansible, keeping development and production configuration consistent.",
      "Deploy and maintain Prometheus, Grafana, and Loki for infrastructure metrics and logs.",
      "Built n8n automation that routes Prometheus alerts and Jira events to Matrix channels and direct messages.",
      "Deploy and operate Keycloak for centralized authentication across internal services.",
    ],
    tags: ["Ansible", "Observability", "ChatOps", "Keycloak"],
  },
  {
    title: "Founder & Engineer",
    type: "Own product",
    organization: "Nerkhbaan",
    location: "Tehran, Iran",
    period: "2026 — Present",
    scope: "Founded a live gold, currency, and crypto price platform used by 10+ people; I am its only engineer and run it in production.",
    highlights: [
      "Built the FastAPI, TimescaleDB, and Redis backend, a Go feed sidecar, the React web and admin apps, and an Electron desktop app.",
      "Run it on Docker Compose with two API replicas behind Nginx; release 2.8.1 passed 15 CI jobs, including integration tests, browser tests, and Trivy image scans.",
      "Load-tested an isolated copy of the stack: 27,000 of 27,000 requests succeeded over 30 minutes, p95 323 ms.",
    ],
    tags: ["Product", "FastAPI", "CI/CD", "Prometheus"],
  },
  {
    title: "Co-founder, Lead Developer & IT Lead",
    type: "Co-founded product",
    organization: "Dolphin CRM",
    location: "Tehran, Iran",
    period: "2026 — Present",
    scope: "Co-founded a Persian-first CRM/ERP that is now used by 2+ companies. I lead its development and IT operations.",
    highlights: [
      "Lead development of the Django and PostgreSQL application: 46 feature flags and about 3,640 automated tests.",
      "Designed the deployment model: an isolated Compose stack per installation, a signed feature manifest, and non-superuser database roles with per-table grants.",
      "Built scripted deploy and rollback and backups that are verified by restoring them.",
    ],
    tags: ["Product", "Django", "Docker Compose", "PostgreSQL"],
  },
  {
    title: "DevOps & Linux Administrator",
    type: "Freelance",
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

export const education: Education[] = [
  {
    degree: "B.Sc. Computer Science",
    status: "In progress · since Oct 2026",
    note: "Studying the computer science fundamentals behind the infrastructure work I do every day.",
  },
  {
    degree: "Comprehensive Data Science Program",
    institution: "University of Tehran (online)",
    status: "In progress · May 2026 – Aug 2027 (planned)",
    note: "A part-time programme of about 360 hours over a year, taken alongside my degree and work.",
    completed: ["Statistics and linear algebra", "Data analysis in Excel", "Data science foundations", "SQL Server", "Power BI"],
    upcoming: [
      "R",
      "Tableau",
      "Python for data science",
      "Deep learning and computer vision",
      "NLP and text mining",
      "Big data",
      "Machine learning for operations",
      "Time series",
      "Recommender systems",
      "Reinforcement learning",
    ],
  },
];

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
  "DevOps and backend engineer. I build services in Python (FastAPI, Django) and Go and operate them in production: Linux administration, Docker Compose deployments, CI pipelines with security gates, monitoring, and tested backup recovery. React and Next.js when a product needs a frontend. Founder of Nerkhbaan (10+ users) and co-founder of Dolphin CRM (used by 2+ companies). Studying for a B.Sc. in Computer Science and taking the University of Tehran’s data science programme.";
