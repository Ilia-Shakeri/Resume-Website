import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import type { Content } from "@/content";

/** About: the core areas of expertise, each with the work that demonstrates it. */
export function Expertise({ content }: { content: Content }) {
  const { expertise, ui } = content;
  return (
    <section aria-labelledby="expertise-title" id="expertise" className="scroll-mt-20 py-10 lg:py-14">
      <div className="container-site">
        <SectionHeader id="expertise-title" title={ui.about.expertiseTitle} />
        <ul data-reveal data-stagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {expertise.map((item) => (
            <li key={item.title} className="spotlight rounded-xl border border-line bg-card-2 p-5">
              <h3 className="text-lg text-ink">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-text">{item.detail}</p>
              <p className="mt-3 text-xs text-muted">
                <span className="text-mint">{ui.about.evidenceLabel}:</span> {item.evidence}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Toolkit({ content }: { content: Content }) {
  const { toolkit, ui } = content;
  const count = toolkit.reduce((total, group) => total + group.tools.length, 0);

  return (
    <section aria-labelledby="toolkit-title" id="toolkit" className="scroll-mt-20 py-6 lg:py-8">
      <div className="container-site">
        <h2 id="toolkit-title" className="sr-only">
          {ui.toolkit.title}
        </h2>
        <details className="group rounded-xl border border-line">
          <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 text-sm text-ink hover:bg-card-2 [&::-webkit-details-marker]:hidden">
            <span>
              {ui.about.toolsToggle} <span className="text-muted">({count})</span>
            </span>
            <span className="text-lg leading-none text-mint transition-transform group-open:rotate-45" aria-hidden="true">
              +
            </span>
          </summary>
          <ul className="grid grid-cols-1 gap-x-10 px-5 pb-2 lg:grid-cols-2">
            {toolkit.map((group) => (
              <li key={group.title} className="border-t border-line py-5">
                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="flex items-center gap-3 text-lg text-ink">
                    <Icon name={group.icon} size={18} className="shrink-0 text-mint" />
                    {group.title}
                  </h3>
                  <span className="meta shrink-0">{String(group.tools.length).padStart(2, "0")}</span>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2" aria-label={group.title}>
                  {group.tools.map((tool) => (
                    <li
                      key={tool.name}
                      dir="ltr"
                      className="tool-chip inline-flex items-center gap-2 rounded-md border border-line bg-card-2 px-2.5 py-1.5 text-[0.8125rem] text-ink"
                    >
                      <TechIcon tool={tool} size={16} />
                      {tool.name}
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-[0.8125rem] text-muted">{group.practices.join(" · ")}</p>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
