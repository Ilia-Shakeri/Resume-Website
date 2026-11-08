"use client";

import { useEffect, useRef } from "react";
import { Icon } from "@/components/Icon";
import { LanguageSwitch } from "@/components/LanguageSwitch";
import type { Locale } from "@/content/types";
import type { UiStrings } from "@/content/en/ui";
import { useIsHydrated } from "@/lib/use-motion";

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
    <span aria-hidden="true" dir="ltr" className="font-mono text-sm tracking-[0.3em] text-mint min-[400px]:text-base">
      [/]
    </span>
  );
}

export function SiteHeader({ locale, name, home, nav, current, alternates, resumeHref, resumeDownloadName, ui }: Props) {
  const hydrated = useIsHydrated();
  const menuRef = useRef<HTMLDetailsElement>(null);
  const toggleRef = useRef<HTMLElement>(null);

  const closeMenu = (restoreFocus = false) => {
    if (menuRef.current) menuRef.current.open = false;
    if (restoreFocus) toggleRef.current?.focus();
  };

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuRef.current?.open) {
        menuRef.current.open = false;
        toggleRef.current?.focus();
      }
    };
    const onResize = () => {
      if (window.matchMedia("(min-width: 1024px)").matches && menuRef.current?.open) {
        const focusInMenu = menuRef.current.contains(document.activeElement);
        menuRef.current.open = false;
        if (focusInMenu) document.querySelector<HTMLAnchorElement>("[data-home-link]")?.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    window.addEventListener("resize", onResize);
    return () => {
      document.removeEventListener("keydown", onKey);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 border-b border-line bg-bg/80 backdrop-blur-md">
      <div className="container-site flex h-16 items-center justify-between gap-2 min-[400px]:gap-4">
        <a
          href={home}
          data-home-link
          className="flex min-h-11 shrink-0 items-center gap-2 rounded-sm whitespace-nowrap min-[400px]:gap-3"
          aria-label={`${name}, ${ui.nav.home}`}
          aria-current={current === "home" ? "page" : undefined}
        >
          <Monogram />
          <span className="font-display text-sm font-medium text-ink min-[400px]:text-base">{name}</span>
        </a>

        <div className="flex shrink-0 items-center gap-2 min-[400px]:gap-3 lg:gap-6">
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

          <details ref={menuRef} id="mobile-menu" data-enhanced={hydrated ? "true" : undefined} className="group/mobile lg:hidden">
            <summary
              ref={toggleRef}
              className="-me-2 inline-flex h-11 w-11 cursor-pointer list-none items-center justify-center rounded-md text-ink [&::-webkit-details-marker]:hidden"
              aria-label={ui.nav.mobile}
              aria-controls="mobile-nav"
            >
              <span className="group-open/mobile:hidden"><Icon name="menu" size={22} /></span>
              <span className="hidden group-open/mobile:inline"><Icon name="close" size={22} /></span>
            </summary>
            <nav id="mobile-nav" aria-label={ui.nav.mobile} className="mobile-nav absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto overscroll-contain border-t border-line bg-bg lg:hidden">
              <ul className="container-site flex flex-col py-3">
                {nav.map((item) => (
                  <li key={item.key}>
                    <a
                      href={item.href}
                      aria-current={current === item.key ? "page" : undefined}
                      onClick={() => closeMenu()}
                      className="flex min-h-12 items-center border-b border-line text-base text-ink aria-[current=page]:text-mint"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
                <li className="pt-4 pb-2">
                  <a href={resumeHref} download={resumeDownloadName} onClick={() => closeMenu(true)} className="btn btn-outline w-full">
                    {ui.nav.resume}
                    <Icon name="download" className="text-mint" />
                  </a>
                </li>
              </ul>
            </nav>
          </details>
        </div>
      </div>

      <span aria-hidden="true" className="scroll-progress" />
    </header>
  );
}
