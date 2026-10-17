"use client";

import { useState } from "react";
import type { Locale } from "@/content/types";

/**
 * EN | فا pill switch. The thumb slides to the chosen language before the page
 * changes to the same page in that language (keeping any #hash), and the
 * choice is remembered.
 * Plain links underneath, so it works without JavaScript too.
 */
export function LanguageSwitch({ locale, label, paths }: { locale: Locale; label: string; paths: Record<Locale, string> }) {
  const [active, setActive] = useState<Locale>(locale);

  const go = (event: React.MouseEvent<HTMLAnchorElement>, target: Locale) => {
    if (target === locale || event.metaKey || event.ctrlKey || event.shiftKey || event.button !== 0) return;
    event.preventDefault();
    try {
      localStorage.setItem("lang", target);
    } catch {
      // Storage can be unavailable (private mode); the switch still works.
    }
    setActive(target);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const href = paths[target] + window.location.hash;
    window.setTimeout(() => window.location.assign(href), reduced ? 0 : 220);
  };

  return (
    <nav aria-label={label} dir="ltr" className="lang-switch relative inline-grid h-10 grid-cols-2 rounded-full border border-line-strong bg-card-2 p-1">
      <span
        aria-hidden="true"
        className="absolute inset-y-1 left-1 w-[calc(50%-0.25rem)] rounded-full bg-mint shadow-[0_0_18px_rgba(132,188,156,0.35)] transition-transform duration-200 ease-out"
        style={{ transform: active === "fa" ? "translateX(100%)" : "translateX(0)" }}
      />
      {(["en", "fa"] as const).map((target) => (
        <a
          key={target}
          href={paths[target]}
          hrefLang={target}
          lang={target}
          aria-current={target === locale ? "page" : undefined}
          onClick={(event) => go(event, target)}
          className={`relative z-10 flex min-w-11 items-center justify-center rounded-full px-3 text-[0.8125rem] font-semibold transition-colors duration-200 ${
            active === target ? "text-on-mint" : "text-text hover:text-ink"
          } ${target === "fa" ? "font-[system-ui]" : "font-mono tracking-[0.04em]"}`}
        >
          <span aria-hidden="true">{target === "en" ? "EN" : "فا"}</span>
          <span className="sr-only">{target === "en" ? "English" : "فارسی"}</span>
        </a>
      ))}
    </nav>
  );
}
