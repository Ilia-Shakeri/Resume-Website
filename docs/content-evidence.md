# Content evidence

Every public-facing claim on the site, where it comes from, and how well it is verified.
Content lives in `src/content/*.ts`; change it there.

Entries retain their review dates. The 8 Nov 2026 DevOps-only brief and pinned Stackplore review below supersede older role-target and Stackplore snapshots; historical evidence is not a statement of current deployment or availability.

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

The October 2026 case study did not claim a 0.7.0 release, published images, production readiness, or a hosted demo. The release row is a separate dated public-repository lookup.

**Authorship.** The reviewed repository histories credit Ilia's engineering work. Roles on the site are based on his confirmation and the linked implementation evidence.

**Logos** are the products' own marks: Dolphin `docs/brand-source/logos/DarkMode_Logo.png`, Nerkhbaan `apps/web/src/logo/logo.png`.

### Card figures and screenshots — 17 Oct 2026 (second review)

At Ilia's request the project cards no longer show repository counters (CI jobs, tags, API paths, migrations). Those figures stay in the case studies and in the tables above. The cards now show:

| Card figure / claim | Source | Note |
| --- | --- | --- |
| Nerkhbaan "10+ · Active users"; status "10+ active users" | Stated by Ilia, 17 Oct 2026 | Self-reported; no analytics were seen |
| Nerkhbaan "3 · Apps: web, admin, desktop" | `apps/web`, `apps/admin`, Electron app; README | |
| Nerkhbaan "5 min · Price feed refresh" | `.github/workflows` scheduled feed job; architecture section | |
| Nerkhbaan "323 ms · p95 in a 30-min load test" | PROJECT_STATUS.md (see above) | Unchanged |
| Dolphin "2+ · Companies using it"; stage "In production" | Stated by Ilia, 17 Oct 2026 ("sold to 2–3 companies") | Self-reported; customers are not named. "2+" is the lower bound of what Ilia stated |
| Dolphin "1 stack · Isolated per customer" | README "Why it's built this way"; compose.yml | |
| Dolphin "46 · Per-customer feature flags" | `common/deployment/registry.py` | |
| Dolphin "3,600+ · Automated tests" | DOLPHIN_PROJECT_HANDOFF.md §5 (3,641) | Rounded down so it stays true between releases |
| Dolphin role "Co-founder · Lead developer & IT lead" | Stated by Ilia, 17 Oct 2026 | The other co-founder (sales) is not named, at Ilia's request |
| Stackplore "Docker + K8s", "Read-only by default", "EN / FA", "Apache-2.0" | README; `LICENSE` (Apache 2.0) | |

**Release tags and activity** are read from the GitHub API by `scripts/github-stats.mjs` at build time (every deploy, plus a scheduled rebuild every 6 hours) and stored in `src/content/github.json`. The card labels the value "Latest release tag", because a tag is not proof of deployment (Nerkhbaan v2.8.6 is tagged; the last documented deployment is 2.8.1). If the API is unreachable, the last committed snapshot is kept.

**Screenshots** were supplied by Ilia on 17 Oct 2026 and re-encoded as WebP (1600 px and 800 px, no metadata):

| File | Content | Redaction |
| --- | --- | --- |
| `nerkhbaan-dashboard*.webp` | Gold and silver price cards with charts | None needed (public market prices) |
| `nerkhbaan-login*.webp` | Sign-in page | None needed (empty form) |
| `dolphin-dashboard*.webp` | Platform admin dashboard (light) | None needed: demo data, confirmed by Ilia on 17 Oct 2026 |
| `dolphin-leads*.webp` | Leads board by status (dark) | None needed: demo data, confirmed by Ilia on 17 Oct 2026 (an earlier version was blurred) |

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
| Comprehensive Data Science Program, University of Tehran (online), May 2026 – Aug 2027 (planned) | Stated by Ilia, 17 Oct 2026; syllabus spreadsheet supplied by Ilia (schedule from 25 Ordibehesht 1405) | Shown as an in-progress programme, not a certificate. Topic lists describe the syllabus; scheduled dates alone do not prove individual module completion. |

