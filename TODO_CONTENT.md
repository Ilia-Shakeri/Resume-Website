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
- AI-assisted development: not mentioned on the site; covered in interviews if asked.
- Telegram link, Persian copy, and résumé PDF: checked by Ilia.
- University of Tehran Comprehensive Data Science Program (online) added under Education, in progress.

## Still open

1. **Remote-work details.** The contact page now lists: time zone (UTC+03:30), 4+ hours of overlap with European hours, full-time or contract, two weeks' notice, English at professional level. These are sensible defaults, not statements from Ilia. Correct any that are wrong in `src/content/*/profile.ts` (`remote`). Payment and work-authorization arrangements are deliberately not mentioned.
2. **Dolphin dashboard screenshot.** It shows aggregate figures (customers, sales, receivables). Confirm they come from a demo installation, not a customer's. If not, replace the image.
3. **Leads board screenshot.** Lead names were blurred. If the data is demo data, the unblurred original can be used instead.
4. **Data Science programme.** Update `education` in `src/content/*/profile.ts` as modules finish.
5. **Business impact.** No revenue or other customer metrics are published. Add them only with evidence and your approval.

## Left out on purpose (add only with evidence)

- **"Reduced incident response time by 40%"** (résumé). Needs a baseline, method, and period.
- **"99.9% uptime"** (résumé). Needs the monitored service, period, and source.
- **Phone number.** Deliberately not published.

## Private repositories (not read)

`Naharestan`, `Dolphin-Website`, `OTIC-Clockwork-OrangeHRM`, `Nerkhbaan-web` (archived), `Alerta`. Nothing about them is published.
