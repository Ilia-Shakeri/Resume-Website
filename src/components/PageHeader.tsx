import type { ReactNode } from "react";

/** Title block at the top of an inner page; animates in on load. */
export function PageHeader({ title, lead }: { title: string; lead?: ReactNode }) {
  return (
    <header className="container-site pt-10 pb-4 lg:pt-14">
      <h1 className="enter text-[2.25rem] leading-[1.1] tracking-[-0.02em] sm:text-5xl" style={{ "--i": 0 } as React.CSSProperties}>
        {title}
      </h1>
      {lead ? (
        <p className="enter mt-4 max-w-[640px] text-base leading-relaxed text-text sm:text-lg" style={{ "--i": 1 } as React.CSSProperties}>
          {lead}
        </p>
      ) : null}
    </header>
  );
}
