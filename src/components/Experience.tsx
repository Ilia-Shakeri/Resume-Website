import type { Content } from "@/content";

export function Experience({ content }: { content: Content }) {
  const { experience, ui } = content;
  return (
    <section aria-label={ui.pages.experience.title} id="experience" className="scroll-mt-20 py-8 lg:py-10">
      <div className="container-site">
        <ol className="timeline relative ms-1 border-s border-line">
          {experience.map((item) => (
            <li key={`${item.organization}-${item.title}`} data-reveal className="relative pb-10 ps-7 last:pb-0 sm:ps-9">
              <span className="timeline-dot absolute top-2 -start-[5px] h-[9px] w-[9px] rounded-full bg-mint" aria-hidden="true" />
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h2 className="text-xl leading-tight sm:text-[1.375rem]">{item.title}</h2>
                <p className="shrink-0 text-sm text-muted">{item.period}</p>
              </div>
              <p className="mt-1.5 text-sm text-mint">
                {item.organization} · {item.location}
              </p>
              <p className="mt-3 text-[0.9375rem] leading-[1.7] text-text">{item.scope}</p>
              <ul className="mt-2 space-y-1.5 text-sm leading-[1.65] text-text">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-mint" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={ui.experience.focusLabel}>
                {item.tags.map((tag) => (
                  <li key={tag} className="tag">
                    {tag}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
