import data from "@/content/github.json";
import type { Locale } from "@/content/types";

// Release and activity figures for the featured repositories, refreshed by
// scripts/github-stats.mjs before each deploy (see .github/workflows/deploy.yml).

export type RepoActivity = {
  url: string;
  latestTag: string | null;
  latestTagDate: string | null;
  lastActivity: string | null;
};

const repos: Record<string, RepoActivity> = data.repos;

export function repoActivity(name: string | undefined): RepoActivity | undefined {
  return name ? repos[name] : undefined;
}

/** When the figures were last read from GitHub. */
export const githubCheckedAt = data.fetchedAt;

/** "15 Oct 2026" / "۱۵ اکتبر ۲۰۲۶" (Gregorian in both languages, like the rest of the site). */
export function formatDate(iso: string, locale: Locale): string {
  return new Intl.DateTimeFormat(locale === "fa" ? "fa-IR-u-ca-gregory" : "en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: "Asia/Tehran",
  }).format(new Date(iso));
}
