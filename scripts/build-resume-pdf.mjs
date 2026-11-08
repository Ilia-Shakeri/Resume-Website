import { mkdir, stat, writeFile, copyFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { launchBrowser } from "./browser.mjs";
import { startStaticServer } from "./static-server.mjs";
export async function buildResumePdf({ output = "out/resume/ilia-shakeri-resume.pdf", browser: suppliedBrowser } = {}) {
  await mkdir(path.dirname(output), { recursive: true });
  const { server, url } = await startStaticServer("out");
  const browser = suppliedBrowser ?? await launchBrowser();
  try {
    const page = await browser.newPage({ reducedMotion: "reduce" });
    const response = await page.goto(`${url}/resume/`, { waitUntil: "networkidle" });
    if (!response?.ok()) throw new Error(`Résumé route returned ${response?.status()}`);
    await page.evaluate(() => document.fonts.ready);
    await page.emulateMedia({ media: "print" });
    const pdf = await page.pdf({ format: "A4", printBackground: true, preferCSSPageSize: true, tagged: true, outline: true });
    for (const token of ["%PDF-", "/StructTreeRoot", "/MarkInfo", "/ToUnicode"]) if (!pdf.includes(Buffer.from(token))) throw new Error(`PDF missing ${token}`);
    await writeFile(output, pdf);
    await page.close();
    console.log(`Tagged résumé: ${output} (${(await stat(output)).size} bytes)`);
    return pdf.length;
  } finally {
    if (!suppliedBrowser) await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  await buildResumePdf();
  await copyFile("out/resume/ilia-shakeri-resume.pdf", "public/resume/ilia-shakeri-resume.pdf");
}
