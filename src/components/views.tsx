import { About } from "@/components/About";
import { Approach } from "@/components/Approach";
import { Builds } from "@/components/Builds";
import { Contact } from "@/components/Contact";
import { ContactCta, FeaturedTeasers } from "@/components/HomeSections";
import { Education } from "@/components/Education";
import { Experience } from "@/components/Experience";
import { Hero } from "@/components/Hero";
import { PageHeader } from "@/components/PageHeader";
import { ResumeCta } from "@/components/ResumeCta";
import { SiteShell } from "@/components/SiteShell";
import { Expertise, Toolkit } from "@/components/Toolkit";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import { getContent, type Locale } from "@/content";

// One view per page; app/**/page.tsx renders them for each language.

export function HomeView({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <SiteShell locale={locale} page="home">
      <Hero content={content} locale={locale} />
      <FeaturedTeasers content={content} locale={locale} />
      <ContactCta content={content} locale={locale} />
    </SiteShell>
  );
}

export function AboutView({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <SiteShell locale={locale} page="about">
      <PageHeader title={content.ui.pages.about.title} lead={content.ui.pages.about.lead} />
      <About content={content} />
      <Expertise content={content} />
      <Toolkit content={content} />
      <Approach content={content} />
    </SiteShell>
  );
}

export function ProjectsView({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <SiteShell locale={locale} page="projects">
      <PageHeader title={content.ui.pages.projects.title} lead={content.ui.pages.projects.lead} />
      <FeaturedProjects content={content} locale={locale} />
      <Builds content={content} />
    </SiteShell>
  );
}

export function ExperienceView({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <SiteShell locale={locale} page="experience">
      <PageHeader title={content.ui.pages.experience.title} lead={content.experienceSummary} />
      <Experience content={content} />
      <Education content={content} />
      <ResumeCta content={content} locale={locale} />
    </SiteShell>
  );
}

export function ContactView({ locale }: { locale: Locale }) {
  const content = getContent(locale);
  return (
    <SiteShell locale={locale} page="contact">
      <PageHeader title={content.ui.pages.contact.title} lead={content.profile.contactMessage} />
      <Contact content={content} />
    </SiteShell>
  );
}
