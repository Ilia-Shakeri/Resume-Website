import { getContent, pagePath, type Locale } from "@/content";
import { site } from "@/lib/site";

/**
 * schema.org Person and WebSite for the home page, built only from verified
 * profile fields. No employer, organization, or review data is asserted.
 */
export function personJsonLd(locale: Locale): string {
  const { profile, qualifications, ui } = getContent(locale);
  const english = getContent("en");
  const url = `${site.url}${pagePath(locale, "home")}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Person",
        "@id": `${site.url}/#person`,
        name: profile.name,
        alternateName: locale === "fa" ? english.profile.name : getContent("fa").profile.name,
        jobTitle: profile.headline,
        description: ui.meta.description,
        url,
        image: `${site.url}/images/ilia-shakeri.webp`,
        email: `mailto:${profile.email}`,
        sameAs: [profile.github.href, profile.linkedin.href, profile.telegram.href],
        address: { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
        hasCredential: qualifications
          .filter((item) => item.certId)
          .map((item) => ({
            "@type": "EducationalOccupationalCredential",
            name: item.title,
            credentialCategory: "course completion certificate",
            identifier: item.certId,
            recognizedBy: { "@type": "Organization", name: item.issuer },
            ...(item.href ? { url: `${site.url}${item.href}` } : {}),
          })),
        knowsLanguage: ["fa", "en"],
        knowsAbout: ["Linux", "DevOps", "Backend development", "Python", "Go", "Docker", "CI/CD", "PostgreSQL", "Prometheus", "Nginx"],
      },
      {
        "@type": "WebSite",
        "@id": `${site.url}/#website`,
        url,
        name: ui.meta.title,
        inLanguage: locale,
        author: { "@id": `${site.url}/#person` },
      },
    ],
  };
  // Escape "<" so the JSON can never close the surrounding script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