## Ranking of project candidates — historical October snapshot

This ranking records the earlier review; it is not the current project order or release status. See the 8 Nov 2026 pinned Stackplore review below.

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

## Content review — 8 Nov 2026, before the DevOps-only brief

- At this earlier review, the public role used **DevOps & Backend Engineer**. The later DevOps-only brief below supersedes that positioning.
- Nerkhbaan and Dolphin deployment and usage claims are explicitly dated to the October 2026 evidence above. They are historical records, not a live availability statement. The load-test and recovery limits remain visible.
- Nerkhbaan's historical deployment domain remains plain text in the dated case study. It is not a primary outbound link because current availability was not verified; the public repository and local case study remain accessible.
- Dolphin's former public source URL returned 404 without authentication during this review. The site labels its source private and links the public case study at `/projects/#dolphin-crm` (or `/fa/projects/#dolphin-crm`). The résumé links the same public case study.
- On the project card, the private-source note leads into the native case-study disclosure rather than a link back to the same card.
- The study topic list no longer claims completed modules. Confirmation of actual progress is still needed before any completion claim.
- Persian user/company counts use inclusive lower bounds matching the English values.
- Featured projects, smaller projects, and toolkit translations use stable typed IDs rather than names or array positions.
- The toolkit highlights 27 core tools. The complete 73-tool inventory remains in native disclosures; extra tools render as text to limit repeated inline artwork. The résumé shows the core set.
- The About replay describes static hosting and reads the commit marker. It makes no container, timer, uptime, or live health claim.
- Repository freshness is per repository: a failed refresh is labelled cached or unavailable, with the last successful read distinguished from the attempted check. A stable tag is not deployment proof.

These notes describe source changes. Current product availability, employment, and study progress still require their own evidence.

## User-confirmed DevOps scope — 8 Nov 2026

This section records Ilia's new statements and publication brief. These are self-reported employment facts, not an independent employer, fleet, access, or production audit. This brief supersedes the earlier broad role-search positioning only; it does not invent a promotion, dates, measurements, or new project acceptance evidence.

| Claim / decision | Source | Publication limit |
| --- | --- | --- |
| Target one DevOps-focused résumé and website | Ilia, 8 Nov 2026 | Do not create three role-specific résumés or frame Go/Python/backend/ML as separate current job targets. Relevant code can remain evidence of DevOps automation. |
| Joined OTICAMP with a senior engineer's support; that engineer left after the first three months, after which Ilia took ownership of the company's DevOps work | Ilia, 8 Nov 2026; clarified in the follow-up reply | The official title has always been DevOps Engineer. “Junior” describes initial experience, not a separate formal title. No formal Senior, Lead, Head or management promotion is claimed. Do not infer an exact calendar handover month. |
| Now owns DevOps work and company-server/VPS administration with full administrative access; fleet is two physical servers and approximately four to five VPS | Ilia, 8 Nov 2026; follow-up fleet count | Preserve the approximation. Service count and per-environment breakdown are unknown. Do not publish credentials, addresses or access details. Full access is not an independent security audit. |
| Works across Internet-connected and air-gapped environments | Ilia, 8 Nov 2026 | Preserve the two-environment distinction; isolation design and compliance are not independently verified. |
| Uses Ansible to harden all machines in the company scope described by Ilia | Ilia, 8 Nov 2026 | Fleet count is recorded above; no hardening benchmark, compliance certification or measured coverage result was supplied. |
| Most services run in Docker | Ilia, 8 Nov 2026 | Keep “most”; do not change this to a fully containerized estate or infer production Kubernetes. |
| Owns backups, monitoring, and critical/crisis alerts | Ilia, 8 Nov 2026 | Do not add RPO/RTO, response times, uptime or improvement percentages. |
| Successfully restored the main VPS-hosted services from backups after the hosting provider unexpectedly deleted the primary VPS | Ilia's follow-up, 8 Nov 2026 | Real recovery, self-reported; no independent restore receipt was inspected. Public copy stays vendor-neutral. Do not claim a recovery duration, zero data loss, a measured RPO/RTO, or a specific validation method. |
| Creates/maintains CI/CD pipelines and workflows with GitHub Actions | Ilia's follow-up, 8 Nov 2026 | Exact stages were not recalled. Omit unconfirmed build/test/security/deploy/rollback gates; this does not block naming the confirmed tool. GitLab is separately a hosted service, not evidence that employer CI uses GitLab CI. |
| Administers DirectAdmin and cPanel hosting | Ilia, 8 Nov 2026 | Per-panel account, customer, site and domain counts are unknown. |
| Operates Jira, Confluence, GitLab, a “Matrix stack”, Prometheus, Grafana, Nextcloud, MinIO, n8n, Zabbix and Dekploy | Ilia's named service list, 8 Nov 2026 | Record the service scope, not an invented architecture, scale, SLA, HA design or deployment method for every listed service. “Matrix stack” does not identify every component. |
| Also operates PRTG and OPNsense | Ilia, 8 Nov 2026; both product names explicitly confirmed in the final follow-up | Earlier spellings “ptrg” and “opensence” are resolved. Naming the products does not establish their configuration, topology or scale. |

