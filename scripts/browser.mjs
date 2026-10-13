import { existsSync } from "node:fs";
import { chromium } from "playwright-core";

// Prefer an explicit CHROMIUM_PATH, then the Playwright-managed browser that
// cloud sessions pre-install, then a system Chrome/Chromium.
const candidates = [
  process.env.CHROMIUM_PATH,
  "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
  "/usr/bin/chromium",
  "/usr/bin/chromium-browser",
  "/usr/bin/google-chrome",
].filter(Boolean);

export async function launchBrowser() {
  const executablePath = candidates.find((candidate) => existsSync(candidate));
  if (!executablePath) {
    throw new Error("No Chromium found. Set CHROMIUM_PATH to a Chrome/Chromium binary.");
  }
  return chromium.launch({ executablePath });
}
