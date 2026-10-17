# Deployment — Iran VPS + ArvanCloud

The site is a fully static Next.js export (`out/`). It runs on the Iran VPS next to Dolphin, Nerkhbaan, and wilianshop, behind the existing `edge-nginx-1`, with ArvanCloud handling DNS, CDN, and HTTPS.

```text
push to main ──▶ GitHub Actions: build ──▶ force-push out/ to the `site` branch
                                                    │
Iran VPS: iliashakeri-update.timer (every 2 min) ◀──┘ git fetch (outbound only)
          update-site.sh ──rsync──▶ /opt/iliashakeri/site
                                         │ (read-only mount)
visitor ──HTTPS──▶ ArvanCloud ──80/443──▶ edge-nginx-1 ──▶ iliashakeri-web-1:8080
                                          (conf.d/iliashakeri.conf)   (nginx:1.27-alpine)
```

Why it works this way:

- GitHub Actions can't reliably reach a server inside Iran, but the server can `git fetch` from GitHub (checked: `git ls-remote` works). So the server **pulls** builds; GitHub never connects to it, and no SSH key or secret is stored in GitHub.
- The server never needs Node.js or npm. It only gets finished HTML/CSS/JS.
- `nginx:1.27-alpine` is already on the server (wilianshop uses it), and the configured registry mirror can pull it again if needed.
- Let's Encrypt is unreachable from this VPS, so ArvanCloud issues the HTTPS certificate for visitors. The edge block answers ArvanCloud on both HTTP:80 and HTTPS:443. On 443 it reuses the certificate the edge already mounts for Dolphin.

Files in `deploy/`:

| File | Goes to | Purpose |
| --- | --- | --- |
| `compose.yaml` | `/opt/iliashakeri/` | Site container `iliashakeri-web-1`: read-only, non-root, no published port, on the `iliashakeri-edge` network |
| `nginx.conf` | `/opt/iliashakeri/` | Static serving inside the container: cache headers, security headers, `/healthz` |
| `update-site.sh` | `/opt/iliashakeri/` | Fetches the `site` branch and rsyncs it to `./site` when it changed |
| `iliashakeri-update.service`, `.timer` | `/etc/systemd/system/` | Runs the update script as `deploy` every 2 minutes |
| `edge-iliashakeri.conf` | `/opt/edge/conf.d/iliashakeri.conf` | Routes `iliashakeri.ir` / `www` through `edge-nginx-1` |

---

## 1. GitHub (automatic)

Merging to `main` runs **Actions → Deploy**, which creates or refreshes the `site` branch. The workflow also runs every 6 hours to refresh the GitHub release dates shown on the project cards. Check that the run is green and that the branch exists before step 2. Nothing needs configuring in GitHub.

## 2. VPS setup (one time, as root)

```bash
# Get the deploy files (a shallow clone of main; GitHub is reachable from this VPS).
git clone --depth 1 https://github.com/Ilia-Shakeri/Resume-Website.git /tmp/resume-src

# App directory, owned by the existing deploy user.
install -d -o deploy -g deploy -m 755 /opt/iliashakeri
install -o deploy -g deploy -m 644 /tmp/resume-src/deploy/compose.yaml /tmp/resume-src/deploy/nginx.conf /opt/iliashakeri/
install -o deploy -g deploy -m 755 /tmp/resume-src/deploy/update-site.sh /opt/iliashakeri/

# First pull of the built site (clones the `site` branch into /opt/iliashakeri/repo).
sudo -u deploy /opt/iliashakeri/update-site.sh      # → "published <commit>"

# Shared network between the edge and the site container.
docker network create iliashakeri-edge
docker network connect iliashakeri-edge edge-nginx-1

# Start the site container.
cd /opt/iliashakeri && docker compose up -d
docker ps --filter name=iliashakeri-web-1           # → Up … (healthy) after ~30 s
```

**Make the edge network attachment permanent.** `docker network connect` does not survive recreating `edge-nginx-1`. The edge is defined in `/opt/edge/compose.json`; add the network there. A backup is written first, and the running edge is not restarted:

```bash
cp /opt/edge/compose.json /opt/edge/compose.json.bak.$(date +%Y%m%d-%H%M%S)
python3 - <<'PY'
import json
p = "/opt/edge/compose.json"
c = json.load(open(p))
nets = c["services"]["nginx"]["networks"]
if "iliashakeri" not in nets:
    nets.append("iliashakeri")
c["networks"]["iliashakeri"] = {"external": True, "name": "iliashakeri-edge"}
json.dump(c, open(p, "w"), indent=2)
PY
cd /opt/edge && docker compose -f compose.json config --quiet && echo "compose file valid"
```

## 3. Edge route (one time, as root)

