import { DevOpsLoop } from "@/components/DevOpsLoop";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import type { Content } from "@/content";
import { site } from "@/lib/site";

export function Hero({ content }: { content: Content }) {
  const { profile, capabilities, ui } = content;
  const links = [
    { label: "GitHub", href: profile.github.href },
    { label: "LinkedIn", href: profile.linkedin.href },
    { label: "Telegram", href: profile.telegram.href },
  ];

  return (
    <section id="top" aria-labelledby="hero-title" className="relative overflow-hidden">
      {/* Phones: photo, then intro, then the loop. Desktop: intro beside photo and loop. */}
      <div className="container-site grid grid-cols-1 gap-x-16 gap-y-10 pt-12 pb-14 [grid-template-areas:'photo'_'text'_'loop'] md:pt-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,440px)] lg:gap-y-6 lg:pt-16 lg:pb-16 lg:[grid-template-areas:'text_photo'_'text_loop'] xl:grid-cols-[minmax(0,1fr)_minmax(0,500px)]">
        <figure className="relative w-fit [grid-area:photo] lg:mx-auto lg:w-full lg:max-w-[340px] lg:self-end">
          <div aria-hidden="true" className="pointer-events-none absolute -inset-6 bg-[radial-gradient(closest-side,rgb(132_188_156/0.14),transparent)]" />
          {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
          <img
            src="/images/ilia-shakeri.webp"
            alt={ui.hero.portraitAlt}
            width={640}
            height={640}
            fetchPriority="high"
            decoding="async"
            className="relative aspect-square h-36 w-36 rounded-full border border-line-strong object-cover shadow-[0_0_0_6px_var(--color-bg),0_0_0_7px_rgb(132_188_156/0.35)] sm:h-44 sm:w-44 lg:h-auto lg:w-full lg:rounded-[2rem]"
          />
        </figure>

        <div className="relative z-10 [grid-area:text] lg:self-center">
          <p className="inline-flex items-center gap-2.5 rounded-full border border-mint/30 bg-mint-tint px-3.5 py-1.5 text-xs text-mint">
            <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
            {ui.hero.available}
          </p>
          <h1 id="hero-title" className="mt-6 text-[2.75rem] leading-[1.02] tracking-[-0.03em] sm:text-6xl lg:mt-7 lg:text-[4rem] xl:text-[4.75rem]">
            {profile.name}
          </h1>
          <p className="mt-4 font-display text-xl leading-snug text-ink/85 sm:text-2xl xl:text-[1.75rem]">{profile.headline}</p>
          <p className="mt-6 max-w-[600px] text-base leading-[1.75] text-text sm:text-[1.0625rem] xl:text-lg">{profile.intro}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li className="inline-flex items-center gap-2">
              <Icon name="cap" size={16} className="text-mint" />
              {profile.study}
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon name="pin" size={16} className="text-mint" />
              {profile.location}
            </li>
          </ul>
          <div className="mt-8 flex flex-wrap gap-3 sm:gap-4">
            <a href="#projects" className="btn btn-primary">
              {ui.hero.explore}
              <Icon name="arrow-down" />
            </a>
            <a href={site.resume.pdfPath} download={site.resume.downloadName} className="btn btn-outline">
              {ui.hero.resume}
              <Icon name="download" className="text-mint" />
            </a>
          </div>
          <ul className="mt-7 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" aria-label={ui.hero.links}>
            {links.map((link) => (
              <li key={link.label}>
                <ExternalLink
                  href={link.href}
                  newTabLabel={ui.external}
                  className="link-row inline-flex min-h-8 items-center gap-1.5 text-text hover:text-ink"
                >
                  {link.label}
                  <Icon name="arrow-up-right" size={14} className="rtl-flip text-mint" />
                </ExternalLink>
              </li>
            ))}
            <li>
              <a href={`mailto:${profile.email}`} dir="ltr" className="inline-flex min-h-8 items-center gap-2 text-text hover:text-ink">
                <Icon name="mail" size={15} className="text-mint" />
                {profile.email}
              </a>
            </li>
          </ul>
        </div>

        <div className="flex flex-col gap-4 [grid-area:loop]">
          <DevOpsLoop title={ui.hero.loopTitle} />
          <p className="meta flex items-center justify-center gap-3">
            <span className="h-px w-9 bg-mint" aria-hidden="true" />
            {ui.hero.loopCaption}
          </p>
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site">
          <ul className="grid gap-x-8 gap-y-3 py-6 sm:grid-cols-2 lg:grid-cols-5" aria-label={ui.hero.capabilitiesLabel}>
            <li className="meta">{ui.hero.capabilitiesLabel}</li>
            {capabilities.map((item) => (
              <li key={item} className="flex items-center gap-3 font-mono text-xs tracking-[0.06em] text-ink uppercase lg:justify-end">
                <span className="text-mint" aria-hidden="true">
                  +
                </span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
