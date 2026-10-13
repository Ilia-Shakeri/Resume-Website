// Captures the top of the home page as a 1200×630 social preview image: the
// desktop layout (1440×756 CSS px) rendered at a 1200/1440 device scale.
// Run after `npm run build`; writes public/og-image.png.
import { launchBrowser } from "./browser.mjs";
import { startStaticServer } from "./static-server.mjs";

const { server, url } = await startStaticServer("out");
const browser = await launchBrowser();
try {
  const page = await browser.newPage({
    viewport: { width: 1440, height: 756 },
    deviceScaleFactor: 1200 / 1440,
    reducedMotion: "reduce",
  });
  await page.goto(`${url}/`, { waitUntil: "networkidle" });
  await page.evaluate(() => document.fonts.ready);
  await page.screenshot({ path: "public/og-image.png" });
  console.log("Wrote public/og-image.png");
} finally {
  await browser.close();
  server.close();
}
