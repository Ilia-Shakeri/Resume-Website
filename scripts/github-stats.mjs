// Public repository facts. Failed reads keep an explicit cached/unavailable state.
import { readFile, writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
const owner = "Ilia-Shakeri";
const sourceFile = new URL("../src/content/github.json", import.meta.url);
export function latestStable(tags) {
  return tags.filter((tag) => /^v\d+\.\d+\.\d+$/.test(tag.name))
    .sort((a, b) => {
      const left = a.name.slice(1).split(".").map(Number), right = b.name.slice(1).split(".").map(Number);
      return right[0] - left[0] || right[1] - left[1] || right[2] - left[2];
    })[0];
}
export async function refreshGithub({ output = ".generated/github.json", fetcher = fetch, now = new Date().toISOString() } = {}) {
  const committed = JSON.parse(await readFile(sourceFile, "utf8"));
  let previous = committed;
  try { previous = JSON.parse(await readFile(output, "utf8")); } catch { /* First build uses the committed public snapshot. */ }
  async function api(endpoint) {
    const response = await fetcher(`https://api.github.com${endpoint}`, {
      headers: { Accept: "application/vnd.github+json", "User-Agent": "iliashakeri.ir-build" },
      signal: AbortSignal.timeout(8000),
    });
    if (!response.ok) { const error = new Error(`HTTP ${response.status}`); error.status = response.status; throw error; }
    return response.json();
  }
  const entries = await Promise.all(Object.keys(committed.repos).map(async (name) => {
    const prior = previous.repos[name] ?? committed.repos[name];
    try {
      const repo = await api(`/repos/${owner}/${name}`);
      if (repo.private) throw Object.assign(new Error("Repository unavailable publicly"), { status: 404 });
      const tags = [];
      for (let page = 1; page <= 5; page++) {
        const batch = await api(`/repos/${owner}/${name}/tags?per_page=100&page=${page}`);
        tags.push(...batch);
        if (batch.length < 100) break;
      }
      const stable = latestStable(tags);
      const commit = stable ? await api(`/repos/${owner}/${name}/commits/${stable.commit.sha}`) : null;
      const prerelease = tags.filter((tag) => /^v\d+\.\d+\.\d+-/.test(tag.name))
        .sort((a, b) => b.name.localeCompare(a.name, "en", { numeric: true }))[0];
      return [name, { url: repo.html_url, latestTag: stable?.name ?? null, latestTagDate: commit?.commit.committer.date ?? null,
        latestPrerelease: prerelease?.name ?? null, lastActivity: repo.pushed_at, status: "current", checkedAt: now, lastSuccessfulAt: now }];
    } catch (error) {
      const unavailable = error.status === 404 || error.status === 451;
      console.warn(`github-stats: ${name}: ${unavailable ? "public data unavailable" : "cached facts retained"} (${error.message})`);
      return [name, { ...prior, ...(unavailable ? { latestTag: null, latestTagDate: null, latestPrerelease: null, lastActivity: null } : {}),
        status: unavailable ? "unavailable" : "cached", checkedAt: now, lastSuccessfulAt: Object.hasOwn(prior, "lastSuccessfulAt") ? prior.lastSuccessfulAt : previous.fetchedAt ?? null }];
    }
  }));
  const result = { fetchedAt: now, source: "public GitHub API", repos: Object.fromEntries(entries) };
  await mkdir(path.dirname(path.resolve(output)), { recursive: true });
  await writeFile(output, JSON.stringify(result, null, 2) + "\n");
  console.log(`github-stats: ${entries.filter(([, repo]) => repo.status === "current").length}/${entries.length} public repositories refreshed`);
  return result;
}
if (process.argv[1] && import.meta.url === pathToFileURL(path.resolve(process.argv[1])).href) {
  const outputIndex = process.argv.indexOf("--output");
  await refreshGithub({ output: outputIndex < 0 ? ".generated/github.json" : process.argv[outputIndex + 1] });
}