```bash
install -m 600 /tmp/resume-src/deploy/edge-iliashakeri.conf /opt/edge/conf.d/iliashakeri.conf
docker exec edge-nginx-1 nginx -t && docker exec edge-nginx-1 nginx -s reload
sleep 2   # reload is asynchronous; old workers answer for a moment

# Check from the server itself (bypassing ArvanCloud):
curl -s -H 'Host: iliashakeri.ir' http://127.0.0.1/build.txt           # → the deployed commit SHA
curl -s -o /dev/null -w '%{http_code}\n' -H 'Host: iliashakeri.ir' http://127.0.0.1/   # → 200
```

The block relies on the `resolver 127.0.0.11` line that `dolphin.conf` already declares at the http level. If `nginx -t` fails, the old config keeps running; fix it before reloading.

## 4. Automatic updates (one time, as root)

```bash
install -m 644 /tmp/resume-src/deploy/iliashakeri-update.service /tmp/resume-src/deploy/iliashakeri-update.timer /etc/systemd/system/
systemctl daemon-reload
systemctl enable --now iliashakeri-update.timer
systemctl list-timers 'iliashakeri*'                # → next run within 2 minutes
rm -rf /tmp/resume-src
```

From now on: push to `main` → the site is live within about 2–4 minutes. Logs: `journalctl -u iliashakeri-update --since today`.

## 5. ArvanCloud

Menu names may differ slightly in the panel.

1. **Domain:** make sure `iliashakeri.ir` is added in ArvanCloud CDN and shows as active. The nameservers at IRNIC are already done; activation can take a few hours.
2. **DNS records:**
   - `A`  `@`    → the VPS public IP (`87.248.130.63`, if that's this server, as in `dolphin.conf`), **cloud/proxy on**
   - `A`  `www`  → same IP, **cloud/proxy on**
3. **HTTPS (SSL/TLS):**
   - Turn on HTTPS and issue ArvanCloud's free certificate for `iliashakeri.ir` and `www.iliashakeri.ir`.
   - Turn on **redirect HTTP → HTTPS**.
   - **Origin protocol:** HTTP (port 80) or HTTPS (port 443); both work. If ArvanCloud ever returns Dolphin's 400 page for this domain, the 443 part of `/opt/edge/conf.d/iliashakeri.conf` is missing.
4. **Caching:** use the mode that **respects the origin's Cache-Control headers**. The site sends `immutable` for build files and `max-age=0, must-revalidate` for HTML, so new builds appear without purging.
5. **HSTS:** leave off until the site has worked over HTTPS for a few days.

## 6. Verify

```bash
curl -sI https://iliashakeri.ir/ | grep -iE '^HTTP|cache-control|server'
curl -s  https://iliashakeri.ir/build.txt          # same SHA as the latest Deploy run
curl -sI https://www.iliashakeri.ir/ | grep -i location   # → https://iliashakeri.ir/
```

Open the site on Iranian mobile data and from abroad (a VPN, or a friend outside Iran).

Optional: add the repository variable `SMOKE_URL=https://iliashakeri.ir` (GitHub → Settings → Secrets and variables → Actions → Variables). Each Deploy run then waits until the live site serves the new build, and fails if it doesn't within 10 minutes. If ArvanCloud's DDoS protection blocks GitHub's runners, remove the variable.

---

## Day-to-day

| Task | How |
| --- | --- |
| Publish a change | Push to `main`. Run `npm run assets` first when content changed, so the résumé PDF and social image match. |
| See what's live | `curl -s https://iliashakeri.ir/build.txt` |
| Force an update now | `sudo systemctl start iliashakeri-update.service` |
| Roll back | Revert the commit on `main` and push. The next build replaces the `site` branch. |
| Change `deploy/*` files | Not synced automatically: copy them to `/opt/iliashakeri` (and `conf.d` / systemd for those files), then `docker compose up -d` or reload the edge. |
| Pause updates | `sudo systemctl disable --now iliashakeri-update.timer` |

## Security notes

- The site container is read-only, runs as a non-root user with all capabilities dropped, and publishes no port.
- The edge block allows only `GET`/`HEAD` and limits request bodies to 64 KB. The site has no forms or API.
- The updater runs as `deploy` with systemd sandboxing, and can only write `/opt/iliashakeri`. GitHub holds no credentials for this server.
- ArvanCloud → VPS traffic is HTTP or HTTPS, depending on the panel setting. On 443 the edge presents Dolphin's existing certificate, which isn't issued for this domain. ArvanCloud accepted it in testing (17 Oct 2026). The content is public and static either way. To stop visitors bypassing the CDN, allow only ArvanCloud's published IP ranges in the edge block (`allow …; deny all;`), and keep that list up to date.

## Other options

Any static host can serve `out/`; CI publishes it as the `site` artifact on every run. Vercel and similar US platforms are not recommended from Iran (sanctions terms, filtering).
