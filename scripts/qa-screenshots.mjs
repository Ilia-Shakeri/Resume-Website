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
  for (const [locale, path] of [["en", "/"], ["fa", "/fa/"]]) {
    for (const width of widths) {
      // Full-page captures use reduced motion so scroll-revealed sections are all visible.
      const page = await browser.newPage({ viewport: { width, height: 900 }, reducedMotion: "reduce" });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
      await page.goto(`${url}${path}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
      check(overflow <= 0, `${locale} ${width}px: no horizontal overflow (excess ${overflow}px)`);
      // overflow-hidden sections hide overflow from scrollWidth, so also look for content
      // pushed past the viewport edge (decorative aria-hidden layers excepted).
      const clipped = await page.evaluate(() =>
        [...document.querySelectorAll("main *:not(svg *)")]
          .filter((el) => !el.closest("[aria-hidden='true']"))
          .filter((el) => {
            const rect = el.getBoundingClientRect();
            return rect.width > 0 && (rect.left < -1 || rect.right > window.innerWidth + 1);
          })
          .map((el) => `${el.tagName.toLowerCase()}${el.id ? `#${el.id}` : ""}`)
          .slice(0, 3),
      );
      check(clipped.length === 0, `${locale} ${width}px: no content clipped at the viewport edge ${clipped.join(", ")}`);
      check(errors.length === 0, `${locale} ${width}px: no console/page errors ${errors.join(" | ")}`);
      await page.screenshot({ path: `${outDir}/${locale === "en" ? "home" : "fa"}-${width}.png`, fullPage: true });
      await page.close();
    }
  }

  // Persian page: document language and direction, translated content, links back.
  const fa = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await fa.goto(`${url}/fa/`, { waitUntil: "networkidle" });
  const [lang, dir] = await fa.evaluate(() => [document.documentElement.lang, document.documentElement.dir]);
  check(lang === "fa" && dir === "rtl", `/fa/: <html lang="${lang}" dir="${dir}">`);
  const faHeading = await fa.locator("#ventures-title").innerText();
  check(/محصولاتی/.test(faHeading), `/fa/: Persian content rendered ("${faHeading.split("\n")[0]}")`);
  const hreflang = await fa.$$eval("link[rel='alternate'][hreflang]", (links) => links.map((l) => l.hreflang).sort().join(","));
  check(hreflang.includes("en") && hreflang.includes("fa"), `/fa/: hreflang alternates (${hreflang})`);
  await fa.close();

  // Language switch keeps the current section.
  const sw = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await sw.goto(`${url}/#experience`, { waitUntil: "networkidle" });
  await sw.locator("nav.lang-switch a[hreflang='fa']").click();
  await sw.waitForURL("**/fa/#experience");
  check(sw.url().endsWith("/fa/#experience"), `language switch → ${new URL(sw.url()).pathname}${new URL(sw.url()).hash}`);
  await sw.locator("nav.lang-switch a[hreflang='en']").click();
  await sw.waitForURL((u) => u.pathname === "/");
  check(new URL(sw.url()).pathname === "/", "language switch back to English");
  await sw.close();

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
  await reduced.waitForTimeout(500);
  const duration = await reduced.$eval(".loop-flow", (el) => getComputedStyle(el).animationDuration);
  const scroll = await reduced.evaluate(() => getComputedStyle(document.documentElement).scrollBehavior);
  const loopPaused = await reduced.$eval("svg[aria-labelledby='devops-loop-title']", (svg) => svg.animationsPaused());
  const hidden = await reduced.$$eval("[data-reveal]", (els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length);
  check(
    parseFloat(duration) < 0.1 && scroll === "auto" && loopPaused && hidden === 0,
    `reduced motion: css ${duration}, scroll ${scroll}, loop paused ${loopPaused}, hidden sections ${hidden}`,
  );
  await reduced.close();

  // Motion features (normal motion).
  const live = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await live.goto(`${url}/`, { waitUntil: "networkidle" });
  const terminal = live.locator("section#top .terminal-live");
  const before = await terminal.innerText();
  await live.waitForTimeout(1800);
  const after = await terminal.innerText();
  check(before !== after, "hero terminal is typing");
  const loop = live.locator("svg[aria-labelledby='devops-loop-title']");
  const t1 = await loop.evaluate((svg) => svg.getCurrentTime());
  await live.waitForTimeout(600);
  const t2 = await loop.evaluate((svg) => svg.getCurrentTime());
  check(t2 > t1 && !(await loop.evaluate((svg) => svg.animationsPaused())), `DevOps loop running (${t1.toFixed(2)}s → ${t2.toFixed(2)}s)`);
  const farBelow = await live.$eval("#contact [data-reveal]", (el) => getComputedStyle(el).opacity);
  check(farBelow === "0", `off-screen section hidden before scrolling (opacity ${farBelow})`);
  await live.locator("#toolkit").scrollIntoViewIfNeeded();
  await live.waitForTimeout(1200);
  const revealed = await live.$eval("#toolkit ul > li[data-reveal]", (el) => [el.classList.contains("is-visible"), getComputedStyle(el).opacity]);
  check(revealed[0] && revealed[1] === "1", `section fades in on scroll (opacity ${revealed[1]})`);
  const icons = await live.$$eval("#toolkit svg[role='img']", (els) => els.length);
  const chips = await live.$$eval("#toolkit li li", (els) => els.length);
  check(icons >= 50, `toolkit: ${chips} tools, ${icons} brand icons`);
  await live.locator("#education").scrollIntoViewIfNeeded();
  await live.waitForTimeout(1000);
  const row = live.locator("#education li.group").first();
  await row.hover();
  await live.waitForTimeout(450);
  const preview = await row.locator("figure").evaluate((el) => [getComputedStyle(el).opacity, el.querySelector("img").naturalWidth]);
  check(preview[0] === "1" && preview[1] > 0, `certificate preview on hover (opacity ${preview[0]}, image ${preview[1]}px)`);
  await live.screenshot({ path: `${outDir}/certificate-hover.png` });
  await live.locator("#about").scrollIntoViewIfNeeded();
  await live.waitForTimeout(2600);
  await live.screenshot({ path: `${outDir}/about-live.png` });
  const clock = await live.locator("#about dd .tabular-nums").innerText();
  check(/\d{2}:\d{2}:\d{2}/.test(clock), `whoami local clock ticking (${clock})`);
  await live.close();

  // Projects: both ventures render; the filter narrows the grid.
  const projects = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await projects.goto(`${url}/`, { waitUntil: "networkidle" });
  const ventures = await projects.$$eval("#projects article", (els) => els.map((el) => el.querySelector("h3")?.textContent));
  check(ventures.length === 2, `ventures: ${ventures.join(", ")}`);
  const total = await projects.$$eval("#builds [data-category]", (els) => els.filter((el) => !el.hidden).length);
  await projects.locator("#builds button[aria-pressed]", { hasText: "Security" }).click();
  const security = await projects.$$eval("#builds [data-category]", (els) =>
    els.filter((el) => !el.hidden).map((el) => el.dataset.category),
  );
  check(security.length > 0 && security.length < total && security.every((c) => c === "security"), `project filter: ${total} → ${security.length} security`);
  await projects.locator("#projects").screenshot({ path: `${outDir}/ventures-1440.png` });
  await projects.close();

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
