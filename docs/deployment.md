# Deployment

The site is a fully static Next.js export: `npm run build` writes HTML, CSS, JS, fonts, images, certificates, and the résumé PDF to `out/`. It needs no Node.js runtime, database, or secrets on the server.

## Recommended setup

```text
visitor ──HTTPS──▶ ArvanCloud CDN ──HTTPS──▶ VPS (outside Iran)
                   (edge cache, TLS,          reverse proxy ──▶ nginx container
                    good reach in Iran)                         127.0.0.1:8088
                                                                serves /srv/iliashakeri.ir/site
GitHub (push to main) ──▶ Actions: build ──rsync over SSH──▶ /srv/iliashakeri.ir/site
```

Why this instead of Vercel:

- Vercel's terms and US sanctions rules make an account tied to Iran a risk, and Vercel domains are often filtered inside Iran.
- ArvanCloud serves `.ir` domains well inside Iran and has points of presence abroad for international visitors.
- The VPS outside Iran is reachable from GitHub Actions, so every push to `main` deploys automatically.
- Your VPS inside Iran isn't needed. Keep it for other work, or add it later as a second ArvanCloud origin.

Files in this repository:

| File | Purpose |
| --- | --- |
| `deploy/compose.yaml` | `nginx:1.27-alpine` container, read-only, non-root, bound to `127.0.0.1:8088` |
| `deploy/nginx.conf` | Static serving, cache headers (immutable for `/_next/static/`, revalidate for HTML), security headers, `/healthz` |
| `.github/workflows/deploy.yml` | Builds and rsyncs `out/` to the VPS on every push to `main`. It stays skipped until `DEPLOY_HOST` is set. |

---

## 1. Prepare the VPS (one time)

Run these as your admin user on the **VPS outside Iran**.

```bash
# A deploy user that can only write the site files (no sudo, no docker group).
sudo adduser --disabled-password --gecos "" deploy
sudo install -d -o root -g root -m 755 /srv/iliashakeri.ir
sudo install -d -o deploy -g deploy -m 755 /srv/iliashakeri.ir/site

# Container config, copied from this repository.
cd /srv/iliashakeri.ir
sudo curl -fsSLo compose.yaml https://raw.githubusercontent.com/Ilia-Shakeri/Resume-Website/main/deploy/compose.yaml
sudo curl -fsSLo nginx.conf  https://raw.githubusercontent.com/Ilia-Shakeri/Resume-Website/main/deploy/nginx.conf

sudo docker compose up -d
curl -s http://127.0.0.1:8088/healthz   # → ok   (the site itself returns 404 until the first deploy)
```

If port 8088 is already used, change `127.0.0.1:8088` in `compose.yaml` and in the proxy config below.

`rsync` must be installed on the VPS (`sudo apt install rsync`).

## 2. Deploy key for GitHub Actions

On your own computer:

```bash
ssh-keygen -t ed25519 -f iliashakeri_deploy -N "" -C "github-actions deploy"
ssh-keyscan -p 22 YOUR_VPS_IP > known_hosts_entry   # use your SSH port if it isn't 22
```

On the VPS, authorize the public key for the `deploy` user only:

```bash
sudo install -d -o deploy -g deploy -m 700 /home/deploy/.ssh
echo "PASTE iliashakeri_deploy.pub CONTENT" | sudo tee -a /home/deploy/.ssh/authorized_keys
sudo chown deploy:deploy /home/deploy/.ssh/authorized_keys && sudo chmod 600 /home/deploy/.ssh/authorized_keys
```

In GitHub, go to **Settings → Secrets and variables → Actions**:

| Type | Name | Value |
| --- | --- | --- |
| Secret | `DEPLOY_SSH_KEY` | Contents of `iliashakeri_deploy` (the **private** key) |
| Secret | `DEPLOY_KNOWN_HOSTS` | Contents of `known_hosts_entry` |
| Variable | `DEPLOY_HOST` | VPS IP or SSH hostname. Setting it turns the workflow on. |
| Variable | `DEPLOY_USER` | `deploy` |
| Variable | `DEPLOY_PATH` | `/srv/iliashakeri.ir` |
| Variable | `DEPLOY_PORT` | Only if SSH isn't on 22 |
| Variable | `SMOKE_URL` | `https://iliashakeri.ir`. Set it **after** step 4 works; it makes each deploy check the live site. |

Then run **Actions → Deploy → Run workflow**. Check `curl -s http://127.0.0.1:8088/ | head` on the VPS.

Delete the private key file from your computer once it's stored in GitHub.

## 3. Route the domain on your reverse proxy

Use the block that matches the proxy already running on the VPS.

**Nginx (host or container):**

