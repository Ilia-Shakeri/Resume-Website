# Deployment

The site is a fully static Next.js export (`output: "export"`). `npm run build` writes plain HTML, CSS, JS, fonts, images, and the résumé PDF to `out/`. No Node.js server, database, or API keys are needed at runtime, and the browser makes no GitHub API calls.

## Configuration

| Variable | When | Purpose |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | build time | Public origin, e.g. `https://iliashakeri.dev` (no trailing slash). Enables canonical tags and absolute URLs in Open Graph, `sitemap.xml`, and `robots.txt`. Leave unset until the domain is decided; the site still works. |

Copy `.env.example` to `.env.local` for local builds. Nothing secret is required.

## Option 1 — Vercel (simplest)

1. Import `Ilia-Shakeri/Resume-Website` in Vercel. Framework preset: **Next.js** (auto-detected).
2. Build command `npm run build`; output is detected automatically for static export.
3. Add `NEXT_PUBLIC_SITE_URL` under *Settings → Environment Variables* once the domain is attached.
4. Every push to `main` deploys; pull requests get preview URLs.

The free Hobby tier is enough. Nothing has been deployed or configured on any platform yet.

## Option 2 — Self-hosted Nginx

```bash
npm ci
NEXT_PUBLIC_SITE_URL=https://example.com npm run build
rsync -a --delete out/ deploy@server:/var/www/portfolio/
```

```nginx
server {
    listen 443 ssl http2;
    server_name example.com;
    root /var/www/portfolio;

    # TLS: ssl_certificate / ssl_certificate_key from certbot or your CA.

    add_header X-Content-Type-Options nosniff always;
    add_header Referrer-Policy strict-origin-when-cross-origin always;
    add_header X-Frame-Options DENY always;

    location /_next/static/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }

    location / {
        try_files $uri $uri/ $uri.html =404;
    }

    error_page 404 /404.html;
}
```

`trailingSlash: true` means each route is a directory with `index.html` (`/resume/index.html`), which `try_files $uri/` serves directly.

## Option 3 — Container

```dockerfile
FROM node:22-alpine AS build
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci
COPY . .
ARG NEXT_PUBLIC_SITE_URL
RUN npm run build

FROM nginx:1.27-alpine
COPY --from=build /app/out /usr/share/nginx/html
```

Pin the base images by digest for production use.

## Option 4 — GitHub Pages / any static host

Upload the contents of `out/` (CI already publishes it as the `site` artifact on every run). For a project page served from a sub-path (`/Resume-Website/`), add `basePath` to `next.config.ts` first; a custom domain or user page needs no change.

## Regenerating the résumé PDF and social image

The PDF and `og-image.png` are committed so CI and hosts don't need a browser. After changing content:

```bash
npm run assets   # build → render PDF → capture OG image → build again
```

This needs a local Chrome/Chromium. Set `CHROMIUM_PATH` if it is not in a standard location.
