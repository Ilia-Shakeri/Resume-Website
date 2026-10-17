import type { ReactNode } from "react";

/** Title block at the top of an inner page. */
export function PageHeader({ title, lead }: { title: string; lead?: ReactNode }) {
  return (
    <header className="container-site pt-10 pb-4 lg:pt-14">
      <h1 className="text-[2.25rem] leading-[1.1] tracking-[-0.02em] sm:text-5xl">
        {title}
      </h1>
      {lead ? (
        <p className="mt-4 max-w-[640px] text-base leading-relaxed text-text sm:text-lg">
          {lead}
        </p>
      ) : null}
    </header>
  );
}
