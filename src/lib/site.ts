import { profile } from "@/content/profile";

/**
 * Public origin of the deployed site. Set NEXT_PUBLIC_SITE_URL at build time
 * once the final domain is known; until then canonical tags are omitted and
 * absolute URLs fall back to localhost.
 */
const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "") || "";

export const site = {
  url: configuredUrl || "http://localhost:3000",
  hasCanonicalUrl: configuredUrl.length > 0,
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
