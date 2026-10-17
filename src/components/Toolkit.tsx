import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { TechIcon } from "@/components/TechIcon";
import { toolkit, toolkitIntro } from "@/content/practice";

export function Toolkit() {
  const count = toolkit.reduce((total, group) => total + group.tools.length, 0);

  return (
    <section aria-labelledby="toolkit-title" id="toolkit" className="scroll-mt-24 py-20 lg:py-[120px]">
      <div className="container-site">
        <SectionHeader
          id="toolkit-title"
          index="03"
          label="Technical toolkit"
          title={
            <>
              The right tools.
              <br />
              For the right problem.
            </>
          }
          aside={toolkitIntro}
        />
        <ul className="mt-14 grid gap-x-10 lg:mt-20 lg:grid-cols-2">
          {toolkit.map((group, index) => (
            <li
              key={group.title}
              data-reveal
              style={{ "--reveal-delay": `${(index % 2) * 90}ms` } as React.CSSProperties}
              className="border-t border-line py-8"
            >
              <div className="flex items-baseline justify-between gap-4">
                <h3 className="flex items-center gap-3 text-[1.375rem] text-ink">
                  <Icon name={group.icon} size={20} className="shrink-0 text-mint" />
                  {group.title}
                </h3>
                <span className="meta shrink-0">{String(group.tools.length).padStart(2, "0")}</span>
              </div>
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${group.title} tools`}>
                {group.tools.map((tool) => (
                  <li
                    key={tool.name}
                    className="inline-flex items-center gap-2 rounded-md border border-line bg-card-2 px-3 py-2 text-[0.8125rem] text-ink transition-colors duration-200 hover:border-mint/60 hover:bg-mint-tint"
                  >
                    <TechIcon tool={tool} size={16} />
                    {tool.name}
                  </li>
                ))}
              </ul>
              <p className="mt-5 text-[0.8125rem] text-muted">{group.practices.join(" · ")}</p>
            </li>
          ))}
        </ul>
        <p className="mt-6 font-mono text-[0.6875rem] text-muted">
          {`// ${count} tools · brand icons from Simple Icons (CC0)`}
        </p>
      </div>
    </section>
  );
}
