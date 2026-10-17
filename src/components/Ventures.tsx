import type { CSSProperties } from "react";
import { CaseStudy } from "@/components/CaseStudy";
import { ProjectDiagram } from "@/components/diagrams";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { Lines, SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import type { Content } from "@/content";
import type { Venture } from "@/content/types";

function VentureCard({ venture, reverse, content }: { venture: Venture; reverse: boolean; content: Content }) {
  const { ui } = content;
  const titleId = `${venture.slug}-title`;

  return (
    <article
      data-reveal
      aria-labelledby={titleId}
      style={{ "--accent": venture.accent } as CSSProperties}
      className="venture relative grid grid-cols-1 overflow-hidden rounded-3xl border border-line-strong bg-card xl:grid-cols-[minmax(0,1.08fr)_minmax(0,1fr)]"
    >
      <div aria-hidden="true" className="venture-glow pointer-events-none absolute -top-48 -start-24 h-96 w-96 rounded-full blur-3xl" />

      <div className={`relative flex flex-col p-6 sm:p-10 ${reverse ? "xl:order-2" : ""}`}>
        <div className="flex items-center gap-5">
          <span className="venture-logo flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border bg-bg p-3 sm:h-24 sm:w-24">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; small pre-sized WebP */}
            <img
              src={venture.logo.src}
              alt=""
              width={venture.logo.width}
              height={venture.logo.height}
              loading="lazy"
              className="h-full w-full object-contain"
            />
          </span>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
              <h3 id={titleId} className="text-[2rem] leading-none sm:text-[2.5rem]">
                {venture.name}
              </h3>
              <span className="venture-role rounded-full border px-3 py-1 font-mono text-[0.6875rem] tracking-[0.08em] uppercase">
                {venture.role}
              </span>
            </div>
            <p className="mt-2 text-sm text-muted">
              <bdi>{venture.localName}</bdi> · <bdi>{venture.period}</bdi>
            </p>
          </div>
        </div>

        <p className="mt-7 flex items-center gap-2 font-mono text-xs text-mint">
          <span className="pulse-dot h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
          {venture.status}
        </p>
        <p className="mt-4 font-display text-2xl leading-snug text-ink lg:text-[1.75rem]">{venture.tagline}</p>
        <p className="mt-4 leading-relaxed text-text">{venture.description}</p>

        <h4 className="sr-only">{ui.ventures.statsLabel}</h4>
        <dl className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {venture.stats.map((stat) => (
            <div key={stat.label} className="flex flex-col-reverse bg-card-2 px-4 py-4">
              <dt className="meta mt-1.5 normal-case">{stat.label}</dt>
              <dd className="venture-stat font-display text-[1.75rem] leading-none" dir="ltr">
                {stat.value}
              </dd>
            </div>
          ))}
        </dl>

        <h4 className="meta mt-8">{ui.ventures.highlightsLabel}</h4>
        <ul className="mt-3 space-y-2.5 text-[0.9375rem] leading-relaxed text-text">
          {venture.highlights.map((item) => (
            <li key={item} className="flex gap-3">
              <span className="venture-bullet mt-[0.7em] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h4 className="meta mt-8">{ui.ventures.stackLabel}</h4>
        <ul className="mt-3 flex flex-wrap gap-2" aria-label={ui.caseStudy.technologies}>
          {venture.tools.map((tool) => (
            <li
              key={tool.name}
              dir="ltr"
              className="inline-flex items-center gap-2 rounded-md border border-line bg-card-2 px-2.5 py-1.5 text-xs text-ink"
            >
              <TechIcon tool={tool} size={14} />
              {tool.name}
            </li>
          ))}
        </ul>

        <div className="mt-9 flex flex-wrap gap-3">
          {venture.links.map((link) => (
            <ExternalLink
              key={link.href}
              href={link.href}
              newTabLabel={ui.external}
              className={`btn ${link.primary ? "btn-primary" : "btn-outline"}`}
            >
              {link.label}
              <Icon name="arrow-up-right" className="rtl-flip" />
            </ExternalLink>
          ))}
        </div>
      </div>

      <div
        className={`relative flex flex-col border-t border-line bg-mint-deep/80 xl:border-t-0 ${
          reverse ? "xl:order-1 xl:border-e" : "xl:border-s"
        }`}
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- decorative watermark */}
        <img
          src={venture.logo.src}
          alt=""
          aria-hidden="true"
          width={venture.logo.width}
          height={venture.logo.height}
          loading="lazy"
          className="pointer-events-none absolute end-6 bottom-24 hidden w-56 opacity-[0.07] grayscale xl:block"
        />
        <div className="relative flex flex-1 items-center">
          <div className="w-full">
            <ProjectDiagram kind={venture.diagram} />
          </div>
        </div>
        <div className="relative px-6 pb-6 sm:px-10 sm:pb-10">
          <CaseStudy caseStudy={venture.caseStudy} labels={ui.caseStudy} />
        </div>
      </div>
    </article>
  );
}

/** "Projects I'm proud of": the products Ilia founded or co-founded. */
export function Ventures({ content }: { content: Content }) {
  const { ventures, ui } = content;

  return (
    <section aria-labelledby="ventures-title" id="projects" className="scroll-mt-24 bg-surface py-20 lg:py-[120px]">
      <div className="container-site">
        <SectionHeader
          id="ventures-title"
          eyebrow={ui.ventures.eyebrow}
          title={<Lines lines={ui.ventures.titleLines} />}
          aside={ui.ventures.aside}
        />
        <div className="mt-14 space-y-8 lg:mt-16 lg:space-y-10">
          {ventures.map((venture, index) => (
            <VentureCard key={venture.slug} venture={venture} reverse={index % 2 === 1} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
}
