import type { Project, Venture } from "../types";

// Every technical statement below is traceable to the linked repository (see
// docs/content-evidence.md). Founder / co-founder roles are as stated by Ilia.
// Numbers come from each repository's own records; none are illustrative.

const GH = "https://github.com/Ilia-Shakeri";

export const ventures: Venture[] = [
  {
    slug: "nerkhbaan",
    name: "Nerkhbaan",
    localName: "نرخبان",
    logo: { src: "/images/projects/nerkhbaan-logo.webp", width: 217, height: 215 },
    accent: "#d4b16a",
    role: "Founder",
    period: "2026 — Present",
    status: "Live at nerkhbaan.ir",
    description:
      "A price platform I founded for gold, currencies, and crypto, with history, alerts, and web, admin, and desktop apps. Every price shows its source time and expires instead of going stale.",
    highlights: [
      "Built the whole product: FastAPI, TimescaleDB, Redis, React web and admin apps, an Electron desktop app, and a Go feed sidecar.",
      "Run it in production myself: Compose behind Nginx, two API replicas, backups, and Prometheus alerts.",
      "CI on every push: TimescaleDB integration tests, browser tests, and Trivy image scans.",
    ],
    stats: [
      { value: "2.8.1", label: "Live release" },
      { value: "117", label: "API routes" },
      { value: "15/15", label: "CI jobs passed" },
      { value: "8", label: "Alert rules" },
    ],
    tools: [
      { name: "FastAPI", brand: "siFastapi" },
      { name: "TimescaleDB", brand: "siTimescale" },
      { name: "Redis", brand: "siRedis" },
      { name: "React", brand: "siReact" },
      { name: "Electron", brand: "siElectron" },
      { name: "Go", brand: "siGo" },
      { name: "Docker", brand: "siDocker" },
      { name: "Nginx", brand: "siNginx" },
      { name: "Prometheus", brand: "siPrometheus" },
      { name: "GitHub Actions", brand: "siGithubactions" },
      { name: "Trivy", brand: "siTrivy" },
    ],
    links: [
      { label: "Visit nerkhbaan.ir", href: "https://nerkhbaan.ir/", primary: true },
      { label: "Source code", href: `${GH}/Nerkhbaan` },
    ],
    caseStudy: {
      problem:
        "Price sources fail, lag, and disagree. Showing an old quote as if it were current is worse than showing nothing, and every release has to keep existing users and history intact.",
      role:
        "Founder and sole engineer: API, data model and migrations, frontends, Go feed sidecar, Compose production stack, CI, and monitoring.",
      approach: [
        "CI on every push: locked Node builds, Python unit tests, a Go sidecar, Compose validation, browser end-to-end tests, repository security scans, and per-image Trivy scans.",
        "Integration jobs run real TimescaleDB and Redis: migrations must be idempotent and checksummed, and lease handover between API replicas is tested.",
        "Python dependencies install from hash-pinned lock files and are checked with pip-audit.",
      ],
      reliability: [
        "Readiness checks the database, Redis, and pricing health, not just whether the process is up. API port 8000 is internal only.",
        "Prometheus alert rules cover API down, unavailable or expired prices, stalled refresh, provider failure rate, dead letters, persistence backlog, and Redis memory.",
        "External price workers sign the records they submit; the feed sidecar holds no database or admin credentials.",
        "The admin panel has its own session cookies, CSRF protection, permission checks, re-authentication, and TOTP MFA.",
      ],
      outcome: [
        "The 2.8.1 release passed all 15 CI jobs before deployment; the final API image reported no HIGH or CRITICAL findings.",
        "The project status record keeps dated evidence and states what was not proven, for example that zero downtime is not claimed.",
      ],
    },
  },
  {
    slug: "dolphin-crm",
    name: "Dolphin CRM",
    localName: "دلفین",
    logo: { src: "/images/projects/dolphin-logo.webp", width: 240, height: 202 },
    accent: "#2f9bff",
    role: "Co-founder",
    period: "2026 — Present",
    status: "v2.40.55 · October 2026",
    description:
      "A Persian-first CRM/ERP I co-founded: leads, quotations, invoices, payments, inventory, telephony, and after-sales in one live RTL panel. Each installation runs as its own isolated stack.",
    highlights: [
      "Lead engineer on the Django app: 40 switchable feature modules and a live-updating RTL panel.",
      "Designed the deployment: an isolated Compose stack per installation, a signed Ed25519 feature manifest, and four least-privilege PostgreSQL roles.",
      "Tagged releases, a deploy script with rollback, and backups that count only after a test restore.",
    ],
    stats: [
      { value: "40", label: "Feature modules" },
      { value: "3,510", label: "Automated tests" },
      { value: "57", label: "Tagged releases" },
      { value: "4", label: "Scoped DB roles" },
    ],
    tools: [
      { name: "Django", brand: "siDjango" },
      { name: "Python", brand: "siPython" },
      { name: "PostgreSQL", brand: "siPostgresql" },
      { name: "Docker", brand: "siDocker" },
      { name: "Nginx", brand: "siNginx" },
      { name: "Gunicorn", brand: "siGunicorn" },
      { name: "Asterisk", brand: "siAsterisk" },
      { name: "Selenium", brand: "siSelenium" },
      { name: "GNU Bash", brand: "siGnubash" },
    ],
    links: [{ label: "Source code", href: `${GH}/Dolphin`, primary: true }],
    caseStudy: {
      problem:
        "The same CRM has to run as separate installations, each with its own database, secrets, and feature set, and an administrator on the host must not be able to change which features are enabled.",
      role:
        "Co-founder and lead engineer: application, PostgreSQL bootstrap, Compose topology, Nginx edge, deployment scripts, and the operations runbook.",
      approach: [
        "Feature availability comes from a manifest signed with an Ed25519 key that never leaves the platform owner. Production refuses to start if the manifest is missing, tampered with, or signed by an unknown key.",
        "Four PostgreSQL logins with separate rights: bootstrap, migration owner, runtime application, and a read-only backup role. One-shot jobs (db-bootstrap → migrate → db-finalize) apply exact grants before the web service may start.",
        "Images are referenced by sha256 digest and built from the tagged commit, not the working tree.",
      ],
      reliability: [
        "deploy.sh refuses to half-apply an upgrade: backup, migrations, grant refresh, and Nginx config reload run in a fixed order, with --rollback to the previous image.",
        "An Nginx write-stop mode rejects POST/PUT/PATCH/DELETE during maintenance while reads keep working.",
        "Backups are checksummed and restored into an isolated container with networking disabled, so a backup counts only once it has been restored.",
        "Containers run read-only with all capabilities dropped and no-new-privileges.",
      ],
      outcome: [
        "Versioned releases with a changelog for each one (v2.40.55 in October 2026); the repository records about 3,510 automated tests.",
        "A single deployment runbook covers first install, update, backup/restore, rollback, and incident response.",
      ],
    },
  },
];

