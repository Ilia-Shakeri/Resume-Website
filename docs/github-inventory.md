# GitHub inventory

Audit date: **13 Oct 2026**. Account: [`Ilia-Shakeri`](https://github.com/Ilia-Shakeri) (23 public repos per profile).

## How this was collected

| Step | Method | Result |
| --- | --- | --- |
| Enumerate repos | Claude Code `list_repos` (authenticated, `has_more: false`) and GitHub search `user:Ilia-Shakeri` (100 per page, `total_count: 28`) | 28 owned repos + 1 collaborator repo (`DanaKarimi/HermesKontor`). The full list fit on one page. |
| Read public repos | Shallow `git clone` (blob size limit 200 KB) into a scratch directory, plus full history for Dolphin, Nerkhbaan, and Stackplore | 23 public repos read: README, manifests, Compose files, workflows, ops docs. |
| Private repos | `git clone` refused (no credential for private repos in this session) | 5 private repos: **metadata only**, contents not read. |
| Organizations | No organization repositories were returned by either listing. | None found. |
| Live sites | `nerkhbaan.ir` and LinkedIn are blocked by this session's network policy | Not verified from here. |

`gh` was not authenticated in this session (`GH_TOKEN` invalid), so GitHub REST pagination was done through the GitHub MCP search tool instead.

## Legend

- **Relevance**: ★★★ featured case study · ★★ secondary card · ★ inventory only · — excluded
- Commit counts are from the cloned history (shallow clones cap at 50; marked `50+`).

## Owned repositories

| Repo | Vis. | Primary language | Created → last push | Commits | Fork / archived | Description and purpose | Engineering themes | Relevance |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| [Dolphin](https://github.com/Ilia-Shakeri/Dolphin) | public | HTML (Django/Python) | 2026-08-09 → 2026-10-13 | 400 | no / no | Persian-first, RTL CRM/ERP (sales, billing, inventory, telephony, after-sales), one codebase deployed per customer. v2.40.42. | Compose topology, signed Ed25519 feature manifest, four-role PostgreSQL least privilege, scripted deploy/rollback, Nginx write-stop, checksummed and restore-verified backups, ~3,510 tests | ★★★ |
| [Nerkhbaan](https://github.com/Ilia-Shakeri/Nerkhbaan) | public | Python | 2026-05-11 → 2026-10-13 | 200 | no / no | Gold/currency/crypto pricing platform; FastAPI, PostgreSQL+TimescaleDB, Redis; web, admin, Electron desktop; live at nerkhbaan.ir (per repo records). v2.8.1. | 9-job GitHub Actions CI, Trivy image gates, pip-audit, hash-locked deps, Prometheus/Alertmanager/Grafana, readiness probes, signed external workers, Go sidecar | ★★★ |
| [n8n-prometheus-matrix-bridge](https://github.com/Ilia-Shakeri/n8n-prometheus-matrix-bridge) | public | n8n JSON | 2025-12-07 | 5 | no / no | Alertmanager → n8n → Matrix with HTML formatting | Token check/renew, exponential backoff + jitter, ChatOps | ★★★ (combined card) |
| [jira2matrix-notifier-n8n](https://github.com/Ilia-Shakeri/jira2matrix-notifier-n8n) | public | n8n JSON | 2025-11-02 → 2025-12-07 | 9 | no / no | Jira assignments and @mentions → Matrix DMs | Webhook routing, cached DM rooms, self-healing auth | ★★★ (combined card) |
| [Stackplore](https://github.com/Ilia-Shakeri/Stackplore) | public | Go | 2026-07-27 → 2026-10-13 | 12 (tags v0.1.0, v0.2.0) | no / no | Self-hosted Docker/Kubernetes service explorer; README states it is not yet 1.0 | Go API, PostgreSQL migrations, Helm chart, non-root images, OpenAPI contract, CI | ★★ |
| [Matrix-User-Manager](https://github.com/Ilia-Shakeri/Matrix-User-Manager) | public | Shell | 2025-09-09 → 2025-09-27 | 17 | no / no | Whiptail TUI to manage Synapse users in Docker | Container auto-detection, PostgreSQL/SQLite, backups | ★★ |
| [LinSecGuard](https://github.com/Ilia-Shakeri/LinSecGuard) | public | Shell | 2025-03-06 | 5 | no / no | Interactive Linux hardening helper | SSH, UFW, permissions, failed logins, updates | ★★ |
| [EasyCert](https://github.com/Ilia-Shakeri/EasyCert) | public | Shell | 2025-08-26 | 6 | no / no | Local CA + wildcard certificate generator | OpenSSL, TLS, container restart | ★★ |
| [CipherCert-App](https://github.com/Ilia-Shakeri/CipherCert-App) | public | TypeScript + Python | 2026-02-08 → 2026-02-24 | 34 | no / no | Desktop TLS certificate analyzer (Electron/React + FastAPI) | TLS inspection, scoring, SQLite history | ★★ |
| [SysTrack](https://github.com/Ilia-Shakeri/SysTrack) | public | Shell | 2025-03-01 | 3 | no / no | Cron-driven resource monitor with email alerts | Monitoring, log rotation | ★★ |
| [Automated-Backup-Script](https://github.com/Ilia-Shakeri/Automated-Backup-Script) | public | Shell | 2025-02-26 | 5 | no / no | Interactive tar/zip backups with cron and 7-day cleanup | Backups, scheduling | ★ |
| [Clockwork-OrangeHRM-CLI](https://github.com/Ilia-Shakeri/Clockwork-OrangeHRM-CLI) | public | Shell | 2026-02-14 → 2026-02-17 | 17 | no / no | Extract work hours from self-hosted OrangeHRM (MariaDB) | DB querying, CLI tooling | ★ |
| [Clockwork-OrangeHRM-Desktop](https://github.com/Ilia-Shakeri/Clockwork-OrangeHRM-Desktop) | public | TypeScript | 2026-02-17 → 2026-02-25 | 16 | no / no | Electron attendance/payroll reporting for OrangeHRM | Multi-DB connectivity, exports | ★ |
| [Dolphin-Accounting](https://github.com/Ilia-Shakeri/Dolphin-Accounting) | public | JavaScript (Django) | 2026-09-08 | 3 | no / no | Early standalone accounting product paired with Dolphin CRM | Same deployment model as Dolphin; early stage | ★ |
| [ZoodSub](https://github.com/Ilia-Shakeri/ZoodSub) | public | TypeScript | 2026-06-08 → 2026-06-29 | 18 | no / no | Telegram Mini App for subscription sales | Next.js, FastAPI, Compose | ★ |
| [keshepool](https://github.com/Ilia-Shakeri/keshepool) | public | Python | 2026-06-12 → 2026-08-14 | 50+ (2 by another author) | no / no | Telegram Mini App store (premium accounts, VPN configs) | Compose, deploy/smoke scripts | — (product domain not suited to a DevOps portfolio) |
| [Nitro-Bot](https://github.com/Ilia-Shakeri/Nitro-Bot) | public | Python | 2026-06-17 → 2026-10-08 | 50+ | no / no | Pre-release Telegram music-distribution mini-app (`0.9.0-alpha`) | FastAPI, MinIO, Caddy, Compose | ★ |
| [Tabdil-Bot](https://github.com/Ilia-Shakeri/Tabdil-Bot) | public | HTML (Python) | 2026-08-18 → 2026-08-23 | 8 | no / no | "RightCut" Telegram media utility bot | Compose (local/prod), Alembic, Makefile | ★ |
| [Music-Inline-Bot](https://github.com/Ilia-Shakeri/Music-Inline-Bot) | public | Python | 2026-08-23 | 6 | no / no | Telegram inline music search bot | Compose, pytest | ★ |
| [Password-Generator](https://github.com/Ilia-Shakeri/Password-Generator) | public | Python | 2025-01-11 → 2025-01-23 | 4 | no / no | Tkinter password generator | — | — |
| [Password-Security-Checker](https://github.com/Ilia-Shakeri/Password-Security-Checker) | public | Python | 2025-01-23 | 3 | no / no | Tkinter password strength checker | — | — |
| [Ilia-Shakeri](https://github.com/Ilia-Shakeri/Ilia-Shakeri) | public | — | 2024-07-01 → 2026-02-15 | 28 | no / no | GitHub profile README | Lists Linux, K8s, Terraform, Ansible, n8n, Prometheus, Keycloak, Matrix, AD | ★ (skills cross-check) |
| [Resume-Website](https://github.com/Ilia-Shakeri/Resume-Website) | public | TypeScript | 2026-10-13 | — | no / no | This portfolio | — | n/a |
| Naharestan | **private** | Python | 2026-05-24 → 2026-10-10 | not read | no / no | Description (metadata): containerized lunch-reservation system, Flask, PostgreSQL, Redis, HTMX | Not inspected | — (private; needs approval) |
| Dolphin-Website | **private** | HTML | 2026-09-01 | not read | no / no | No description | Not inspected | — (private) |
| OTIC-Clockwork-OrangeHRM | **private** | TypeScript | 2026-02-26 → 2026-07-15 | not read | no / no | No description; name suggests employer-related work | Not inspected | — (private) |
| Nerkhbaan-web | **private** | TypeScript | 2026-05-30 → 2026-05-31 | not read | no / **archived** | No description; superseded by Nerkhbaan monorepo (assumption from name) | Not inspected | — (private, archived) |
| Alerta | **private** | Python | 2026-04-23 | not read | no / no | No description | Not inspected | — (private) |

## Collaborator repository

| Repo | Ownership | Notes | Relevance |
| --- | --- | --- | --- |
| [DanaKarimi/HermesKontor](https://github.com/DanaKarimi/HermesKontor) | Owned by DanaKarimi; push access only. All 8 commits by Dana Karimi. | Robot Framework/Selenium automation for DMB album creation. | — (not Ilia's authored work) |

## Deep-dive notes (strongest candidates)

### Dolphin CRM — featured
- **Problem:** one CRM for many customers; isolated data/secrets per deployment; feature licensing that a customer admin cannot alter.
- **Architecture:** `compose.yml` services `db`, `db-bootstrap`, `migrate`, `db-finalize`, `web`, `realtime`, `nginx`, plus profile-gated `backup`, `session-cleanup`, `scheduled-sms`, `score-recalculation`, `integrations-worker`, `backup-agent`. Internal `backend` network.
- **Decisions:** signed manifest (`common/deployment/manifest.py`, Ed25519); four PostgreSQL roles (`docs/ops/DOLPHIN_DEPLOYMENT_RUNBOOK.md` → "PostgreSQL role split"); image refs required to be `repository@sha256:digest`; `read_only`, `cap_drop: ALL`, `no-new-privileges`; Nginx rate limits and write-stop (`nginx/write-stop-on.conf`).
- **Operations:** `scripts/deploy.sh` (ordered upgrade, `--status`, `--rollback`), `compose.restore-verify.yml` (`network_mode: none`), `scripts/verify-postgres-restore.sh` (sha256 checks), 5,446-line runbook.
- **Contribution:** sole committer (400 commits, `iliashkr@gmail.com`).
- **Evidence of outcome:** `VERSION` 2.40.42; README "about 3,510 non-browser tests"; handoff doc describes deployment to a test server. No usage or customer metrics published.

### Nerkhbaan — featured
- **Problem:** trustworthy prices from unreliable sources; never present stale data as current; safe migrations on a live host.
- **Architecture:** `docker-compose.prod.yaml` services `postgres`, `redis`, `migrate`, `backend`, `price-feed-pull` (Go), `frontend`, `admin-frontend`, `telegram-worker`, `edge`, `db-backup`, `redis-exporter`, `prometheus`, `alertmanager`, `grafana`.
- **CI (`.github/workflows/ci.yml`):** node-builds, desktop-package, go-sidecar, python-unit, integration (TimescaleDB/Redis/migrations), compose, browser-e2e, repository-security, docker-images (Trivy, matrix).
- **Monitoring:** `monitoring/rules/nerkhbaan.yml` — 8 alert rules.
- **Contribution:** sole committer (200 commits).
- **Evidence of outcome:** `PROJECT_STATUS.md` (12 Oct 2026): 2.8.1 live, two API replicas, run 38222923015 passed 15/15 jobs, zero HIGH/CRITICAL image findings; explicitly does not claim zero downtime.

### ChatOps bridges — featured (combined)
- Two exported n8n workflows with setup guides. Cached tokens, `whoami` validation, re-login on 401, exponential backoff + jitter on 429, mention parsing, DM room cache.
- Matches the résumé's ChatOps work at OTICAMP; the repos themselves do not name the employer.

### Stackplore — secondary
- Go API + web app, PostgreSQL, Helm chart (`deploy/helm/stackplore`), non-root Dockerfiles, OpenAPI contracts. README status: active pre-1.0 work; not production-ready by its own statement, so it is presented as in development.

## Not accessed / limits

- Contents of 5 private repositories (listed above).
- LinkedIn profile (`www.linkedin.com` not resolvable from this session).
- Live sites (`nerkhbaan.ir` blocked by the session network policy).
- Organization repositories: none were returned; if Ilia belongs to organizations whose repos are not visible to this app installation, they were not scanned.
