"use client";

import { useEffect } from "react";

/**
 * Feeds the pointer position to `.spotlight` cards as --mx/--my, which the
 * card's glow follows (globals.css). Only on devices that hover, and not with
 * reduced motion.
 */
export function Spotlight() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (prefers-reduced-motion: no-preference)").matches) return;
    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest<HTMLElement>(".spotlight");
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    document.addEventListener("pointermove", onMove, { passive: true });
    return () => document.removeEventListener("pointermove", onMove);
  }, []);

  return null;
}
