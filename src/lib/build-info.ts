import { execSync } from "node:child_process";

/**
 * Source revision shared by the rendered deployment replay and build marker.
 * Hosted builds supply their revision; local builds read the checkout.
 */
export function buildSha(): string {
  const revision = process.env.VERCEL_GIT_COMMIT_SHA || process.env.GITHUB_SHA;
  if (revision && /^[a-f\d]{40}$/i.test(revision)) return revision;
  try {
    return execSync("git rev-parse HEAD", { stdio: ["ignore", "pipe", "ignore"] }).toString().trim();
  } catch {
    return "local-build";
  }
}
