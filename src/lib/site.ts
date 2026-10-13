import { profile } from "@/content/profile";

/**
 * Public origin of the deployed site. NEXT_PUBLIC_SITE_URL overrides it at
 * build time, e.g. for a preview deployment.
 */
const DEFAULT_SITE_URL = "https://iliashakeri.ir";
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || DEFAULT_SITE_URL;

export const site = {
  url: configuredUrl,
  title: `${profile.name} — DevOps Engineer`,
  description:
    "DevOps engineer working on Linux infrastructure, container delivery, CI/CD, monitoring, and security hardening. Case studies: Dolphin CRM, Nerkhbaan, and ChatOps alerting.",
  resume: {
    pdfPath: "/resume/ilia-shakeri-resume.pdf",
    pdfFile: "public/resume/ilia-shakeri-resume.pdf",
    downloadName: "Ilia-Shakeri-Resume.pdf",
    printPath: "/resume/",
    updated: "October 2026",
  },
} as const;

export const nav = [
  { label: "About", href: "/#about" },
  { label: "Projects", href: "/#projects" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
] as const;
