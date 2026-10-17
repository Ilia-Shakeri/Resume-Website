# Ilia Shakeri — DevOps portfolio

Personal portfolio of Ilia Shakeri, DevOps Engineer. A static, content-driven Next.js site built from the Figma reference in `references/`.

**Pages:**

| Path | Contents |
| --- | --- |
| `/` | Hero (portrait, title, intro, DevOps loop), capability strip, two featured projects, contact call to action |
| `/about/` | Bio, `whoami` panel, live deploy terminal, toolkit, how I work |
| `/projects/` | Projects I'm proud of (Nerkhbaan, Dolphin CRM) and a filterable grid of nine repos |
| `/experience/` | Experience timeline, education and training (certificate previews), résumé download |
| `/contact/` | Email, availability, GitHub, LinkedIn, Telegram |

A printable résumé lives at `/resume/` and as a PDF (English only).

**Languages:** every page exists in English and Persian (RTL, Vazirmatn) under `/fa/`, for example `/fa/projects/`. The header switch opens the same page in the other language, and each page carries `hreflang` alternates.

**Motion:** entrance animations on load, scroll reveals with staggered children, cross-document page transitions (View Transitions API), a sweeping ring on the portrait, drifting hero glows, pointer-following card highlights, counting stats, and a reading-progress bar. Every effect is CSS or a small client component, and all of them turn off under `prefers-reduced-motion`. Without JavaScript, all content is visible.

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

This takes full-page screenshots of every page in both languages at 375, 768, and 1440 px into `qa-artifacts/`. It checks overflow and clipping, console errors, heading order, anchors and internal links, external-link safety, and the sitemap. It also checks the language switch, the mobile menu, the skip link, reduced motion, the animations (load-in, page transitions, count-up, spotlight, progress bar), the project filter, and the downloads.

## Editing content

All copy lives in typed data files, one set per language: `src/content/en/` and `src/content/fa/`. `getContent(locale)` in `src/content/index.ts` combines them, and TypeScript makes both languages provide the same fields. Components don't need to change.

| File (per language) | Contents |
| --- | --- |
| `profile.ts` | Name, intro, bio, contact, availability, experience, education, training, résumé summary |
| `projects.ts` | `ventures` (projects I'm proud of: role, status, key facts, "my part", engineering notes) and `projects` (kind, category, summary, 2–3 highlights, tools, links) |
| `practice.ts` | Toolkit groups and the four-step engineering approach |
| `ui.ts` | Interface text: navigation, section headings, labels |
| `src/lib/site.ts` | Site URL, résumé file paths and "updated" label |

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
scripts/          résumé PDF, OG image, and browser QA scripts (Playwright core)
public/           portrait (hero), project logos, certificates, favicon, OG image, résumé PDF
references/       Figma export and the previous résumé (source material)
```
