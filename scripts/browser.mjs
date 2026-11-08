import { existsSync } from "node:fs";
import path from "node:path";
import { chromium } from "playwright-core";
export function browserCandidates(env = process.env, platform = process.platform) {
  const candidates = [env.CHROMIUM_PATH, chromium.executablePath()];
  if (platform === "win32") {
    for (const folder of [env.PROGRAMFILES, env["PROGRAMFILES(X86)"], env.LOCALAPPDATA].filter(Boolean)) {
      candidates.push(path.join(folder, "Google/Chrome/Application/chrome.exe"), path.join(folder, "Microsoft/Edge/Application/msedge.exe"));
    }
  } else if (platform === "darwin") {
    candidates.push("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge", "/Applications/Chromium.app/Contents/MacOS/Chromium");
  } else {
    candidates.push("/opt/google/chrome/chrome", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable", "/usr/bin/chromium", "/usr/bin/chromium-browser", "/opt/pw-browsers/chromium-1194/chrome-linux/chrome");
  }
  return [...new Set(candidates.filter(Boolean))];
}
export async function launchBrowser() {
  const executablePath = browserCandidates().find((candidate) => existsSync(candidate));
  if (process.env.CHROMIUM_PATH && !existsSync(process.env.CHROMIUM_PATH)) throw new Error("CHROMIUM_PATH does not exist");
  if (executablePath) return chromium.launch({ executablePath });
  if (process.platform === "linux") {
    const { default: serverChromium } = await import("@sparticuz/chromium");
    return chromium.launch({ executablePath: await serverChromium.executablePath(), args: serverChromium.args, headless: true });
  }
  throw new Error("No browser found. Install Chrome or set CHROMIUM_PATH to Chrome/Chromium.");
}
