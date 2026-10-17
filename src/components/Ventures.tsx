import type { CSSProperties } from "react";
import { CaseStudy } from "@/components/CaseStudy";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { Lines, SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import type { Content } from "@/content";
import type { Venture } from "@/content/types";

function VentureCard({ venture, content }: { venture: Venture; content: Content }) {
  const { ui } = content;
  const titleId = `${venture.slug}-title`;

  return (
    <article
      data-reveal
      aria-labelledby={titleId}
      style={{ "--accent": venture.accent } as CSSProperties}
      className="flex flex-col rounded-2xl border border-line-strong bg-card p-6 transition-colors duration-300 hover:border-mint/40 sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="venture-logo flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border bg-bg p-2">
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
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5">
            <h3 id={titleId} className="text-2xl leading-tight">
              {venture.name}
            </h3>
            <span className="venture-role rounded-full border px-2.5 py-0.5 font-mono text-[0.6875rem] tracking-[0.06em] uppercase">
              {venture.role}
            </span>
          </div>
          <p className="mt-1 text-sm text-muted">
            <bdi>{venture.localName}</bdi> · <bdi>{venture.period}</bdi>
          </p>
        </div>
      </div>

      <p className="mt-5 flex items-center gap-2 font-mono text-xs text-mint">
        <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-mint" aria-hidden="true" />
        <bdi>{venture.status}</bdi>
      </p>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-text">{venture.description}</p>

      <h4 className="sr-only">{ui.ventures.statsLabel}</h4>
      <dl className="mt-5 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-4">
        {venture.stats.map((stat) => (
          <div key={stat.label} className="flex flex-col-reverse bg-card-2 px-3 py-3">
            <dt className="mt-1 text-[0.6875rem] leading-snug text-muted">{stat.label}</dt>
            <dd className="font-display text-xl leading-none text-ink">
              <bdi dir="ltr">{stat.value}</bdi>
            </dd>
          </div>
        ))}
      </dl>

      <h4 className="meta mt-6">{ui.ventures.highlightsLabel}</h4>
      <ul className="mt-2.5 space-y-2 text-sm leading-relaxed text-text">
        {venture.highlights.map((item) => (
          <li key={item} className="flex gap-3">
            <span className="venture-bullet mt-[0.6em] h-1.5 w-1.5 shrink-0 rounded-full" aria-hidden="true" />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      <ul className="mt-6 flex flex-wrap gap-1.5" aria-label={ui.ventures.stackLabel}>
        {venture.tools.map((tool) => (
          <li
            key={tool.name}
            dir="ltr"
            className="inline-flex items-center gap-1.5 rounded border border-line px-2 py-1 text-[0.6875rem] text-text"
          >
            <TechIcon tool={tool} size={12} />
            {tool.name}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-6">
        <div className="flex flex-wrap gap-2.5">
          {venture.links.map((link) => (
            <ExternalLink
              key={link.href}
              href={link.href}
              newTabLabel={ui.external}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200 ${
                link.primary
                  ? "border-mint bg-mint text-on-mint hover:bg-mint/90"
                  : "border-line-strong text-ink hover:border-mint/60"
              }`}
            >
              {link.label}
              <Icon name="arrow-up-right" size={14} className="rtl-flip" />
            </ExternalLink>
          ))}
        </div>
        <div className="mt-6">
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
        <div className="mt-14 grid grid-cols-1 gap-6 lg:mt-16 lg:grid-cols-2">
          {ventures.map((venture) => (
            <VentureCard key={venture.slug} venture={venture} content={content} />
          ))}
        </div>
      </div>
    </section>
  );
}
