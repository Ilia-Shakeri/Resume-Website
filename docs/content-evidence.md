# Content evidence

Every public-facing claim on the site, where it comes from, and how well it is verified.
Content lives in `src/content/*.ts`; change it there.

**Status key:** ✅ verified in a primary source · 📄 from the résumé only (self-reported, not independently verifiable) · ⏳ time-sensitive, needs confirmation · ❌ excluded from the site

Sources:
- **CV** = `references/Main Resume.pdf` (about six months old).
- **GH:<repo>/<path>** = file in `github.com/Ilia-Shakeri/<repo>` as of 13 Oct 2026.
- **GH profile** = `get_me` API: name, email, bio.

## Identity and contact

| Claim | Source | Status |
| --- | --- | --- |
| Name Ilia Shakeri | CV, GH profile | ✅ |
| Email iliashkr@gmail.com | CV, GH profile, commit author email | ✅ |
| GitHub `Ilia-Shakeri`, LinkedIn `ilia-shakeri` | CV, prompt | ✅ (LinkedIn URL not fetched) |
| Tehran, Iran; open to remote roles | CV header; confirmed by Ilia, 13 Oct 2026 | ✅ |
| Time zone IRST, UTC+03:30 | Derived from location (Iran has no DST since 2022) | ⏳ (follows location) |
| Persian native, English professional working | CV | 📄 |
| Piano, 10+ years; open-source interest | CV "Interests" | 📄 |
| Phone number | CV | ❌ deliberately not published |

## Experience

| Claim | Source | Status |
| --- | --- | --- |
| DevOps Engineer, OTICAMP, Jun 2025 — Present, Tehran | CV; current employment confirmed by Ilia, 13 Oct 2026 | ✅ |
| Provisioned/hardened Linux VPS; Ansible playbooks | CV | 📄 |
| Prometheus, Grafana, Loki stack | CV | 📄 |
| ChatOps with n8n linking Jira, Prometheus, Matrix | CV; workflows published in GH:n8n-prometheus-matrix-bridge, GH:jira2matrix-notifier-n8n | ✅ workflows exist; 📄 employer context |
| Keycloak deployment | CV | 📄 |
| "Reduced incident response time by 40%" | CV | ❌ excluded — no measurement method or data available |
| "99.9% uptime" | CV | ❌ excluded — no monitoring data available |
| Freelance DevOps & Linux Administrator, Dec 2024 — Jun 2025, remote | CV | 📄 |
| Freelance: Bash maintenance/backup/log-rotation scripts, security audits, firewall + TLS, Nginx/Apache tuning | CV; related public scripts (Automated-Backup-Script, LinSecGuard, EasyCert, SysTrack) | 📄 / partially ✅ |
| "Product & Platform Engineering — Independent projects, 2026 — Present" | Commit history of Dolphin and Nerkhbaan (sole author); framing confirmed by Ilia, 13 Oct 2026 | ✅ |

## Featured projects

### Dolphin CRM

