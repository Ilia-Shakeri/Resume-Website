import { ExternalLink } from "@/components/ExternalLink";
import { Icon } from "@/components/Icon";
import { profile } from "@/content/profile";

function ContactOrbit() {
  return (
    <svg viewBox="0 0 240 150" className="h-auto w-[230px]" fill="none" aria-hidden="true">
      <ellipse cx="124" cy="62" rx="114" ry="38" transform="rotate(-8 124 62)" stroke="#84bc9c" strokeOpacity="0.45" />
      <ellipse cx="96" cy="96" rx="80" ry="40" transform="rotate(30 96 96)" stroke="#84bc9c" strokeOpacity="0.45" />
      <circle cx="120" cy="66" r="23" fill="#84bc9c" />
      <circle cx="206" cy="27" r="5" fill="#84bc9c" className="pulse-dot" />
    </svg>
  );
}

export function Contact() {
  const links = [
    { name: "GitHub", ...profile.github },
    { name: "LinkedIn", ...profile.linkedin },
  ];

  return (
    <section aria-labelledby="contact-title" id="contact" className="scroll-mt-24 pt-10 pb-16 lg:pt-12 lg:pb-20">
      <div className="container-site grid gap-14 lg:grid-cols-[minmax(0,1fr)_360px]">
        <div>
          <p className="eyebrow">08 / Next connection</p>
          <h2 id="contact-title" className="mt-10 text-[3.25rem] leading-[1.05] sm:text-7xl lg:text-[6rem] lg:leading-[1.02]">
            Let’s build
            <br />
            what’s next.
          </h2>
          <p className="mt-10 max-w-[560px] text-lg leading-[1.7] text-text">{profile.contactMessage}</p>
          <a
            href={`mailto:${profile.email}`}
            className="link-row mt-12 inline-flex max-w-full items-center gap-6 border-b border-line-strong pb-4 font-display text-[1.6rem] break-all text-mint sm:text-[2.25rem]"
          >
            {profile.email}
            <Icon name="arrow-up-right" size={22} className="shrink-0" />
          </a>
        </div>

        <div className="lg:pt-24">
          <ContactOrbit />
          <p className="mt-6 font-mono text-xs leading-[1.7] tracking-[0.04em] text-text uppercase">
            {profile.availability}
            <br />
            {profile.location} · {profile.timeZone}
          </p>
          <ul className="mt-6">
            {links.map((link) => (
              <li key={link.name} className="border-b border-line">
                <ExternalLink href={link.href} className="link-row flex items-start justify-between gap-4 py-5">
                  <span>
                    <span className="block text-lg text-ink">{link.name}</span>
                    <span className="mt-1 block font-mono text-[0.6875rem] text-muted">{link.label}</span>
                  </span>
                  <Icon name="arrow-up-right" className="mt-1 text-mint" />
                </ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
