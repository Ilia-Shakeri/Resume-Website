import type { CSSProperties } from "react";
import { ArchitectureFlow } from "@/components/ArchitectureFlow";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import type { Content, Locale } from "@/content";
import type { FeaturedProject } from "@/content/types";
import { formatDate, githubCheckedAt, repoActivity } from "@/lib/github";

export function ProjectLogo({ project, size }: { project: FeaturedProject; size: "sm" | "md" }) {
  const box = size === "md" ? "h-14 w-14 p-2" : "h-12 w-12 p-1.5";
  return (
    <span className={`venture-logo flex shrink-0 items-center justify-center rounded-xl border bg-bg ${box}`}>
      {project.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- static export; small pre-sized WebP
        <img
          src={project.logo.src}
          alt=""
          width={project.logo.width}
          height={project.logo.height}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      ) : (
        <Icon name="boxes" size={size === "md" ? 26 : 22} className="text-mint" />
      )}
    </span>
  );
}

/** "In production" only where the live deployment is documented; everything else says "In development". */
export function StagePill({ stage, labels }: { stage: FeaturedProject["stage"]; labels: Content["ui"]["ventures"]["stage"] }) {
  return stage === "production" ? (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-mint/40 bg-mint-tint px-2.5 py-0.5 text-xs text-mint">
      <span className="h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
      {labels.production}
    </span>
  ) : (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-line-strong px-2.5 py-0.5 text-xs text-text">
      <span className="h-1.5 w-1.5 rounded-full border border-text" aria-hidden="true" />
      {labels.development}
    </span>
  );
}

