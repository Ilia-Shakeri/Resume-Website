import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { ProjectFilter } from "@/components/ProjectFilter";
import { SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import type { Content } from "@/content";
import type { ProjectCategory } from "@/content/types";

const CATEGORY_ICON: Record<ProjectCategory, "boxes" | "shield" | "pulse" | "code"> = {
  ops: "boxes",
  security: "shield",
  monitoring: "pulse",
  apps: "code",
};

/** "More projects": a filterable grid of compact repository cards. */
export function Builds({ content }: { content: Content }) {
  const { projects, ui } = content;
  const labels = ui.builds.filters;
  const keys = ["all", "ops", "security", "monitoring", "apps"] as const;
  const filters = keys
    .map((key) => ({
      key,
      label: labels[key],
      count: key === "all" ? projects.length : projects.filter((p) => p.category === key).length,
    }))
    .filter((filter) => filter.count > 0);

  return (
    <section aria-labelledby="builds-title" id="builds" className="scroll-mt-20 py-10 pb-16 lg:py-14 lg:pb-24">
      <div className="container-site">
        <SectionHeader id="builds-title" title={ui.builds.title} />

        <div className="mt-6" data-reveal>
          <ProjectFilter filters={filters} label={ui.builds.filterLabel}>
            {projects.map((project) => (
              <li key={project.name} data-category={project.category} className="project-card">
                <article className="spotlight flex h-full flex-col rounded-xl border border-line bg-card-2 p-5 transition duration-300 hover:-translate-y-0.5 hover:border-mint/40 hover:bg-card">
                  <div className="flex items-start gap-3">
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mint-tint text-mint">
                      <Icon name={CATEGORY_ICON[project.category]} size={16} />
                    </span>
                    <div className="min-w-0">
                      <h3 className="font-display text-lg leading-snug text-ink">{project.name}</h3>
                      <p className="mt-0.5 text-xs text-muted">
                        <bdi>{project.kind}</bdi> · {labels[project.category]} · {project.year}
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-text">{project.summary}</p>
                  <ul className="mt-3 space-y-1.5 text-[0.8125rem] leading-relaxed text-muted">
                    {project.highlights.map((item) => (
                      <li key={item} className="flex gap-2.5">
                        <span className="mt-[0.65em] h-px w-2.5 shrink-0 bg-mint" aria-hidden="true" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-5">
                    <ul className="flex flex-wrap gap-1.5" aria-label={ui.ventures.stackLabel}>
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
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2 border-t border-line pt-3">
                      {project.links.map((link) => (
                        <ExternalLink
                          key={link.href}
                          href={link.href}
                          newTabLabel={ui.external}
                          className="link-row inline-flex min-h-8 items-center gap-1.5 text-sm text-mint hover:text-ink"
                        >
                          {link.label}
                          <span className="sr-only"> · {project.name}</span>
                          <Icon name="arrow-up-right" size={14} className="rtl-flip" />
                        </ExternalLink>
                      ))}
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ProjectFilter>
        </div>
      </div>
    </section>
  );
}
