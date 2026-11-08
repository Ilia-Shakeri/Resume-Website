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

Generated receipts are in ignored qa-artifacts/ and CI artifacts named with the exact source SHA. A local export does not prove public deployment or real-device behavior. Browser emulation does not prove Safari/iOS or screen-reader acceptance.

A source change requires fresh gates. Do not reuse old green logs to accept a newer commit. Hosted smoke requires the newly published commit marker; running it before publishing is expected to fail rather than certify the old site.