```nginx
server {
    listen 80;
    listen 443 ssl http2;
    server_name iliashakeri.ir www.iliashakeri.ir;

    ssl_certificate     /etc/letsencrypt/live/iliashakeri.ir/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/iliashakeri.ir/privkey.pem;

    if ($host = www.iliashakeri.ir) { return 301 https://iliashakeri.ir$request_uri; }

    location / {
        proxy_pass http://127.0.0.1:8088;
        proxy_set_header Host $host;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
```

If your Nginx runs in a container, `127.0.0.1` is the container itself. Use `host.docker.internal` (with `extra_hosts: ["host.docker.internal:host-gateway"]`) or put both containers on one Docker network and use `http://web:8080`.

**Caddy:**

```caddyfile
iliashakeri.ir, www.iliashakeri.ir {
    @www host www.iliashakeri.ir
    redir @www https://iliashakeri.ir{uri} permanent
    reverse_proxy 127.0.0.1:8088
}
```

**Traefik:** remove `ports:` from `compose.yaml`, attach the service to Traefik's network, and add labels:

```yaml
    networks: [proxy]          # your Traefik network name
    labels:
      - traefik.enable=true
      - traefik.http.routers.iliashakeri.rule=Host(`iliashakeri.ir`) || Host(`www.iliashakeri.ir`)
      - traefik.http.routers.iliashakeri.entrypoints=websecure
      - traefik.http.routers.iliashakeri.tls.certresolver=letsencrypt   # your resolver name
      - traefik.http.services.iliashakeri.loadbalancer.server.port=8080
networks:
  proxy:
    external: true
```

**Origin certificate:** get the Let's Encrypt certificate **before** turning on the ArvanCloud proxy (step 4.3). While DNS points straight at the VPS, the normal HTTP challenge works. For renewals behind the CDN, check after the first renewal cycle that it still succeeds. If it doesn't, switch to DNS validation using ArvanCloud's DNS API (acme.sh ships an ArvanCloud DNS plugin).

## 4. ArvanCloud CDN and DNS

Menu names below may differ slightly in the ArvanCloud panel.

1. **Add the domain.** Create an ArvanCloud account, go to CDN → Add domain → `iliashakeri.ir`. ArvanCloud shows two nameservers.
2. **Switch nameservers.** At the registrar where you bought `iliashakeri.ir` (for `.ir`, usually nic.ir or a reseller panel), replace the nameservers with ArvanCloud's. Propagation can take a few hours.
3. **DNS records** in ArvanCloud:
   - `A`  `@`   → VPS IP. Leave the proxy/cloud switch **off** until the origin certificate is issued, then turn it **on**.
   - `A` or `CNAME` `www` → same target, proxy **on**.
4. **HTTPS:** enable ArvanCloud's free certificate for `iliashakeri.ir` and `www`, turn on "redirect HTTP to HTTPS", and set the origin protocol to **HTTPS** (your proxy has the Let's Encrypt certificate).
5. **Caching:** use the mode that respects the origin's `Cache-Control` headers. The container already sends `immutable` for build assets and `max-age=0, must-revalidate` for HTML, so new deploys show up without a manual purge.
6. **HSTS:** enable it only after the site has worked over HTTPS for a few days.
7. **Optional hardening:** allow ports 80/443 on the VPS only from ArvanCloud's published IP ranges, so nobody can bypass the CDN.

## 5. Verify

```bash
curl -sI https://iliashakeri.ir/ | grep -iE "^HTTP|cache-control|server"
curl -sI https://iliashakeri.ir/resume/ilia-shakeri-resume.pdf | head -1
curl -s  https://iliashakeri.ir/sitemap.xml | head
```

Open the site from inside Iran (mobile data) and from outside (any VPN or a friend abroad). Then set `SMOKE_URL` so later deploys are checked automatically.

## Day-to-day

- Edit content → push to `main` → **CI** checks it and **Deploy** publishes it, usually in about a minute.
- After content changes, run `npm run assets` locally first so the résumé PDF and social image match.
- Container or Nginx config changes (`deploy/*`) are not synced automatically. Copy the new files to `/srv/iliashakeri.ir` and run `sudo docker compose up -d` on the VPS.
- Roll back: **Actions → Deploy → Run workflow** on an older commit, or revert the commit on `main`.

---

## Other options

- **Vercel / Netlify:** they work technically (import the repo; output is detected), but see the sanctions and filtering note above.
- **Any static host or object storage:** upload `out/`. CI publishes it as the `site` artifact on every run. For a sub-path deployment, set `basePath` in `next.config.ts` first.
- **Self-contained image:** if you'd rather ship an image than rsync files, build one with a `node:22-alpine` build stage running `npm ci && npm run build` and an `nginx:1.27-alpine` stage copying `out/` plus `deploy/nginx.conf`.
