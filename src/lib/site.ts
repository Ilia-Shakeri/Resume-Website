import { ui } from "@/content/en/ui";

/**
 * Public origin of the deployed site. NEXT_PUBLIC_SITE_URL overrides it at
 * build time, e.g. for a preview deployment.
 */
const DEFAULT_SITE_URL = "https://iliashakeri.ir";
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || DEFAULT_SITE_URL;

export const site = {
  url: configuredUrl,
  title: ui.meta.title,
  description: ui.meta.description,
  resume: {
    pdfPath: "/resume/ilia-shakeri-resume.pdf",
    pdfFile: "public/resume/ilia-shakeri-resume.pdf",
    downloadName: "Ilia-Shakeri-Resume.pdf",
    printPath: "/resume/",
    updated: { en: "October 2026", fa: "اکتبر ۲۰۲۶" },
  },
} as const;
