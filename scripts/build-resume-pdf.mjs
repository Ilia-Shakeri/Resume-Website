// Renders the printable résumé route (/resume/) from the static export into
// public/resume/ilia-shakeri-resume.pdf. Run after `npm run build`, then build
// again so the export contains the fresh PDF and its file size.
import { mkdirSync, statSync } from "node:fs";
import path from "node:path";
import { launchBrowser } from "./browser.mjs";
import { startStaticServer } from "./static-server.mjs";

const output = path.resolve("public/resume/ilia-shakeri-resume.pdf");
mkdirSync(path.dirname(output), { recursive: true });

const { server, url } = await startStaticServer("out");
const browser = await launchBrowser();
try {
  const page = await browser.newPage();
  const response = await page.goto(`${url}/resume/`, { waitUntil: "networkidle" });
  if (!response || !response.ok()) throw new Error(`/resume/ returned ${response?.status()}`);
  await page.evaluate(() => document.fonts.ready);
  await page.emulateMedia({ media: "print" });
  await page.pdf({ path: output, format: "A4", printBackground: true, preferCSSPageSize: true });
  console.log(`Wrote ${path.relative(process.cwd(), output)} (${Math.round(statSync(output).size / 1024)} KB)`);
} finally {
  await browser.close();
  server.close();
}
