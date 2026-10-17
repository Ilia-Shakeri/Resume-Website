import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${site.url}/`,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: `${site.url}/`, fa: `${site.url}/fa/` } },
    },
    {
      url: `${site.url}/fa/`,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${site.url}/`, fa: `${site.url}/fa/` } },
    },
    { url: `${site.url}${site.resume.printPath}`, changeFrequency: "monthly", priority: 0.6 },
  ];
}
