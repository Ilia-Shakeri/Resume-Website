import type { ReactNode } from "react";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { Spotlight } from "@/components/Spotlight";
import { getContent, pagePath, pages, type Locale, type PageKey } from "@/content";
import { site } from "@/lib/site";
import { personJsonLd } from "@/lib/structured-data";

/** Header, footer, and page-level effects shared by every page in either language. */
export function SiteShell({ locale, page, children }: { locale: Locale; page: PageKey; children: ReactNode }) {
  const { profile, ui } = getContent(locale);
  const nav = pages
    .filter((key) => key !== "home")
    .map((key) => ({ key, label: ui.nav[key], href: pagePath(locale, key) }));

  return (
    <div lang={locale} dir={locale === "fa" ? "rtl" : "ltr"} className={locale === "fa" ? "locale-fa" : undefined}>
      {page === "home" ? (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd(locale) }} />
      ) : null}
      <SkipLink label={ui.skipLink} />
      <SiteHeader
        locale={locale}
        name={profile.name}
        home={pagePath(locale, "home")}
        nav={nav}
        current={page}
        alternates={{ en: pagePath("en", page), fa: pagePath("fa", page) }}
        resumeHref={site.resume.pdfPath}
        resumeDownloadName={site.resume.downloadName}
        ui={{ nav: ui.nav, language: ui.language }}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <SiteFooter name={profile.name} email={profile.email} nav={nav} backToTop={ui.footer.backToTop} />
      <ScrollReveal />
      <Spotlight />
    </div>
  );
}
