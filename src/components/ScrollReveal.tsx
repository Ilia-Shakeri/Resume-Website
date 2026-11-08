"use client";

import { useEffect } from "react";

/**
 * Reveals each card once. Content stays readable without scripts, with
 * reduced motion, or when a short viewport cannot fit a reveal target.
 */
export function ScrollReveal() {
  useEffect(() => {
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (motion.matches) return;
    if (!("IntersectionObserver" in window)) return;

    const root = document.documentElement;
    const candidates = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal], [data-stagger] > *"));
    const elements = candidates.filter((element) => !candidates.some((other) => other !== element && element.contains(other)));
    const pending = new Set<HTMLElement>();
    let observer: IntersectionObserver | undefined;
    const reveal = (element: HTMLElement) => {
      element.classList.remove("reveal-pending");
      element.classList.add("is-visible");
      pending.delete(element);
      observer?.unobserve(element);
    };
    const revealAll = () => [...pending].forEach(reveal);
    const revealVisible = () => {
      for (const element of pending) {
        const rect = element.getBoundingClientRect();
        if ((rect.top < window.innerHeight && rect.bottom > 0) || rect.height >= window.innerHeight * 0.8) reveal(element);
      }
    };
    const onFocus = (event: FocusEvent) => {
      if (!(event.target instanceof Node)) return;
      for (const element of pending) if (element.contains(event.target)) {
        element.style.transitionDuration = "0ms";
        reveal(element);
      }
    };
    const onMotion = () => {
      if (motion.matches) {
        revealAll();
        root.classList.remove("reveal-ready");
      }
    };

    for (const element of elements) {
      element.classList.add("reveal-target", "reveal-pending");
      pending.add(element);
    }
    revealVisible();
    try {
      observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) if (entry.isIntersecting) reveal(entry.target as HTMLElement);
        },
        { threshold: 0 },
      );
      pending.forEach((element) => observer?.observe(element));
    } catch {
      revealAll();
      return;
    }
    root.classList.add("reveal-ready");
    document.addEventListener("focusin", onFocus);
    window.addEventListener("resize", revealVisible);
    motion.addEventListener("change", onMotion);

    return () => {
      observer?.disconnect();
      document.removeEventListener("focusin", onFocus);
      window.removeEventListener("resize", revealVisible);
      motion.removeEventListener("change", onMotion);
      revealAll();
      root.classList.remove("reveal-ready");
    };
  }, []);

  return null;
}
