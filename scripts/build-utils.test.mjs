import test from "node:test";
import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { spawnSync } from "node:child_process";
import { latestStable, refreshGithub } from "./github-stats.mjs";
import { localizeHtml, secureHtml, fingerprintAssets } from "./build-utils.mjs";
import { mkdtemp, readFile, rm, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { tmpdir } from "node:os";
test("export locale is present without script and CSP hashes exact executable text", () => {
  const script = "self.example = '<safe>';";
  const input = `<html lang="en"><head><script>${script}</script></head><body></body></html>`;
  const result = secureHtml(localizeHtml(input, "fa"));
  assert.match(result, /<html lang="fa" dir="rtl">/);
  assert(result.includes(createHash("sha256").update(script).digest("base64")));
  assert(!/script-src[^;]*unsafe-inline/.test(result));
  assert(result.indexOf("Content-Security-Policy") < result.indexOf("<script>"));
});
test("latest stable ignores newer previews and compares numeric components", () => {
  assert.equal(latestStable([{ name: "v2.0.0-alpha.6" }, { name: "v1.9.0" }, { name: "v1.10.0" }]).name, "v1.10.0");
});
test("public refresh strips unavailable facts and never sends private credentials", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-stats-"));
  const output = path.join(dir, "snapshot.json");
  try {
    await refreshGithub({ output, now: "2026-11-08T00:00:00Z", fetcher: async (_url, options) => {
      assert(!("Authorization" in options.headers));
      return { ok: false, status: 404 };
    } });
    const data = JSON.parse(await readFile(output, "utf8"));
    assert.equal(data.repos.Nerkhbaan.status, "unavailable");
    assert.equal(data.repos.Nerkhbaan.latestTag, null);
    assert.equal(data.repos.Nerkhbaan.lastActivity, null);
    assert.equal(data.repos.Nerkhbaan.checkedAt, "2026-11-08T00:00:00Z");
  } finally { assert.equal(path.dirname(dir), path.resolve(tmpdir())); assert.match(path.basename(dir), /^resume-stats-/); await rm(dir, { recursive: true, force: true }); }
});

test("asset fingerprinting leaves byte-counted page-data records untouched", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-assets-"));
  try {
    await mkdir(path.join(dir, "images"));
    await writeFile(path.join(dir, "images/portrait.webp"), "HARMLESS IMAGE FIXTURE");
    const payload = JSON.stringify({ image: "/images/portrait.webp", biography: "Long biography ".repeat(100) });
    const record = "6:T" + Buffer.byteLength(payload).toString(16) + "," + payload;
    const html = '<html><head></head><body><script>self.__next_f.push([1,' + JSON.stringify(record) + '])</script></body></html>';
    await writeFile(path.join(dir, "index.html"), html);
    const manifest = await fingerprintAssets(dir);
    assert.equal(await readFile(path.join(dir, "index.html"), "utf8"), html);
    assert.equal(manifest[0][0], "/images/portrait.webp");
    assert.match(manifest[0][1], /^\/assets\/[a-f0-9]{16}\/images\/portrait\.webp$/);
    assert.equal(await readFile(path.join(dir, manifest[0][1].slice(1)), "utf8"), "HARMLESS IMAGE FIXTURE");
  } finally { assert.equal(path.dirname(dir), path.resolve(tmpdir())); assert.match(path.basename(dir), /^resume-assets-/); await rm(dir, { recursive: true, force: true }); }
});
test("failed refresh keeps an explicit absent successful-read timestamp absent", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-stats-"));
  const output = path.join(dir, "snapshot.json");
  try {
    await writeFile(output, JSON.stringify({ fetchedAt: "2026-11-08T00:00:00Z", repos: { Nerkhbaan: { url: "https://github.com/Ilia-Shakeri/Nerkhbaan", latestTag: null, latestTagDate: null, lastActivity: null, lastSuccessfulAt: null } } }));
    const result = await refreshGithub({ output, fetcher: async () => ({ ok: false, status: 503 }) });
    assert.equal(result.repos.Nerkhbaan.lastSuccessfulAt, null);
    assert.equal(result.repos.Nerkhbaan.status, "cached");
  } finally { assert.equal(path.dirname(dir), path.resolve(tmpdir())); assert.match(path.basename(dir), /^resume-stats-/); await rm(dir, { recursive: true, force: true }); }
});

test("fallback sync saves public facts without live status and preserves good snapshot on failed reads", async () => {
  const dir = await mkdtemp(path.join(tmpdir(), "resume-sync-"));
  const command = path.resolve("scripts/sync-assets.mjs");
  const run = () => { const result = spawnSync(process.execPath, [command], { cwd: dir, encoding: "utf8" }); assert.equal(result.status, 0, result.stderr); };
  try {
    for (const folder of ["out/resume", "public/resume", "src/content", ".generated"]) await mkdir(path.join(dir, folder), { recursive: true });
    await writeFile(path.join(dir, "out/resume/ilia-shakeri-resume.pdf"), "FRESH PDF FIXTURE");
    await writeFile(path.join(dir, "out/og-image.png"), "FRESH IMAGE FIXTURE");
    const fact = { url: "https://github.com/Ilia-Shakeri/Nerkhbaan", latestTag: "v2.8.19", latestTagDate: "2026-10-28T00:00:00Z", latestPrerelease: null, lastActivity: "2026-11-08T00:00:00Z", lastSuccessfulAt: "2026-11-08T00:00:00Z", checkedAt: "2026-11-08T00:00:00Z", status: "current" };
    const snapshot = { fetchedAt: "2026-11-08T00:00:00Z", source: "public GitHub API", repos: { Nerkhbaan: fact, Stackplore: fact, Dolphin: fact } };
    const generated = path.join(dir, ".generated/github.json"), source = path.join(dir, "src/content/github.json");
    await writeFile(generated, JSON.stringify(snapshot));run();
    const savedText = await readFile(source, "utf8"), saved = JSON.parse(savedText);
    assert.deepEqual(Object.keys(saved.repos).sort(), ["Nerkhbaan", "Stackplore"]);
    assert.equal(saved.repos.Nerkhbaan.latestTag, fact.latestTag);
    assert(!("status" in saved.repos.Nerkhbaan));assert(!("checkedAt" in saved.repos.Nerkhbaan));
    assert.equal(await readFile(path.join(dir, "public/resume/ilia-shakeri-resume.pdf"), "utf8"), "FRESH PDF FIXTURE");
    snapshot.repos.Nerkhbaan = { ...fact, status: "cached", checkedAt: "2026-11-09T00:00:00Z" };
    await writeFile(generated, JSON.stringify(snapshot));run();
    assert.equal(await readFile(source, "utf8"), savedText);
  } finally { assert.equal(path.dirname(dir), path.resolve(tmpdir()));assert.match(path.basename(dir), /^resume-sync-/);await rm(dir, { recursive: true, force: true }); }
});
