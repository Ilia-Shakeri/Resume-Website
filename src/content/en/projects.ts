import type { FeaturedProject, SecondaryProject, Venture } from "../types";

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
    tagline: "Live gold, currency, and crypto prices that never pretend to be fresh.",
    description:
      "A price platform for Iranian users: gold, currencies, and crypto with history, alerts, and web, admin, and desktop apps. Every price carries its source time and expires instead of going quietly stale.",
    highlights: [
      "Designed and built the whole product: FastAPI API, TimescaleDB history, Redis, React web and admin apps, an Electron desktop app, and a Go feed sidecar.",
      "Pricing pipeline with independent verification: stale, suspicious, or expired quotes are never shown as current.",
      "Runs on infrastructure I operate: a Compose stack behind Nginx with two API replicas, backups, and Prometheus alerting.",
      "Every push goes through CI gates: real TimescaleDB integration tests, browser tests, and Trivy image scans.",
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
    diagram: "nerkhbaan-ci",
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
    status: "Shipping tagged releases",
    tagline: "A Persian-first CRM that runs a company’s whole commercial pipeline.",
    description:
      "Leads and campaigns, quotations and invoices, payments and cheques, inventory, postal tracking, telephony, and after-sales, in one RTL panel that updates live. Each installation runs as its own locked-down stack.",
    highlights: [
      "Lead engineer: the Django application with 40 switchable feature modules and a Persian RTL panel with live updates.",
      "Deployment model: an isolated Compose stack per installation, a signed Ed25519 feature manifest, and four least-privilege PostgreSQL roles.",
      "Release discipline: tagged releases, a deploy script with rollback, and backups that are verified by restoring them.",
      "Integrations: Asterisk/FreePBX click-to-call and call logs, SMS gateways, and signed webhooks.",
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
    diagram: "dolphin-stack",
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

export const featuredBuild: FeaturedProject = {
  slug: "chatops-bridges",
  category: "Observability & ChatOps",
  name: "Prometheus & Jira → Matrix bridges",
  period: "2025",
  role: "Author",
  title: "Less noise. Alerts that reach the right person.",
  summary:
    "Two n8n workflows from my ChatOps work: one turns Alertmanager webhooks into readable HTML alerts in Matrix rooms, the other routes Jira assignments and @mentions to the right person’s Matrix direct messages.",
  tags: ["n8n", "Prometheus", "Alertmanager", "Matrix", "Jira"],
  outcomeLabel: "Design",
  outcome:
    "Tokens are checked before use and renewed on 401; delivery retries with exponential backoff and jitter on HTTP 429.",
  diagram: "chatops-flow",
  links: [
    { label: "Alert bridge", href: `${GH}/n8n-prometheus-matrix-bridge` },
    { label: "Jira notifier", href: `${GH}/jira2matrix-notifier-n8n` },
  ],
  caseStudy: {
    problem:
      "Plain webhooks fail silently when a bot token expires or the chat server rate-limits, and email notifications get ignored. Alerts and ticket updates need to land where the team already works.",
    role: "Designed and published both workflows.",
    approach: [
      "Alertmanager posts to an n8n webhook; labels and annotations become a colour-coded firing/resolved message with a link back to the Prometheus graph.",
      "Jira webhooks are parsed for assignees and @mentions in comment HTML, mapped to Matrix users, and delivered to cached direct-message rooms that are created on first use.",
    ],
    reliability: [
      "Access tokens are cached in n8n tables, validated with whoami before use, and renewed automatically on expiry.",
      "Login and delivery retry with exponential backoff and jitter.",
    ],
    outcome: ["Both workflows are published as importable n8n JSON with setup guides."],
  },
};

export const secondaryProjects: SecondaryProject[] = [
  {
    name: "Stackplore",
    year: "2026",
    summary:
      "Self-hosted explorer for Docker and Kubernetes services: topology, health, logs, metrics, and events behind one versioned API. In active development; ships non-root images, Compose, and a Helm chart.",
    category: "ops",
    tools: [
      { name: "Go", brand: "siGo" },
      { name: "PostgreSQL", brand: "siPostgresql" },
      { name: "Helm", brand: "siHelm" },
      { name: "OpenAPI", brand: "siOpenapiinitiative" },
    ],
    href: `${GH}/Stackplore`,
  },
  {
    name: "Matrix User Manager",
    year: "2025",
    summary:
      "Interactive Bash/whiptail tool for Synapse admins: finds the containers, reads homeserver.yaml, and manages users on PostgreSQL or SQLite, including database backups and safe stop/start for SQLite writes.",
    category: "ops",
    tools: [
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Docker", brand: "siDocker" },
      { name: "Matrix", brand: "siMatrix" },
    ],
    href: `${GH}/Matrix-User-Manager`,
  },
  {
    name: "LinSecGuard",
    year: "2025",
    summary:
      "Linux hardening helper: SSH root login and port, UFW rules, running services, insecure permissions, open ports, failed logins, and pending security updates.",
    category: "security",
    tools: [
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Linux", brand: "siLinux" },
    ],
    href: `${GH}/LinSecGuard`,
  },
  {
    name: "EasyCert",
    year: "2025",
    summary:
      "Interactive OpenSSL wrapper that creates a local CA and wildcard or subdomain certificates, then restarts the Nginx or Traefik container.",
    category: "security",
    tools: [
      { name: "OpenSSL", brand: "siOpenssl" },
      { name: "Nginx", brand: "siNginx" },
      { name: "Traefik", brand: "siTraefikproxy" },
    ],
    href: `${GH}/EasyCert`,
  },
  {
    name: "CipherCert",
    year: "2026",
    summary:
      "Desktop TLS certificate analyzer: an Electron/React UI over a FastAPI engine that inspects chains and expiry, grades domains, and keeps scan history.",
    category: "security",
    tools: [
      { name: "Python", brand: "siPython" },
      { name: "FastAPI", brand: "siFastapi" },
      { name: "Electron", brand: "siElectron" },
    ],
    href: `${GH}/CipherCert-App`,
  },
  {
    name: "SysTrack",
    year: "2025",
    summary:
      "Cron-scheduled Bash monitor for CPU, memory, disk, and network usage that emails alerts over a threshold and rotates its own logs.",
    category: "monitoring",
    tools: [
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Linux", brand: "siLinux" },
    ],
    href: `${GH}/SysTrack`,
  },
  {
    name: "Automated Backup Script",
    year: "2025",
    summary:
      "Interactive backups of directories to tar or zip archives, scheduled with cron, with logging and automatic cleanup of backups older than seven days.",
    category: "ops",
    tools: [{ name: "GNU Bash", brand: "siGnubash" }],
    href: `${GH}/Automated-Backup-Script`,
  },
  {
    name: "Clockwork OrangeHRM",
    year: "2026",
    summary:
      "CLI and Windows desktop toolkit that reads attendance straight from self-hosted OrangeHRM databases and exports work hours and payroll ranges to CSV or PDF.",
    category: "apps",
    tools: [
      { name: "GNU Bash", brand: "siGnubash" },
      { name: "Electron", brand: "siElectron" },
      { name: "MariaDB", brand: "siMariadb" },
    ],
    href: `${GH}/Clockwork-OrangeHRM-Desktop`,
  },
];
