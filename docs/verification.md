# Verification receipts

Historical results described an earlier VPS-based version. They do not certify the current source or Vercel deployment.

## Current repeatable gates

| Gate | Command | Evidence |
| --- | --- | --- |
| Source | npm run lint; npm run typecheck | ESLint and TypeScript exit status |
| Local helper and build rules | npm test | Confinement, malformed URL survival, HEAD/method/404, symlink boundary, public-data failure states, locale and policy tests |
| Publishing export | npm run build | Exact build.txt/build-info.json, fresh PDF/OG, versioned assets, document locale and script hashes; Linux CI forces BUILD_BROWSER=bundled to exercise the host browser lifecycle |
| PDF and static artifacts | npm run check:artifacts | Tagged PDF, outline, readable extracted text, contact links, page count, PNG dimensions, language and policy |
| Browser | npm run qa:screens | 80 EN/FA viewport captures, axe, links/headings, no-script/failed-script navigation, filter count, menu focus/resize/download/short height, clipboard denial, motion and 404 recovery |
| Public external links | npm run check:links | qa-artifacts/link-check.json; broken and access-limited results separated |
| Public release | npm run check:live | Exact expected SHA, HTTPS, headers, EN/FA routes, assets, 404 and www |
| Dependency health | npm audit | Locked full dependency audit |
| Local Ansible sample | Follow public/work-samples/ansible-baseline/README.md; run its verify.py with --receipt qa-artifacts/work-samples/ansible-baseline.json | Linux guard/syntax, repeated apply, unchanged check-mode drift, repair, final check, file modes/content and conditional offline unit validation; receipt includes state, source hashes and versions |

Generated receipts are in ignored qa-artifacts/ and CI artifacts named with the exact source SHA. A local export does not prove public deployment or real-device behavior. Browser emulation does not prove Safari/iOS or screen-reader acceptance.

A source change requires fresh gates. Do not reuse old green logs to accept a newer commit. Hosted smoke requires the newly published commit marker; running it before publishing is expected to fail rather than certify the old site.

## New work samples — 8 Nov 2026