### Resolved facts and omitted unknowns

- Exact calendar handover month is not supplied; the confirmed relative timeline is after the first three months. Official title is resolved: always DevOps Engineer.
- Fleet count is resolved as two physical servers and approximately four to five VPS. Service count and Internet/air-gapped breakdown remain unknown.
- Employer CI tool is resolved as GitHub Actions. Exact stages were not recalled and must be omitted, not invented or treated as a blocker.
- A real successful backup recovery is confirmed in the user statement. Its date, duration, validation details and loss window are not supplied; omit those measurements.
- Product names are resolved: PRTG and OPNsense, explicitly confirmed in the final follow-up.
- Stackplore source/release review is complete below for the pinned published preview. Broader capacity, quality and stable-v2 acceptance claims remain outside that evidence.


## Stackplore source and release review — 8 Nov 2026

This review supersedes the older October Stackplore version and capability snapshot above. It distinguishes the stable v1 line, the published v2 preview, and later unpublished work. The review used source and hosted receipts; no Stackplore service, local test suite or local build was run for this résumé update.

| Claim / boundary | Primary source | Publication limit |
| --- | --- | --- |
| Published v2 preview is `v2.0.0-alpha.6.3`, pinned to `48b3aec446303926f6f8e0ad993a257cbf6fdd11` | [Pinned source](https://github.com/Ilia-Shakeri/Stackplore/tree/48b3aec446303926f6f8e0ad993a257cbf6fdd11), [published preview](https://github.com/Ilia-Shakeri/Stackplore/releases/tag/v2.0.0-alpha.6.3) | Scope new v2 claims to this reviewed preview. A preview is not stable v2 or production acceptance. |
| Preview release has 39 assets; verification and publication jobs succeeded | [Verify run 42460315714](https://github.com/Ilia-Shakeri/Stackplore/actions/runs/42460315714), [release run 42460315807](https://github.com/Ilia-Shakeri/Stackplore/actions/runs/42460315807), published preview above | These receipts prove the tagged source passed those hosted workflows and publication occurred; they do not close every integration, capacity, quality or production gate. |
| Stable v1 line has `v1.0.3`, source `656581cf05d4774358d5644a6e1af3c69a210f81` | [Pinned stable source](https://github.com/Ilia-Shakeri/Stackplore/tree/656581cf05d4774358d5644a6e1af3c69a210f81), [stable tag](https://github.com/Ilia-Shakeri/Stackplore/tree/v1.0.3), reviewed 8 Nov 2026 | Do not call Stackplore entirely pre-1.0. Keep stable v1 separate from the v2 preview. |
| A later alpha.7 tag exists at source `94425f8`, but its publication failed and no matching GitHub release was found in this review | [Failed release run 42473994721](https://github.com/Ilia-Shakeri/Stackplore/actions/runs/42473994721) | Do not describe alpha.7 as a published release. A tag alone is not publication or deployment proof. |
| Go backend, React/TypeScript interface, PostgreSQL, and bounded Docker/Kubernetes collection form a self-hosted operational workspace | Reviewed pinned source and [v2 runbooks](https://github.com/Ilia-Shakeri/Stackplore/blob/48b3aec446303926f6f8e0ad993a257cbf6fdd11/docs/v2/runbooks.md#L48-L88) | Describe implemented architecture and default read restrictions; do not imply observed enterprise production scale or unrestricted control. |
| Telemetry requests read stored observations; optional, explicitly consented log reads can read the provider live | [Pinned README](https://github.com/Ilia-Shakeri/Stackplore/blob/48b3aec446303926f6f8e0ad993a257cbf6fdd11/README.md#L50) and the reviewed investigation flow | Do not claim every investigation read is stored data or that the log path performs unrestricted live commands. |
| Kubernetes workload collection uses namespaced get/list access; optional node observations have cluster scope | Reviewed pinned Kubernetes provider and access configuration | Scope the namespace claim to workloads. Do not claim all Kubernetes observations or credentials are restricted to namespaces. |

### Smart Analysis — reviewed v2 preview

- The selected-resource typed incident report combines health, metrics, restart observations, alert transitions and workload history into a bounded timeline.
- It presents possible causes with supporting and contrary references, missing evidence and suggested next checks. The report explicitly keeps cause unproven; aligned observations are not a proven root cause.
- Implementation evidence: the pinned [report type/builder, lines 83–132](https://github.com/Ilia-Shakeri/Stackplore/blob/48b3aec446303926f6f8e0ad993a257cbf6fdd11/apps/api/internal/incidentreport/report.go#L83-L132) and [incident-report service, lines 12–65](https://github.com/Ilia-Shakeri/Stackplore/blob/48b3aec446303926f6f8e0ad993a257cbf6fdd11/apps/api/internal/assistantservice/incident_report.go#L12-L65). These source facts do not claim every later alpha feature or a stable-v2 acceptance result.

### Smart Assistant — reviewed v2 preview

- Scoped resource explanations and explicit investigations support English and Persian. Fixed permitted reads, checked citations and read/output budgets bound the work.
- Investigations combine stored telemetry with optional, explicitly consented live log reads under fixed plans and budgets. Private investigation content is volatile, with owner, logout, cancellation, expiry, source and resource boundaries; this is not a claim about every operating-system or infrastructure retention layer.
- The pinned local-model profile is off by default and loopback-only. No remote profiles ship in this pinned preview. Hosted model-path validation names llama.cpp and a Qwen profile; support is scoped to the documented setup.
- Primary sources: [resource conversation, lines 23–42](https://github.com/Ilia-Shakeri/Stackplore/blob/48b3aec446303926f6f8e0ad993a257cbf6fdd11/docs/v2/resource-conversation.md#L23-L42), [hosted validation, lines 16–39](https://github.com/Ilia-Shakeri/Stackplore/blob/48b3aec446303926f6f8e0ad993a257cbf6fdd11/docs/v2/hosted-validation.md#L16-L39), and [runbook boundaries, lines 48–88](https://github.com/Ilia-Shakeri/Stackplore/blob/48b3aec446303926f6f8e0ad993a257cbf6fdd11/docs/v2/runbooks.md#L48-L88).
- Broader reviewed-runbook work, retrieval-quality assessment, pilot capacity and stable-v2 gates remain open. Do not compress this into “all alpha.6 work accepted”, stable v2 ready, proven root-cause automation, or a production deployment claim.

## Work-sample evidence — 8 Nov 2026

Three new samples live in `src/content/en/work-samples.ts` and `src/content/fa/work-samples.ts`, under `/experience/#work-samples` and its Persian route. The sources below support their scope. Repeatable checks and the boundary between local and hosted evidence are recorded in `docs/verification.md`.

### Public project CI

- Source: Nerkhbaan at `025ccbbb236f8c947eef6b0a822cda952033c00b`, [pinned workflow](https://github.com/Ilia-Shakeri/Nerkhbaan/blob/025ccbbb236f8c947eef6b0a822cda952033c00b/.github/workflows/ci.yml).
- Historical receipt: [run 38236359607](https://github.com/Ilia-Shakeri/Nerkhbaan/actions/runs/38236359607), 12 Oct 2026, passed all 15 jobs at that same source revision. Public source and job results were checked on 8 Nov 2026. This is not a new November test run.
- Five check groups: locked Node application builds and frontend contracts; Python static/unit/API-contract checks and Go checks; real TimescaleDB on PostgreSQL 16, plain PostgreSQL 17 and Redis integration; browser auth/alert checks plus Compose, monitoring and Nginx configuration checks; dependency/secret checks and seven commit-tagged container-image scans.
- Integration covers repeated migrations, checksums, lease handover, token races, route smoke and an isolated restore drill. Image scans use the committed exception policy; do not turn this into an unrestricted “zero vulnerabilities” claim.
- Jobs can run in parallel. These groups are not a claimed sequence of production deployment gates. The sample proves a public project's documented CI and the linked historical result, not employer pipeline stages or a new production deployment.
- OTICAMP GitHub Actions use stays self-reported. Exact employer stages remain unknown; do not copy the public project's checks into the employment claim.

### New files-only Ansible lab

- Source: `public/work-samples/ansible-baseline/`. This is a new portfolio example dated 8 Nov 2026, not OTICAMP's private playbook or a record of employer machine changes. The fleet-hardening experience remains a separate self-reported claim.
- The local play uses no privilege escalation. A path/owner/symlink guard confines managed files to a user-owned `/tmp/resume-ansible-*` tree. It renders private directories, a restricted policy file and an inert service-unit example. It does not install/start a unit or edit SSH, firewall, package, account or running-service settings.
- The verifier defines guard tests and syntax checks, a first apply, a zero-change second apply, deliberate content/permission drift, check mode that must leave drift intact, a one-task repair and a zero-change final check. It checks file bytes and modes directly. Offline unit validation is conditional; missing `systemd-analyze` must be recorded as skipped.
- Linux or WSL and Python 3.12 are the current CI target; the controller is pinned to `ansible-core==2.21.6`. Reproduction steps and standalone archive instructions are in the sample README. The 8 Nov WSL run passed with Python 3.12.3: four guards, syntax, task-change counts `3/0/1/1/0`, unchanged drift during check mode, repaired content/mode and offline unit validation. A README-only wording correction is recorded separately from execution-start hashes; executable source did not change. The downloadable ZIP contains the same 11 source files. This local receipt does not certify the hosted job; release acceptance requires that commit's CI receipt.
- Receipts record state, source-file hashes, tool versions, actual change counts and skipped checks. A run writes a running state first and a failed state on failure, so an old pass cannot represent a new failed run. No sample receipt is published as employer compliance, measured fleet improvement or production hardening acceptance.

### Real recovery account and proposed checklist

- Ilia confirmed on 8 Nov 2026 that the hosting provider unexpectedly deleted the primary VPS and that he restored its services from backups. This is a first-hand account of a real recovery. No independent incident receipt was inspected.
- The incident date, duration, exact sequence, loss window and validation method remain undocumented for this sample. Do not add an RTO/RPO, zero-data-loss result, timed recovery or reconstructed technical sequence.
- The separate checklist is proposed guidance for a future recovery: prepare an isolated target, check backup integrity, restore dependencies, validate representative application/data behavior, then plan cutover and record results. It is not the procedure claimed to have been followed in the reported incident.
- Related public proof is the pinned Nerkhbaan [CI restore drill](https://github.com/Ilia-Shakeri/Nerkhbaan/blob/025ccbbb236f8c947eef6b0a822cda952033c00b/scripts/ci-restore-drill.sh) and matching successful CI run above. That script restores into a new target, compares counts/hashes for four named tables (`users`, `alerts`, `canonical_quotes`, `market_prices`), checks migration presence and compares TimescaleDB metadata counts. It does not hash every database table or verify the employer recovery.