function FeaturedCard({ project, content, locale }: { project: FeaturedProject; content: Content; locale: Locale }) {
  const ui = content.ui.ventures;
  const titleId = `${project.slug}-title`;
  const activity = repoActivity(project.repo);

  return (
    <article
      id={project.slug}
      aria-labelledby={titleId}
      style={{ "--accent": project.accent } as CSSProperties}
      className="scroll-mt-24 rounded-2xl border border-line-strong bg-card"
    >
      <div className="p-5 sm:p-7">
        <div className="flex items-start gap-4">
          <ProjectLogo project={project} size="md" />
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 id={titleId} className="text-[1.375rem] leading-tight">
                {project.name}
              </h3>
              <StagePill stage={project.stage} labels={ui.stage} />
            </div>
            <p className="mt-1 text-sm text-muted">
              {project.localName ? (
                <>
                  <bdi>{project.localName}</bdi> ·{" "}
                </>
              ) : null}
              <bdi>{project.period}</bdi>
            </p>
          </div>
        </div>

        <p className="mt-5 max-w-[780px] text-base leading-relaxed text-text">{project.summary}</p>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 text-sm sm:grid-cols-[auto_minmax(0,1fr)]">
            <dt className="text-muted">{ui.role}</dt>
            <dd className="venture-role-text">{project.role}</dd>
            <dt className="text-muted">{ui.category}</dt>
            <dd className="text-ink">{project.category}</dd>
            <dt className="text-muted">{ui.status}</dt>
            <dd className="text-ink">
              <bdi>{project.status}</bdi>
            </dd>
            {activity && (activity.latestTag || activity.lastActivity) ? (
              <>
                <dt className="text-muted">{ui.github.label}</dt>
                <dd className="text-ink">
                  {activity.latestTag ? (
                    <span className="me-4 inline-block">
                      {ui.github.release} <bdi dir="ltr" className="font-mono text-[0.8125rem]">{activity.latestTag}</bdi>
                      {activity.latestTagDate ? <span className="text-muted"> · {formatDate(activity.latestTagDate, locale)}</span> : null}
                    </span>
                  ) : null}
                  {activity.lastActivity ? (
                    <span className="inline-block">
                      {ui.github.updated} <span className="text-muted">{formatDate(activity.lastActivity, locale)}</span>
                    </span>
                  ) : null}
                  <span className="mt-0.5 block text-xs text-muted">
                    {ui.github.checked} {formatDate(githubCheckedAt, locale)}
                  </span>
                </dd>
              </>
            ) : null}
            <dt className="text-muted">{ui.evidence}</dt>
            <dd className="flex flex-wrap gap-x-5 gap-y-1">
              {project.links.map((link) => (
                <ExternalLink
                  key={link.href}
                  href={link.href}
                  newTabLabel={content.ui.external}
                  className="link-row inline-flex min-h-6 items-center gap-1.5 text-mint"
                >
                  <bdi>{link.label}</bdi>
                  <Icon name="arrow-up-right" size={14} className="rtl-flip" />
                </ExternalLink>
              ))}
            </dd>
          </dl>

          <div>
            <h4 className="sr-only">{ui.statsLabel}</h4>
            <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
              {project.facts.map((fact) => (
                <div key={fact.label} className="flex flex-col-reverse bg-card-2 px-3 py-3">
                  <dt className="mt-1 text-xs leading-snug text-muted">{fact.label}</dt>
                  <dd className="font-display text-lg leading-none text-ink tabular-nums">
                    <bdi dir="ltr">{fact.value}</bdi>
                  </dd>
                </div>
              ))}
            </dl>
            <p className="mt-2 text-xs leading-relaxed text-muted">{project.factsSource}</p>
          </div>
        </div>

        {project.screenshots?.length ? (
          <div className="mt-6">
            <h4 className="sr-only">{ui.screenshotsLabel}</h4>
            <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              {project.screenshots.map((shot) => (
                <li key={shot.full}>
                  <figure>
                    <a
                      href={shot.full}
                      className="group/shot block overflow-hidden rounded-lg border border-line-strong bg-bg transition hover:border-mint/50"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                      <img
                        src={shot.thumb}
                        alt={shot.alt}
                        width={800}
                        height={Math.round((shot.height * 800) / shot.width)}
                        loading="lazy"
                        decoding="async"
                        className="h-auto w-full transition duration-300 group-hover/shot:scale-[1.015]"
                      />
                      <span className="sr-only">{ui.openFull}</span>
                    </a>
                    <figcaption className="mt-2 text-xs leading-snug text-muted">{shot.caption}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2 lg:gap-10">
          <div>
            <h4 className="text-sm text-ink">{ui.highlightsLabel}</h4>
            <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-text">
              {project.highlights.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="venture-bullet mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm text-ink">{ui.stackLabel}</h4>
            <ul className="mt-2.5 flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <li
                  key={tool.name}
                  dir="ltr"
                  className="inline-flex items-center gap-1.5 rounded border border-line px-2 py-1 text-xs text-text"
                >
                  <TechIcon tool={tool} size={12} />
                  {tool.name}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <details className="group border-t border-line">
        <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 rounded-b-2xl px-5 text-sm font-medium text-mint hover:bg-card-2 sm:px-7 [&::-webkit-details-marker]:hidden">
          {ui.details}
          <span className="text-lg leading-none transition-transform group-open:rotate-45" aria-hidden="true">
            +
          </span>
        </summary>
        <div className="px-5 pb-7 sm:px-7">
          <h4 className="text-base text-ink">{ui.architecture}</h4>
          <div className="mt-3">
            <ArchitectureFlow caption={project.architecture.caption} steps={project.architecture.steps} />
          </div>

          <h4 className="mt-8 text-base text-ink">{ui.caseStudy}</h4>
          <div className="mt-3 grid grid-cols-1 gap-x-10 gap-y-6 md:grid-cols-2">
            {project.caseStudy.map((section) => (
              <section key={section.title} aria-label={section.title}>
                <h5 className="font-mono text-xs tracking-[0.04em] text-mint uppercase">{section.title}</h5>
                <ul className="mt-2 space-y-2 text-sm leading-relaxed text-text">
                  {section.items.map((item) => (
                    <li key={item} className="flex gap-3">
                      <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-mint" aria-hidden="true" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>
            ))}
          </div>

          <div className="mt-8 rounded-lg border border-line-strong bg-bg/60 p-4 sm:p-5">
            <h4 className="flex items-center gap-2 text-sm text-ink">
              <Icon name="shield" size={16} className="text-mint" />
              {ui.limitations}
            </h4>
            <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-text">
              {project.limitations.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-muted" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </details>
    </article>
  );
}

/** /projects/: the three featured projects, each with its engineering case study. */
export function FeaturedProjects({ content, locale }: { content: Content; locale: Locale }) {
  return (
    <section aria-labelledby="ventures-title" id="ventures" className="scroll-mt-20 py-8 lg:py-10">
      <div className="container-site">
        <SectionHeader id="ventures-title" title={content.ui.ventures.title} />
        <div className="mt-6 space-y-6">
          {content.featured.map((project) => (
            <FeaturedCard key={project.slug} project={project} content={content} locale={locale} />
          ))}
        </div>
      </div>
    </section>
  );
}
