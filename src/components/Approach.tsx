import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import type { Content } from "@/content";

export function Approach({ content }: { content: Content }) {
  const { approach, approachIntro, ui } = content;
  return (
    <section aria-labelledby="approach-title" id="approach" className="scroll-mt-24 py-20 lg:py-[120px]">
      <div className="container-site">
        <SectionHeader id="approach-title" eyebrow={ui.approach.eyebrow} title={ui.approach.title} aside={approachIntro} />
        <ol className="mt-14 grid gap-10 sm:grid-cols-2 lg:mt-20 lg:grid-cols-4 lg:gap-8">
          {approach.map((step, index) => (
            <li key={step.title} data-reveal style={{ "--reveal-delay": `${index * 90}ms` } as React.CSSProperties}>
              <div className="flex items-center justify-between border-b border-line pb-6">
                <span className="flex h-[54px] w-[54px] items-center justify-center rounded-md bg-mint-tint text-mint">
                  <Icon name={step.icon} size={22} />
                </span>
                <span className="font-mono text-xs text-muted" aria-hidden="true" dir="ltr">
                  0{index + 1} →
                </span>
              </div>
              <h3 className="mt-6 text-[1.75rem]">{step.title}</h3>
              <p className="mt-4 text-base leading-[1.65] text-text">{step.description}</p>
              <p className="mt-3 text-sm leading-[1.6] text-muted">{step.practice}</p>
              <p className="mt-4 font-mono text-[0.6875rem] tracking-[0.06em] text-mint uppercase">{ui.approach.output} / {step.output}</p>
            </li>
          ))}
        </ol>
        <div data-reveal className="mt-10 flex flex-col gap-4 rounded-lg bg-card px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="flex items-start gap-4 text-[0.9375rem] text-ink sm:items-center">
            <Icon name="repeat" size={20} className="mt-0.5 shrink-0 text-mint sm:mt-0" />
            {ui.approach.banner}
          </p>
          <p className="shrink-0 font-mono text-[0.6875rem] tracking-[0.06em] text-mint uppercase">{ui.approach.bannerTag}</p>
        </div>
      </div>
    </section>
  );
}
