import type { UiStrings } from "@/content/en/ui";
import type { CaseStudy as CaseStudyData } from "@/content/types";

/** Expandable "Engineering notes": problem → role → approach → reliability → result. */
export function CaseStudy({ caseStudy, labels }: { caseStudy: CaseStudyData; labels: UiStrings["caseStudy"] }) {
  const groups = [
    { label: labels.approach, items: caseStudy.approach },
    { label: labels.reliability, items: caseStudy.reliability },
    { label: labels.result, items: caseStudy.outcome },
  ];

  return (
    <details className="group border-t border-line pt-5">
      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 rounded-sm font-mono text-xs tracking-[0.06em] text-mint uppercase [&::-webkit-details-marker]:hidden">
        {labels.toggle}
        <span className="text-base leading-none transition-transform group-open:rotate-45" aria-hidden="true">
          +
        </span>
      </summary>
      <div className="mt-5 space-y-5 text-sm leading-relaxed text-text">
        <div>
          <h4 className="meta">{labels.problem}</h4>
          <p className="mt-2">{caseStudy.problem}</p>
        </div>
        <div>
          <h4 className="meta">{labels.role}</h4>
          <p className="mt-2">{caseStudy.role}</p>
        </div>
        {groups.map((group) => (
          <div key={group.label}>
            <h4 className="meta">{group.label}</h4>
            <ul className="mt-2 space-y-2">
              {group.items.map((item) => (
                <li key={item} className="flex gap-3">
                  <span className="mt-[0.6em] h-1 w-1 shrink-0 rounded-full bg-mint" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </details>
  );
}
