"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import type { Locale } from "@/content/types";
import type { UiStrings } from "@/content/en/ui";

type NavItem = { key: string; label: string; href: string };

type Props = {
  locale: Locale;
  name: string;
  home: string;
  nav: NavItem[];
  /** Key of the page being shown, for aria-current. */
  current: string;
  /** The same page in each language, for the language switch. */
  alternates: Record<Locale, string>;
  resumeHref: string;
  resumeDownloadName: string;
  ui: Pick<UiStrings, "nav" | "language">;
};

export function Monogram() {
  return (
    <span aria-hidden="true" dir="ltr" className="font-mono text-base tracking-[0.3em] text-mint">
      [/]
    </span>
  );
}

export function SiteHeader({ locale, name, home, nav, current, alternates, resumeHref, resumeDownloadName, ui }: Props) {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, [open]);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-4">
        <a
          href={home}
          className="flex items-center gap-3 rounded-sm"
          aria-label={`${name}, ${ui.nav.home}`}
          aria-current={current === "home" ? "page" : undefined}
        >
          <Monogram />
          <span className="font-display text-base font-medium text-ink">{name}</span>
        </a>

        <div className="flex items-center gap-3 lg:gap-6">
          <nav aria-label={ui.nav.primary} className="hidden items-center gap-6 lg:flex">
            <ul className="flex items-center gap-6">
              {nav.map((item) => (
                <li key={item.key}>
                  <a
                    href={item.href}
                    aria-current={current === item.key ? "page" : undefined}
                    className="nav-link text-sm text-text transition-colors hover:text-ink aria-[current=page]:text-ink"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
            <a href={resumeHref} download={resumeDownloadName} className="btn btn-outline min-h-10 px-4 text-[0.8125rem]">
              {ui.nav.resume}
              <Icon name="download" size={16} className="text-mint" />
            </a>
          </nav>

          <LanguageSwitch locale={locale} label={ui.language.label} paths={alternates} />

          <button
            ref={toggleRef}
            type="button"
            className="-me-2 inline-flex h-11 w-11 items-center justify-center rounded-md text-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} size={22} />
            <span className="sr-only">{open ? ui.nav.closeMenu : ui.nav.openMenu}</span>
          </button>
        </div>
      </div>

      <nav id="mobile-nav" aria-label={ui.nav.mobile} hidden={!open} className="mobile-nav border-t border-line bg-bg lg:hidden">
        <ul className="container-site flex flex-col py-3">
          {nav.map((item) => (
            <li key={item.key}>
              <a
                href={item.href}
                aria-current={current === item.key ? "page" : undefined}
                onClick={() => setOpen(false)}
                className="flex min-h-12 items-center border-b border-line text-base text-ink aria-[current=page]:text-mint"
              >
                {item.label}
              </a>
            </li>
          ))}
          <li className="pt-4 pb-2">
            <a href={resumeHref} download={resumeDownloadName} onClick={() => setOpen(false)} className="btn btn-outline w-full">
              {ui.nav.resume}
              <Icon name="download" className="text-mint" />
            </a>
          </li>
        </ul>
      </nav>
      <span aria-hidden="true" className="scroll-progress" />
    </header>
  );
}
