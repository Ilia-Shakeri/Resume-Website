import type { CSSProperties } from "react";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { pagePath, type Content, type Locale } from "@/content";

/** Home: short cards for the two ventures, linking to their full entries on /projects/. */
export function FeaturedProjects({ content, locale }: { content: Content; locale: Locale }) {
  const { ventures, ui } = content;
  const projectsPath = pagePath(locale, "projects");

  return (
    <section aria-labelledby="featured-title" className="py-14 lg:py-20">
      <div className="container-site">
        <SectionHeader
          id="featured-title"
          title={ui.home.featured}
          action={
            <a href={projectsPath} className="link-row inline-flex min-h-10 items-center gap-2 text-sm text-mint">
              {ui.home.allProjects}
              <Icon name="arrow-right" size={16} className="rtl-flip" />
            </a>
          }
        />
        <div data-reveal data-stagger className="mt-8 grid grid-cols-1 gap-5 md:grid-cols-2">
          {ventures.map((venture) => (
            <article
              key={venture.slug}
              style={{ "--accent": venture.accent } as CSSProperties}
              className="spotlight group relative flex flex-col rounded-2xl border border-line-strong bg-card p-6 transition duration-300 hover:-translate-y-1 hover:border-mint/40 sm:p-7"
            >
              <div className="flex items-center gap-4">
                <span className="venture-logo flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-bg p-1.5">
                  {/* eslint-disable-next-line @next/next/no-img-element -- static export; small pre-sized WebP */}
                  <img src={venture.logo.src} alt="" width={venture.logo.width} height={venture.logo.height} loading="lazy" className="h-full w-full object-contain" />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-xl leading-tight">
                    <a href={`${projectsPath}#${venture.slug}`} className="after:absolute after:inset-0 after:rounded-2xl">
                      {venture.name}
                    </a>
                  </h3>
                  <p className="mt-1 text-sm text-muted">
                    <span className="venture-role-text">{venture.role}</span> · <bdi>{venture.period}</bdi>
                  </p>
                </div>
                <Icon name="arrow-up-right" className="rtl-flip shrink-0 text-muted transition group-hover:text-mint" />
              </div>
              <p className="mt-4 text-sm leading-relaxed text-text">{venture.description}</p>
              <dl className="mt-5 grid grid-cols-2 gap-3 border-t border-line pt-4 sm:grid-cols-4">
                {venture.stats.map((stat) => (
                  <div key={stat.label} className="flex min-w-0 flex-col-reverse">
                    <dt className="mt-1 truncate text-[0.6875rem] text-muted">{stat.label}</dt>
                    <dd className="font-display text-lg leading-none text-ink">
                      <bdi dir="ltr" data-count={stat.value}>
                        {stat.value}
                      </bdi>
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