export const projects: Project[] = [
  {
    name: "Prometheus & Jira → Matrix bridges",
    year: "2025",
    kind: "n8n workflows",
    category: "monitoring",
    summary: "Two n8n workflows that bring Prometheus alerts and Jira updates into the team’s Matrix chat.",
    highlights: [
      "Alertmanager webhooks become colour-coded firing/resolved messages with a link to the Prometheus graph.",
      "Jira assignments and @mentions reach the right person’s Matrix direct messages.",
      "Tokens are validated and renewed automatically; delivery retries with backoff and jitter.",
    ],
    tools: [
      { name: "n8n", brand: "siN8n" },
      { name: "Prometheus", brand: "siPrometheus" },
      { name: "Matrix", brand: "siMatrix" },
      { name: "Jira", brand: "siJira" },
    ],
    links: [
      { label: "Alert bridge", href: `${GH}/n8n-prometheus-matrix-bridge` },
      { label: "Jira notifier", href: `${GH}/jira2matrix-notifier-n8n` },
    ],
  },
  {
    name: "Stackplore",
    year: "2026",
    kind: "Go service · Helm chart",
    category: "ops",
    summary: "A self-hosted explorer for Docker and Kubernetes services. In active development, not yet 1.0.",
    highlights: [
      "Topology, health, logs, metrics, and events behind one versioned OpenAPI contract.",
      "Go API with PostgreSQL migrations and CI.",
      "Ships non-root images, a Compose file, and a Helm chart.",
    ],
    tools: [
      { name: "Go", brand: "siGo" },
      { name: "PostgreSQL", brand: "siPostgresql" },
      { name: "Helm", brand: "siHelm" },
      { name: "OpenAPI", brand: "siOpenapiinitiative" },
    ],
    links: [{ label: "Source", href: `${GH}/Stackplore` }],
  },
  {
    name: "Matrix User Manager",
    year: "2025",
    kind: "Bash TUI",
    category: "ops",
    summary: "A terminal menu for managing users on a Synapse homeserver running in Docker.",
    highlights: [
      "Finds the Synapse containers and reads homeserver.yaml on its own.",
      "Works with PostgreSQL or SQLite, with a safe stop/start around SQLite writes.",
      "Includes database backups.",
    ],
    tools: [
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Docker", brand: "siDocker" },
      { name: "Matrix", brand: "siMatrix" },
    ],
    links: [{ label: "Source", href: `${GH}/Matrix-User-Manager` }],
  },
  {
    name: "LinSecGuard",
    year: "2025",
    kind: "Bash CLI",
    category: "security",
    summary: "An interactive hardening check for Linux servers.",
    highlights: [
      "Checks SSH root login and port, UFW rules, and running services.",
      "Finds insecure file permissions and open ports.",
      "Reports failed logins and pending security updates.",
    ],
    tools: [
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Linux", brand: "siLinux" },
    ],
    links: [{ label: "Source", href: `${GH}/LinSecGuard` }],
  },
  {
    name: "EasyCert",
    year: "2025",
    kind: "Bash CLI",
    category: "security",
    summary: "An interactive OpenSSL wrapper for a local certificate authority.",
    highlights: [
      "Creates a local CA and wildcard or subdomain certificates.",
      "Restarts the Nginx or Traefik container to load them.",
    ],
    tools: [
      { name: "OpenSSL", brand: "siOpenssl" },
      { name: "Nginx", brand: "siNginx" },
      { name: "Traefik", brand: "siTraefikproxy" },
    ],
    links: [{ label: "Source", href: `${GH}/EasyCert` }],
  },
  {
    name: "CipherCert",
    year: "2026",
    kind: "Desktop app",
    category: "security",
    summary: "A desktop analyzer for TLS certificates.",
    highlights: [
      "Electron/React interface over a FastAPI engine.",
      "Inspects certificate chains and expiry, and grades domains.",
      "Keeps scan history in SQLite.",
    ],
    tools: [
      { name: "Python", brand: "siPython" },
      { name: "FastAPI", brand: "siFastapi" },
      { name: "Electron", brand: "siElectron" },
    ],
    links: [{ label: "Source", href: `${GH}/CipherCert-App` }],
  },
  {
    name: "SysTrack",
    year: "2025",
    kind: "Bash · cron",
    category: "monitoring",
    summary: "A cron-scheduled resource monitor for Linux hosts.",
    highlights: [
      "Tracks CPU, memory, disk, and network usage.",
      "Emails an alert when a threshold is crossed.",
      "Rotates its own logs.",
    ],
    tools: [
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Linux", brand: "siLinux" },
    ],
    links: [{ label: "Source", href: `${GH}/SysTrack` }],
  },
  {
    name: "Automated Backup Script",
    year: "2025",
    kind: "Bash CLI",
    category: "ops",
    summary: "Interactive, scheduled backups of directories.",
    highlights: [
      "Creates tar or zip archives on a cron schedule.",
      "Logs its runs and removes backups older than seven days.",
    ],
    tools: [{ name: "GNU Bash", brand: "siGnubash" }],
    links: [{ label: "Source", href: `${GH}/Automated-Backup-Script` }],
  },
  {
    name: "Clockwork OrangeHRM",
    year: "2026",
    kind: "CLI + desktop app",
    category: "apps",
    summary: "Attendance and payroll reports from a self-hosted OrangeHRM.",
    highlights: [
      "Reads attendance straight from the OrangeHRM database.",
      "Exports work hours and payroll ranges to CSV or PDF.",
      "A Bash CLI and an Electron desktop app for Windows.",
    ],
    tools: [
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Electron", brand: "siElectron" },
      { name: "MariaDB", brand: "siMariadb" },
    ],
    links: [
      { label: "CLI", href: `${GH}/Clockwork-OrangeHRM-CLI` },
      { label: "Desktop app", href: `${GH}/Clockwork-OrangeHRM-Desktop` },
    ],
  },
];
