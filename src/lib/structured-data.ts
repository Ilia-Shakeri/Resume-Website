import { education, profile } from "@/content/profile";
import { site } from "@/lib/site";

/** schema.org Person built only from verified profile fields. */
export function personJsonLd(): string {
  const data = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.role,
    url: site.url,
    email: `mailto:${profile.email}`,
    sameAs: [profile.github.href, profile.linkedin.href],
    address: { "@type": "PostalAddress", addressLocality: "Tehran", addressCountry: "IR" },
    alumniOf: { "@type": "CollegeOrUniversity", name: education.institution },
    knowsLanguage: ["fa", "en"],
    knowsAbout: ["Linux", "DevOps", "Docker", "Kubernetes", "Ansible", "CI/CD", "Prometheus", "Grafana", "PostgreSQL", "Nginx"],
  };
  // Escape "<" so the JSON can never close the surrounding script element.
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
