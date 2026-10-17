import type { MetadataRoute } from "next";
import { locales, pagePath, pages } from "@/content";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = pages.flatMap((page) =>
    locales.map((locale) => ({
      url: `${site.url}${pagePath(locale, page)}`,
      changeFrequency: "monthly" as const,
      priority: page === "home" ? (locale === "en" ? 1 : 0.9) : 0.7,
      alternates: {
        languages: { en: `${site.url}${pagePath("en", page)}`, fa: `${site.url}${pagePath("fa", page)}` },
      },
    })),
  );
  return [...entries, { url: `${site.url}${site.resume.printPath}`, changeFrequency: "monthly", priority: 0.6 }];
}
