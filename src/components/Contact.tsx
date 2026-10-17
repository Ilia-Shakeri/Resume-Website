import { CopyButton } from "@/components/CopyButton";
import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { TechIcon } from "@/components/TechIcon";
import type { Content } from "@/content";

function ContactOrbit() {
  return (
    <svg viewBox="0 0 240 150" className="orbit-float h-auto w-[150px]" fill="none" aria-hidden="true">
      <ellipse cx="124" cy="62" rx="114" ry="38" transform="rotate(-8 124 62)" stroke="#84bc9c" strokeOpacity="0.45" />
      <ellipse cx="96" cy="96" rx="80" ry="40" transform="rotate(30 96 96)" stroke="#84bc9c" strokeOpacity="0.45" />
      <circle cx="120" cy="66" r="23" fill="#84bc9c" />
      <circle cx="206" cy="27" r="5" fill="#84bc9c" className="pulse-dot" />
    </svg>
  );
}

export function Contact({ content }: { content: Content }) {
  const { profile, ui } = content;
  const links = [
    { name: "LinkedIn", brand: "siLinkedin", ...profile.linkedin },
    { name: "GitHub", brand: "siGithub", ...profile.github },
    { name: "Telegram", brand: "siTelegram", ...profile.telegram },
  ];

  return (
    <section aria-label={ui.pages.contact.title} id="contact" className="scroll-mt-20 py-8 pb-16 lg:py-10 lg:pb-24">
      <div className="container-site grid grid-cols-1 gap-6 lg:grid-cols-[minmax(0,1fr)_400px]">
        <div data-reveal className="spotlight cta-card relative overflow-hidden rounded-2xl border border-line-strong bg-card p-6 sm:p-8">
          <h2 className="text-sm font-normal text-muted">{ui.contact.email}</h2>
          <a
            href={`mailto:${profile.email}`}
            dir="ltr"
            className="link-row mt-2 inline-flex max-w-full items-center gap-3 font-display text-[1.25rem] break-all text-mint min-[400px]:text-[1.5rem] sm:text-[2rem]"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border border-line bg-card-2 sm:h-12 sm:w-12" aria-hidden="true">
              <TechIcon tool={{ name: "Gmail", brand: "siGmail" }} size={22} />
            </span>
            {profile.email}
            <Icon name="arrow-up-right" size={20} className="shrink-0" />
          </a>
          <div className="mt-5">
            <CopyButton value={profile.email} label={ui.contact.copy} copiedLabel={ui.contact.copied} />
          </div>
          <div className="mt-8 flex items-end justify-between gap-6 border-t border-line pt-6">
            <div>
              <h2 className="text-sm font-normal text-muted">{ui.contact.remote}</h2>
              <dl className="mt-3 space-y-2.5 text-sm leading-relaxed">
                {profile.remote.map((item) => (
                  <div key={item.label} className="grid grid-cols-1 gap-0.5 sm:grid-cols-[9.5rem_minmax(0,1fr)] sm:gap-3">
                    <dt className="text-muted">{item.label}</dt>
                    <dd className="text-text">{item.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
            <div className="hidden shrink-0 sm:block">
              <ContactOrbit />
            </div>
          </div>
        </div>

        <div data-reveal>
          <h2 className="text-sm font-normal text-muted">{ui.contact.elsewhere}</h2>
          <ul className="mt-2 space-y-3">
            {links.map((link) => (
              <li key={link.name}>
                <ExternalLink
                  href={link.href}
                  newTabLabel={ui.external}
                  className="spotlight link-row flex items-center justify-between gap-4 rounded-xl border border-line bg-card-2 px-5 py-4 transition hover:border-mint/40"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-card" aria-hidden="true">
                    <TechIcon tool={{ name: link.name, brand: link.brand }} size={20} />
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-ink">{link.name}</span>
                    <span dir="ltr" className="mt-0.5 block font-mono text-xs text-muted">
                      {link.label}
                    </span>
                  </span>
                  <Icon name="arrow-up-right" className="rtl-flip text-mint" />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
