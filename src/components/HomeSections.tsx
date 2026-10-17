import type { CSSProperties } from "react";
import { ProjectLogo, StagePill } from "@/components/FeaturedProjects";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { pagePath, type Content, type Locale } from "@/content";

/** Home: one short card per featured project, linking to its case study on /projects/. */
export function FeaturedTeasers({ content, locale }: { content: Content; locale: Locale }) {
  const { featured, ui } = content;
  const projectsPath = pagePath(locale, "projects");

  return (
    <section aria-labelledby="featured-title" className="py-12 lg:py-16">
      <div className="container-site">
        <SectionHeader
          id="featured-title"
          title={ui.home.featured}
          action={
            <a href={projectsPath} className="link-row inline-flex min-h-11 items-center gap-2 text-sm text-mint">
              {ui.home.allProjects}
              <Icon name="arrow-right" size={16} className="rtl-flip" />
            </a>
          }
        />
        <div data-reveal data-stagger className="mt-6 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
          {featured.map((project) => (
            <article
              key={project.slug}
              style={{ "--accent": project.accent } as CSSProperties}
              className="spotlight group relative flex flex-col rounded-2xl border border-line-strong bg-card p-5 transition duration-300 hover:-translate-y-0.5 hover:border-mint/40 sm:p-6"
            >
              <div className="flex items-start gap-3.5">
                <ProjectLogo project={project} size="sm" />
                <div className="min-w-0 flex-1">
                  <h3 className="text-lg leading-tight">
                    <a href={`${projectsPath}#${project.slug}`} className="stretched-link after:absolute after:inset-0 after:rounded-2xl">
                      {project.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm">
                    <span className="venture-role-text">{project.role}</span>
                  </p>
                </div>
                <Icon name="arrow-up-right" className="rtl-flip mt-1 shrink-0 text-muted transition group-hover:text-mint" />
              </div>
              <div className="mt-3">
                <StagePill stage={project.stage} labels={ui.ventures.stage} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-text">{project.summary}</p>
              <dl className="mt-auto grid grid-cols-2 gap-x-4 gap-y-3 border-t border-line pt-4">
                {project.facts.map((fact) => (
                  <div key={fact.label} className="flex min-w-0 flex-col-reverse">
                    <dt className="mt-1 text-xs text-muted">{fact.label}</dt>
                    <dd className="font-display text-base leading-none text-ink tabular-nums">
                      <bdi dir="ltr">{fact.value}</bdi>
                    </dd>
                  </div>
                ))}
              </dl>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/** Home: closing call to action that points to the contact page. */
export function ContactCta({ content, locale }: { content: Content; locale: Locale }) {
  const { profile, ui } = content;
  return (
    <section aria-labelledby="cta-title" className="pb-16 lg:pb-24">
      <div className="container-site">
        <div
          data-reveal
          className="spotlight cta-card relative flex flex-col gap-6 overflow-hidden rounded-2xl border border-line-strong bg-card px-6 py-9 sm:px-10 lg:flex-row lg:items-center lg:justify-between"
        >
          <div>
            <h2 id="cta-title" className="text-2xl leading-tight sm:text-[1.75rem]">
              {ui.home.ctaTitle}
            </h2>
            <p className="mt-2 text-text">{ui.home.ctaBody}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href={pagePath(locale, "contact")} className="btn btn-primary">
              {ui.home.ctaButton}
              <Icon name="arrow-right" className="rtl-flip" />
            </a>
            <a href={`mailto:${profile.email}`} dir="ltr" className="btn btn-outline">
              <Icon name="mail" className="text-mint" />
              {profile.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
