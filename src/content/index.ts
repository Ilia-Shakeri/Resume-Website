import * as enPractice from "./en/practice";
import * as enProfile from "./en/profile";
import * as enProjects from "./en/projects";
import { ui as enUi } from "./en/ui";
import * as faPractice from "./fa/practice";
import * as faProfile from "./fa/profile";
import * as faProjects from "./fa/projects";
import { ui as faUi } from "./fa/ui";
import type { Locale } from "./types";

export type { Locale } from "./types";
export const locales: Locale[] = ["en", "fa"];

const content = {
  en: { ...enProfile, ...enProjects, ...enPractice, ui: enUi },
  fa: { ...faProfile, ...faProjects, ...faPractice, ui: faUi },
} satisfies Record<Locale, unknown>;

export type Content = (typeof content)["en"];

/** All copy for one language. Both languages share the same shape. */
export function getContent(locale: Locale): Content {
  return content[locale];
}

/** Path of the home page in a language ("/" or "/fa/"). */
export function homePath(locale: Locale): string {
  return locale === "fa" ? "/fa/" : "/";
}