The Nerkhbaan source review is complete: [run 38236359607](https://github.com/Ilia-Shakeri/Nerkhbaan/actions/runs/38236359607) passed all 15 jobs on 12 Oct 2026 at `025ccbbb236f8c947eef6b0a822cda952033c00b`. The [pinned workflow](https://github.com/Ilia-Shakeri/Nerkhbaan/blob/025ccbbb236f8c947eef6b0a822cda952033c00b/.github/workflows/ci.yml) and job results were checked on 8 Nov. This historical public-project receipt does not certify this website revision, the new Ansible lab or OTICAMP's internal CI/recovery.

Local receipts below describe the 8 Nov source review. Hosted acceptance is a separate gate: inspect the CI run for the exact published SHA and its live job, rather than treating a local pass or an older run as a release receipt.

| Gate | Required evidence | Status |
| --- | --- | --- |
| Final Ansible lab source | Linux/WSL verifier exits successfully; receipt status is passed, hashes match the final sample, guard tests and syntax pass; second/final checks report zero changes; drift check and repair each report one changed task; direct bytes/modes checks pass | Local pass: Python 3.12.3, core 2.21.6, four guards, changes 3/0/1/1/0; README-only amendment kept explicit |
| Unit-validation boundary | Receipt records offline systemd-analyze result when installed, or an explicit skip; unit stays uninstalled and unstarted | Local offline validation passed; no unit installed or started |
| Hosted lab check | New Ubuntu CI step uses Python 3.12, a virtual environment and pinned requirements; runs the verifier and retains qa-artifacts/work-samples/ansible-baseline.json in the exact-SHA artifact | Required: inspect the matching commit's CI run |
| EN/FA sample views | Three samples render on both experience routes; native disclosures work with keyboard and without scripts; local source downloads and pinned external links resolve; short/mobile views remain usable | Local pass: full browser suite, 80 viewport captures, both expanded 320px samples, native keyboard/no-script controls, source/ZIP downloads and expanded axe checks; reveal regressions passed |
| PDF links and layout | Regenerated PDF retains readable layout, a visible website URL and a working direct work-samples link; artifact checks and visual review pass | Local pass: two tagged A4 pages, outline, first-page website link and direct sample link; both pages and social card visually reviewed |
| Integrated source and release | Fresh lint, types, helper tests, build, artifact and browser gates; exact new commit passes CI and public-domain smoke after publishing | Local gates passed; release requires the matching published commit's CI and live-job receipts |

The employer-deletion recovery remains a self-reported real event. The initial proposed checklist was future guidance; the later concise public sample omits it. Neither is accepted as a measured restore drill, and the public Nerkhbaan restore receipt does not prove the employer incident's method or timing.

The local stale-receipt negative test also passed: a deliberately failed rerun replaced an old success with a failed state. The 11-file ZIP was read back and every entry matched the frozen source; no environment, cache, temporary data or receipt is included. Source checks, nine helper tests, the two-pass export, artifact checks and dependency audit passed locally. External links: 19 verified, zero broken, LinkedIn access-limited (999).

## Homepage and PDF first-pass revision — 8 Nov 2026

The earlier local receipts above cover the preceding work-sample addition. Fresh local receipts below cover this homepage intro, direct sample action, operational project summaries, concise sample copy and PDF label. The lab was rerun without source changes. Hosted acceptance is separate and requires the matching published commit's CI/live receipts.

| Gate | Required evidence | Status |
| --- | --- | --- |
| Content and scope | Final EN/FA text uses only confirmed fleet/recovery facts and existing project evidence; no new employer controls, incident method, timing, loss result or seniority claim | Peer review passed; only established facts reused |
| Homepage navigation and layout | Localized primary action reaches the correct locale's work-samples anchor and visible heading without scripts; longer proof-led intro and operational teasers fit desktop/mobile/short views; keyboard navigation works | Local pass: all four new hero checks, full 203-check browser suite, 80 viewport captures and reveal regressions |
| Project and sample boundaries | Home/PDF use operationsSummary; full project summaries/case studies remain; dated production and preview context stays visible; concise samples preserve public CI, local lab and first-hand-account/separate-public-drill distinctions; disclosure names remain unique for screen readers | Peer review and browser checks passed |
| PDF artifact and visual review | Fresh tagged PDF has exactly two readable pages, experience before the selected-project page break, existing core-tool rows, a visible website URL and the explicit CI/CD · Ansible · Recovery link on page one | Local pass: two tagged A4 pages, outline, first-page link annotations; both page renders and social card inspected |
| Source and release | Fresh source, helper, build, artifact, browser and dependency gates; exact new commit's hosted CI and public-domain smoke after publication | Local lint, types, nine helper tests, two-pass build, artifacts and audit passed; matching hosted CI/live receipts required for release |

Final acceptance needs the matching source and artifact receipts. New copy alone does not prove deeper host hardening or add evidence to the employer recovery account.

Local receipts: `qa-artifacts/home-pdf-browser.log`, `qa-artifacts/artifact-check.json`, `qa-artifacts/recruiter-copy-2026-11-08/local/`, and `qa-artifacts/home-pdf-2026-11-08/ansible-baseline.json`. The fresh unchanged lab run passed with four guards, syntax, task-change counts 3/0/1/1/0, unchanged drift in check mode, repaired content/mode and offline unit validation; all 11 source hashes matched. External links: 19 verified, zero broken, LinkedIn access-limited (999).

## Employer Ansible fact follow-up — reviewed 9 Nov 2026

The EN/FA employment highlights changed after `44d9a9299f2133281e61332b974f23022f7a8a56` to include Ilia's new machine-count, operating-system and installation facts. Earlier passes do not accept this newer source. The existing lab and its receipts are unchanged; no new host-hardening test is claimed.

Fresh local source/export, artifact, EN/FA rendering and two-page PDF visual gates passed on 9 Nov. Nine helper tests, dependency audit (zero findings), lint/types, the two-pass export, all 203 browser checks and reveal regressions passed. Both page renders and the social card were reviewed again; the approximately 10–15 Ansible scope and stated OS labels are readable on page one without adding a fleet total or implying new production controls. External links: 19 verified, zero broken, LinkedIn access-limited (999).

Final local receipts: `qa-artifacts/home-pdf-final-browser.log`, `qa-artifacts/artifact-check.json`, and `qa-artifacts/recruiter-copy-2026-11-09/local/`. The unchanged local lab receipt above remains scoped to those same 11 sample files; no employer-hardening verification is claimed. Release acceptance requires the follow-up commit's matching hosted CI and public-domain live receipts.
