// Refreshes src/content/github.json with each featured repository's latest
// release tag and last activity, read from the GitHub REST API. The deploy
// workflow runs this before every build (and on a schedule), so the figures on
// /projects/ follow GitHub without a code change. If GitHub cannot be reached,
// the last known values are kept and the build continues.
import { readFileSync, writeFileSync } from "node:fs";

const OWNER = "Ilia-Shakeri";
const FILE = new URL("../src/content/github.json", import.meta.url);
const previous = JSON.parse(readFileSync(FILE, "utf8"));
const headers = {
  Accept: "application/vnd.github+json",
  "User-Agent": "iliashakeri.ir-build",
  ...(process.env.GITHUB_TOKEN ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` } : {}),
};

async function api(path) {
  const response = await fetch(`https://api.github.com${path}`, { headers, signal: AbortSignal.timeout(15000) });
  if (!response.ok) throw new Error(`${path}: HTTP ${response.status}`);
  return response.json();
}

/** Highest vMAJOR.MINOR.PATCH tag; other tags (release candidates, etc.) are ignored. */
function latestSemver(tags) {
  const parsed = tags
    .map((tag) => ({ tag, parts: /^v(\d+)\.(\d+)\.(\d+)$/.exec(tag.name)?.slice(1).map(Number) }))
    .filter((entry) => entry.parts);
  parsed.sort((a, b) => b.parts[0] - a.parts[0] || b.parts[1] - a.parts[1] || b.parts[2] - a.parts[2]);
  return parsed[0]?.tag;
}

const repos = { ...previous.repos };
let refreshed = 0;
for (const name of Object.keys(previous.repos)) {
  try {
    const repo = await api(`/repos/${OWNER}/${name}`);
    const tags = [];
    for (let page = 1; page <= 5; page += 1) {
      const batch = await api(`/repos/${OWNER}/${name}/tags?per_page=100&page=${page}`);
      tags.push(...batch);
      if (batch.length < 100) break;
    }
    const tag = latestSemver(tags);
    const tagCommit = tag ? await api(`/repos/${OWNER}/${name}/commits/${tag.commit.sha}`) : null;
    repos[name] = {
      url: repo.html_url,
      latestTag: tag?.name ?? null,
      latestTagDate: tagCommit?.commit.committer.date ?? null,
      lastActivity: repo.pushed_at,
    };
    refreshed += 1;
  } catch (error) {
    console.warn(`github-stats: keeping previous data for ${name} (${error.message})`);
  }
}

if (refreshed > 0) {
  writeFileSync(FILE, `${JSON.stringify({ fetchedAt: new Date().toISOString(), source: "GitHub API", repos }, null, 2)}\n`);
}
console.log(`github-stats: refreshed ${refreshed}/${Object.keys(repos).length} repositories`);
