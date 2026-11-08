import { spawnSync, execFileSync } from "node:child_process";
import { readFile, writeFile, mkdir, copyFile, cp, mkdtemp, rm } from "node:fs/promises";
import path from "node:path";
import { refreshGithub } from "./github-stats.mjs";
import { filesIn, localizeHtml, secureHtml, fingerprintAssets } from "./build-utils.mjs";
import { buildResumePdf } from "./build-resume-pdf.mjs";
import { buildOgImage } from "./build-og-image.mjs";
import { launchBrowser } from "./browser.mjs";
import { generateToolIcons } from "./build-tool-icons.mjs";
let sha = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA;
if (!sha) { try { sha = execFileSync("git", ["rev-parse", "HEAD"], { encoding: "utf8" }).trim(); } catch { sha = "local-build"; } }
if (sha !== "local-build" && !/^[a-f0-9]{40}$/i.test(sha)) throw new Error("Invalid build commit");
function exportPages(versioned) {
  const result = spawnSync(process.execPath, ["node_modules/next/dist/bin/next", "build"], { stdio: "inherit", env: { ...process.env, GITHUB_SHA: sha, STATIC_ASSET_MANIFEST: versioned ? "1" : "0" } });
  if (result.status !== 0) throw new Error(`Next export failed (${result.status ?? result.error})`);
}
let workingTreeDirty = null;
try { workingTreeDirty = execFileSync("git", ["status", "--porcelain", "--untracked-files=normal"], { encoding: "utf8" }).trim().length > 0; } catch { /* No Git metadata on some static builds. */ }
await refreshGithub();
const sprite = await generateToolIcons();
console.log(`Brand sprite: ${sprite.count} marks`);
if (sprite.missingBrands.length) console.warn(`Neutral fallback: ${sprite.missingBrands.join(", ")}`);
exportPages(false);
const browser = await launchBrowser();
try {
  await buildResumePdf({ browser });
  await buildOgImage({ browser });
} finally { await browser.close(); }
const assets = await fingerprintAssets("out");
await writeFile(".generated/asset-map.json", JSON.stringify(Object.fromEntries(assets), null, 2) + "\n");
const generated = path.resolve(".generated");
const stage = await mkdtemp(path.join(generated, "publish-"));
try {
  await cp("out/assets", path.join(stage, "assets"), { recursive: true });
  await copyFile("out/og-image.png", path.join(stage, "og-image.png"));
  await copyFile("out/resume/ilia-shakeri-resume.pdf", path.join(stage, "resume.pdf"));
  // Generate versioned URLs before serialization. Never rewrite Flight record contents.
  exportPages(true);
  await cp(path.join(stage, "assets"), "out/assets", { recursive: true });
  await copyFile(path.join(stage, "og-image.png"), "out/og-image.png");
  await copyFile(path.join(stage, "resume.pdf"), "out/resume/ilia-shakeri-resume.pdf");
  await mkdir("out/fa", { recursive: true });
  await copyFile("out/404.html", "out/fa/404.html");
  for (const file of (await filesIn("out")).filter((file) => file.endsWith(".html"))) {
    const locale = path.relative("out", file).replaceAll(path.sep, "/").startsWith("fa/") ? "fa" : "en";
    await writeFile(file, secureHtml(localizeHtml(await readFile(file, "utf8"), locale)));
  }
  await writeFile("out/build.txt", sha + "\n");
  await writeFile("out/build-info.json", JSON.stringify({ commit: sha, workingTreeDirty, builtAt: new Date().toISOString(), platform: process.env.VERCEL ? "Vercel" : process.env.CI ? "CI" : "local" }, null, 2) + "\n");
  console.log(`Publish export ready: ${sha}, ${assets.length} versioned assets, EN/FA HTML, fresh tagged PDF and social card.`);
} finally {
  if (path.dirname(stage) !== generated || !path.basename(stage).startsWith("publish-")) throw new Error("Unsafe staging cleanup path");
  await rm(stage, { recursive: true, force: true });
}
