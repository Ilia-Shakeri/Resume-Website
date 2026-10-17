import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { SectionHeader } from "@/components/SectionHeader";
import type { Content } from "@/content";

export function Education({ content }: { content: Content }) {
  const { education, qualifications, ui } = content;
  return (
    <section aria-labelledby="education-title" id="education" className="scroll-mt-20 py-10 lg:py-14">
      <div className="container-site">
        <SectionHeader id="education-title" title={ui.education.title} />
        <div className="mt-6 grid grid-cols-1 gap-8 lg:grid-cols-[400px_minmax(0,1fr)] lg:gap-10">
          <div data-reveal className="spotlight self-start rounded-2xl border border-line-strong bg-card p-6">
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.06em] text-mint uppercase">
              <Icon name="cap" size={20} />
              {ui.education.educationLabel}
            </p>
            <h3 className="mt-5 text-xl leading-tight">{education.degree}</h3>
            {education.institution ? <p className="mt-3 text-text">{education.institution}</p> : null}
            <p className="mt-2 text-sm text-muted">{education.status}</p>
            <p className="mt-5 border-t border-line pt-5 text-sm leading-[1.7] text-text">{education.note}</p>
          </div>

          <div>
          <h3 className="text-base text-ink">{ui.education.trainingLabel}</h3>
          <p className="mt-1 text-sm text-muted">{ui.education.trainingNote}</p>
          <ul className="mt-4 border-t border-line">
            {qualifications.map((item) => (
              <li key={item.title} data-reveal className="group relative flex gap-4 border-b border-line py-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-mint-tint text-mint">
                  <Icon name="badge" size={18} />
                </span>
                <div className="min-w-0 flex-1">
                  <h4 className="text-lg leading-tight">{item.title}</h4>
                  <p className="mt-1.5 text-xs text-muted">
                    {item.issuer} · {item.date}
                    {item.certId ? (
                      <>
                        {` · ${ui.education.certId} `}
                        <span dir="ltr">{item.certId}</span>
                      </>
                    ) : null}
                  </p>
                  <p className="mt-2 text-sm text-text">{item.note}</p>
                </div>
                {item.href ? (
                  <figure
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 end-[calc(100%+1.5rem)] z-20 hidden w-[340px] -translate-y-1/2 scale-95 overflow-hidden rounded-lg border border-line-strong bg-card opacity-0 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition duration-300 ease-out group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100 lg:block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                    <img src={item.href} alt="" width={340} height={240} loading="lazy" className="h-auto w-full" />
                    <figcaption dir="ltr" className="border-t border-line px-3 py-2 font-mono text-xs text-muted uppercase">
                      {item.title} · {item.certId}
                    </figcaption>
                  </figure>
                ) : null}
                {item.href ? (
                  <ExternalLink
                    href={item.href}
                    newTabLabel={ui.external}
                    className="link-row -mt-1 inline-flex h-11 min-w-11 shrink-0 items-start justify-center gap-2 pt-1 text-sm text-mint"
                  >
                    <span className="max-sm:sr-only">{ui.education.viewCertificate}</span>
                    <span className="sr-only">: {item.title}</span>
                    <Icon name="arrow-up-right" className="rtl-flip" />
                  </ExternalLink>
                ) : null}
              </li>
            ))}
          </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
