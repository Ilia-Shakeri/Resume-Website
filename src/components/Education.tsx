import { Icon } from "@/components/Icon";
import { education, qualifications } from "@/content/profile";

export function Education() {
  return (
    <section aria-labelledby="education-title" id="education" className="scroll-mt-24 bg-surface py-20 lg:py-[120px]">
      <div className="container-site">
        <p className="eyebrow">06 / Education & training</p>
        <h2 id="education-title" className="mt-4 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[4rem]">
          Always in learning mode.
        </h2>
        <div className="mt-12 grid gap-10 lg:grid-cols-[500px_minmax(0,1fr)] lg:gap-12">
          <div className="rounded-2xl border border-line-strong p-6 sm:p-8">
            <p className="flex items-center gap-3 font-mono text-xs tracking-[0.06em] text-mint uppercase">
              <Icon name="cap" size={20} />
              Education
            </p>
            <h3 className="mt-7 text-[1.875rem] leading-tight">{education.degree}</h3>
            <p className="mt-4 text-lg text-text">{education.institution}</p>
            <p className="mt-6 border-t border-line pt-6 text-[0.9375rem] leading-[1.7] text-text">{education.note}</p>
          </div>

          <ul className="border-t border-line">
            {qualifications.map((item) => (
              <li key={item.title} className="flex gap-5 border-b border-line py-6">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-mint-tint text-mint">
                  <Icon name="badge" size={20} />
                </span>
                <div>
                  <h3 className="text-2xl leading-tight">{item.title}</h3>
                  <p className="meta mt-2">
                    {item.issuer} · {item.date} · Course completion
                  </p>
                  <p className="mt-2 text-sm text-text">{item.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
