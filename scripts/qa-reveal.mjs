import assert from "node:assert/strict";
import { launchBrowser } from "./browser.mjs";
import { startStaticServer } from "./static-server.mjs";
const { server, url } = await startStaticServer("out");
const browser = await launchBrowser();
const effectiveOpacity = (element) => {
  let opacity = 1;
  for (let node = element; node instanceof HTMLElement; node = node.parentElement) opacity *= Number(getComputedStyle(node).opacity);
  return opacity;
};
try {
  const short = await browser.newPage({ viewport: { width: 320, height: 180 } });
  const errors = [];
  short.on("pageerror", (error) => errors.push(error.message));
  await short.goto(url + "/about/", { waitUntil: "networkidle" });
  const first = short.locator("#expertise ul[data-stagger] > li").first();
  await first.scrollIntoViewIfNeeded();
  await short.waitForTimeout(700);
  assert.equal(await first.evaluate(effectiveOpacity), 1, "Fresh short viewport must reveal both card and all its ancestors");
  await short.close();
  const keyboard = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  keyboard.on("pageerror", (error) => errors.push(error.message));
  await keyboard.goto(url + "/about/", { waitUntil: "networkidle" });
  const card = keyboard.locator("#expertise ul[data-stagger] > li").last();
  await card.locator("summary").focus();
  assert.equal(await card.evaluate(effectiveOpacity), 1, "Keyboard focus must reveal the card immediately");
  assert.equal(await card.evaluate((element) => getComputedStyle(element).transitionDuration), "0s");
  await keyboard.evaluate(() => window.scrollTo(0, 0));
  await keyboard.waitForTimeout(100);
  assert(await card.evaluate((element) => element.classList.contains("is-visible") && !element.classList.contains("reveal-pending")));
  assert.deepEqual(errors, []);
  await keyboard.close();
  console.log("Reveal regressions passed: fresh 320×180, ancestor opacity, immediate keyboard focus, one-time state, no browser errors.");
} finally { await browser.close(); await new Promise((resolve) => server.close(resolve)); }
