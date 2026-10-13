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
| Tehran, Iran; open to remote roles | CV header | ⏳ |
| Time zone IRST, UTC+03:30 | Derived from location (Iran has no DST since 2022) | ⏳ (follows location) |
| Persian native, English professional working | CV | 📄 |
| Piano, 10+ years; open-source interest | CV "Interests" | 📄 |
| Phone number | CV | ❌ deliberately not published |

## Experience

| Claim | Source | Status |
| --- | --- | --- |
| DevOps Engineer, OTICAMP, Jun 2025 — Present, Tehran | CV | ⏳ current status not confirmed. A private repo named `OTIC-Clockwork-OrangeHRM` was pushed 2026-07-15, which is consistent with but does not prove continued employment. |
| Provisioned/hardened Linux VPS; Ansible playbooks | CV | 📄 |
| Prometheus, Grafana, Loki stack | CV | 📄 |
| ChatOps with n8n linking Jira, Prometheus, Matrix | CV; workflows published in GH:n8n-prometheus-matrix-bridge, GH:jira2matrix-notifier-n8n | ✅ workflows exist; 📄 employer context |
| Keycloak deployment | CV | 📄 |
| "Reduced incident response time by 40%" | CV | ❌ excluded — no measurement method or data available |
| "99.9% uptime" | CV | ❌ excluded — no monitoring data available |
| Freelance DevOps & Linux Administrator, Dec 2024 — Jun 2025, remote | CV | 📄 |
| Freelance: Bash maintenance/backup/log-rotation scripts, security audits, firewall + TLS, Nginx/Apache tuning | CV; related public scripts (Automated-Backup-Script, LinSecGuard, EasyCert, SysTrack) | 📄 / partially ✅ |
| "Product & Platform Engineering — Independent projects, 2026 — Present" | Commit history of Dolphin (from 2026-08-09) and Nerkhbaan (from 2026-05-11), sole author | ✅ authorship; ⏳ **framing** — if these were built for an employer or client, rename the entry (see TODO_CONTENT.md) |

## Featured projects

### Dolphin CRM

| Claim | Source | Status |
| --- | --- | --- |
| Persian-first CRM/ERP: sales, billing, inventory, telephony, after-sales | GH:Dolphin/README.md | ✅ |
| One codebase, deployed separately per customer | GH:Dolphin/README.md "Why it's built this way" | ✅ |
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

| Tool | Evidence |
| --- | --- |
| Linux VPS, LVM, NFS, Ubuntu/CentOS | CV |
| Terraform | CV, GH profile README — **no public repository uses it** (📄) |
| Ansible | CV, GH profile README (📄; no public playbooks) |
| PostgreSQL, Redis | Dolphin, Nerkhbaan, Stackplore |
| TimescaleDB | Nerkhbaan |
| Docker, Compose | Dolphin, Nerkhbaan, Stackplore, many bots |
| Swarm | CV (📄) |
| Kubernetes, Helm | Stackplore Helm chart; CV, GH profile |
| GitHub Actions | Nerkhbaan (ci.yml, price-feed.yml), Stackplore |
| GitLab CI | CV (📄) |
| n8n | ChatOps repos |
| Make | Stackplore, Tabdil-Bot Makefiles |
| Prometheus, Alertmanager, Grafana | Nerkhbaan monitoring/; bridge repo |
| Loki, ELK | CV (📄) |
| Bash, Python, Go, SQL | Many repos; Go in Stackplore and Nerkhbaan price-feed-pull |
| Nginx, Traefik, OpenSSL | Dolphin/Nerkhbaan nginx; EasyCert |
| Keycloak | CV (📄) |
| Trivy | Nerkhbaan CI |
| UFW/iptables | LinSecGuard; CV |
| Matrix, Jira | ChatOps repos |

## Education and training

| Claim | Source | Status |
| --- | --- | --- |
| Doctor of Veterinary Medicine (DVM), Islamic Azad University | CV | 📄; dates not on CV, so none shown |
| "LPIC-2 training course", TOSINSO, Jun 2025 | CV lists "Linux Professional Institute Certification (LPIC-2), TOSINSO" | ⏳ shown as a **training course**, not an LPI-issued certification, until LPI exam status is confirmed |
| "LPIC-1 training course", CanDo, Jan 2025 | CV | ⏳ same as above |
| DevOps for Beginners & Intermediate, CanDo, 2025 | CV | 📄 |
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
