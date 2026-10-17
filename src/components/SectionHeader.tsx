import type { ReactNode } from "react";

/** Compact section heading with an optional trailing action (e.g. a link). */
export function SectionHeader({ id, title, action }: { id: string; title: string; action?: ReactNode }) {
  return (
    <div data-reveal className="flex flex-wrap items-end justify-between gap-x-6 gap-y-3">
      <h2 id={id} className="flex items-center gap-3 text-2xl leading-tight sm:text-[1.75rem]">
        <span className="h-2 w-2 shrink-0 rounded-full bg-mint ring-4 ring-mint/15" aria-hidden="true" />
        {title}
      </h2>
      {action}
    </div>
  );
}
