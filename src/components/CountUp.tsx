"use client";

import { useEffect } from "react";
import type { Locale } from "@/content/types";

const PERSIAN_DIGITS = "۰۱۲۳۴۵۶۷۸۹";

/**
 * Counts `[data-count]` numbers (the attribute holds the final value) up from zero the first time they scroll into
 * view. Only plain integers animate ("3,510", "۴۰"); versions like "2.8.1" or
 * "15/15" stay as written. The server-rendered value is the final one, so
 * without JavaScript or with reduced motion nothing changes.
 */
export function CountUp({ locale }: { locale: Locale }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;
    const format = new Intl.NumberFormat(locale === "fa" ? "fa-IR" : "en-US");
    const frames = new Set<number>();

    const run = (element: HTMLElement, target: number) => {
      const start = performance.now();
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / 1400);
        element.textContent = format.format(Math.round(target * (1 - Math.pow(1 - t, 3))));
        if (t < 1) frames.add(requestAnimationFrame(tick));
      };
      frames.add(requestAnimationFrame(tick));
    };

    const targets = new Map<Element, number>();
    for (const element of document.querySelectorAll<HTMLElement>("[data-count]")) {
      const latin = (element.dataset.count ?? "").trim().replace(/[۰-۹]/g, (d) => String(PERSIAN_DIGITS.indexOf(d)));
      if (!/^\d{1,3}([,٬]\d{3})*$|^\d+$/.test(latin)) continue;
      targets.set(element, Number(latin.replace(/[,٬]/g, "")));
      // Below the fold, start from zero so the final value never flashes first.
      if (element.getBoundingClientRect().top > window.innerHeight) element.textContent = format.format(0);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const target = targets.get(entry.target);
          if (!entry.isIntersecting || target === undefined) continue;
          observer.unobserve(entry.target);
          run(entry.target as HTMLElement, target);
        }
      },
      { threshold: 0.6 },
    );
    targets.forEach((_, element) => observer.observe(element));

    return () => {
      observer.disconnect();
      frames.forEach((frame) => cancelAnimationFrame(frame));
    };
  }, [locale]);

  return null;
}
