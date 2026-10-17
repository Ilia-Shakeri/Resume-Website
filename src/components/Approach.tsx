import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import type { Content } from "@/content";

export function Approach({ content }: { content: Content }) {
  const { approach, ui } = content;
  return (
    <section aria-labelledby="approach-title" id="approach" className="scroll-mt-20 py-10 pb-16 lg:py-14 lg:pb-24">
      <div className="container-site">
        <SectionHeader id="approach-title" title={ui.approach.title} />
        <ol data-reveal data-stagger className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {approach.map((step, index) => (
            <li key={step.title} className="spotlight rounded-xl border border-line bg-card-2 p-5">
              <div className="flex items-center justify-between">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-mint-tint text-mint">
                  <Icon name={step.icon} size={18} />
                </span>
                <span className="font-mono text-xs text-muted" aria-hidden="true" dir="ltr">
                  0{index + 1} →
                </span>
              </div>
              <h3 className="mt-4 text-lg">{step.title}</h3>
              <p className="mt-2 text-sm leading-[1.65] text-text">{step.description}</p>
              <p className="mt-2 text-[0.8125rem] leading-[1.6] text-muted">{step.practice}</p>
              <p className="mt-3 font-mono text-xs tracking-[0.06em] text-mint uppercase">{ui.approach.output} / {step.output}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
