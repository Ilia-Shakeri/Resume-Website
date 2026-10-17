"use client";

import { useEffect } from "react";

/**
 * Fades `[data-reveal]` elements in as they enter the viewport and out again
 * as they leave it. Progressive enhancement: without JavaScript, or with
 * reduced motion, nothing is ever hidden. Elements already on screen are
 * marked visible before hiding is switched on, so nothing flashes on load.
 */
export function ScrollReveal() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const elements = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    const viewport = window.innerHeight;

    for (const element of elements) {
      const rect = element.getBoundingClientRect();
      if (rect.top < viewport && rect.bottom > 0) element.classList.add("is-visible");
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) entry.target.classList.toggle("is-visible", entry.isIntersecting);
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.08 },
    );
    elements.forEach((element) => observer.observe(element));
    root.classList.add("reveal-ready");

    return () => {
      observer.disconnect();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
