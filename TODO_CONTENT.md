# Content to confirm

Items the site shows that need Ilia's confirmation, or that were left out for lack of evidence.
Edit `src/content/*.ts`, then regenerate assets with `npm run assets` (see README).

## Needs confirmation (currently shown)

1. **OTICAMP employment status.** Shown as `DevOps Engineer · Jun 2025 — Present` (from the résumé). If the role ended, set the end date in `src/content/profile.ts` → `experience[0].period`.
2. **"Product & Platform Engineering — Independent projects, 2026 — Present".** Dolphin CRM and Nerkhbaan are authored solely by you, but the repos don't say whether they were built for OTICAMP, a client, or yourself. If they were employer/client work, rename this entry or fold it into the right role.
3. **Availability and location.** "Open to remote DevOps & platform roles", "Tehran, Iran", "IRST · UTC+03:30" come from the résumé header. Update `profile.availability` / `profile.location` if they changed.
4. **LPIC-1 / LPIC-2.** The résumé lists them as "Linux Professional Institute Certification (LPIC-x)" with CanDo/TOSINSO as providers. The site calls them **training courses**. If you passed the LPI exams, give the LPI verification code or certificate ID and change `qualifications` in `src/content/profile.ts`; a "Verify" link can then be added.
5. **Nerkhbaan live site.** Linked to https://nerkhbaan.ir/ based on `PROJECT_STATUS.md` (12 Oct 2026). Could not be opened from the build environment. Remove the "Live site" link in `src/content/projects.ts` if it ever goes offline.
6. **Dolphin CRM public positioning.** The repository is public. The site names no customers. Confirm you are comfortable describing it as a per-customer product.
7. **Résumé PDF.** `public/resume/ilia-shakeri-resume.pdf` is generated from the site content (two A4 pages). Review it once before sharing; it inherits every item above.

## Left out on purpose (add only with evidence)

- **"Reduced incident response time by 40%"** (résumé). Needs a baseline, method, and period, e.g. "median time from alert to acknowledgement fell from X to Y min over Z weeks".
- **"99.9% uptime"** (résumé). Needs the monitored service, period, and source (Prometheus/uptime monitor export).
- **"Certified" DevOps Engineer** (résumé summary). No certificate identified.
- **DVM dates.** Not on the résumé. Add years to `education` if you want them shown.
- **Phone number.** Deliberately not published.

## Private repositories (not read)

`Naharestan`, `Dolphin-Website`, `OTIC-Clockwork-OrangeHRM`, `Nerkhbaan-web` (archived), `Alerta`. Their contents were not accessible to this session and nothing about them is published. If any should appear on the site, make it public or provide an approved summary.

## LinkedIn

LinkedIn could not be reached from the build environment. If your LinkedIn headline, current role, or certifications differ from the résumé, update the same fields listed above.
