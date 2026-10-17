// Browser QA against the static export: every page in both languages at three
// widths (overflow, clipping, console errors, screenshots), link and heading
// integrity, the language switch, mobile menu, reduced motion, and the
// animated features. Output: qa-artifacts/ (git-ignored).
import { mkdirSync, readFileSync } from "node:fs";
import { launchBrowser } from "./browser.mjs";
import { startStaticServer } from "./static-server.mjs";

const outDir = "qa-artifacts";
mkdirSync(outDir, { recursive: true });
// The viewports from the review brief: small, standard, modern, and large phones, tablet, laptop, desktop, wide.
const viewports = [[320, 700], [375, 812], [390, 844], [430, 932], [768, 1024], [1024, 768], [1440, 900], [1920, 1080]];
const axeSource = readFileSync("node_modules/axe-core/axe.min.js", "utf8");
const pages = ["", "about/", "projects/", "experience/", "contact/"];
const paths = ["/", "/fa/"].flatMap((prefix) => pages.map((page) => prefix + page));
const failures = [];
const check = (ok, message) => {
  console.log(`${ok ? "PASS" : "FAIL"}  ${message}`);
  if (!ok) failures.push(message);
};

const { server, url } = await startStaticServer("out");
const browser = await launchBrowser();
try {
  for (const path of paths) {
    for (const [width, height] of viewports) {
      // Full-page captures use reduced motion so scroll-revealed sections are all visible.
      const page = await browser.newPage({ viewport: { width, height }, reducedMotion: "reduce" });
      const errors = [];
      page.on("pageerror", (error) => errors.push(error.message));
      page.on("console", (msg) => msg.type() === "error" && errors.push(msg.text()));
      await page.goto(`${url}${path}`, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);
      const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
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
      // Interactive targets at least 24×24 CSS px (WCAG 2.2 AA, 2.5.8); visually hidden skip links excepted.
      const small = await page.evaluate(() =>
        [...document.querySelectorAll("a, button, summary")]
          .filter((el) => !el.closest(".sr-only") && !el.matches(".sr-only, .stretched-link") && el.getClientRects().length)
          .filter((el) => {
            const rect = el.getBoundingClientRect();
            return rect.width < 24 || rect.height < 24;
          })
          .filter((el) => getComputedStyle(el).display !== "inline" || !el.closest("p, li, dd"))
          .map((el) => (el.textContent ?? "").trim().slice(0, 20)),
      );
      const ok = overflow <= 0 && clipped.length === 0 && errors.length === 0 && small.length === 0;
      check(ok, `${path} ${width}px: overflow ${overflow}, clipping ${clipped.join(", ") || "none"}, small targets ${small.join(", ") || "none"}, errors ${errors.join(" | ") || "none"}`);
      if (width === 375 || width === 1440) {
        await page.addScriptTag({ content: axeSource });
        const violations = await page.evaluate(async () =>
          (await window.axe.run(document, { runOnly: ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa", "wcag22aa", "best-practice"] })).violations.map(
            (v) => `${v.id} (${v.nodes.length})`,
          ),
        );
        check(violations.length === 0, `${path} ${width}px: axe WCAG 2.2 AA ${violations.join(", ") || "no violations"}`);
      }
      const name = path.replace(/^\/|\/$/g, "").replace(/\//g, "-") || "home";
      await page.screenshot({ path: `${outDir}/${name}-${width}.png`, fullPage: true });
      await page.close();
    }
  }

  // Structure of every page: one h1 and no skipped heading levels, alt text,
  // same-page anchors resolve, external links open safely, internal links load.
  const internal = new Set();
  const audit = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  for (const path of paths) {
    await audit.goto(`${url}${path}`, { waitUntil: "networkidle" });
    const headings = await audit.$$eval("h1, h2, h3, h4", (nodes) => nodes.map((n) => Number(n.tagName[1])));
    const h1Count = headings.filter((level) => level === 1).length;
    const skips = headings.filter((level, i) => i > 0 && level - headings[i - 1] > 1).length;
    const noAlt = await audit.$$eval("img:not([alt])", (n) => n.length);
    const links = await audit.$$eval("a[href]", (as) => as.map((a) => ({ href: a.href, target: a.target, rel: a.rel })));
    const missing = [];
    for (const link of links) {
      const target = new URL(link.href);
      if (target.origin !== new URL(url).origin) continue;
      if (target.pathname === path && target.hash && !(await audit.$(`[id="${target.hash.slice(1)}"]`))) missing.push(target.hash);
      internal.add(target.pathname + target.hash);
    }
    const unsafe = links.filter((l) => l.href.startsWith("http") && !l.href.startsWith(url) && (l.target !== "_blank" || !l.rel.includes("noopener")));
    check(
      h1Count === 1 && skips === 0 && noAlt === 0 && missing.length === 0 && unsafe.length === 0,
      `${path}: ${h1Count} h1, ${skips} skipped levels, ${noAlt} img without alt, anchors ${missing.join(",") || "ok"}, unsafe external ${unsafe.length}`,
    );
  }
  const broken = [];
  for (const link of internal) {
    const [pathname, hash] = link.split("#");
    const response = await audit.request.get(`${url}${pathname}`);
    if (!response.ok()) broken.push(`${pathname} ${response.status()}`);
    if (hash && response.ok() && !(await response.text()).includes(`id="${hash}"`)) broken.push(`${pathname}#${hash}`);
  }
  check(broken.length === 0, `internal links resolve (${internal.size}) ${broken.join(", ")}`);
  for (const href of [...internal].filter((l) => l.endsWith(".pdf"))) {
    const response = await audit.request.get(`${url}${href}`);
    check(response.headers()["content-type"] === "application/pdf", `résumé download ${href} → ${response.headers()["content-type"]}`);
  }
  for (const href of [...internal].filter((l) => l.startsWith("/certificates/"))) {
    const response = await audit.request.get(`${url}${href}`);
    check(response.headers()["content-type"] === "image/webp", `certificate ${href} → ${response.status()}`);
  }
  for (const path of ["/resume/", "/robots.txt", "/sitemap.xml", "/og-image.png", "/favicon.svg"]) {
    const response = await audit.request.get(`${url}${path}`);
    check(response.ok(), `${path} → ${response.status()}`);
  }
  const sitemap = await (await audit.request.get(`${url}/sitemap.xml`)).text();
  check(paths.every((path) => sitemap.includes(`${path}<`) || sitemap.includes(`${path}"`)), "sitemap lists every page in both languages");
  await audit.close();

  // Persian pages: document language and direction, translated content, hreflang.
  const fa = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await fa.goto(`${url}/fa/projects/`, { waitUntil: "networkidle" });
  const [lang, dir] = await fa.evaluate(() => [document.documentElement.lang, document.documentElement.dir]);
  check(lang === "fa" && dir === "rtl", `/fa/projects/: <html lang="${lang}" dir="${dir}">`);
  const faHeading = await fa.locator("#ventures-title").innerText();
  check(/شاخص/.test(faHeading), `/fa/projects/: Persian content rendered ("${faHeading}")`);
  const hreflang = await fa.$$eval("link[rel='alternate'][hreflang]", (links) => links.map((l) => `${l.hreflang}=${new URL(l.href).pathname}`).sort().join(","));
  check(hreflang.includes("en=/projects/") && hreflang.includes("fa=/fa/projects/"), `/fa/projects/: hreflang alternates (${hreflang})`);
  await fa.close();

  // Project figures: identical with and without JavaScript, and never zero or mid-animation.
  for (const path of ["/", "/projects/", "/fa/", "/fa/projects/"]) {
    const read = async (javaScriptEnabled) => {
      const page = await browser.newPage({ viewport: { width: 1440, height: 900 }, javaScriptEnabled });
      await page.goto(`${url}${path}`, { waitUntil: javaScriptEnabled ? "networkidle" : "load" });
      if (javaScriptEnabled) await page.waitForTimeout(800);
      const values = await page.$$eval("main dd bdi", (els) => els.map((el) => el.textContent.trim()));
      await page.close();
      return values;
    };
    const [withJs, withoutJs] = [await read(true), await read(false)];
    const zero = withJs.filter((value) => /^[0۰]$/.test(value));
    check(
      withJs.length > 0 && withJs.join("|") === withoutJs.join("|") && zero.length === 0,
      `${path}: ${withJs.length} project figures match the static HTML, none zero (${withJs.slice(0, 4).join(" ")})`,
    );
  }

  // Without JavaScript every page keeps its content, contact links, and résumé link visible.
  const noJs = await browser.newPage({ viewport: { width: 375, height: 812 }, javaScriptEnabled: false });
  for (const path of paths) {
    await noJs.goto(`${url}${path}`, { waitUntil: "load" });
    await noJs.waitForTimeout(150);
    const state = await noJs.evaluate(() => ({
      hidden: [...document.querySelectorAll("main [data-reveal], main [data-stagger] > *")].filter((el) => getComputedStyle(el).opacity === "0").length,
      resume: !!document.querySelector("a[href$='.pdf']"),
      mail: !!document.querySelector("a[href^='mailto:']"),
    }));
    check(state.hidden === 0 && state.resume && state.mail, `${path} without JavaScript: ${state.hidden} hidden blocks, résumé link ${state.resume}, email link ${state.mail}`);
  }
  await noJs.close();

  // Language switch keeps the page and the section.
  const sw = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await sw.goto(`${url}/experience/#education`, { waitUntil: "networkidle" });
  await sw.locator("nav.lang-switch a[hreflang='fa']").click();
  await sw.waitForURL("**/fa/experience/#education");
  check(sw.url().endsWith("/fa/experience/#education"), `language switch → ${new URL(sw.url()).pathname}${new URL(sw.url()).hash}`);
  await sw.locator("nav.lang-switch a[hreflang='en']").click();
  await sw.waitForURL((u) => u.pathname === "/experience/");
  check(new URL(sw.url()).pathname === "/experience/", "language switch back to English keeps the page");
  const current = await sw.$eval("header nav a[aria-current='page']", (a) => a.textContent?.trim());
  check(current === "Experience", `header marks the current page (${current})`);
  await sw.close();

  const mobile = await browser.newPage({ viewport: { width: 375, height: 800 } });
  await mobile.goto(`${url}/`, { waitUntil: "networkidle" });
  const toggle = mobile.locator("button[aria-controls='mobile-nav']");
  await toggle.click();
  check((await toggle.getAttribute("aria-expanded")) === "true", "mobile menu opens (aria-expanded=true)");
  check(await mobile.locator("#mobile-nav").isVisible(), "mobile menu panel visible");
  await mobile.waitForTimeout(400);
  await mobile.screenshot({ path: `${outDir}/mobile-menu-open.png` });
  await mobile.keyboard.press("Escape");
  check((await toggle.getAttribute("aria-expanded")) === "false", "Escape closes mobile menu");
  await toggle.click();
  await mobile.locator("#mobile-nav a[href='/projects/']").click();
  await mobile.waitForURL("**/projects/");
  check(new URL(mobile.url()).pathname === "/projects/", "mobile menu link opens the projects page");
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
  const hidden = await reduced.$$eval("[data-reveal], [data-stagger] > *, .enter", (els) => els.filter((el) => getComputedStyle(el).opacity !== "1").length);
  const vtName = await reduced.$eval(".site-header", (el) => getComputedStyle(el).viewTransitionName);
  check(
    parseFloat(duration) < 0.1 && scroll === "auto" && loopPaused && hidden === 0 && vtName === "none",
    `reduced motion: css ${duration}, scroll ${scroll}, loop paused ${loopPaused}, hidden ${hidden}, page transition ${vtName}`,
  );
  await reduced.close();

  // Motion features (normal motion).
  const live = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await live.goto(`${url}/`, { waitUntil: "networkidle" });
  const portrait = await live.$eval("main section img", (img) => img.complete && img.naturalWidth);
  check(portrait > 0, `hero portrait loaded (${portrait}px)`);
  const loop = live.locator("svg[aria-labelledby='devops-loop-title']");
  const t1 = await loop.evaluate((svg) => svg.getCurrentTime());
  await live.waitForTimeout(600);
  const t2 = await loop.evaluate((svg) => svg.getCurrentTime());
  check(t2 > t1 && !(await loop.evaluate((svg) => svg.animationsPaused())), `DevOps loop running (${t1.toFixed(2)}s → ${t2.toFixed(2)}s)`);
  const vt = await live.$eval(".site-header", (el) => getComputedStyle(el).viewTransitionName);
  check(vt === "site-header", `page transitions enabled (${vt})`);
  const card = live.locator("main .spotlight").first();
  await card.hover({ position: { x: 40, y: 30 } });
  const mx = await card.evaluate((el) => el.style.getPropertyValue("--mx"));
  check(Math.abs(parseFloat(mx) - 40) <= 2, `card spotlight follows the pointer (--mx ${mx})`);
  await live.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
  await live.waitForTimeout(300);
  const progress = await live.$eval(".scroll-progress", (el) => new DOMMatrix(getComputedStyle(el).transform).a);
  check(progress > 0.95, `scroll progress bar fills at the bottom (scaleX ${progress.toFixed(2)})`);
  await live.close();

  const about = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await about.goto(`${url}/about/`, { waitUntil: "networkidle" });
  const terminal = about.locator("#about .terminal-live");
  await terminal.scrollIntoViewIfNeeded();
  const before = await terminal.innerText();
  await about.waitForTimeout(1800);
  const after = await terminal.innerText();
  check(before !== after, "about terminal is typing");
  // The whoami panel types only while on screen; the clock appears once it finishes.
  await about.evaluate(() => window.scrollTo(0, 0));
  await about.waitForTimeout(4000);
  const clock = await about.locator("#about dd .tabular-nums").innerText();
  check(/\d{2}:\d{2}:\d{2}/.test(clock), `whoami local clock ticking (${clock})`);
  const farBelow = await about.$eval("#approach ol[data-stagger] > li", (el) => getComputedStyle(el).opacity);
  check(farBelow === "0", `off-screen content hidden before scrolling (opacity ${farBelow})`);
  await about.locator("#expertise").scrollIntoViewIfNeeded();
  await about.waitForTimeout(1200);
  const revealed = await about.$eval("#expertise ul[data-reveal]", (el) => [el.classList.contains("is-visible"), getComputedStyle(el.firstElementChild).opacity]);
  check(revealed[0] && revealed[1] === "1", `section fades in on scroll (opacity ${revealed[1]})`);
  await about.locator("#toolkit summary").click();
  const icons = await about.$$eval("#toolkit svg[role='img']", (els) => els.length);
  const chips = await about.$$eval("#toolkit li li", (els) => els.length);
  check(icons >= 50, `toolkit: ${chips} tools, ${icons} brand icons`);
  await about.close();

  const experience = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await experience.goto(`${url}/experience/`, { waitUntil: "networkidle" });
  await experience.locator("#education").scrollIntoViewIfNeeded();
  await experience.waitForTimeout(1000);
  const row = experience.locator("#education li.group").first();
  await row.hover();
  await experience.waitForTimeout(450);
  const preview = await row.locator("figure").evaluate((el) => [getComputedStyle(el).opacity, el.querySelector("img").naturalWidth]);
  check(preview[0] === "1" && preview[1] > 0, `certificate preview on hover (opacity ${preview[0]}, image ${preview[1]}px)`);
  await experience.screenshot({ path: `${outDir}/certificate-hover.png` });
  await experience.close();

  // Projects: both ventures render; the filter narrows the grid.
  const projects = await browser.newPage({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  await projects.goto(`${url}/projects/`, { waitUntil: "networkidle" });
  const ventures = await projects.$$eval("#ventures > div > div > article", (els) => els.map((el) => el.querySelector("h3")?.textContent));
  check(ventures.length === 3, `featured projects: ${ventures.join(", ")}`);
  const study = projects.locator("#nerkhbaan details");
  await study.locator("summary").click();
  const opened = await study.evaluate((el) => [el.open, el.querySelectorAll("ol li").length, el.querySelectorAll("section").length]);
  check(opened[0] && opened[1] >= 5 && opened[2] >= 5, `case study expands: ${opened[1]} architecture steps, ${opened[2]} sections`);
  const total = await projects.$$eval("#builds [data-category]", (els) => els.filter((el) => !el.hidden).length);
  await projects.locator("#builds button[aria-pressed]", { hasText: "Security" }).click();
  const security = await projects.$$eval("#builds [data-category]", (els) =>
    els.filter((el) => !el.hidden).map((el) => el.dataset.category),
  );
  check(security.length > 0 && security.length < total && security.every((c) => c === "security"), `project filter: ${total} → ${security.length} security`);
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
