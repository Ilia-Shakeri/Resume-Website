"use client";

import { useEffect, useRef, useState } from "react";
import { useIsActive, usePrefersReducedMotion } from "@/lib/use-motion";

type Row = { label: string; value: string };

const COMMAND = "whoami";
const TYPE_MS = 55;
const VALUE_TYPE_MS = 18;

function tehranTime(date: Date): string {
  return new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Tehran",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  }).format(date);
}

/** Live clock for Tehran; renders a placeholder until mounted (no hydration mismatch). */
function LocalClock() {
  const [now, setNow] = useState<string | null>(null);
  useEffect(() => {
    const update = () => setNow(tehranTime(new Date()));
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);
  return (
    <span dir="ltr" className="inline-block tabular-nums">
      {now ?? "--:--:--"} <span className="text-muted">IRST</span>
    </span>
  );
}

/**
 * The `$ whoami` profile panel. On first view it types the command and then
 * each value; afterwards the cursor keeps blinking and the local clock ticks.
 * The fully rendered panel is the server/no-JS/reduced-motion state.
 */
export function WhoamiPanel({ rows, localTimeLabel }: { rows: Row[]; localTimeLabel: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const active = useIsActive(ref);
  // progress: characters of the command typed, then characters of each value.
  const total = COMMAND.length + rows.reduce((sum, row) => sum + row.value.length, 0);
  const [progress, setProgress] = useState<number | null>(null);

  useEffect(() => {
    if (reduced || !active || progress === total) return;
    // `null` → start from an empty prompt the moment the panel comes into view.
    const current = progress ?? -1;
    const delay =
      current < 0 ? 0 : current < COMMAND.length ? TYPE_MS : current === COMMAND.length ? 350 : VALUE_TYPE_MS;
    const id = setTimeout(() => setProgress(current + 1), delay);
    return () => clearTimeout(id);
  }, [active, reduced, progress, total]);

  const done = reduced || progress === null || progress >= total;
  const typedChars = done ? Infinity : progress;
  const typedCommand = COMMAND.slice(0, Math.max(0, Math.min(typedChars, COMMAND.length)));

  // Each value starts typing where the previous one ended.
  const starts = rows.map((_, index) =>
    rows.slice(0, index).reduce((sum, row) => sum + row.value.length, COMMAND.length),
  );
  const typedRows = rows.map((row, index) => {
    const budget = typedChars - starts[index];
    const typed = row.value.slice(0, Math.max(0, Math.min(budget, row.value.length)));
    return { ...row, typed, typing: !done && budget > 0 && budget < row.value.length, started: done || typed.length > 0 };
  });
  const commandTyping = !done && typedCommand.length < COMMAND.length;
  // Before the first frame of typing, server HTML shows everything; once the
  // panel scrolls into view the animation starts from an empty prompt.
  const showAll = progress === null;

  return (
    <div ref={ref} className="rounded-lg border border-line-strong bg-card px-6 py-6 font-mono">
      <p dir="ltr" className="text-sm text-mint">
        <span aria-hidden="true">$ </span>
        {showAll ? COMMAND : typedCommand}
        {commandTyping && !showAll ? <span className="terminal-cursor" /> : null}
      </p>
      <dl className="mt-6 space-y-[18px]">
        {typedRows.map((row) => (
          <div key={row.label} className={showAll || row.started ? "" : "invisible"}>
            <dt className="text-xs tracking-[0.06em] text-muted uppercase">{row.label}</dt>
            <dd className="mt-1.5 font-sans text-[0.9375rem] text-ink">
              <span className="sr-only">{row.value}</span>
              <span aria-hidden="true">
                {showAll ? row.value : row.typed}
                {row.typing ? <span className="terminal-cursor" /> : null}
              </span>
            </dd>
          </div>
        ))}
        <div className={showAll || done ? "" : "invisible"}>
          <dt className="text-xs tracking-[0.06em] text-muted uppercase">{localTimeLabel}</dt>
          <dd className="mt-1.5 font-sans text-[0.9375rem] text-ink">
            <LocalClock />
          </dd>
        </div>
      </dl>
      <p dir="ltr" className="mt-6 text-sm text-mint" aria-hidden="true">
        $ <span className="terminal-cursor" />
      </p>
    </div>
  );
}
