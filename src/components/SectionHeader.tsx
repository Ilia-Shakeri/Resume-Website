import type { ReactNode } from "react";

type SectionHeaderProps = {
  id: string;
  index: string;
  label: string;
  title: ReactNode;
  aside?: ReactNode;
};

/** Numbered eyebrow + large display heading with an optional right-hand note. */
export function SectionHeader({ id, index, label, title, aside }: SectionHeaderProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-[1fr_minmax(0,390px)] xl:items-end xl:gap-16">
      <div>
        <p className="eyebrow">
          {index} / {label}
        </p>
        <h2 id={id} className="mt-4 text-[2.5rem] leading-[1.05] sm:text-5xl lg:text-[4rem]">
          {title}
        </h2>
      </div>
      {aside ? <p className="max-w-[390px] text-base leading-relaxed text-text xl:pb-2 lg:text-[1.0625rem]">{aside}</p> : null}
    </div>
  );
}
