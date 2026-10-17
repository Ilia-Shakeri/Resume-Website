# Ilia Shakeri — DevOps portfolio

Personal portfolio of Ilia Shakeri, DevOps Engineer. A static, content-driven Next.js site built from the Figma reference in `references/`.

**Sections:** hero (animated DevOps loop and live terminal) · capability ribbon · about (`whoami` panel) · projects I'm proud of (Nerkhbaan and Dolphin CRM) · more builds (ChatOps bridges and a filterable grid of eight repos) · technical toolkit · experience timeline · engineering approach · education & training · résumé download · contact. A printable résumé lives at `/resume/` and as a PDF (English only).

**Languages:** English at `/` and Persian (RTL, Vazirmatn) at `/fa/`, switched from the header. Both are static pages with `hreflang` alternates.

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

This takes full-page screenshots of `/` and `/fa/` at 375, 768, and 1440 px into `qa-artifacts/`. It checks overflow and clipping, anchors, external-link safety, heading order, the mobile menu, the skip link, reduced motion, the language switch, the project filter, and the résumé download.

## Editing content

All copy lives in typed data files, one set per language: `src/content/en/` and `src/content/fa/`. `getContent(locale)` in `src/content/index.ts` combines them, and TypeScript makes both languages provide the same fields. Components don't need to change.

| File (per language) | Contents |
| --- | --- |
| `profile.ts` | Name, intro, bio, contact, availability, experience, education, training, résumé summary |
| `projects.ts` | `ventures` (projects I'm proud of: role, stats, highlights, case study), `featuredBuild`, and `secondaryProjects` (with filter category) |
| `practice.ts` | Toolkit groups and the four-step engineering approach |
| `ui.ts` | Interface text: navigation, section headings, labels |
| `src/lib/site.ts` | Site URL, résumé file paths and "updated" label |

The Persian `projects.ts` and `practice.ts` reuse the English entries and override only the text, so links, logos, and tools stay in one place. Cards choose an illustration with `diagram: "dolphin-stack" | "nerkhbaan-ci" | "chatops-flow"` (see `src/components/diagrams.tsx`).

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
src/app/          routes: / and /fa (both render HomePage), /resume, sitemap, robots, 404
src/components/   section components, diagrams, icons
src/content/      typed content data: en/, fa/, index.ts (getContent)
src/lib/          site config, structured data, build-time helpers
scripts/          résumé PDF, OG image, and browser QA scripts (Playwright core)
public/           portrait, project logos, certificates, favicon, OG image, résumé PDF
references/       Figma export and the previous résumé (source material)
```
