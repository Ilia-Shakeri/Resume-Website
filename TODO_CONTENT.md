# Content to confirm

Items the site shows that need Ilia's confirmation, or that were left out for lack of evidence.
Edit `src/content/en/*.ts` and `src/content/fa/*.ts`, then regenerate assets with `npm run assets` (see README).

## Confirmed by Ilia (13 Oct 2026)

- Still DevOps Engineer at OTICAMP (Jun 2025 — Present).
- Dolphin CRM and Nerkhbaan are independent/own products.
- Tehran, Iran; open to remote DevOps & platform roles.
- Certificates reviewed: LPIC-1 (CanDo), DevOps for Beginners, and DevOps for Intermediates are course certificates from CanDo IT Academy. All training is shown as courses with cert IDs and "View certificate" links; LPIC-2 (TOSINSO) has no certificate file and is listed without a link.
- Domain: `iliashakeri.ir` (default site URL).
- DVM removed from the site and résumé; B.Sc. Computer Science in progress since Oct 2026 added, no institution shown.
- Dolphin CRM described without per-customer framing.

## Confirmed by Ilia (17 Oct 2026)

- Founder of Nerkhbaan; co-founder of Dolphin CRM. Both appear under "Projects I'm proud of" and in the experience timeline.
- The site gets a Persian version with a header language switch.

## Confirmed by Ilia (17 Oct 2026, second review)

- Nerkhbaan has 10+ users; Dolphin CRM is sold to 2–3 companies. Shown as "10+ active users" and "2+ companies".
- Ilia is Dolphin's main developer and IT lead; the other co-founder handles sales and is not mentioned.
- Repository counters were removed from the project cards; release tags and activity are read from GitHub at build time.
- Product screenshots added (Nerkhbaan dashboard and sign-in; Dolphin dashboard and leads board).
- No LPIC-2 certificate file, and no LPI exams taken: the training entries stay as courses.
- Development methods: not discussed on the site; covered in interviews if asked.
- Telegram link, Persian copy, and résumé PDF: checked by Ilia.
- University of Tehran Comprehensive Data Science Program (online) added under Education, in progress.

## Confirmed by Ilia (17 Oct 2026, third review)

- Remote-work details on the contact page are correct. Also open to remote work with companies in Iran.
- The Dolphin dashboard and leads-board screenshots show demo data; the leads board is published unblurred.

## Still open

1. **Data Science programme.** Confirm actual module progress before publishing any completed-module claim. Current lists describe the syllabus only.
2. **Business impact.** No revenue or other customer metrics are published. Add them only with evidence and your approval.

## Left out on purpose (add only with evidence)

- **"Reduced incident response time by 40%"** (résumé). Needs a baseline, method, and period.
- **"99.9% uptime"** (résumé). Needs the monitored service, period, and source.
- **Phone number.** Deliberately not published.

## Private repositories (not read)

`Naharestan`, `Dolphin-Website`, `OTIC-Clockwork-OrangeHRM`, `Nerkhbaan-web` (archived), `Alerta`. Nothing about them is published.

## Review follow-up (8 Nov 2026)

- Current OTICAMP employment and responsibility were reconfirmed on 8 Nov 2026 below. Reconfirm remote-work availability and study progress before changing their status.
- Product deployment and usage claims stay dated to October 2026 until fresh checks exist.
- Dolphin source is private. Keep the public engineering case study as the portfolio evidence link; do not restore an inaccessible source-code button.
- Keep the 73-tool site inventory, with the core set shown first. Add tools or change the core set only when supported by work or study evidence.

## DevOps-only rewrite brief — 8 Nov 2026

Confirmed directly by Ilia:

- Keep one DevOps-focused résumé and website, with the current visual design. Do not make three separate job-target résumés.
- At OTICAMP, began with a senior engineer's help; that engineer left after the first three months, after which Ilia took ownership of the company's DevOps work and server/VPS administration. Official title has always been DevOps Engineer; no formal Junior/Senior/Lead promotion is claimed.
- Fleet: two physical servers and approximately four to five VPS. There are many services; exact service count is unknown.
- Works with both Internet-connected and air-gapped environments.
- Uses Ansible for hardening across all machines in the stated company scope. Most services run in Docker.
- Owns backups, monitoring and critical/crisis alerts. Uses GitHub Actions for CI/CD pipelines/workflows; exact stages were not recalled and must be omitted.
- Successfully restored the main VPS-hosted services from backups after unexpected deletion by the hosting provider. Keep public copy vendor-neutral; no recovery time, loss window, RPO/RTO or zero-data-loss claim was supplied.
- Administers DirectAdmin and cPanel hosting.
- Named services: Jira, Confluence, GitLab, “Matrix stack”, Prometheus, Grafana, Nextcloud, MinIO, n8n, Zabbix and Dekploy.
- Also operates PRTG and OPNsense; Ilia explicitly confirmed both names in the final follow-up. Earlier spellings “ptrg” and “opensence” are resolved.

Resolved in the follow-up reply:

- Relative handover timing: after the first three months. Exact calendar month is not needed for the current copy.
- Formal title: always DevOps Engineer.
- Fleet: two physical servers and about four to five VPS.
- CI tool: GitHub Actions.
- Recovery example: successful restore from backups after the primary VPS was unexpectedly deleted by its hosting provider.
- Product names: PRTG and OPNsense, both explicitly confirmed.

Still unknown; omit rather than block truthful copy:

1. Exact service count and per-environment fleet split.
2. Specific employer CI stages, checks, release gates and rollback procedure. The separate public-project CI sample has its own pinned source and receipt.
3. Recovery date, duration, validation method and any measured loss window.
4. Future Stackplore claims beyond the pinned preview need new evidence. The source/release review below is complete; no local Stackplore service, test or build is part of this résumé edit.
5. Exact employer Ansible controls and their rollout, validation and rollback method. The new files-only portfolio lab does not establish those details; the shorter homepage/PDF copy adds none.

Do not add exact fleet totals beyond the stated approximation, uptime, response-time reductions, backup recovery times, cloud scale, production Kubernetes, or a formal promotion from these statements alone.

## Stackplore source review resolved — 8 Nov 2026

- Published preview: v2.0.0-alpha.6.3 at 48b3aec446303926f6f8e0ad993a257cbf6fdd11; 39 release assets. Hosted verify run 42460315714 and release run 42460315807 succeeded.
- Stable v1.0.3 at 656581cf05d4774358d5644a6e1af3c69a210f81 remains a separate released line. The older October pre-1.0 description is historical.
- Later alpha.7 source 94425f8 has failed publication run 42473994721 and no matching published release in this review. Do not publish it as a shipped preview.
- The résumé may describe the pinned operational workspace, bounded collection, scoped typed incident timeline and optional local-model explanations/investigations, with the limits recorded in docs/content-evidence.md.
- Keep stored telemetry distinct from optional, consented live log reads. Restrict the Kubernetes namespace claim to workloads; optional node observations can have cluster scope.
- Leave broad runbook, retrieval-quality, pilot-capacity and stable-v2 readiness claims out until their own gates pass. Report hypotheses are not proven root causes; tagged builds are not production deployments.
- Current copy remains a single DevOps-focused résumé/site. This review does not add an unrelated job-target résumé.
