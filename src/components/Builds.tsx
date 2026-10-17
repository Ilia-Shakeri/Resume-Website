import { CaseStudy } from "@/components/CaseStudy";
import { ProjectDiagram } from "@/components/diagrams";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { ProjectFilter } from "@/components/ProjectFilter";
import { Lines, SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import type { Content } from "@/content";
import type { ProjectCategory } from "@/content/types";

const CATEGORY_ICON: Record<ProjectCategory, "boxes" | "shield" | "pulse" | "code"> = {
  ops: "boxes",
  security: "shield",
  monitoring: "pulse",
  apps: "code",
};

/** Featured ChatOps build plus a filterable grid of the other repositories. */
export function Builds({ content }: { content: Content }) {
  const { featuredBuild: build, secondaryProjects, ui } = content;
  const labels = ui.builds.filters;
  const keys = ["all", "ops", "security", "monitoring", "apps"] as const;
  const filters = keys
    .map((key) => ({
      key,
      label: labels[key],
      count: key === "all" ? secondaryProjects.length : secondaryProjects.filter((p) => p.category === key).length,
    }))
    .filter((filter) => filter.count > 0);

  return (
    <section aria-labelledby="builds-title" id="builds" className="scroll-mt-24 py-20 lg:py-[120px]">
      <div className="container-site">
        <SectionHeader
          id="builds-title"
          eyebrow={ui.builds.eyebrow}
          title={<Lines lines={ui.builds.titleLines} />}
          aside={ui.builds.aside}
        />

        <article
          data-reveal
          aria-labelledby={`${build.slug}-title`}
          className="mt-14 grid grid-cols-1 overflow-hidden rounded-2xl border border-line-strong bg-card lg:mt-16 xl:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]"
        >
          <div className="border-b border-line bg-mint-deep xl:border-e xl:border-b-0">
            <ProjectDiagram kind={build.diagram} />
          </div>
          <div className="flex flex-col p-6 sm:p-10">
            <p className="eyebrow">{build.category}</p>
            <p className="meta mt-3 normal-case">
              {build.name} · {build.period} · {build.role}
            </p>
            <h3 id={`${build.slug}-title`} className="mt-5 text-3xl leading-[1.15] lg:text-[2.25rem]">
              {build.title}
            </h3>
            <p className="mt-5 leading-[1.65] text-text">{build.summary}</p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label={ui.caseStudy.technologies}>
              {build.tags.map((tag) => (
                <li key={tag} className="tag" dir="ltr">
                  {tag}
                </li>
              ))}
            </ul>
            <p className="mt-6 font-mono text-xs leading-[1.7] text-mint">
              <span className="uppercase">{build.outcomeLabel}</span> / {build.outcome}
            </p>
            <div className="mt-6">
              <CaseStudy caseStudy={build.caseStudy} labels={ui.caseStudy} />
            </div>
            <ul className="mt-auto flex flex-col pt-6">
              {build.links.map((link) => (
                <li key={link.href}>
                  <ExternalLink
                    href={link.href}
                    newTabLabel={ui.external}
                    className="link-row flex min-h-11 items-center justify-between gap-4 text-[0.9375rem] font-semibold text-ink"
                  >
                    <span>{link.label}</span>
                    <Icon name="arrow-up-right" className="rtl-flip text-mint" />
                  </ExternalLink>
                </li>
              ))}
            </ul>
          </div>
        </article>

        <div className="mt-16" data-reveal>
          <ProjectFilter filters={filters} label={ui.builds.filterLabel}>
            {secondaryProjects.map((project) => (
              <li key={project.name} data-category={project.category} className="project-card">
                <ExternalLink
                  href={project.href}
                  newTabLabel={ui.external}
                  className="group flex h-full flex-col rounded-xl border border-line bg-card-2 p-6 transition duration-300 hover:-translate-y-1 hover:border-mint/50 hover:bg-card"
                >
                  <span className="flex items-start justify-between gap-4">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint-tint text-mint">
                      <Icon name={CATEGORY_ICON[project.category]} size={18} />
                    </span>
                    <Icon
                      name="arrow-up-right"
                      className="rtl-flip mt-1 shrink-0 text-muted transition group-hover:text-mint"
                    />
                  </span>
                  <span className="mt-5 font-display text-xl text-ink">
                    {project.name}
                  </span>
                  <span className="meta mt-1">
                    {labels[project.category]} · {project.year}
                  </span>
                  <span className="mt-4 text-sm leading-relaxed text-text">{project.summary}</span>
                  <span className="mt-auto flex flex-wrap gap-1.5 pt-5">
                    {project.tools.map((tool) => (
                      <span
                        key={tool.name}
                        dir="ltr"
                        className="inline-flex items-center gap-1.5 rounded border border-line px-2 py-1 text-[0.6875rem] text-text"
                      >
                        <TechIcon tool={tool} size={12} />
                        {tool.name}
                      </span>
                    ))}
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ProjectFilter>
        </div>

        <p className="mt-8 font-mono text-[0.6875rem] text-muted">{ui.builds.footnote}</p>
      </div>
    </section>
  );
}
