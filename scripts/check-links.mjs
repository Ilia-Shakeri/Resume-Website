import { readFile, mkdir, writeFile } from "node:fs/promises";
import { filesIn } from "./build-utils.mjs";
const liveIndex = process.argv.indexOf("--live");
const live = liveIndex >= 0 ? (process.argv[liveIndex + 1] || "https://iliashakeri.ir") : null;
const paths = ["/", "/about/", "/projects/", "/experience/", "/contact/", "/fa/", "/fa/about/", "/fa/projects/", "/fa/experience/", "/fa/contact/"];
const htmlFiles = live ? await Promise.all(paths.map(async (pathname) => { const response = await fetch(live + pathname, { signal: AbortSignal.timeout(15000) }); if (!response.ok) throw new Error(`${pathname}: ${response.status}`); return response.text(); })) : await Promise.all((await filesIn("out")).filter((file) => file.endsWith(".html")).map((file) => readFile(file, "utf8")));
const origin = new URL(live || process.env.NEXT_PUBLIC_SITE_URL || "https://iliashakeri.ir").origin;
const urls = [...new Set(htmlFiles.flatMap((html) => [...html.matchAll(/<a\b[^>]*href="([^"]+)"/gi)].map((match) => match[1].replaceAll("&amp;", "&"))).filter((url) => /^https?:\/\//.test(url) && new URL(url).origin !== origin))];
const results = [];
async function check(url) {
  try {
    let response = await fetch(url, { method: "HEAD", redirect: "follow", signal: AbortSignal.timeout(15000), headers: { "User-Agent": "portfolio-link-check" } });
    if ([405, 501].includes(response.status) || response.status >= 500) response = await fetch(url, { redirect: "follow", signal: AbortSignal.timeout(15000) });
    let validationMethod = "web-response";
    const parsed = new URL(url), segments = parsed.pathname.split("/").filter(Boolean);
    if (parsed.hostname === "github.com" && segments.length >= 1 && segments.length <= 2 && !response.ok) {
      const endpoint = segments.length === 1 ? "users/" + segments[0] : "repos/" + segments.join("/");
      response = await fetch("https://api.github.com/" + endpoint, { signal: AbortSignal.timeout(15000), headers: { Accept: "application/vnd.github+json", "User-Agent": "portfolio-link-check" } });
      validationMethod = segments.length === 1 ? "profile-api" : "repository-api";
    }
    const state = [404, 410].includes(response.status) ? "broken" : response.ok ? "ok" : "unverified";
    results.push({ url, status: response.status, state, validationMethod });
  } catch (error) { results.push({ url, state: "unverified", error: error.message }); }
}
for (let index = 0; index < urls.length; index += 3) await Promise.all(urls.slice(index, index + 3).map(check));
await mkdir("qa-artifacts", { recursive: true });
await writeFile("qa-artifacts/link-check.json", JSON.stringify(results, null, 2) + "\n");
for (const result of results.filter((entry) => entry.state !== "ok")) console.log(`${result.state.toUpperCase()} ${result.url}: ${result.status ?? result.error}`);
const count = (state) => results.filter((entry) => entry.state === state).length;
console.log(`External links: ${count("ok")} verified, ${count("broken")} broken, ${count("unverified")} unverified (access/network limits).`);
if (count("broken")) process.exitCode = 1;
