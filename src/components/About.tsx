import { WhoamiPanel } from "@/components/WhoamiPanel";
import { Lines } from "@/components/SectionHeader";
import type { Content } from "@/content";

export function About({ content }: { content: Content }) {
  const { profile, ui } = content;
  const labels = ui.about.labels;
  const rows = [
    { label: labels.name, value: profile.name },
    { label: labels.role, value: profile.role },
    { label: labels.basedIn, value: profile.location },
    { label: labels.focus, value: profile.focus },
  ];

  return (
    <section aria-labelledby="about-title" className="scroll-mt-24 py-20 lg:py-[120px]" id="about">
      <div className="container-site grid gap-12 lg:grid-cols-[340px_minmax(0,1fr)] lg:gap-[92px]">
        <div>
          <p className="eyebrow">{ui.about.eyebrow}</p>
          <figure data-reveal className="portrait group relative mt-10 overflow-hidden rounded-lg border border-line-strong bg-card">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
            <img
              src="/images/ilia-shakeri.webp"
              alt={ui.about.portraitAlt}
              width={640}
              height={640}
              loading="lazy"
              decoding="async"
              className="aspect-square h-auto w-full object-cover"
            />
            <figcaption dir="ltr" className="absolute start-3 bottom-3 rounded-sm bg-bg/75 px-2 py-1 font-mono text-[0.625rem] tracking-[0.06em] text-text uppercase backdrop-blur-sm">
              ~/ilia-shakeri.webp
            </figcaption>
          </figure>
          <div className="mt-6" data-reveal>
            <WhoamiPanel rows={rows} localTimeLabel={labels.localTime} />
          </div>
          <p className="mt-10 font-mono text-[0.6875rem] leading-[1.7] text-muted">
            {"// "}
            {profile.availability}.
            <br />
            {"// "}
            {profile.languages.join(" · ")}.
          </p>
        </div>

        <div className="lg:pt-2" data-reveal>
          <h2 id="about-title" className="text-[2.5rem] leading-[1.08] sm:text-5xl lg:text-[3.75rem]">
            <Lines lines={ui.about.titleLines} />
          </h2>
          <p className="mt-10 text-lg leading-[1.75] text-text lg:text-[1.1875rem]">{profile.bio[0]}</p>
          <p className="mt-6 text-base leading-[1.75] text-text lg:text-[1.0625rem]">{profile.bio[1]}</p>
          <div className="mt-10 grid gap-8 border-t border-line pt-10 sm:grid-cols-2">
            {profile.principles.map((item) => (
              <div key={item.title}>
                <h3 className="text-xl text-ink">{item.title}</h3>
                <p className="mt-3 text-sm text-muted">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
