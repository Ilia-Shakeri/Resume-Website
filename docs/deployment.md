# Deployment — Vercel + Arvan DNS

The site is a static Next.js export. Vercel Hobby hosts the HTML, styles, scripts and files. Arvan remains the DNS provider; its cloud/proxy is off for the website records. No VPS or Docker service is needed.

## Source and build

- Source branch: main. Framework: static output (the repository sets framework to null). Next.js remains the page compiler. Root: repository root.
- Node.js: 22.x, matching .nvmrc and package.json.
- Install: npm ci. Build: npm run build. Output: out/.
- Public origin: NEXT_PUBLIC_SITE_URL=https://iliashakeri.ir.
- Keep custom domain iliashakeri.ir connected to Production. Redirect www.iliashakeri.ir to the root with 308.
- The former VPS Deploy workflow is retired. CI stays enabled.

The publishing command uses two export passes: the first generates fresh PDF/OG assets, then the final pass resolves fingerprinted URLs before page-data serialization. It refreshes public repository facts, exports the pages, sets EN/FA document language before scripts, makes a tagged résumé PDF and a dedicated social card, fingerprints public assets, adds per-page script hashes to the content policy, and writes build markers. A system Chrome/Edge is used locally. Linux builds can use the pinned compressed Chromium dev dependency. That browser is build tooling; the published output has no server runtime.

Repository reads are public and send no credential. Unavailable data is hidden; network failures retain dated facts with a cached label. The generated snapshot lives in ignored .generated/, leaving source data unchanged on an ordinary build.

## DNS

Keep the current Arvan nameservers at the registrar. Use the exact values shown in Vercel Settings → Domains; the values recorded for this project at migration were:

| Type | Name | Target | Arvan cloud |
| --- | --- | --- | --- |
| A | @ | 216.198.79.1 | Off / DNS only |
| CNAME | www | 72813636e493a198.vercel-dns-017.com | Off / DNS only |

Remove conflicting web A/AAAA/CNAME records for these names only. Preserve mail and verification records. Vercel manages the HTTPS certificate after DNS validates. Domain registration renewal remains separate from free hosting.

## Publishing and checks

Run npm run check, npm test, npm run check:artifacts and npm run qa:screens. The build refreshes generated assets in out/ automatically. npm run assets also copies the PDF, social card and fully refreshed public facts back into source as fallback assets for review.

Commit and push main after checks. Vercel publishes automatically. CI runs security, regression, browser, artifact and link checks; its public smoke job waits up to ten minutes for that exact commit marker. A failed CI run is not a successful release receipt.

After publish, compare /build.txt and /build-info.json with the commit. Test English, Persian, the PDF, 404 recovery, www redirect, and real Iranian mobile/Wi-Fi access with VPN off.

## Cache and headers

Versioned /assets/ URLs are immutable and cache for one year. The original image/PDF URLs remain compatible aliases and revalidate. HTML revalidates. Build markers use no-store.

vercel.json sets MIME sniffing, referrer, frame, permissions and frame-ancestor rules. Each exported HTML document carries a separate script policy with hashes of its exact inline scripts. Inline script execution is not broadly enabled; inline style attributes remain allowed for the existing UI.

## Rollback and maintenance

Use Vercel rollback to a known tested deployment, or revert the source commit and push. Check the live marker again. Keep a recent known-good artifact receipt and keep the domain renewed.

The weekly maintenance workflow audits locked dependencies and public links. Access-limited links are reported as unverified, not silently called healthy. Repository activity refreshes at publishing time; it does not claim continuous live data.

The files under deploy/ describe the retired VPS arrangement and are retained only as historical reference. Do not apply its IP, proxy, timer or container steps to the current site.
