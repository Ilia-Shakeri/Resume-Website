import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { education, qualifications } from "@/content/profile";

export function Education() {
  return (
    <section aria-labelledby="education-title" id="education" className="scroll-mt-24 bg-surface py-20 lg:py-[120px]">
      <div className="container-site">
        <p className="eyebrow">06 / Education & training</p>
        <h2 data-reveal id="education-title" className="mt-4 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[4rem]">
          Always in learning mode.
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-[500px_minmax(0,1fr)] lg:gap-12">
          <div data-reveal className="self-start rounded-2xl border border-line-strong p-6 sm:p-8">
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.06em] text-mint uppercase">
              <Icon name="cap" size={20} />
              Education
            </p>
            <h3 className="mt-7 text-[1.875rem] leading-tight">{education.degree}</h3>
            {education.institution ? <p className="mt-4 text-lg text-text">{education.institution}</p> : null}
            <p className="meta mt-4">{education.status}</p>
            <p className="mt-6 border-t border-line pt-6 text-[0.9375rem] leading-[1.7] text-text">{education.note}</p>
          </div>

          <ul className="border-t border-line">
            {qualifications.map((item) => (
              <li key={item.title} data-reveal className="group relative flex gap-5 border-b border-line py-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-mint-tint text-mint">
                  <Icon name="badge" size={20} />
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="text-2xl leading-tight">{item.title}</h3>
                  <p className="meta mt-2">
                    {item.issuer} · {item.date}
                    {item.certId ? ` · Cert ID ${item.certId}` : ""}
                  </p>
                  <p className="mt-2 text-sm text-text">{item.note}</p>
                </div>
                {item.href ? (
                  <figure
                    aria-hidden="true"
                    className="pointer-events-none absolute top-1/2 right-[calc(100%+1.5rem)] z-20 hidden w-[340px] -translate-y-1/2 scale-95 overflow-hidden rounded-lg border border-line-strong bg-card opacity-0 shadow-[0_24px_60px_rgba(0,0,0,0.55)] transition duration-300 ease-out group-focus-within:scale-100 group-focus-within:opacity-100 group-hover:scale-100 group-hover:opacity-100 lg:block"
                  >
                    {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
                    <img src={item.href} alt="" width={340} height={240} loading="lazy" className="h-auto w-full" />
                    <figcaption className="border-t border-line px-3 py-2 font-mono text-[0.625rem] text-muted uppercase">
                      {item.title} · {item.certId}
                    </figcaption>
                  </figure>
                ) : null}
                {item.href ? (
                  <ExternalLink
                    href={item.href}
                    className="link-row -mt-1 inline-flex h-11 shrink-0 items-start gap-2 pt-1 text-sm text-mint"
                  >
                    <span className="max-sm:sr-only">View certificate</span>
                    <span className="sr-only">: {item.title}</span>
                    <Icon name="arrow-up-right" />
                  </ExternalLink>
                ) : null}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
