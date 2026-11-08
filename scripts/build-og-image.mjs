import { mkdir, readFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { launchBrowser } from "./browser.mjs";
import { startStaticServer } from "./static-server.mjs";
const escape = (value) => String(value).replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
export async function buildOgImage({ output = "out/og-image.png" } = {}) {
  const html = await readFile("out/index.html", "utf8");
  const scripts = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi)];
  const graph = scripts.flatMap((match) => { const value = JSON.parse(match[1]); return value["@graph"] ?? [value]; });
  const person = graph.find((entry) => entry["@type"] === "Person");
  if (!person?.name || !person.jobTitle) throw new Error("Home page lacks Person metadata for the social card");
  const { server, url } = await startStaticServer("out");
  let browser;
  try {
    browser = await launchBrowser();
    await mkdir(path.dirname(output), { recursive: true });
    const page = await browser.newPage({ viewport: { width: 1200, height: 630 }, deviceScaleFactor: 1, reducedMotion: "reduce" });
    await page.goto(url);
    const sheet = [...html.matchAll(/<link\b[^>]*href="([^"]+\.css[^"]*)"[^>]*>/gi)].map((match) => `<link rel="stylesheet" href="${url}${match[1]}">`).join("");
    await page.setContent(`<!doctype html><html lang="en"><head><base href="${url}/">${sheet}<style>*{box-sizing:border-box}body{margin:0;width:1200px;height:630px;background:#0b0e10;color:#cdd0cf;font-family:'Inter Variable',sans-serif;display:flex;align-items:center;padding:74px;gap:60px;border-bottom:8px solid #84bc9c}main{flex:1}small{color:#84bc9c;font-size:22px;letter-spacing:.12em}h1{font-family:'Space Grotesk Variable',sans-serif;font-size:74px;line-height:1.04;letter-spacing:-.045em;margin:28px 0}p{font-size:31px;line-height:1.35;color:#a4aaa9;margin:0}footer{font-size:24px;color:#84bc9c;margin-top:42px}img{width:330px;height:400px;object-fit:cover;border-radius:28px;border:2px solid #84bc9c}</style></head><body><main><small>ENGINEERING · OPERATIONS · DELIVERY</small><h1>${escape(person.name)}</h1><p>${escape(person.jobTitle)}</p><footer>${escape(new URL(person.url).hostname)}</footer></main><img src="${url}/images/ilia-shakeri.webp" alt=""></body></html>`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    await page.locator("img").evaluate((image) => image.decode());
    await page.screenshot({ path: output });
    await page.close();
    console.log(`Social card: ${output} (1200×630)`);
  } finally {
    try { await browser?.close(); }
    finally { await new Promise((resolve) => server.close(resolve)); }
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await buildOgImage();
  await copyFile("out/og-image.png", "public/og-image.png");
}
