import { experience, experienceSummary } from "@/content/profile";

export function Experience() {
  return (
    <section aria-labelledby="experience-title" id="experience" className="scroll-mt-24 bg-surface py-20 lg:py-[120px]">
      <div className="container-site grid gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-[92px]">
        <div>
          <p className="eyebrow">04 / Experience</p>
          <h2 id="experience-title" className="mt-6 text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.75rem]">
            A career in building better.
          </h2>
          <p className="mt-8 text-base leading-[1.7] text-text lg:text-[1.0625rem]">{experienceSummary}</p>
          <p className="mt-8 font-mono text-[0.6875rem] leading-[1.7] text-muted">
            {"// Dates and roles from my résumé;"}
            <br />
            {"// project details from GitHub."}
          </p>
        </div>

        <ol className="border-t border-line">
          {experience.map((item) => (
            <li key={`${item.organization}-${item.title}`} className="relative border-b border-line py-9 pl-9 last:border-b-0">
              <span className="absolute top-[3.05rem] left-0 h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                <h3 className="text-[1.75rem] leading-tight lg:text-[2rem]">{item.title}</h3>
                <p className="meta shrink-0">{item.period}</p>
              </div>
              <p className="mt-3 text-[0.9375rem] text-mint">
                {item.organization} · {item.location}
              </p>
              <p className="mt-4 text-[0.9375rem] leading-[1.7] text-text">{item.scope}</p>
              <ul className="mt-3 space-y-2 text-[0.9375rem] leading-[1.65] text-text">
                {item.highlights.map((highlight) => (
                  <li key={highlight} className="flex gap-3">
                    <span className="mt-[0.7em] h-px w-2.5 shrink-0 bg-mint" aria-hidden="true" />
                    <span>{highlight}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label="Focus areas">
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
