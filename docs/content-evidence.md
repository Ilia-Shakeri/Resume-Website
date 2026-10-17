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
| Telegram `@ilia_ssh` | Given by Ilia for publication, 17 Oct 2026 | ✅ (t.me not reachable from this environment) |
| "DevOps Engineer & Full-Stack Developer"; development mostly backend (Python/FastAPI/Django, Go), sometimes frontend (React, Next.js) | Stated by Ilia, 17 Oct 2026; matches repos: FastAPI and React in Nerkhbaan, Django in Dolphin, Go in Stackplore and the Nerkhbaan sidecar, Next.js in ZoodSub/keshepool | ✅ |
| Computer Science student (B.Sc.) | Confirmed by Ilia, 13 Oct 2026 (see Education) | ✅ |
| Open to remote DevOps, backend & full-stack roles | Remote availability confirmed 13 Oct 2026; role types widened with the full-stack title, 17 Oct 2026 | ✅ |

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
| Founder · Nerkhbaan, 2026 — Present | Stated by Ilia, 17 Oct 2026; GH:Nerkhbaan commit history (sole author) | ✅ self-reported role |
| Co-founder · Dolphin CRM, 2026 — Present | Stated by Ilia, 17 Oct 2026; GH:Dolphin commit history | ✅ self-reported role; co-founders not named (no approval) |
| Engagement types: Employment (OTICAMP), Own product (Nerkhbaan), Co-founded product (Dolphin), Freelance | Derived from the rows above | ✅ no full-time or part-time arrangement is stated, because none is known |
| Headline "DevOps & Backend Engineer" | Ilia's positioning brief, 17 Oct 2026; matches the evidence above | ✅ no seniority title is claimed |

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
| v2.40.55, October 2026 | VERSION | ✅ |
| "3,510 automated tests" | README "about 3,510 non-browser tests" | ✅ (repo's own statement; suite not run here) |
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

### Re-verification for the featured case studies — 17 Oct 2026

The three featured projects were re-checked against their repositories on 17 Oct 2026: Nerkhbaan at `main@025ccbb`, Dolphin at `main@023012e`, and Stackplore at `main@1a39e78`. The site was corrected where the earlier wording was out of date or too strong.

**Nerkhbaan**

| Site figure / claim | Source | Note |
| --- | --- | --- |
| "2.8.1 · Live release" | PROJECT_STATUS.md L3, L31; README (target checked 2026-10-12 and, at tag v2.8.6, 2026-10-17) | Tags v2.8.2–v2.8.6 exist but are not deployed; the site says *live* release, not latest |
| "117 · API paths (OpenAPI)" | PROJECT_STATUS.md L12 "Generated API contracts cover 117 paths" | Was "API routes"; there are 124 operations |
| "15/15 · CI jobs passed" | PROJECT_STATUS.md L22–25, run 38222923015; ci.yml has 8 jobs plus a 7-image Trivy matrix | |
| "323 ms · p95 in a 30-min load test" | PROJECT_STATUS.md L57–73: 27,000/27,000 HTTP 200, 14.998 req/s, p95 323.249 ms, 200 WebSockets, 0 errors | Ran on an isolated copy of the stack on one host, anonymous reads only; the site states this scope |
| Fault recovery 3.7 s / 4.5 s | Same record, attempt `219409486950` | The first combined fault run failed (a test-harness bug) and is kept as failed in the repository |
| Full restore matched every table and row | PROJECT_STATUS.md L44–47 | |
| Freshness wording | `app/pricing/models.py` L678–689 | Was "expires instead of going stale"; quotes go stale *then* expire |
| Readiness | `app/health.py` L141 | Gates on database + migrations; Redis and refresh health are reported only |
| Monitoring | `monitoring/rules/nerkhbaan.yml` (8 rules), promtool in CI | Production use is not documented, so the site says the rules are validated in CI and no longer says "Prometheus alerting in production" |
| Not published | — | Server paths, subnets, IPs, user count, provider names, and the co-hosted services |

**Dolphin CRM**

| Site figure / claim | Source | Note |
| --- | --- | --- |
| "46 · Feature flags" (22 on by default) | `common/deployment/registry.py` FEATURE_DEPENDENCIES at HEAD | Was 40 |
| "3,641 · Automated tests" | DOLPHIN_PROJECT_HANDOFF.md §5 (SQLite and PostgreSQL 16, before the 2.40.55 build), plus 23 browser tests | Was "3,510" (the README figure as of 2.40.42) |
| "56 · Tagged releases" | `git tag`: v2.40.0–v2.40.55 | Was 57; the 57th tag is a release candidate |
| "3 · Non-superuser DB roles" | `scripts/bootstrap-postgres.sh` | Was "4 scoped roles"; the setup role is an existing superuser, used only by one-shot jobs |
| Signed manifest threat model | `common/deployment/manifest.py`, `config/settings.py` L329–348; BACKEND_SPEC "Honest limit" | Trusted keys come from the host `.env`, so the site states it does not protect against the host owner |
| Image digests | Dockerfile, `scripts/deploy.sh` | Only base images are pinned by digest; the "images by digest" claim was removed |
| Hardened containers | compose.yml | Scoped to application and job containers (not db or nginx) |
| Integrations | `telephony/`, `communications/sms.py`; roadmap §8 | Described as implemented and tested against simulated systems |
| Not published | — | Customer and staging names, server IP and SSH details, the SMS vendor, key IDs, and open customer security tasks |

**Stackplore** (newly featured)

| Site figure / claim | Source |
| --- | --- |
| "47 · OpenAPI paths" | `contracts/openapi.yaml` (OpenAPI 3.1.0, version 0.7.0) |
| "14 · Forward-only migrations" | `apps/api/postgresmigrations/000001…000014` |
| "6 · CI jobs" | `.github/workflows/ci.yml`: code, deploy, compose-install, helm-install, docker-provider, kubernetes-provider |
| "v0.6.0 · Latest tag"; 0.7.0 in progress | `git tag`; CHANGELOG 0.7.0; README status line |
| Implemented / in progress / planned lists | README "Implemented" and "Still required for 1.0"; roadmap; CHANGELOG |
| Security | `deploy/Dockerfile.api` (UID 10001), Helm `cluster-reader.yaml` (get/list only), `compose.docker.yaml` (mTLS proxy) |

The site does not claim a 0.7.0 release, published images, production readiness, or a hosted demo.

**Authorship.** All three repositories have a single human author (Ilia). Most Dolphin commits carry AI co-author trailers, and Nerkhbaan's branch names suggest AI tooling. The site makes no claim either way; see TODO_CONTENT.md.

**Logos** are the products' own marks: Dolphin `docs/brand-source/logos/DarkMode_Logo.png`, Nerkhbaan `apps/web/src/logo/logo.png`.

### Persian version (`/fa/`)

`src/content/fa/*` translates the English content claim for claim; it adds no facts. Tool, product, and protocol names stay in Latin script. Dates are Gregorian months written in Persian. The résumé PDF and `/resume/` stay in English. The Persian download button says so.

### Prometheus & Jira → Matrix bridges

| Claim | Source | Status |
| --- | --- | --- |
| Alertmanager → n8n → Matrix, HTML firing/resolved, Prometheus deep link | GH:n8n-prometheus-matrix-bridge/README.md, MAIN.json | ✅ |
| Jira assignments/@mentions → Matrix DMs; room discovery/creation; cached IDs | GH:jira2matrix-notifier-n8n/README.md, Main.json | ✅ |
| Token whoami validation, renew on 401, backoff + jitter on 429 | Both READMEs | ✅ |
| Résumé's "enterprise-grade" / "self-healing" wording | READMEs, CV | Toned down on the site to concrete mechanisms |

## More projects

Cards show a kind (for example "Bash CLI"), a one-sentence summary, and two or three points, all taken from the claims below. The ChatOps bridges card uses the claims in the section above. Clockwork links both public repositories (CLI and desktop).

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
| About terminal ("REPLAY") | `curl …/build.txt` → the commit the page was built from; `docker compose ps` → `iliashakeri-web-1 Up (healthy)`; `systemctl is-active iliashakeri-update.timer` | Real deployment (docs/deployment.md). The SHA is read at build time, so it matches `/build.txt`. The container and timer lines are a replay, and both the badge and the caption say so; it is not shown as live telemetry. |
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

## Portrait

`public/images/ilia-shakeri.webp`: a photo Ilia supplied and approved for the site on 17 Oct 2026. It is cropped to 640×640 and re-encoded as WebP with no EXIF, GPS or XMP metadata (21 KB), and it is referenced in the JSON-LD `image`. It is shown as a mint duotone that turns to full colour on hover.
