import type { Metadata } from "next";
import { getContent, pagePath, type Locale, type PageKey } from "@/content";

/** Metadata for one page in one language, with hreflang alternates. */
export function pageMetadata(locale: Locale, page: PageKey): Metadata {
  const { ui, profile, experienceSummary } = getContent(locale);
  const path = pagePath(locale, page);
  const leads: Record<PageKey, string> = {
    home: ui.meta.description,
    about: ui.pages.about.lead,
    projects: ui.pages.projects.lead,
    experience: experienceSummary,
    contact: profile.contactMessage,
  };
  const title = page === "home" ? ui.meta.title : `${ui.pages[page].title} · ${profile.name}`;
  const description = leads[page];

  return {
    title: { absolute: title },
    description,
    alternates: {
      canonical: path,
      languages: { en: pagePath("en", page), fa: pagePath("fa", page), "x-default": pagePath("en", page) },
    },
    openGraph: {
      type: "profile",
      title,
      description,
      siteName: profile.name,
      locale: ui.meta.ogLocale,
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
      url: path,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: ui.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/og-image.png"],
    },
  };
}
