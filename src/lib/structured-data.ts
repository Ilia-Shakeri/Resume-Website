import { getContent, homePath, type Locale } from "@/content";
import { site } from "@/lib/site";

/** schema.org Person (with the two products he founded) from verified profile fields. */
export function personJsonLd(locale: Locale): string {
  const { profile, qualifications, ventures, ui } = getContent(locale);
  const english = getContent("en");
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    alternateName: locale === "fa" ? english.profile.name : getContent("fa").profile.name,
    jobTitle: profile.role,
    description: ui.meta.description,
    url: `${site.url}${homePath(locale)}`,
    image: `${site.url}/images/ilia-shakeri.webp`,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github.href, profile.linkedin.href],
    address: { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
    worksFor: english.ventures.map((venture, index) => ({
      "@type": "Organization",
      name: venture.name,
      ...(venture.links[0]?.href.startsWith("https://github.com") ? {} : { url: venture.links[0]?.href }),
      description: ventures[index].description,
    })),
    hasCredential: qualifications
      .filter((item) => item.certId)
      .map((item) => ({
        "@type": "EducationalOccupationalCredential",
        name: item.title,
        credentialCategory: "certificate",
        identifier: item.certId,
        recognizedBy: { "@type": "Organization", name: item.issuer },
        ...(item.href ? { url: `${site.url}${item.href}` } : {}),
      })),
    knowsLanguage: ["fa", "en"],
    knowsAbout: ["Linux", "DevOps", "Docker", "Kubernetes", "Ansible", "CI/CD", "Prometheus", "Grafana", "PostgreSQL", "Nginx"],
  };
  // Escape "<" so the JSON can never close the surrounding script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
