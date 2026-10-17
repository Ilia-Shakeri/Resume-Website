import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import type { Content } from "@/content";

/** About: each area of expertise with the tools used in it and where the work can be checked. */
export function Expertise({ content }: { content: Content }) {
  const { toolkit, ui } = content;
  return (
    <section aria-labelledby="expertise-title" id="expertise" className="scroll-mt-20 py-10 pb-16 lg:py-14 lg:pb-24">
      <div className="container-site">
        <SectionHeader id="expertise-title" title={ui.about.expertiseTitle} />
        <ul data-reveal data-stagger className="mt-6 grid grid-cols-1 items-start gap-4 lg:grid-cols-2">
          {toolkit.map((group) => (
            <li key={group.title} className="spotlight rounded-xl border border-line bg-card-2 p-5 sm:p-6">
              <h3 className="flex items-center gap-3 text-lg leading-tight text-ink">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-mint-tint text-mint" aria-hidden="true">
                  <Icon name={group.icon} size={18} />
                </span>
                {group.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-text">{group.detail}</p>
              <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${group.title}: ${ui.about.toolsLabel}`}>
                {group.tools.map((tool) => (
                  <li
                    key={tool.name}
                    dir="ltr"
                    className="tool-chip inline-flex items-center gap-2 rounded-md border border-line bg-card px-2.5 py-1.5 text-[0.8125rem] text-ink"
                  >
                    <TechIcon tool={tool} size={16} />
                    {tool.name}
                  </li>
                ))}
              </ul>
              <p className="mt-4 border-t border-line pt-3 text-xs text-muted">
                <span className="text-mint">{ui.about.evidenceLabel}:</span> {group.evidence}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
