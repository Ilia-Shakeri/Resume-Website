# Ilia Shakeri — DevOps portfolio

Personal portfolio of Ilia Shakeri, DevOps & Backend Engineer. A static, content-driven Next.js site built from the Figma reference in `references/`.

**Pages:**

| Path | Contents |
| --- | --- |
| `/` | Hero (name, role, core stack, intro, three actions, portrait, DevOps loop), capability strip, three featured-project cards, contact call to action |
| `/about/` | Bio, `whoami` panel, deploy-check replay terminal, expertise areas with tool logos and evidence |
| `/projects/` | Nerkhbaan, Dolphin CRM, and Stackplore with summary, dated key facts, architecture flow, expandable engineering case study, and known limitations; then a filterable grid of eight smaller repos |
| `/experience/` | Experience timeline with engagement type, education, training courses (marked as not official certifications), résumé download |
| `/contact/` | Email (with copy button), remote-work details, LinkedIn, GitHub, Telegram |

A printable résumé lives at `/resume/` and as a PDF (English only).

**Languages:** every page exists in English and Persian (RTL, Vazirmatn) under `/fa/`, for example `/fa/projects/`. The header switch opens the same page in the other language, and each page carries `hreflang` alternates.

**Motion:** scroll reveals with staggered children, cross-document page transitions (View Transitions API), a sweeping ring on the portrait, a slow hero glow, pointer-following card highlights, and a reading-progress bar. Page text has no load-in animation, so it paints immediately. Every effect is CSS or a small client component and turns off under `prefers-reduced-motion`. Without JavaScript all content, figures, and links stay visible.

## Stack

- Next.js 16 (App Router, static export), React 19, TypeScript 5.9
- Tailwind CSS 4 with design tokens in `src/app/globals.css`
- Self-hosted variable fonts via Fontsource (Space Grotesk, Inter, JetBrains Mono, Vazirmatn for Persian); no runtime font requests
- No database, backend, analytics, or client-side API calls. Client JavaScript only drives UI: the menu, language switch, project filter, scroll reveal, terminal typing, and clock.

## Local development

Requires Node.js 22 (see `.nvmrc`; 20.9+ works).

```bash
npm ci
npm run dev        # http://localhost:3000
```

## Checks and production build

```bash
npm run lint       # ESLint (next/core-web-vitals + TypeScript)
npm run typecheck  # tsc --noEmit
npm run build      # static export to out/
npm run start      # serve out/ locally (downloads `serve` via npx)
npm run check      # lint + typecheck + build
```

Browser QA (needs Chrome/Chromium; set `CHROMIUM_PATH` if not auto-detected):

```bash
npm run build && npm run qa:screens
```

This writes full-page screenshots of every page in both languages into `qa-artifacts/`, at 320, 375, 390, 430, 768, 1024, 1440, and 1920 px. It checks:
- overflow, clipping, 24 px minimum target size, and console errors;
- axe-core WCAG 2.2 AA at 375 and 1440 px;
- heading order, anchors, internal links, external-link safety, and the sitemap;
- project figures: identical with and without JavaScript, never zero;
- rendering without JavaScript;
- the language switch, mobile menu, skip link, and reduced motion;
- page transitions, spotlight, progress bar, terminal, and clock;
- the case-study expander, the project filter, and the downloads.

It needs `axe-core` (a dev dependency).

## Editing content

All copy lives in typed data files, one set per language: `src/content/en/` and `src/content/fa/`. `getContent(locale)` in `src/content/index.ts` combines them, and TypeScript makes both languages provide the same fields. Components don't need to change.

| File (per language) | Contents |
| --- | --- |
| `profile.ts` | Name, intro, bio, contact, availability, experience, education, training, résumé summary |
| `projects.ts` | `featured` (role, stage, status, dated facts with source, "my part", architecture steps, case-study sections, limitations) and `projects` (kind, category, summary, 2–3 highlights, tools, links) |
| `practice.ts` | Expertise areas: what each covers, its tools (with brand icons), and where the work shows |
| `ui.ts` | Interface text: navigation, section headings, labels |
| `src/lib/site.ts` | Site URL, résumé file paths and "updated" label |

Release tags and last-update dates on the project cards come from `src/content/github.json`. `node scripts/github-stats.mjs` refreshes it from the GitHub API (set `GITHUB_TOKEN` to avoid rate limits). The Deploy workflow runs it before every build and also rebuilds every 6 hours, so the dates stay current without client-side requests. If the API can't be reached, the committed snapshot is used.

Product screenshots live in `public/images/projects/` as an 800 px thumbnail and a 1600 px WebP; list them in a featured project's `screenshots`.

The Persian `projects.ts` and `practice.ts` reuse the English entries and override only the text, so links, logos, and tools stay in one place.

After content changes, regenerate the résumé PDF and social image:

```bash
npm run assets
```

## Project documents

- [`docs/github-inventory.md`](docs/github-inventory.md) — every accessible repository and what was (not) read
- [`docs/content-evidence.md`](docs/content-evidence.md) — source and verification status of each public claim; project ranking
- [`docs/deployment.md`](docs/deployment.md) — Iran VPS + ArvanCloud deployment: pull-based updates from the `site` branch
- [`docs/verification.md`](docs/verification.md) — checks that were actually run and their results
- [`TODO_CONTENT.md`](TODO_CONTENT.md) — details that still need confirmation

## Repository layout

```text
src/app/          routes: /, /about, /projects, /experience, /contact and their /fa twins (thin files rendering views.tsx), /resume, sitemap, robots, 404
src/components/   page views and shell, section components, motion helpers (ScrollReveal, Spotlight, CountUp), icons
src/content/      typed content data: en/, fa/, index.ts (getContent)
src/lib/          site config, structured data, build-time helpers
scripts/          résumé PDF, OG image, GitHub figures, and browser QA scripts (Playwright core)
public/           portrait (hero), project logos, certificates, favicon, OG image, résumé PDF
references/       Figma export and the previous résumé (source material)
```
