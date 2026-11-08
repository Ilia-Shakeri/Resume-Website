import assert from "node:assert/strict";
import { setTimeout as pause } from "node:timers/promises";
const origin = (process.env.SMOKE_URL || "https://iliashakeri.ir").replace(/\/$/, "");
const expected = process.env.EXPECTED_SHA || process.env.GITHUB_SHA;
const waitMs = process.env.CI && expected ? 600000 : 0;
const started = Date.now();
let marker;
do {
  try {
    const response = await fetch(`${origin}/build.txt?verify=${Date.now()}`, { cache: "no-store", signal: AbortSignal.timeout(10000) });
    marker = response.ok ? (await response.text()).trim() : `HTTP ${response.status}`;
    if ((!expected && /^[a-f0-9]{40}$/i.test(marker)) || marker === expected) break;
  } catch (error) { marker = error.message; }
  if (Date.now() - started >= waitMs) throw new Error(`Live build mismatch: expected ${expected || "commit marker"}, got ${marker}`);
  await pause(15000);
} while (true);
const info = await (await fetch(origin + "/build-info.json", { signal: AbortSignal.timeout(10000) })).json();
assert.equal(info.commit, marker);
for (const pathname of ["/", "/fa/", "/projects/", "/fa/projects/", "/resume/", "/sitemap.xml", "/robots.txt", "/resume/ilia-shakeri-resume.pdf", "/og-image.png"]) {
  const response = await fetch(origin + pathname, { signal: AbortSignal.timeout(15000) });
  assert.equal(response.status, 200, pathname);
  if (pathname === "/") {
    assert.equal(response.headers.get("x-content-type-options"), "nosniff");
    assert.equal(response.headers.get("x-frame-options"), "DENY");
    assert(response.headers.get("content-security-policy")?.includes("frame-ancestors 'none'"));
  }
  if (pathname === "/fa/" || pathname === "/fa/projects/") assert.match(await response.text(), /<html[^>]*lang="fa"[^>]*dir="rtl"/);
  if (pathname.endsWith(".pdf")) {
    assert(response.headers.get("content-type")?.startsWith("application/pdf"));
    const bytes = Buffer.from(await response.arrayBuffer());
    assert(bytes.length > 1000 && bytes.subarray(0, 5).toString() === "%PDF-");
  }
  if (pathname.endsWith(".png")) {
    assert(response.headers.get("content-type")?.startsWith("image/png"));
    const bytes = Buffer.from(await response.arrayBuffer());
    assert.equal(bytes.readUInt32BE(16), 1200);
    assert.equal(bytes.readUInt32BE(20), 630);
  }
}
for (const pathname of ["/missing-audit-page/", "/fa/missing-audit-page/"]) {
  const response = await fetch(origin + pathname, { signal: AbortSignal.timeout(10000) });
  assert.equal(response.status, 404, pathname);
  assert((await response.text()).includes('href="/fa/"'));
}
const redirect = await fetch("https://www." + new URL(origin).host + "/", { redirect: "manual", signal: AbortSignal.timeout(10000) });
assert([301, 308].includes(redirect.status));
assert.equal(redirect.headers.get("location"), origin + "/");
console.log(`Live smoke passed for exact commit ${marker}; HTTPS, headers, EN/FA routes, assets, 404 and www checked.`);
