import type { FeaturedProject, Project } from "../types";

// Every statement below is traceable to the linked repository; see
// docs/content-evidence.md. Founder / co-founder roles are as stated by Ilia.
// Figures come from each repository's own records and carry their date.

const GH = "https://github.com/Ilia-Shakeri";

export const featured: FeaturedProject[] = [
  {
    slug: "nerkhbaan",
    name: "Nerkhbaan",
    localName: "نرخبان",
    logo: { src: "/images/projects/nerkhbaan-logo.webp", width: 217, height: 215 },
    accent: "#d4b16a",
    role: "Founder & sole engineer",
    category: "Backend · DevOps · Product engineering",
    period: "2026 — Present",
    stage: "production",
    status: "Live at nerkhbaan.ir · 10+ active users",
    repo: "Nerkhbaan",
    summary:
      "A price platform for gold, currencies, and crypto with history, alerts, and web, admin, and desktop apps. Every quote names its source and time and carries an explicit expiry, so an outdated price is never shown as current.",
    highlights: [
      "Built the whole product: FastAPI API, TimescaleDB and Redis data layer, React web and admin apps, an Electron desktop app, and a Go feed sidecar.",
      "Run it in production on Docker Compose: two API replicas behind Nginx, migrations gated by readiness, and scheduled backups with a tested restore.",
      "Every release passes 15 CI jobs, including integration tests on real TimescaleDB and Redis, Playwright browser tests, and Trivy scans of seven images.",
    ],
    facts: [
      { value: "10+", label: "Active users" },
      { value: "3", label: "Apps: web, admin, desktop" },
      { value: "5 min", label: "Price feed refresh" },
      { value: "323 ms", label: "p95 in a 30-min load test" },
    ],
    screenshots: [
      {
        thumb: "/images/projects/nerkhbaan-dashboard-800.webp",
        full: "/images/projects/nerkhbaan-dashboard.webp",
        width: 1600,
        height: 807,
        alt: "Nerkhbaan dashboard in dark mode with gold and silver price cards, each showing a 24-hour or 30-day price chart and a source comparison menu.",
        caption: "Dashboard: live gold and silver prices with history",
      },
      {
        thumb: "/images/projects/nerkhbaan-login-800.webp",
        full: "/images/projects/nerkhbaan-login.webp",
        width: 1600,
        height: 812,
        alt: "Nerkhbaan sign-in page with the Persian logo, username and password fields, and a language switch.",
        caption: "Sign-in page (Persian interface)",
      },
    ],
    factsSource: "User count as of October 2026. The load test ran on an isolated copy of the production stack.",
    tools: [
      { name: "FastAPI", brand: "siFastapi" },
      { name: "TimescaleDB", brand: "siTimescale" },
      { name: "Redis", brand: "siRedis" },
      { name: "Go", brand: "siGo" },
      { name: "React", brand: "siReact" },
      { name: "Electron", brand: "siElectron" },
      { name: "Docker Compose", brand: "siDocker" },
      { name: "Nginx", brand: "siNginx" },
      { name: "GitHub Actions", brand: "siGithubactions" },
      { name: "Prometheus", brand: "siPrometheus" },
      { name: "Trivy", brand: "siTrivy" },
    ],
    links: [
      { label: "nerkhbaan.ir", href: "https://nerkhbaan.ir/", primary: true },
      { label: "Source code", href: `${GH}/Nerkhbaan` },
    ],
    architecture: {
      caption: "How a price travels from public market APIs to users.",
      steps: [
        { name: "Feed job", detail: "A scheduled GitHub Actions job fetches public market APIs every 5 minutes, checks ranges and age, and publishes one JSON feed." },
        { name: "Go sidecar", detail: "Pulls the feed every 60 s, re-validates it, and pushes quotes to the API with an HMAC-SHA256 signature. It holds no database or admin credentials." },
        { name: "FastAPI × 2", detail: "Verifies signatures and replays, refreshes each instrument under a Redis lease, flags anomalies, and assigns stale and expiry times." },
        { name: "TimescaleDB + Redis", detail: "TimescaleDB keeps price history. Redis holds leases, the quote cache, live-update pub/sub, and a persistence outbox." },
        { name: "Nginx", detail: "TLS, rate limits, REST and WebSocket routing to the API replicas." },
        { name: "Clients", detail: "React web app (PWA), React admin panel, and Electron desktop app. Live prices over WebSocket, with polling as fallback." },
      ],
    },
    caseStudy: [
      {
        title: "Problem and constraints",
        items: [
          "Show prices where every number states its instrument, unit, source, and time, and never present an outdated price as current.",
          "Units and purities are never converted or estimated: a missing direct gold price stays unavailable.",
          "Runs on a single server in Iran, where some foreign data providers are not reachable.",
        ],
      },
      {
        title: "Data freshness",
        items: [
          "Each quote stores when it was observed plus explicit stale and expiry times; its status moves from live to stale to expired against the clock.",
          "Stale, suspicious, expired, or unpersisted quotes are never shown as current.",
          "Disagreeing sources are flagged by volatility-adjusted anomaly checks, and confirmation requires an independent source.",
        ],
      },
      {
        title: "Fault handling",
        items: [
          "Only one replica refreshes a given instrument at a time, using Redis leases with owner-checked release.",
          "Provider calls have request budgets, retries, and a circuit breaker; a stale primary source falls back to a fresh secondary.",
          "If a database write fails, the quote is queued in a Redis stream outbox and marked unpersisted until it is flushed.",
          "If Redis is down, refresh pauses, stored values keep serving, and WebSocket clients fall back to polling.",
          "Readiness returns 200 only when the database is reachable and migrations are current; Redis and refresh health are reported alongside.",
        ],
      },
      {
        title: "CI/CD and deployment",
        items: [
          "15 CI jobs: locked Node builds, Python unit tests, the Go sidecar, Compose and monitoring config checks, Playwright browser tests, dependency and secret scans, and Trivy scans of seven images that fail on any HIGH or CRITICAL finding.",
          "Integration tests run on real TimescaleDB and Redis, apply migrations twice to prove they are idempotent, verify migration checksums, and run a restore drill.",
          "Production is Docker Compose on one host with two API replicas. Release 2.8.1 was rolled out by scaling to three replicas and removing the old ones one at a time.",
        ],
      },
      {
        title: "Observability and security",
        items: [
          "Eight Prometheus alert rules cover API down, unavailable or expired prices, stalled refresh, provider failure rate, dead letters, persistence backlog, and Redis memory; CI validates them with promtool.",
          "The admin panel uses separate session cookies, CSRF protection, permission checks, re-authentication, and required TOTP MFA.",
          "Containers drop all capabilities with no-new-privileges, the API port is internal only, and Python dependencies are hash-pinned and checked with pip-audit.",
        ],
      },
      {
        title: "Verified outcomes",
        items: [
          "Release 2.8.1 went live on nerkhbaan.ir in October 2026 after all 15 CI jobs passed and the final API image showed no HIGH or CRITICAL findings.",
          "Load test on an isolated copy of the stack: 27,000 of 27,000 requests succeeded over 30 minutes at about 15 requests per second, p95 323 ms, with 200 WebSocket clients connected and no errors.",
          "Fault tests on the same copy: all 200 WebSocket clients recovered from an API shutdown in 3.7 s and resynchronized after a Redis outage in 4.5 s.",
          "A full database restore matched every table and row count.",
        ],
      },
    ],
    limitations: [
      "Single host, with no disaster-recovery site.",
      "Zero downtime is not claimed: the 2.8.1 rollout recorded two short readiness timeouts.",
      "Load figures cover anonymous price reads and live streams, not authenticated admin traffic.",
      "The scheduled feed job depends on GitHub’s cron, which has delayed runs by hours.",
    ],
  },
  {
    slug: "dolphin-crm",
    name: "Dolphin CRM",
    localName: "دلفین",
    logo: { src: "/images/projects/dolphin-logo.webp", width: 240, height: 202 },
    accent: "#2f9bff",
    role: "Co-founder · Lead developer & IT lead",
    category: "Backend · Security · Production operations",
    period: "2026 — Present",
    stage: "production",
    status: "In use at 2+ companies",
    repo: "Dolphin",
    summary:
      "A Persian-first CRM/ERP for sales, quotations and invoicing, payments, inventory, telephony, and after-sales. One codebase is deployed separately for each customer, and each installation runs as its own isolated Docker Compose stack.",
    highlights: [
      "Lead the engineering of the Django and PostgreSQL application: 46 feature flags, a right-to-left interface, and server-sent live updates.",
      "Designed the deployment model: an isolated stack per installation, a signed feature manifest that fails closed, and non-superuser database roles with per-table grants.",
      "Built the operations tooling: scripted deploy and rollback, a maintenance write-stop, and backups that are verified by restoring them.",
    ],
    facts: [
      { value: "2+", label: "Companies using it" },
      { value: "1 stack", label: "Isolated per customer" },
      { value: "46", label: "Per-customer feature flags" },
      { value: "3,600+", label: "Automated tests" },
    ],
    screenshots: [
      {
        thumb: "/images/projects/dolphin-dashboard-800.webp",
        full: "/images/projects/dolphin-dashboard.webp",
        width: 1600,
        height: 813,
        alt: "Dolphin CRM dashboard in light mode with tiles for customers, leads, sales, after-sales cases, and receivables, and gauges for conversion and collection rates.",
        caption: "Platform dashboard: sales, leads, and after-sales at a glance",
      },
      {
        thumb: "/images/projects/dolphin-leads-800.webp",
        full: "/images/projects/dolphin-leads.webp",
        width: 1600,
        height: 816,
        alt: "Dolphin CRM leads board in dark mode with three status columns (awaiting completion, completed, cancelled); each card shows the lead, owner, source, and next follow-up date. Demo data.",
        caption: "Leads board by status (demo data)",
      },
    ],
    factsSource: "Customer count as of October 2026. Tests run on SQLite and PostgreSQL 16, plus browser tests.",
    tools: [
      { name: "Django", brand: "siDjango" },
      { name: "Python", brand: "siPython" },
      { name: "PostgreSQL", brand: "siPostgresql" },
      { name: "Docker Compose", brand: "siDocker" },
      { name: "Nginx", brand: "siNginx" },
      { name: "Gunicorn", brand: "siGunicorn" },
      { name: "Asterisk", brand: "siAsterisk" },
      { name: "Selenium", brand: "siSelenium" },
      { name: "GNU Bash", brand: "siGnubash" },
    ],
    links: [{ label: "Source code", href: `${GH}/Dolphin`, primary: true }],
    architecture: {
      caption: "Request path and the services around it in one installation.",
      steps: [
        { name: "Browser", detail: "Server-rendered RTL panel with ES modules; no build step at deploy time." },
        { name: "Nginx", detail: "TLS, static files, and a reversible write-stop that rejects POST, PUT, PATCH, and DELETE during maintenance." },
        { name: "Django (Gunicorn)", detail: "Every request is checked against the feature manifest, the user’s role permissions, and record-level scope." },
        { name: "PostgreSQL 17", detail: "Accessed with a non-superuser role and exact per-table grants; no DELETE on financial tables, insert-only audit tables." },
        { name: "Side services", detail: "Realtime (LISTEN/NOTIFY → server-sent events), an integrations worker (outbox, webhooks, Asterisk, SMS), and a backup scheduler." },
      ],
    },
    caseStudy: [
      {
        title: "Problem and requirements",
        items: [
          "One codebase deployed separately for each customer, with no customer-specific code branches.",
          "Feature availability, role permissions, and record-level scope are independent controls, and turning a feature off never deletes data.",
          "Installations may be offline: images are transferred to servers that cannot reach package registries.",
        ],
      },
      {
        title: "Architecture",
        items: [
          "Django 5.2 and Django REST Framework on Python 3.13, Gunicorn, Nginx, and PostgreSQL 17. There is no Redis or Celery; background work runs in dedicated worker containers.",
          "Live updates use PostgreSQL LISTEN/NOTIFY and server-sent events. Events carry no data, so the browser re-fetches through the permission-checked API.",
        ],
      },
      {
        title: "Installation isolation",
        items: [
          "Each installation is its own Compose project with its own database, backup volume, secrets, feature manifest, and hostname.",
          "The deploy script refuses to run if two stacks share a database volume, a rule added after a real catalog-corruption incident.",
        ],
      },
      {
        title: "Feature configuration",
        items: [
          "46 feature flags (22 on by default) are declared with their dependencies.",
          "In production, enabled features come from an Ed25519-signed manifest, and the application refuses to start if it is missing, altered, or signed by an unknown key.",
        ],
      },
      {
        title: "Database privilege separation",
        items: [
          "A superuser account is used only by one-shot setup jobs: db-bootstrap → migrate → db-finalize must finish before the web service starts.",
          "Migrations, the running application, and backups each use a separate non-superuser role with per-table grants.",
        ],
      },
      {
        title: "Deployment and rollback",
        items: [
          "deploy.sh runs preflight checks, records the previous image, provisions roles, takes a backup, migrates, applies grants, starts services, and reloads Nginx.",
          "--rollback redeploys the previous image; migrations are additive, so rolling back the code does not require reversing the schema.",
        ],
      },
      {
        title: "Backup restoration",
        items: [
          "Backups are pg_dump archives with SHA-256 checksums. A verification job restores them in a container with networking disabled.",
          "A weekly restore drill runs automatically, and off-host copies are encrypted and verified after transfer.",
        ],
      },
      {
        title: "Verified development outcomes",
        items: [
          "Release 2.40.55 on 15 October 2026; about 3,640 automated tests pass on both SQLite and PostgreSQL 16, plus 23 browser tests.",
          "56 tagged releases in the 2.40 line, each with a changelog entry.",
          "Application and job containers run read-only, with all capabilities dropped and no-new-privileges.",
        ],
      },
    ],
    limitations: [
      "The signed manifest makes feature changes fail closed and detectable, but its trusted public keys are read from the host’s environment file. Someone with full control of the host could add their own key, so it protects against accidental or casual changes, not against the host owner.",
      "Python source inside the image is readable, and there is no licence expiry or online activation by design.",
      "No point-in-time recovery: the recovery point is the backup interval, six hours by default.",
      "Telephony (Asterisk/FreePBX) and SMS integrations are implemented and tested against simulated systems; live validation is pending.",
    ],
  },
  {
    slug: "stackplore",
    name: "Stackplore",
    accent: "#84bc9c",
    role: "Author & sole engineer",
    category: "Platform engineering · DevOps tooling",
    period: "2026 — Present",
    stage: "development",
    status: "Pre-1.0, in active development",
    repo: "Stackplore",
    summary:
      "A self-hosted workspace that brings Docker and Kubernetes inventory, health, topology, logs, metrics, and events into one versioned API and an English/Persian interface. It is read-only by default and built for troubleshooting, not as a control plane.",
    highlights: [
      "Designed and built the Go API, PostgreSQL schema, provider adapters, and the React interface from one OpenAPI contract.",
      "Kept access least-privilege: Docker through a read-only mTLS proxy, Kubernetes through get/list RBAC in the namespaces you choose.",
      "CI exercises the providers against a real Docker Engine and a kind cluster, not only fixtures.",
    ],
    facts: [
      { value: "Docker + K8s", label: "Sources in one view" },
      { value: "Read-only", label: "Access by default" },
      { value: "EN / FA", label: "Interface languages" },
      { value: "Apache-2.0", label: "Open-source license" },
    ],
    factsSource: "From the repository, October 2026.",
    tools: [
      { name: "Go", brand: "siGo" },
      { name: "PostgreSQL", brand: "siPostgresql" },
      { name: "Kubernetes", brand: "siKubernetes" },
      { name: "Docker", brand: "siDocker" },
      { name: "Helm", brand: "siHelm" },
      { name: "OpenAPI", brand: "siOpenapiinitiative" },
      { name: "React", brand: "siReact" },
      { name: "TypeScript", brand: "siTypescript" },
    ],
    links: [{ label: "Source code", href: `${GH}/Stackplore`, primary: true }],
    architecture: {
      caption: "One Go application with the interface embedded, reading from providers into PostgreSQL.",
      steps: [
        { name: "Browser", detail: "React interface in English and Persian, using a client generated from the OpenAPI contract." },
        { name: "Go application", detail: "Serves the embedded UI and the /api/v1 API with local accounts, CSRF checks, and server-sent event streams." },
        { name: "Collection workers", detail: "Bounded in-process workers poll providers on a schedule. Requests read stored data and never trigger collection." },
        { name: "Providers", detail: "Docker through an mTLS proxy that allows only fixed read endpoints; Kubernetes through client-go with get/list RBAC; a deterministic demo source." },
        { name: "PostgreSQL", detail: "Normalized observations, alerts, notification outbox, and audit log, under 14 forward-only migrations." },
      ],
    },
    caseStudy: [
      {
        title: "Implemented and tested",
        items: [
          "Inventory, health, topology, logs, current and historical metrics, and events for Docker, Kubernetes, and a demo source.",
          "Local accounts with Argon2id hashing, opaque sessions, CSRF checks, and re-authentication for high-risk actions.",
          "Alerts with in-app notifications and opt-in webhook and Matrix delivery.",
          "Guarded restart and scale actions, all off by default.",
        ],
      },
      {
        title: "In progress (0.7.0)",
        items: [
          "A single non-root image that serves both the interface and the API.",
          "CI checks for a fresh Compose install and a Helm install on kind with TLS to PostgreSQL; results are not recorded yet.",
        ],
      },
      {
        title: "Planned before 1.0",
        items: [
          "Backup, restore, upgrade, and rollback drills on a real production target.",
          "Published images with an SBOM, vulnerability scans, and signing.",
          "A full accessibility and performance review.",
        ],
      },
      {
        title: "Security",
        items: [
          "Direct Docker socket access is allowed only in local development; production uses the restricted proxy.",
          "The Helm chart grants get/list only in the listed namespaces and never reads Secrets or ConfigMaps.",
          "The container runs as UID 10001 with a read-only root filesystem and all capabilities dropped.",
        ],
      },
      {
        title: "Testing",
        items: [
          "CI runs the Go tests with the race detector against PostgreSQL 17, the web tests, Compose and Helm checks, and provider tests against a real Docker Engine and a kind cluster.",
        ],
      },
    ],
    limitations: [
      "Not production-ready: 1.0 requires the production-target drills listed above.",
      "Runs as a single replica; images are built from source and not yet published.",
    ],
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
