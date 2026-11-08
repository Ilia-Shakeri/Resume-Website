import type { Content } from "@/content";
import { ExternalLink } from "@/components/ExternalLink";
import { SectionHeader } from "@/components/SectionHeader";

export function WorkSamples({ content }: { content: Content }) {
  const { workSamples, ui } = content;
  return (
    <section id="work-samples" aria-labelledby="work-samples-title" className="scroll-mt-24 py-8 lg:py-10">
      <div className="container-site">
        <SectionHeader id="work-samples-title" title={ui.workSamples.title} />
        <p className="mt-4 max-w-[780px] text-sm leading-relaxed text-muted">{ui.workSamples.lead}</p>
        <div className="mt-6 space-y-4">
          {workSamples.map((sample) => (
            <article key={sample.id} id={`work-sample-${sample.id}`} data-sample={sample.id} className="scroll-mt-24 rounded-2xl border border-line-strong bg-card p-5 sm:p-7">
              <div className="flex flex-wrap items-baseline justify-between gap-x-5 gap-y-3">
                <h3 className="text-xl leading-tight">{sample.title}</h3>
                <span className="tag">{sample.kind}</span>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-mint">{sample.evidenceLabel}</p>
              <p className="mt-3 max-w-[880px] text-sm leading-relaxed text-text">{sample.intro}</p>
              <details className="group mt-4 border-t border-line pt-2">
                <summary className="flex min-h-11 cursor-pointer list-none items-center justify-between gap-4 text-sm text-mint [&::-webkit-details-marker]:hidden">
                  <span>{ui.workSamples.read}<span className="sr-only">: {sample.title}</span></span>
                  <span aria-hidden="true" className="text-lg group-open:hidden">+</span>
                  <span aria-hidden="true" className="hidden text-lg group-open:inline">-</span>
                </summary>
                <div className="space-y-5 pt-4">
                  {sample.sections.map((section) => (
                    <section key={section.heading}>
                      <h4 className="text-base font-medium text-ink">{section.heading}</h4>
                      <ul className="mt-2 list-disc space-y-2 ps-5 text-sm leading-relaxed text-text marker:text-mint">
                        {section.items.map((item) => <li key={item}>{item}</li>)}
                      </ul>
                    </section>
                  ))}
                  <div>
                    <h4 className="text-base font-medium text-ink">{ui.workSamples.evidence}</h4>
                    <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm">
                      {sample.links.map((link) => (
                        <li key={link.href}>
                          {link.href.startsWith("/") ? (
                            <a href={link.href} className="inline-flex min-h-11 items-center text-mint underline-offset-4 hover:underline">{link.label}</a>
                          ) : (
                            <ExternalLink href={link.href} newTabLabel={ui.external} className="inline-flex min-h-11 items-center text-mint underline-offset-4 hover:underline">{link.label}</ExternalLink>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </details>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
