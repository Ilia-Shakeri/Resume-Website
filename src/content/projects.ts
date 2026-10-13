import type { FeaturedProject, SecondaryProject } from "./types";

// Every statement below is traceable to the linked repository. See
// docs/content-evidence.md for file-level sources. No metric on this page is
// illustrative; where no measured result exists, the copy says what was built.

const GH = "https://github.com/Ilia-Shakeri";

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "dolphin-crm",
    category: "01 / Platform delivery",
    name: "Dolphin CRM",
    period: "2026",
    role: "Sole engineer",
    title: "One codebase. A locked-down deployment per customer.",
    summary:
      "A Persian-first CRM/ERP for sales, billing, inventory, telephony, and after-sales. I built the application and the delivery around it: every customer runs an isolated Compose stack whose features are switched by a signed manifest, behind an Nginx edge, with least-privilege PostgreSQL roles.",
    tags: ["Django", "PostgreSQL", "Docker Compose", "Nginx", "Ed25519"],
    outcomeLabel: "Delivery",
    outcome:
      "Shipped as tagged releases (v2.40.42 in October 2026), with a deploy script that backs up, migrates, and can roll back.",
    diagram: "dolphin-stack",
    links: [{ label: "View source", href: `${GH}/Dolphin` }],
    caseStudy: {
      problem:
        "Several customers need the same CRM, but each must keep its own database, secrets, and feature set, and a customer administrator on their own host must not be able to change what is licensed.",
      role:
        "Sole author of the repository: application, PostgreSQL bootstrap, Compose topology, Nginx edge, deployment scripts, and the operations runbook.",
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
        "Versioned releases with a changelog for each one; the repository records a suite of about 3,500 automated tests.",
        "A single deployment runbook covers first install, update, backup/restore, rollback, and incident response.",
      ],
    },
  },
  {
    slug: "nerkhbaan",
    category: "02 / Delivery & reliability",
    name: "Nerkhbaan",
    period: "2026",
    role: "Sole engineer",
    title: "Market prices you can trust, shipped through gated CI.",
    summary:
      "A live gold, currency, and crypto price platform: FastAPI, PostgreSQL with TimescaleDB, and Redis behind an Nginx ingress, with web, admin, and desktop clients. Prices carry their source time and expire rather than going quietly stale.",
    tags: ["FastAPI", "TimescaleDB", "Redis", "GitHub Actions", "Trivy", "Prometheus"],
    outcomeLabel: "Running",
    outcome:
      "Release 2.8.1 deployed to nerkhbaan.ir with two API replicas, according to the project status record of 12 Oct 2026.",
    diagram: "nerkhbaan-ci",
    links: [
      { label: "View source", href: `${GH}/Nerkhbaan` },
      { label: "Live site", href: "https://nerkhbaan.ir/" },
    ],
    caseStudy: {
      problem:
        "Price sources fail, lag, and disagree. Showing an old quote as if it were current is worse than showing nothing, and every release has to keep existing users and history intact.",
      role:
        "Sole author: API, data model and migrations, frontends, Go feed sidecar, Compose production stack, CI, and monitoring.",
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
        "The 2.8.1 release passed all CI jobs before deployment; the final API image reported no HIGH or CRITICAL findings.",
        "The project status record keeps dated evidence and states what was not proven, for example that zero downtime is not claimed.",
      ],
    },
  },
  {
    slug: "chatops-bridges",
    category: "03 / Observability & ChatOps",
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
      outcome: [
        "Both workflows are published as importable n8n JSON with setup guides.",
      ],
    },
  },
];

export const secondaryProjects: SecondaryProject[] = [
  {
    name: "Stackplore",
    year: "2026",
    summary:
      "Self-hosted explorer for Docker and Kubernetes services: topology, health, logs, metrics, and events behind one versioned API. In active development; ships non-root images, Compose, and a Helm chart.",
    tags: ["Go", "PostgreSQL", "Helm", "OpenAPI"],
    href: `${GH}/Stackplore`,
  },
  {
    name: "Matrix User Manager",
    year: "2025",
    summary:
      "Interactive Bash/whiptail tool for Synapse admins: finds the containers, reads homeserver.yaml, and manages users on PostgreSQL or SQLite, including database backups and safe stop/start for SQLite writes.",
    tags: ["Bash", "Docker", "Synapse"],
    href: `${GH}/Matrix-User-Manager`,
  },
  {
    name: "LinSecGuard",
    year: "2025",
    summary:
      "Linux hardening helper: SSH root login and port, UFW rules, running services, insecure permissions, open ports, failed logins, and pending security updates.",
    tags: ["Bash", "UFW", "SSH"],
    href: `${GH}/LinSecGuard`,
  },
  {
    name: "EasyCert",
    year: "2025",
    summary:
      "Interactive OpenSSL wrapper that creates a local CA and wildcard or subdomain certificates, then restarts the Nginx or Traefik container.",
    tags: ["Bash", "OpenSSL", "TLS"],
    href: `${GH}/EasyCert`,
  },
  {
    name: "CipherCert",
    year: "2026",
    summary:
      "Desktop TLS certificate analyzer: an Electron/React UI over a FastAPI engine that inspects chains and expiry, grades domains, and keeps scan history.",
    tags: ["Python", "FastAPI", "Electron"],
    href: `${GH}/CipherCert-App`,
  },
  {
    name: "SysTrack",
    year: "2025",
    summary:
      "Cron-scheduled Bash monitor for CPU, memory, disk, and network usage that emails alerts over a threshold and rotates its own logs.",
    tags: ["Bash", "cron", "Monitoring"],
    href: `${GH}/SysTrack`,
  },
];
