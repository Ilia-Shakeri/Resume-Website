import test from "node:test";
import assert from "node:assert/strict";
import { mkdtemp, mkdir, writeFile, rm, symlink } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import http from "node:http";
import { startStaticServer } from "./static-server.mjs";
import { browserCandidates } from "./browser.mjs";
const request = (url, requestPath, method = "GET") => new Promise((resolve, reject) => {
  const origin = new URL(url);
  const req = http.request({ hostname: origin.hostname, port: origin.port, path: requestPath, method }, (res) => {
    const chunks = []; res.on("data", (chunk) => chunks.push(chunk)); res.on("end", () => resolve({ status: res.statusCode, body: Buffer.concat(chunks).toString(), headers: res.headers }));
  });
  req.on("error", reject); req.end();
});
test("preview confines paths, survives malformed input, preserves HEAD/404 and handles method", async (t) => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-preview-"));
  const root = path.join(dir, "site"), sibling = path.join(dir, "site-sibling");
  await mkdir(root); await mkdir(sibling); await mkdir(path.join(root, "fa"));
  await writeFile(path.join(root, "index.html"), "HOME");
  await writeFile(path.join(root, "404.html"), "MISSING EN FA");
  await writeFile(path.join(root, "fa/404.html"), "MISSING FA");
  await writeFile(path.join(sibling, "probe.txt"), "PRIVATE FIXTURE");
  const { server, url } = await startStaticServer(root);
  t.after(async () => { await new Promise((resolve) => server.close(resolve)); assert.equal(path.dirname(dir), path.resolve(tmpdir())); assert.match(path.basename(dir), /^resume-preview-/); await rm(dir, { recursive: true, force: true }); });
  assert.equal((await request(url, "/%2e%2e%2fsite-sibling/probe.txt")).status, 403);
  assert.equal((await request(url, "/%2e%2e%5csite-sibling/probe.txt")).status, 403);
  assert.equal((await request(url, "/%E0%A4%A")).status, 400);
  assert.equal((await request(url, "/%00")).status, 400);
  assert.equal((await request(url, "/?query=%E0%A4%A")).body, "HOME");
  const head = await request(url, "/", "HEAD");
  assert.equal(head.status, 200); assert.equal(head.body, ""); assert.equal(head.headers["content-length"], "4");
  assert.equal((await request(url, "/missing")).status, 404);
  assert.equal((await request(url, "/fa/missing")).body, "MISSING FA");
  assert.equal((await request(url, "/", "POST")).status, 405);
  assert.equal((await request(url, "/")).body, "HOME");
  try {
    await symlink(sibling, path.join(root, "escape"), process.platform === "win32" ? "junction" : "dir");
    assert.equal((await request(url, "/escape/probe.txt")).status, 403);
  } catch (error) { if (!["EPERM", "EACCES"].includes(error.code)) throw error; t.diagnostic("Symlink creation denied by OS; remaining confinement checks passed"); }
});
test("browser discovery lists system paths for all supported OS families", () => {
  assert(browserCandidates({ PROGRAMFILES: "C:/Program Files" }, "win32").some((candidate) => candidate.endsWith("chrome.exe")));
  assert(browserCandidates({}, "darwin").includes("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"));
  assert(browserCandidates({}, "linux").includes("/opt/google/chrome/chrome"));
});
