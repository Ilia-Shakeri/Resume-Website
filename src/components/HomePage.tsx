import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Builds } from "@/components/Builds";
import { Contact } from "@/components/Contact";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { ResumeCta } from "@/components/ResumeCta";
import { ScrollReveal } from "@/components/ScrollReveal";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { SkipLink } from "@/components/SkipLink";
import { Toolkit } from "@/components/Toolkit";
import { Ventures } from "@/components/Ventures";
import { getContent, homePath, type Locale } from "@/content";
import { site } from "@/lib/site";
import { personJsonLd } from "@/lib/structured-data";

/** The one-page portfolio in either language. */
export function HomePage({ locale }: { locale: Locale }) {
  const content = getContent(locale);

  return (
    <div lang={locale} dir={locale === "fa" ? "rtl" : "ltr"} className={locale === "fa" ? "locale-fa" : undefined}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: personJsonLd(locale) }} />
      <SkipLink label={content.ui.skipLink} />
      <SiteHeader
        locale={locale}
        name={content.profile.name}
        home={homePath(locale)}
        resumeHref={site.resume.pdfPath}
        resumeDownloadName={site.resume.downloadName}
        ui={{ nav: content.ui.nav, language: content.ui.language }}
      />
      <main id="main" tabIndex={-1} className="outline-none">
        <Hero content={content} />
        <About content={content} />
        <Ventures content={content} />
        <Builds content={content} />
        <Toolkit content={content} />
        <Experience content={content} />
        <Approach content={content} />
        <Education content={content} />
        <ResumeCta content={content} locale={locale} />
        <Contact content={content} />
      </main>
      <SiteFooter content={content} />
      <ScrollReveal />
    </div>
  );
}
