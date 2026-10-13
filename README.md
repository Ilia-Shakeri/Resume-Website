# Ilia Shakeri — DevOps portfolio

Personal portfolio of Ilia Shakeri, DevOps Engineer. A static, content-driven Next.js site built from the Figma reference in `references/`.

**Sections:** hero · capability ribbon · about (`whoami` panel) · selected work (Dolphin CRM, Nerkhbaan, ChatOps bridges + six secondary repos) · technical toolkit · experience timeline · engineering approach · education & training · résumé download · contact. A printable résumé lives at `/resume/` and as a PDF.

## Stack

- Next.js 16 (App Router, static export), React 19, TypeScript 5.9
- Tailwind CSS 4 with design tokens in `src/app/globals.css`
- Self-hosted variable fonts via Fontsource (Space Grotesk, Inter, JetBrains Mono); no runtime font requests
- No database, backend, analytics, or client-side API calls. The only client JavaScript is the mobile menu and the print button.

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

This takes full-page screenshots at 375, 768, and 1440 px into `qa-artifacts/` and checks overflow, anchors, external-link safety, heading order, the mobile menu, keyboard skip link, reduced motion, and the résumé download.

## Editing content

All copy lives in typed data files. Components don't need to change.

| File | Contents |
| --- | --- |
| `src/content/profile.ts` | Name, intro, bio, contact, availability, experience, education, training, résumé summary |
| `src/content/projects.ts` | Featured case studies (problem, role, approach, reliability, outcome, links) and secondary repos |
| `src/content/practice.ts` | Toolkit groups and the four-step engineering approach |
| `src/lib/site.ts` | Site title/description, résumé file paths and "updated" label, navigation |

Featured cards choose an illustration with `diagram: "dolphin-stack" | "nerkhbaan-ci" | "chatops-flow"` (see `src/components/diagrams.tsx`). To add a featured project, add an entry to `featuredProjects` and, if it needs a new diagram, a case in `ProjectDiagram`.

After content changes, regenerate the résumé PDF and social image:

```bash
npm run assets
```

## Project documents

- [`docs/github-inventory.md`](docs/github-inventory.md) — every accessible repository and what was (not) read
- [`docs/content-evidence.md`](docs/content-evidence.md) — source and verification status of each public claim; project ranking
- [`docs/deployment.md`](docs/deployment.md) — Vercel, Nginx, container, and static-host deployment
- [`docs/verification.md`](docs/verification.md) — checks that were actually run and their results
- [`TODO_CONTENT.md`](TODO_CONTENT.md) — details that still need confirmation

## Repository layout

```text
src/app/          routes: / (page.tsx), /resume, sitemap, robots, 404
src/components/   section components, diagrams, icons
src/content/      typed content data
src/lib/          site config, structured data, build-time helpers
scripts/          résumé PDF, OG image, and browser QA scripts (Playwright core)
public/           hero image, favicon, OG image, résumé PDF
references/       Figma export and the previous résumé (source material)
```
