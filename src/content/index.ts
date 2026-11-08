import * as enPractice from "./en/practice";
import * as enProfile from "./en/profile";
import * as enProjects from "./en/projects";
import * as enWorkSamples from "./en/work-samples";
import { ui as enUi } from "./en/ui";
import * as faPractice from "./fa/practice";
import * as faProfile from "./fa/profile";
import * as faProjects from "./fa/projects";
import * as faWorkSamples from "./fa/work-samples";
import { ui as faUi } from "./fa/ui";
import type { Locale } from "./types";
import { withAssetPaths } from "@/lib/assets";

export type { Locale } from "./types";
export const locales: Locale[] = ["en", "fa"];

const content = {
  en: { ...enProfile, ...enProjects, ...enPractice, ...enWorkSamples, ui: enUi },
  fa: { ...faProfile, ...faProjects, ...faPractice, ...faWorkSamples, ui: faUi },
} satisfies Record<Locale, unknown>;

export type Content = (typeof content)["en"];

/** All copy for one language. Both languages share the same shape. */
export function getContent(locale: Locale): Content {
  return withAssetPaths(content[locale]);
}

export type PageKey = "home" | "about" | "projects" | "experience" | "contact";
export const pages: PageKey[] = ["home", "about", "projects", "experience", "contact"];

/** Path of a page in a language, e.g. "/about/" or "/fa/about/". */
export function pagePath(locale: Locale, page: PageKey): string {
  const prefix = locale === "fa" ? "/fa" : "";
  return page === "home" ? `${prefix}/` : `${prefix}/${page}/`;
}
