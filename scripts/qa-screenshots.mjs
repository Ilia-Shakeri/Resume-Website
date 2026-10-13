// Browser QA against the static export: full-page screenshots at three widths,
// horizontal-overflow detection, anchor/link integrity, mobile menu behaviour,
// reduced-motion check, and résumé download availability.
// Output: qa-artifacts/ (git-ignored).
import { mkdirSync } from "node:fs";
import { launchBrowser } from "./browser.mjs";
import { startStaticServer } from "./static-server.mjs";

const outDir = "qa-artifacts";
mkdirSync(outDir, { recursive: true });
const widths = [375, 768, 1440];
const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${message}`);
  if (!ok) failures.push(message);
};

const { server, url } = await startStaticServer("out");
const browser = await launchBrowser();
try {
  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height: 900 } });
    const errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
    await page.goto(`${url}/`, { waitUntil: "networkidle" });
    await page.evaluate(() => document.fonts.ready);
    const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
    check(overflow <= 0, `${width}px: no horizontal overflow (excess ${overflow}px)`);
    check(errors.length === 0, `${width}px: no console/page errors ${errors.join(" | ")}`);
    await page.screenshot({ path: `${outDir}/home-${width}.png`, fullPage: true });
    await page.close();
  }

  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto(`${url}/`, { waitUntil: "networkidle" });

  const anchors = await page.$$eval("a[href*='#']", (links) =>
    links.map((a) => new URL(a.href).hash.slice(1)).filter(Boolean),
  );
  const missing = [];
  for (const id of new Set(anchors)) {
    if (!(await page.$(`[id="${id}"]`))) missing.push(id);
  }
  check(missing.length === 0, `all in-page anchors resolve (${new Set(anchors).size} targets) ${missing.join(", ")}`);

  const external = await page.$$eval("a[href^='http']", (links) =>
    links.filter((a) => a.target !== "_blank" || !a.rel.includes("noopener")).map((a) => a.href),
  );
  check(external.length === 0, `external links open safely ${external.join(", ")}`);

  const headings = await page.$$eval("h1, h2, h3, h4", (nodes) => nodes.map((n) => Number(n.tagName[1])));
  const h1Count = headings.filter((level) => level === 1).length;
  const skips = headings.filter((level, i) => i > 0 && level - headings[i - 1] > 1).length;
  check(h1Count === 1 && skips === 0, `heading outline: ${h1Count} h1, ${skips} skipped levels`);

  const imagesWithoutAlt = await page.$$eval("img:not([alt])", (n) => n.length);
  check(imagesWithoutAlt === 0, "every <img> has an alt attribute");

  for (const href of await page.$$eval("a[download]", (links) => [...new Set(links.map((a) => a.href))])) {
    const response = await page.request.get(href);
    check(
      response.ok() && response.headers()["content-type"] === "application/pdf",
      `résumé download ${new URL(href).pathname} → ${response.status()} ${response.headers()["content-type"]}`,
    );
  }
  for (const href of await page.$$eval("a[href^='/certificates/']", (links) => links.map((a) => a.href))) {
    const response = await page.request.get(href);
    check(response.ok() && response.headers()["content-type"] === "image/webp", `certificate ${new URL(href).pathname} → ${response.status()}`);
  }
  for (const path of ["/resume/", "/robots.txt", "/sitemap.xml", "/og-image.png", "/favicon.svg"]) {
    const response = await page.request.get(`${url}${path}`);
    check(response.ok(), `${path} → ${response.status()}`);
  }
  await page.close();

  const mobile = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await mobile.goto(`${url}/`, { waitUntil: "networkidle" });
  const toggle = mobile.locator("button[aria-controls='mobile-nav']");
  await toggle.click();
  check((await toggle.getAttribute("aria-expanded")) === "true", "mobile menu opens (aria-expanded=true)");
  check(await mobile.locator("#mobile-nav").isVisible(), "mobile menu panel visible");
  await mobile.screenshot({ path: `${outDir}/mobile-menu-open.png` });
  await mobile.keyboard.press("Escape");
  check((await toggle.getAttribute("aria-expanded")) === "false", "Escape closes mobile menu");
  await toggle.click();
  await mobile.locator("#mobile-nav a[href='/#projects']").click();
  check(!(await mobile.locator("#mobile-nav").isVisible()), "choosing a link closes the menu");
  await mobile.close();

  const keyboard = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await keyboard.goto(`${url}/`, { waitUntil: "networkidle" });
  await keyboard.keyboard.press("Tab");
  const firstFocus = await keyboard.evaluate(() => document.activeElement?.textContent?.trim());
  check(firstFocus === "Skip to content", `first Tab focuses skip link ("${firstFocus}")`);
  await keyboard.close();

  const reduced = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await reduced.goto(`${url}/`, { waitUntil: "networkidle" });
  const duration = await reduced.$eval(".orbit-float", (el) => getComputedStyle(el).animationDuration);
  const scroll = await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  check(parseFloat(duration) < 0.1 && scroll === "auto", `reduced motion: animation ${duration}, scroll-behavior ${scroll}`);
  await reduced.close();

  const resume = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await resume.goto(`${url}/resume/`, { waitUntil: "networkidle" });
  await resume.screenshot({ path: `${outDir}/resume-1440.png`, fullPage: true });
  await resume.close();
} finally {
  await browser.close();
  server.close();
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed.`);
  process.exit(1);
}
console.log("\nAll browser checks passed.");
