import { copyFile, readFile, writeFile } from "node:fs/promises";
for (const asset of ["resume/ilia-shakeri-resume.pdf", "og-image.png"]) await copyFile(`out/${asset}`, `public/${asset}`);
const snapshot = JSON.parse(await readFile(".generated/github.json", "utf8"));
const publicRepos = Object.entries(snapshot.repos).filter(([name]) => ["Nerkhbaan", "Stackplore"].includes(name));
const repos = Object.fromEntries(publicRepos.map(([name, repo]) => [name, {
  url: repo.url,
  latestTag: repo.latestTag,
  latestTagDate: repo.latestTagDate,
  latestPrerelease: repo.latestPrerelease,
  lastActivity: repo.lastActivity,
  lastSuccessfulAt: repo.lastSuccessfulAt,
}]));
// A committed fallback is saved evidence, never a new live-read receipt.
if (publicRepos.length && publicRepos.every(([, repo]) => repo.status === "current")) await writeFile("src/content/github.json", JSON.stringify({ ...snapshot, repos }, null, 2) + "\n");
else console.warn("Committed repository fallback kept: not every public read succeeded.");
console.log("Committed fallback assets now match the fresh export.");
