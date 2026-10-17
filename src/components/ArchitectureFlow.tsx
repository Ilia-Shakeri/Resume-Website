import { Icon } from "@/components/Icon";
import type { FlowStep } from "@/content/types";

/**
 * An architecture drawn as numbered boxes in reading order, with an arrow
 * from each box to the next. A list, so it reads correctly without styles
 * and in screen readers.
 */
export function ArchitectureFlow({ caption, steps }: { caption: string; steps: FlowStep[] }) {
  return (
    <figure>
      <ol className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
        {steps.map((step, index) => (
          <li key={step.name} className="rounded-lg border border-line bg-bg/60 p-4">
            <p className="flex items-center gap-2 font-mono text-xs text-mint">
              <span aria-hidden="true" className="text-muted" dir="ltr">
                {String(index + 1).padStart(2, "0")}
              </span>
              <bdi dir="ltr">{step.name}</bdi>
              {index < steps.length - 1 ? <Icon name="arrow-right" size={14} className="rtl-flip ms-auto text-muted" /> : null}
            </p>
            <p className="mt-2 text-sm leading-relaxed text-text">{step.detail}</p>
          </li>
        ))}
      </ol>
      <figcaption className="mt-3 text-xs text-muted">{caption}</figcaption>
    </figure>
  );
}
