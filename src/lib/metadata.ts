import type { Metadata } from "next";
import { getContent, homePath, type Locale } from "@/content";

/** Page metadata for the home page in one language, with hreflang alternates. */
export function homeMetadata(locale: Locale): Metadata {
  const { ui, profile } = getContent(locale);
  const path = homePath(locale);
  return {
    title: { absolute: ui.meta.title },
    description: ui.meta.description,
    alternates: {
      canonical: path,
      languages: { en: "/", fa: "/fa/", "x-default": "/" },
    },
    openGraph: {
      type: "profile",
      title: ui.meta.title,
      description: ui.meta.description,
      siteName: profile.name,
      locale: ui.meta.ogLocale,
      alternateLocale: locale === "fa" ? ["en_US"] : ["fa_IR"],
      url: path,
      images: [{ url: "/og-image.png", width: 1200, height: 630, alt: ui.meta.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: ui.meta.title,
      description: ui.meta.description,
      images: ["/og-image.png"],
    },
  };
}
