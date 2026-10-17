import type { CSSProperties } from "react";
import { DevOpsLoop } from "@/components/DevOpsLoop";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { pagePath, type Content, type Locale } from "@/content";
import { site } from "@/lib/site";

/** Stagger index for the load-in animation (.enter in globals.css). */
const step = (i: number) => ({ "--i": i }) as CSSProperties;

export function Hero({ content, locale }: { content: Content; locale: Locale }) {
  const { profile, capabilities, ui } = content;
  const links = [
    { label: "GitHub", href: profile.github.href },
    { label: "LinkedIn", href: profile.linkedin.href },
    { label: "Telegram", href: profile.telegram.href },
  ];

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden">
      <div aria-hidden="true" className="hero-backdrop">
        <span className="hero-grid" />
        <span className="hero-blob hero-blob-1" />
        <span className="hero-blob hero-blob-2" />
      </div>

      {/* Phones: photo, then intro, then the loop. Desktop: intro beside photo and loop. */}
      <div className="relative container-site grid grid-cols-1 gap-x-16 gap-y-8 pt-6 pb-10 [grid-template-areas:'photo'_'text'_'loop'] lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-y-4 lg:pt-8 lg:pb-10 lg:[grid-template-areas:'text_photo'_'text_loop'] xl:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
        <figure className="enter relative w-fit [grid-area:photo] lg:mx-auto lg:w-full lg:max-w-[320px]" style={step(1)}>
          <div className="portrait-ring rounded-full p-[3px] lg:rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
            <img
              src="/images/ilia-shakeri.webp"
              alt={ui.hero.portraitAlt}
              width={640}
              height={640}
              fetchPriority="high"
              decoding="async"
              className="aspect-square h-32 w-32 rounded-full bg-card object-cover sm:h-40 sm:w-40 lg:h-auto lg:w-full lg:rounded-[calc(2rem-3px)]"
            />
          </div>
        </figure>

        <div className="relative z-10 [grid-area:text]">
          <p
            className="enter inline-flex items-center gap-2.5 rounded-full border border-mint/30 bg-mint-tint px-3.5 py-1.5 text-xs text-mint"
            style={step(0)}
          >
            <span className="relative flex h-2 w-2" aria-hidden="true">
              <span className="absolute inset-0 animate-ping rounded-full bg-mint opacity-60" />
              <span className="relative h-2 w-2 rounded-full bg-mint" />
            </span>
            {ui.hero.available}
          </p>
          <h1 id="hero-title" className="enter mt-5 text-[2.5rem] leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem] xl:text-[3.75rem]" style={step(1)}>
            {profile.name}
          </h1>
          <p className="enter mt-3 font-display text-lg leading-snug sm:text-xl xl:text-[1.375rem]" style={step(2)}>
            <span className="text-gradient">{profile.headline}</span>
          </p>
          <p className="enter mt-5 max-w-[580px] text-[0.9375rem] leading-[1.75] text-text sm:text-base" style={step(3)}>
            {profile.intro}
          </p>
          <ul className="enter mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted" style={step(4)}>
            <li className="inline-flex items-center gap-2">
              <Icon name="cap" size={16} className="text-mint" />
              {profile.study}
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon name="pin" size={16} className="text-mint" />
              {profile.location}
            </li>
          </ul>
          <div className="enter mt-7 flex flex-wrap gap-3" style={step(5)}>
            <a href={pagePath(locale, "projects")} className="btn btn-primary">
              {ui.hero.explore}
              <Icon name="arrow-right" className="rtl-flip" />
            </a>
            <a href={site.resume.pdfPath} download={site.resume.downloadName} className="btn btn-outline">
              {ui.hero.resume}
              <Icon name="download" className="text-mint" />
            </a>
          </div>
          <ul className="enter mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" style={step(6)} aria-label={ui.hero.links}>
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

        <div className="enter [grid-area:loop]" style={step(4)}>
          <DevOpsLoop title={ui.hero.loopTitle} />
        </div>
      </div>

      <div className="relative border-t border-line">
        <div className="container-site">
          <ul data-reveal data-stagger className="grid gap-x-8 gap-y-3 py-5 sm:grid-cols-2 lg:grid-cols-5" aria-label={ui.hero.capabilitiesLabel}>
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