| Claim | Source | Status |
| --- | --- | --- |
| Persian-first CRM/ERP: sales, billing, inventory, telephony, after-sales | GH:Dolphin/README.md | ✅ |
| One codebase; each installation an isolated Compose stack | GH:Dolphin/README.md "Why it's built this way" | ✅ — per-customer framing toned down at Ilia's request (13 Oct 2026) |
| Sole engineer | `git log` — 400/400 commits by Ilia Shakeri | ✅ (authorship; tooling assistance not distinguished) |
| Signed Ed25519 manifest; production refuses to start without a verifying manifest | GH:Dolphin/common/deployment/manifest.py; compose.yml comments | ✅ |
| Four PostgreSQL logins; db-bootstrap → migrate → db-finalize before web | GH:Dolphin/docs/ops/DOLPHIN_DEPLOYMENT_RUNBOOK.md "PostgreSQL role split"; compose.yml | ✅ |
| Images referenced by sha256 digest, built from tagged commit | compose.yml (`repository@sha256:digest` requirement); DOLPHIN_PROJECT_HANDOFF.md §1 | ✅ |
| deploy.sh: ordered backup/migrate/grant/nginx, `--rollback` | GH:Dolphin/scripts/deploy.sh header | ✅ |
| Nginx write-stop for POST/PUT/PATCH/DELETE | GH:Dolphin/nginx/write-stop-on.conf | ✅ |
| Backups checksummed, restore-verified with networking disabled | compose.restore-verify.yml (`network_mode: none`), scripts/verify-postgres-restore.sh | ✅ |
| Containers read-only, cap_drop ALL, no-new-privileges | compose.yml | ✅ |
| v2.40.42, October 2026 | VERSION; handoff doc dated 2026/10/13 | ✅ |
| "about 3,500 automated tests" | README "about 3,510 non-browser tests as of 2.40.42" | ✅ (repo's own statement; suite not run here) |
| Customer names | Ops docs mention a specific SMS provider/customer setup | ❌ deliberately not published |

### Nerkhbaan

| Claim | Source | Status |
| --- | --- | --- |
| Gold, currency, crypto price platform; FastAPI, PostgreSQL+TimescaleDB, Redis, Nginx; web/admin/desktop | GH:Nerkhbaan/README.md, README.developer.md, docs/external-price-worker.md | ✅ |
| Prices carry source time and expire | README "Read prices correctly" | ✅ |
| Sole engineer | `git log` — 200/200 commits | ✅ |
| CI jobs: builds, unit, Go, Compose, browser e2e, repository security, Trivy image scans; TimescaleDB/Redis integration with idempotent migrations and lease handover | GH:Nerkhbaan/.github/workflows/ci.yml | ✅ |
| Hash-pinned Python locks, pip-audit | README "Dependency maintenance"; ci.yml | ✅ |
| Readiness checks DB/Redis/pricing; port 8000 internal | README "Production" | ✅ |
| 8 Prometheus alert rules (listed) | GH:Nerkhbaan/monitoring/rules/nerkhbaan.yml | ✅ |
| Signed external workers; sidecar holds no DB/admin credentials | docs/external-price-worker.md | ✅ |
| Admin: own session cookies, CSRF, permissions, reauth, TOTP MFA | README "Authentication and panel" | ✅ |
| 2.8.1 live on nerkhbaan.ir with two API replicas | PROJECT_STATUS.md (12 Oct 2026) | ✅ per repo record; ⏳ site not reachable from this session |
| Run 38222923015 passed 15/15 jobs; zero HIGH/CRITICAL image findings | PROJECT_STATUS.md | ✅ per repo record (run page not opened from here) |
| "zero downtime is not claimed" | PROJECT_STATUS.md | ✅ |

### Prometheus & Jira → Matrix bridges

| Claim | Source | Status |
| --- | --- | --- |
| Alertmanager → n8n → Matrix, HTML firing/resolved, Prometheus deep link | GH:n8n-prometheus-matrix-bridge/README.md, MAIN.json | ✅ |
| Jira assignments/@mentions → Matrix DMs; room discovery/creation; cached IDs | GH:jira2matrix-notifier-n8n/README.md, Main.json | ✅ |
| Token whoami validation, renew on 401, backoff + jitter on 429 | Both READMEs | ✅ |
| Résumé's "enterprise-grade" / "self-healing" wording | READMEs, CV | Toned down on the site to concrete mechanisms |

## Secondary projects

| Project | Claims used | Source | Status |
| --- | --- | --- | --- |
| Stackplore | Docker/K8s explorer; Go, PostgreSQL, Helm, OpenAPI; in active development; non-root images | README, deploy/helm, deploy/Dockerfile.* | ✅ |
| Matrix User Manager | Whiptail TUI; auto-detect containers; reads homeserver.yaml; PostgreSQL/SQLite; backups | README | ✅ |
| LinSecGuard | SSH, UFW, services, permissions, ports, failed logins, updates | README | ✅ |
| EasyCert | Local CA, wildcard/subdomain certs, Nginx/Traefik restart | README | ✅ |
| CipherCert | Electron/React + FastAPI; chain/expiry; grading; SQLite history | README | ✅ |
| SysTrack | CPU/RAM/disk/network; email alerts; log rotation; cron | README | ✅ |

## Toolkit

73 tools in 8 groups (`src/content/practice.ts`). Brand icons are from Simple Icons (CC0). Tools without a Simple Icons entry (systemd, LVM, NFS, Make, Loki, UFW/iptables, Active Directory, SQL, Playwright) use a neutral glyph.

| Group | Tools | Evidence |
| --- | --- | --- |
| Linux & infrastructure | Linux, Ubuntu, CentOS, LVM, NFS, Terraform, Ansible | CV (📄; Terraform/Ansible have no public repo) |
| | Alpine Linux, systemd | Alpine-based images in Dolphin/Nerkhbaan/this site's Compose files; systemd units in Nerkhbaan `infra/price-worker` and this repo's `deploy/` |
| Containers & orchestration | Docker, Compose, Swarm, Kubernetes, Helm | CV; Compose in Dolphin, Nerkhbaan, Stackplore; Helm chart in Stackplore |
| Delivery & automation | GitHub Actions, GitLab CI/CD, Git, GitHub, n8n, GNU Bash, Make | CV; workflows in Nerkhbaan/Stackplore; ChatOps repos; Bash tools; Makefiles in Stackplore/Tabdil-Bot |
| Monitoring & observability | Prometheus, Alertmanager, Grafana, Loki, Elasticsearch, Logstash, Kibana | CV (ELK, Loki 📄); Nerkhbaan `monitoring/` (Prometheus, Alertmanager, Grafana) |
| Web, network & security | Nginx, Apache, Traefik, Caddy, OpenSSL, Let's Encrypt, Keycloak, Trivy, UFW/iptables, Active Directory | CV; Caddy in Nitro-Bot; Let's Encrypt on the Nerkhbaan host; Trivy in Nerkhbaan CI; EasyCert/LinSecGuard; Active Directory from the GitHub profile README (📄) |
| Data & messaging | PostgreSQL, TimescaleDB, MySQL, MariaDB, Galera Cluster, Redis, SQLite, RabbitMQ, MinIO | CV; TimescaleDB in Nerkhbaan; MariaDB in Clockwork; MinIO in Nitro-Bot |
| Languages & frameworks | Python, Go, TypeScript, JavaScript, SQL, FastAPI, Django, Flask, SQLAlchemy, Pydantic, Gunicorn, React, Next.js, Node.js, Vite, Tailwind CSS, Electron, OpenAPI, pytest, Playwright, Selenium | Repos: Nerkhbaan (FastAPI, SQLAlchemy, Pydantic, React, Vite, Tailwind, Electron, Playwright), Dolphin (Django, Gunicorn, Selenium), Stackplore (Go, OpenAPI), ZoodSub/keshepool (Next.js), CipherCert (Electron, FastAPI), Music-Inline-Bot (pytest); Flask from the Naharestan repository description (metadata only) |
| Collaboration & ChatOps | Matrix, Element, Jira, Telegram Bot API, Asterisk/FreePBX | CV; ChatOps repos; Telegram bots (Nitro-Bot, Tabdil-Bot, Music-Inline-Bot, ZoodSub); Dolphin telephony integration |

## Live elements

| Element | What it shows | Source |
| --- | --- | --- |
| Hero terminal | `curl …/build.txt` → the commit the page was built from; `docker compose ps` → `iliashakeri-web-1 Up (healthy)`; `systemctl is-active iliashakeri-update.timer` | Real deployment (docs/deployment.md). The SHA is read at build time, so it matches `/build.txt`; the container/timer lines are replayed, not polled live. |
| `whoami` panel | Profile fields and the current time in Tehran | Profile data; the clock runs in the visitor's browser |
| DevOps loop | The eight DevOps stages | Illustration, no data |

## Education and training

| Claim | Source | Status |
| --- | --- | --- |
| B.Sc. Computer Science, in progress since Oct 2026, no institution shown | Confirmed by Ilia, 13 Oct 2026 | ✅ (self-reported) |
| Doctor of Veterinary Medicine (DVM), Islamic Azad University | CV | ❌ removed from site and résumé at Ilia's request |
| DevOps for Intermediates, CanDo IT Academy, issued 23 Feb 2026 (course 12 Jun 2025 – 1 Jan 2026), Cert ID 04/30289 | `references/DevOps For Intermediates.jpg` | ✅ certificate file; published at `/certificates/cando-devops-intermediates.webp` |
| DevOps for Beginners, CanDo IT Academy, issued 20 Jul 2025 (course 10 Jan – 10 Jun 2025), Cert ID 02/20889 | `references/DevOps For Beginners.jpg` | ✅ certificate file; published |
| LPIC-1 training course, CanDo IT Academy, issued 29 Jan 2025 (course 22 Oct 2024 – 21 Jan 2025), Cert ID 03/17758 | `references/LPIC1.pdf` — a CanDo "Certificate of Excellence" for completing the requirements for "Linux Professional Institute Certification 1" | ✅ as a **course**. The document is issued by CanDo, not LPI (no LPI ID or verification code), so it is not presented as an LPI certification. Ilia chose this labelling on 13 Oct 2026. |
| LPIC-2 training course, TOSINSO, Jun 2025 | CV only; no certificate file | 📄 shown as a course, without a certificate link |
| "Security-focused DevOps Engineer (Certified)" | CV summary | ❌ excluded — no certification identified |

## Ranking of project candidates

Scored 1–5 per criterion; stars and popularity were not used.

| Project | Depth | DevOps/SRE relevance | Recency | Personal contribution | Evidence quality | Architecture clarity | Case-study fit | Total |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Dolphin CRM | 5 | 5 | 5 | 5 | 5 | 5 | 5 | **35** |
| Nerkhbaan | 5 | 5 | 5 | 5 | 5 | 4 | 5 | **34** |
| ChatOps bridges (2 repos) | 3 | 5 | 3 | 5 | 4 | 4 | 4 | **28** |
| Stackplore | 4 | 4 | 5 | 5 | 3 (pre-1.0) | 4 | 3 | 28 |
| Matrix User Manager | 2 | 4 | 3 | 5 | 4 | 3 | 2 | 23 |
| LinSecGuard | 2 | 4 | 2 | 5 | 3 | 2 | 2 | 20 |
| EasyCert | 2 | 3 | 3 | 5 | 3 | 2 | 2 | 20 |
| CipherCert | 3 | 3 | 4 | 5 | 3 | 3 | 2 | 23 |
| SysTrack | 1 | 3 | 2 | 5 | 3 | 2 | 1 | 17 |
| Telegram bots (ZoodSub, Nitro-Bot, Tabdil, Music, keshepool) | 2–3 | 2 | 4–5 | 5 | 3 | 3 | 1 | ≤21 |

Stackplore ties with the ChatOps bridges on total but was placed in the secondary grid because its README says 1.0 work is unfinished; the ChatOps work is complete and matches the résumé's main achievement.

## Unresolved questions

See `TODO_CONTENT.md`.
