# Ilia Shakeri — DevOps portfolio

A bilingual engineering résumé and project portfolio at https://iliashakeri.ir. Next.js exports static HTML/CSS/JS; Vercel serves it and Arvan supplies DNS. No database, application server, tracking script, or client-side service call is needed.

## Pages and content

English pages live at /, /about/, /projects/, /experience/ and /contact/. Persian equivalents live under /fa/. The language switch keeps the page and section. The printable English résumé is /resume/; its tagged PDF is /resume/ilia-shakeri-resume.pdf.

Typed copy lives in src/content/en/ and src/content/fa/. Edit both languages together. Project claims carry their evidence dates; private source and unverified live-product links are not presented as public proof. Detailed case studies, screenshots and contact links remain available without scripts.

## Local work

Use Node.js 22. Install Chrome or Edge locally; the browser helper discovers Windows, macOS and Linux paths. CHROMIUM_PATH can override detection. Linux build hosts also have a pinned compressed Chromium fallback.

Each generated artifact owns a fresh browser process. Linux CI sets BUILD_BROWSER=bundled for the publishing build, so PDF and social-image generation exercise the same compressed browser used on Vercel even when system Chrome is installed. Both helpers close their preview server on failure too.

PowerShell:

```powershell
npm.cmd ci
npm.cmd run dev
```

In Bash use npm instead of npm.cmd.

## Publishing build

```powershell
npm.cmd run check
npm.cmd test
npm.cmd run check:artifacts
npm.cmd run qa:screens
npm.cmd run check:links
npm.cmd start
```

The normal build refreshes public repository data into ignored .generated/, exports all pages, writes correct document language/direction, generates a fresh tagged PDF and dedicated social image, versions public assets, adds exact script hashes, and writes /build.txt and /build-info.json. The preview is loopback-only at http://127.0.0.1:3000; set PORT if needed.

Fresh artifacts are in out/ and do not dirty source files. Run npm run assets when you also want the fresh PDF, social card and fully verified public repository snapshot copied into source as fallbacks for review.

No credential is needed for public repository reads. A failure is labeled cached or unavailable; it is not marked as a fresh successful read. Final release and preview tags are shown separately.

## Checks and receipts

- npm test checks local path confinement, malformed URL survival, preview HTTP behavior, browser discovery, locale rewriting, script hashes and public-data failure handling.
- npm run check:artifacts parses the generated PDF, checks tagging/outline/contact links/readable text/page count, and validates document languages and social-image dimensions.
- npm run qa:screens captures all ten content pages at 320, 375, 390, 430, 768, 1024, 1440 and 1920 px. It checks axe, headings, overflow, links, native mobile navigation without scripts and with failed script downloads, keyboard focus, short viewport scrolling, download/resize behavior, filtering counts, clipboard errors, reduced motion and bilingual 404 recovery.
- npm run check:links reports verified, broken and access-limited external links separately.
- npm audit checks the locked dependency tree against the official registry selected in .npmrc. A scoped minimatch 11.0.1 override patches the lint parser's nested glob dependency ([advisory](https://github.com/advisories/GHSA-g3hv-75wg-m249)); remove it once the parser includes a patched release itself.
- npm run check:live checks the public release marker and routes. Set EXPECTED_SHA to bind it to a specific commit; CI does this after main pushes.

Receipts and screenshots are in ignored qa-artifacts/. CI uploads evidence named with the exact SHA. Local checks do not certify Safari/iOS, screen readers, or real Iranian network access.

## Hosting

Vercel builds main with npm run build. vercel.json explicitly selects static output (framework: null, outputDirectory: out), so the published files are the exact checked export. Use NEXT_PUBLIC_SITE_URL=https://iliashakeri.ir. Keep the existing Arvan nameservers, with website cloud/proxy off. The root domain serves Production; www redirects to root. Keep the domain registration renewed.

The old VPS Deploy workflow is retired. CI stays enabled. A weekly maintenance workflow checks public links and locked dependencies. See docs/deployment.md for setup, headers, cache and rollback details.

## Files

- src/app/ — route content and shared layout.
- src/components/ — views, navigation, project cases and interaction.
- src/content/ — matching English/Persian copy and a dated public repository fallback.
- src/lib/ — metadata, structured data and build-time helpers.
- scripts/ — build, preview, generated assets, regression and browser checks.
- public/ — source portrait, project images, certificates and fallback PDF/social image.
- docs/content-evidence.md — source and verification scope of public claims.
- docs/verification.md — repeatable validation gates and evidence limits.
- docs/github-inventory.md — historical repository inventory.
- deploy/ — retired VPS reference; not current hosting setup.
