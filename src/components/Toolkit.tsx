import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import { toolkit, toolkitIntro } from "@/content/practice";

export function Toolkit() {
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
        <ul className="mt-14 grid gap-x-8 sm:grid-cols-2 lg:mt-20 lg:grid-cols-3">
          {toolkit.map((group) => (
            <li key={group.title} className="border-t border-line py-8 lg:pb-10">
              <h3 className="flex items-center gap-3 text-[1.375rem] text-ink">
                <Icon name={group.icon} size={20} className="shrink-0 text-mint" />
                {group.title}
              </h3>
              <div className="mt-5 space-y-1.5 font-mono text-sm text-ink/90">
                {group.tools.map((line) => (
                  <p key={line.join()}>{line.join(" / ")}</p>
                ))}
              </div>
              <p className="mt-5 text-[0.8125rem] text-muted">{group.practices.join(" · ")}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
