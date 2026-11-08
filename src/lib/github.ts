import committed from "@/content/github.json";
import { readFileSync } from "node:fs";
import path from "node:path";
import type { Locale } from "@/content/types";
export type RepoActivity = {
  url: string; latestTag: string | null; latestTagDate: string | null; lastActivity: string | null;
  latestPrerelease?: string | null; status?: "current" | "cached" | "unavailable"; checkedAt?: string; lastSuccessfulAt?: string | null;
};
type Snapshot = { fetchedAt: string; repos: Record<string, RepoActivity> };
let data: Snapshot = committed;
try { data = JSON.parse(readFileSync(path.join(process.cwd(), ".generated/github.json"), "utf8")) as Snapshot; } catch { /* Development can use the dated committed public snapshot. */ }
export function repoActivity(name: string | undefined): RepoActivity | undefined {
  const repo = name ? data.repos[name] : undefined;
  return repo ? {
    ...repo,
    status: repo.status ?? "cached",
    lastSuccessfulAt: "lastSuccessfulAt" in repo ? repo.lastSuccessfulAt : data.fetchedAt,
  } : undefined;
}
export const githubCheckedAt = data.fetchedAt;
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR-u-ca-gregory" : "en-GB", { day: "numeric", month: "short", year: "numeric", timeZone: "Asia/Tehran" }).format(new Date(iso));
}
