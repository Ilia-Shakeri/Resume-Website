// Loopback preview for the static export, browser checks, and asset generation.
import { createServer } from "node:http";
import { createReadStream, realpathSync, statSync } from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";
const types = { ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8", ".json": "application/json", ".svg": "image/svg+xml", ".png": "image/png", ".webp": "image/webp", ".woff2": "font/woff2", ".pdf": "application/pdf", ".txt": "text/plain; charset=utf-8", ".xml": "application/xml" };
function contained(base, file) {
  const relative = path.relative(base, file);
  return relative === "" || (!relative.startsWith(`..${path.sep}`) && relative !== ".." && !path.isAbsolute(relative));
}
export function startStaticServer(root, port = 0) {
  const base = realpathSync(path.resolve(root));
  const server = createServer((req, res) => {
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    res.setHeader("X-Frame-Options", "DENY");
    if (!["GET", "HEAD"].includes(req.method)) { res.writeHead(405, { Allow: "GET, HEAD" }).end(); return; }
    let urlPath;
    try {
      urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname).replaceAll("\\", "/");
      if (urlPath.includes("\0")) throw new Error("Invalid path");
    } catch { res.writeHead(400).end("Bad request"); return; }
    let file = path.resolve(base, `.${urlPath}`);
    if (!contained(base, file)) { res.writeHead(403).end("Forbidden"); return; }
    let info;
    try {
      if (statSync(file).isDirectory()) file = path.join(file, "index.html");
      file = realpathSync(file);
      if (!contained(base, file)) { res.writeHead(403).end("Forbidden"); return; }
      info = statSync(file);
      if (!info.isFile()) throw new Error("Not a file");
    } catch {
      res.statusCode = 404;
      file = path.join(base, urlPath.startsWith("/fa/") ? "fa/404.html" : "404.html");
      try {
        file = realpathSync(file);
        if (!contained(base, file)) { res.writeHead(403).end("Forbidden"); return; }
        info = statSync(file);
        if (!info.isFile()) throw new Error("Not a file");
      } catch { res.end("Not found"); return; }
    }
    res.setHeader("Content-Type", types[path.extname(file)] ?? "application/octet-stream");
    res.setHeader("Content-Length", info.size);
    if (req.method === "HEAD") { res.end(); return; }
    const stream = createReadStream(file);
    stream.on("error", () => {
      if (res.headersSent) { res.destroy(); return; }
      res.removeHeader("Content-Length");
      res.setHeader("Content-Type", "text/plain; charset=utf-8");
      res.writeHead(500).end("Preview file unavailable");
    });
    stream.pipe(res);
  });
  return new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(port, "127.0.0.1", () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const port = Number(process.env.PORT || 3000);
  if (!Number.isInteger(port) || port < 0 || port > 65535) throw new Error("PORT must be 0–65535");
  const { server, url } = await startStaticServer("out", port);
  console.log(`Preview: ${url}`);
  for (const signal of ["SIGINT", "SIGTERM"]) process.once(signal, () => server.close());
}
