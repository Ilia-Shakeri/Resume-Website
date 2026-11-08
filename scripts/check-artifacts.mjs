import assert from "node:assert/strict";
import { readFile, mkdir, writeFile } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import { getDocument } from "pdfjs-dist/legacy/build/pdf.mjs";
import { filesIn } from "./build-utils.mjs";
const bytes = await readFile("out/resume/ilia-shakeri-resume.pdf");
const pdf = await getDocument({ data: new Uint8Array(bytes), isEvalSupported: false, useSystemFonts: false }).promise;
assert(pdf.numPages >= 1 && pdf.numPages <= 3, `Unexpected résumé length: ${pdf.numPages}`);
const structure = await pdf.getMarkInfo();
assert.equal(structure?.Marked, true, "Résumé must be tagged");
const outline = await pdf.getOutline();
assert(outline?.length, "Résumé needs document outline");
const texts = [], links = [], firstPageLinks = [];
for (let number = 1; number <= pdf.numPages; number++) {
  const page = await pdf.getPage(number);
  const text = await page.getTextContent();
  texts.push(text.items.map((item) => (item.str ?? "") + (item.hasEOL ? "\n" : "")).join(""));
  const pageLinks = (await page.getAnnotations()).filter((annotation) => annotation.subtype === "Link").map((annotation) => annotation.url);
  links.push(...pageLinks);
  if (number === 1) firstPageLinks.push(...pageLinks);
}
const text = texts.join("\n");
assert(text.includes("Ilia Shakeri"));
assert(/DevOps/i.test(text));
assert(text.includes("iliashkr@gmail.com"));
assert(text.includes("Prometheus & Jira to Matrix bridges"), "Printable ChatOps heading needs readable words without a host fallback glyph");
assert(!/\b(?:NaN|undefined|null)\b/.test(text));
assert(links.some((url) => url?.includes("github.com/Ilia-Shakeri")));
assert(links.some((url) => url?.includes("linkedin.com")));
assert(links.includes("mailto:iliashkr@gmail.com"));
const portfolioOrigin = new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://iliashakeri.ir").origin;
assert(firstPageLinks.some((href) => {
  try {
    const url = new URL(href);
    return url.origin === portfolioOrigin && url.pathname === "/" && !url.hash;
  } catch { return false; }
}), "PDF header needs a clickable portfolio home link");
assert(links.includes(`${portfolioOrigin}/experience/#work-samples`), "PDF needs a direct link to the engineering samples");
assert(links.includes("https://iliashakeri.ir/projects/#dolphin-crm"));
assert(!links.some((url) => /^https:\/\/github\.com\/Ilia-Shakeri\/Dolphin(?:\/|$)/.test(url)), "Private source must not be a public résumé link");
const language = bytes.toString("latin1").match(/\/Lang\s*\(([^)]+)\)/)?.[1];
assert.match(language ?? "", /^en(?:[-_].+)?$/, "PDF catalog needs English language");
await pdf.destroy();
let spriteUses = 0;
for (const file of (await filesIn("out")).filter((file) => file.endsWith(".html"))) {
  const html = await readFile(file, "utf8");
  const fa = file.replaceAll("\\", "/").includes("/fa/");
  assert.match(html, fa ? /<html[^>]*lang="fa"[^>]*dir="rtl"/ : /<html[^>]*lang="en"[^>]*dir="ltr"/, file);
  assert(html.includes('http-equiv="Content-Security-Policy"'), file);
  assert(!/script-src[^;]*unsafe-inline/.test(html), file);
  for (const use of html.matchAll(/<use\b[^>]*href="([^"]+)"/gi)) {
    const [asset, symbol] = use[1].split("#");
    if (!asset) continue;
    assert(asset.startsWith("/assets/"), "External tool sprite must be versioned");
    assert(symbol && /^[a-zA-Z0-9_-]+$/.test(symbol));
    const svg = await readFile(path.join("out", asset.slice(1)), "utf8");
    assert(svg.includes('id="' + symbol + '"'), "Missing sprite symbol " + symbol);
    spriteUses++;
  }
}
const manifest = JSON.parse(await readFile(".generated/asset-map.json", "utf8"));
for (const [original, versioned] of Object.entries(manifest)) {
  assert.match(versioned, /^\/assets\/[a-f0-9]{16}\//);
  const originalBytes = await readFile(path.join("out", original.slice(1)));
  const versionedBytes = await readFile(path.join("out", versioned.slice(1)));
  assert(originalBytes.equals(versionedBytes), original + " must match its fresh versioned alias");
  assert.equal(versioned.split("/")[2], createHash("sha256").update(versionedBytes).digest("hex").slice(0, 16));
}
if (manifest["/images/tool-icons.svg"]) assert(spriteUses > 0, "Generated tool sprite must be used by page icons");
const png = await readFile("out/og-image.png");
assert.equal(png.readUInt32BE(16), 1200);
assert.equal(png.readUInt32BE(20), 630);
await mkdir("qa-artifacts", { recursive: true });
await writeFile("qa-artifacts/resume-extracted.txt", text + "\n");
await writeFile("qa-artifacts/artifact-check.json", JSON.stringify({ pages: texts.length, tagged: true, outline: true, textCharacters: text.length, links, socialCard: [1200, 630] }, null, 2));
console.log(`Artifacts passed: ${texts.length}-page tagged résumé, outline, readable text, contact links, locale HTML, CSP, 1200×630 social card.`);
