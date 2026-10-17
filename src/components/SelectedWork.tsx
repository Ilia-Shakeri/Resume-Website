import { ProjectDiagram } from "@/components/diagrams";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { featuredProjects, secondaryProjects } from "@/content/projects";
import type { FeaturedProject } from "@/content/types";

function CaseStudy({ project }: { project: FeaturedProject }) {
  const { caseStudy } = project;
  const groups = [
    { label: "Approach", items: caseStudy.approach },
    { label: "Security & reliability", items: caseStudy.reliability },
    { label: "Result", items: caseStudy.outcome },
  ];

  return (
    <details className="group mt-6 border-t border-line pt-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-mono text-xs tracking-[0.06em] text-mint uppercase [&::-webkit-details-marker]:hidden">
        Engineering notes
        <span className="text-base leading-none transition-transform group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="mt-5 space-y-5 text-sm leading-relaxed text-text">
        <div>
          <h4 className="meta">Problem</h4>
          <p className="mt-2">{caseStudy.problem}</p>
        </div>
        <div>
          <h4 className="meta">My role</h4>
          <p className="mt-2">{caseStudy.role}</p>
        </div>
        {groups.map((group) => (
          <div key={group.label}>
            <h4 className="meta">{group.label}</h4>
            <ul className="mt-2 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}

function ProjectBody({ project, wide }: { project: FeaturedProject; wide: boolean }) {
  return (
    <div className={wide ? "flex flex-col p-6 sm:p-10" : "flex flex-1 flex-col p-6 sm:p-8"}>
      <p className="eyebrow">{project.category}</p>
      <p className="meta mt-3 normal-case">
        {project.name} · {project.period} · {project.role}
      </p>
      <h3
        id={`${project.slug}-title`}
        className={`mt-5 leading-[1.15] ${wide ? "text-3xl lg:text-[2.5rem]" : "text-[1.75rem] lg:text-[2rem]"}`}
      >
        {project.title}
      </h3>
      <p className="mt-5 text-base leading-[1.65] text-text">{project.summary}</p>
      <ul className="mt-6 flex flex-wrap gap-2" aria-label="Technologies">
        {project.tags.map((tag) => (
          <li key={tag} className="tag">
            {tag}
          </li>
        ))}
      </ul>
      <p className={`mt-6 font-mono text-xs leading-[1.7] text-mint ${wide ? "" : "border-t border-line pt-6"}`}>
        <span className="uppercase">{project.outcomeLabel}</span> / {project.outcome}
      </p>

      <CaseStudy project={project} />

      <ul className="mt-auto flex flex-col pt-6">
        {project.links.map((link) => (
          <li key={link.href}>
            <ExternalLink
              href={link.href}
              className="link-row flex min-h-11 items-center justify-between gap-4 text-[0.9375rem] font-semibold text-ink"
            >
              <span>
                {link.label}
                <span className="sr-only">: {project.name}</span>
              </span>
              <Icon name="arrow-up-right" className="text-mint" />
            </ExternalLink>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function SelectedWork() {
  const [lead, ...rest] = featuredProjects;

  return (
    <section aria-labelledby="projects-title" id="projects" className="scroll-mt-24 bg-surface py-20 lg:py-[120px]">
      <div className="container-site">
        <SectionHeader
          id="projects-title"
          index="02"
          label="Selected builds"
          title={
            <>
              Complex problems.
              <br />
              Practical systems.
            </>
          }
          aside="Three projects told as engineering work: the problem, the decisions, and what is actually running. Each links to its source."
        />

        <article
          data-reveal
          aria-labelledby={`${lead.slug}-title`}
          className="mt-14 grid overflow-hidden rounded-2xl border border-line-strong bg-card lg:mt-16 xl:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]"
        >
          <div className="border-b border-line bg-mint-deep xl:border-r xl:border-b-0">
            <ProjectDiagram kind={lead.diagram} />
          </div>
          <ProjectBody project={lead} wide />
        </article>

        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          {rest.map((project) => (
            <article
              key={project.slug}
              data-reveal
              aria-labelledby={`${project.slug}-title`}
              className="flex flex-col overflow-hidden rounded-2xl border border-line-strong bg-card"
            >
              <div className="border-b border-line bg-mint-deep">
                <ProjectDiagram kind={project.diagram} />
              </div>
              <ProjectBody project={project} wide={false} />
            </article>
          ))}
        </div>

        <div className="mt-20">
          <h3 className="eyebrow">More from GitHub</h3>
          <ul className="mt-6 grid gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {secondaryProjects.map((project) => (
              <li key={project.name} data-reveal className="bg-surface">
                <ExternalLink href={project.href} className="group flex h-full flex-col p-6 transition-colors hover:bg-card">
                  <span className="flex items-start justify-between gap-4">
                    <span className="font-display text-xl text-ink">{project.name}</span>
                    <Icon name="arrow-up-right" className="mt-1 shrink-0 text-mint transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                  <span className="meta mt-1">{project.year}</span>
                  <span className="mt-4 text-sm leading-relaxed text-text">{project.summary}</span>
                  <span className="mt-5 flex flex-wrap gap-x-3 gap-y-1 font-mono text-[0.6875rem] text-muted">
                    {project.tags.join(" / ")}
                  </span>
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-8 font-mono text-[0.6875rem] text-muted">
          {"// No illustrative metrics. Figures above come from each repository’s own records."}
        </p>
      </div>
    </section>
  );
}
