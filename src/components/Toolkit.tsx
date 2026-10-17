import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import type { Content } from "@/content";

export function Toolkit({ content }: { content: Content }) {
  const { toolkit, ui } = content;

  return (
    <section aria-labelledby="toolkit-title" id="toolkit" className="scroll-mt-20 py-10 lg:py-14">
      <div className="container-site">
        <SectionHeader id="toolkit-title" title={ui.toolkit.title} />
        <ul className="mt-6 grid grid-cols-1 gap-x-10 lg:grid-cols-2">
          {toolkit.map((group, index) => (
            <li
              key={group.title}
              data-reveal
              style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
              className="border-t border-line py-6"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="flex items-center gap-3 text-lg text-ink">
                  <Icon name={group.icon} size={18} className="shrink-0 text-mint" />
                  {group.title}
                </h3>
                <span className="meta shrink-0">{String(group.tools.length).padStart(2, "0")}</span>
              </div>
              <ul data-stagger className="mt-4 flex flex-wrap gap-2" aria-label={group.title}>
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
      </div>
    </section>
  );
}
