import { execSync } from "node:child_process";

/**
 * Commit the site was built from. In GitHub Actions this is GITHUB_SHA, the
 * same value the deploy workflow writes to /build.txt, so the hero terminal
 * shows what `curl https://iliashakeri.ir/build.txt` really returns.
 */
export function buildSha(): string {
  if (process.env.GITHUB_SHA) return process.env.GITHUB_SHA;
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "local-build";
  }
}
