import { DevOpsLoop } from "@/components/DevOpsLoop";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { pagePath, type Content, type Locale } from "@/content";
import { site } from "@/lib/site";

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
        <span className="hero-blob" />
      </div>

      {/* Phones: photo, then intro, then the loop. Desktop: intro beside photo and loop. */}
      <div className="relative container-site grid grid-cols-1 gap-x-16 gap-y-8 pt-6 pb-10 [grid-template-areas:'text'_'loop'] lg:grid-cols-[minmax(0,1fr)_minmax(0,420px)] lg:gap-y-4 lg:pt-8 lg:pb-10 lg:[grid-template-areas:'text_photo'_'text_loop'] xl:grid-cols-[minmax(0,1fr)_minmax(0,480px)]">
        <figure className="relative hidden [grid-area:photo] lg:mx-auto lg:block lg:w-full lg:max-w-[320px]">
          <div className="portrait-ring rounded-full p-[3px] lg:rounded-[2rem]">
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
            <img
              src="/images/ilia-shakeri.webp"
              alt={ui.hero.portraitAlt}
              width={640}
              height={640}
              fetchPriority="high"
              decoding="async"
              className="aspect-square h-auto w-full rounded-[calc(2rem-3px)] bg-card object-cover"
            />
          </div>
        </figure>

        <div className="relative z-10 [grid-area:text]">
          <p className="flex items-center gap-2 text-sm text-mint">
            <span className="h-2 w-2 rounded-full bg-mint" aria-hidden="true" />
            {ui.hero.available}
          </p>
          <div className="mt-4 flex items-center gap-4">
            {/* Phones show the portrait beside the name; larger screens show the big one. */}
            {/* eslint-disable-next-line @next/next/no-img-element -- static export; pre-sized WebP */}
            <img
              src="/images/ilia-shakeri.webp"
              alt=""
              width={640}
              height={640}
              decoding="async"
              className="h-16 w-16 shrink-0 rounded-full border border-line-strong object-cover sm:h-20 sm:w-20 lg:hidden"
            />
            <h1 id="hero-title" className="text-[2.25rem] leading-[1.05] tracking-[-0.03em] sm:text-[3.25rem] xl:text-[3.75rem]">
              {profile.name}
            </h1>
          </div>
          <p className="mt-4 font-display text-xl leading-snug text-ink sm:text-2xl">{profile.headline}</p>
          <p className="mt-2 font-mono text-sm text-muted">
            <span className="sr-only">{ui.hero.stackLabel}: </span>
            <bdi dir="ltr">{profile.stack.join(" · ")}</bdi>
          </p>
          <p className="mt-5 max-w-[580px] text-base leading-[1.75] text-text">{profile.intro}</p>
          <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted">
            <li className="inline-flex items-center gap-2">
              <Icon name="cap" size={16} className="text-mint" />
              {profile.study}
            </li>
            <li className="inline-flex items-center gap-2">
              <Icon name="pin" size={16} className="text-mint" />
              {profile.location}
            </li>
          </ul>
          <div className="mt-7 flex flex-wrap gap-3">
            <a href={pagePath(locale, "projects")} className="btn btn-primary">
              {ui.hero.explore}
              <Icon name="arrow-right" className="rtl-flip" />
            </a>
            <a href={site.resume.pdfPath} download={site.resume.downloadName} className="btn btn-outline">
              {ui.hero.resume}
              <Icon name="download" className="text-mint" />
            </a>
            <a href={pagePath(locale, "contact")} className="btn btn-outline">
              {ui.hero.contact}
              <Icon name="mail" className="text-mint" />
            </a>
          </div>
          <ul className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-3 text-sm" aria-label={ui.hero.links}>
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

        <div className="mx-auto w-full max-w-[380px] [grid-area:loop] lg:max-w-none">
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
