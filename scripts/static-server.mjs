// Minimal static file server for the exported site in `out/`. Used by the QA
// and PDF scripts so they need no extra dependency. Not for production use.
import { createServer } from "node:http";
import { createReadStream, statSync } from "node:fs";
import path from "node:path";

const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".webp": "image/webp",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".txt": "text/plain; charset=utf-8",
  ".xml": "application/xml",
};

export function startStaticServer(root, port = 0) {
  const base = path.resolve(root);
  const server = createServer((req, res) => {
    const urlPath = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
    let file = path.join(base, urlPath);
    if (!file.startsWith(base)) {
      res.writeHead(403).end();
      return;
    }
    try {
      if (statSync(file).isDirectory()) file = path.join(file, "index.html");
      statSync(file);
    } catch {
      file = path.join(base, "404.html");
      res.statusCode = 404;
    }
    res.setHeader("Content-Type", types[path.extname(file)] ?? "application/octet-stream");
    createReadStream(file).pipe(res);
  });
  return new Promise((resolve) => {
    server.listen(port, "127.0.0.1", () => resolve({ server, url: `http://127.0.0.1:${server.address().port}` }));
  });
}
