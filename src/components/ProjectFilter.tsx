"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

type Filter = { key: string; label: string; count: number };

/**
 * Category chips over a server-rendered project grid. Cards carry
 * data-category; without JavaScript every card simply stays visible.
 */
export function ProjectFilter({ filters, label, children }: { filters: Filter[]; label: string; children: ReactNode }) {
  const [active, setActive] = useState("all");
  const grid = useRef<HTMLUListElement>(null);

  useEffect(() => {
    grid.current?.querySelectorAll<HTMLElement>(":scope > [data-category]").forEach((card) => {
      const show = active === "all" || card.dataset.category === active;
      card.hidden = !show;
      if (show) card.classList.add("is-visible");
    });
  }, [active]);

  return (
    <>
      <div role="group" aria-label={label} className="flex flex-wrap gap-2">
        {filters.map((filter) => {
          const pressed = active === filter.key;
          return (
            <button
              key={filter.key}
              type="button"
              aria-pressed={pressed}
              onClick={() => setActive(filter.key)}
              className={`inline-flex min-h-10 items-center gap-2 rounded-full border px-4 text-sm transition-colors duration-200 ${
                pressed ? "border-mint bg-mint text-on-mint" : "border-line-strong text-text hover:border-mint/60 hover:text-ink"
              }`}
            >
              {filter.label}
              <span className={`font-mono text-[0.6875rem] ${pressed ? "text-on-mint/70" : "text-muted"}`}>{filter.count}</span>
            </button>
          );
        })}
      </div>
      <ul ref={grid} className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </ul>
    </>
  );
}
