"use client";

import { useEffect, useRef, useState } from "react";
import { useIsActive, usePrefersReducedMotion } from "@/lib/use-motion";

export type TerminalLine = { kind: "cmd" | "out" | "ok"; text: string };

type Props = {
  title: string;
  lines: TerminalLine[];
  /** How many lines stay on screen; older ones scroll away. */
  rows?: number;
  className?: string;
};

const TYPE_MS = 42;
const AFTER_COMMAND_MS = 380;
const BETWEEN_OUTPUT_MS = 160;
const AFTER_GROUP_MS = 1900;
const BEFORE_RESTART_MS = 3200;

function lineClass(kind: TerminalLine["kind"]) {
  if (kind === "cmd") return "text-text";
  if (kind === "ok") return "text-mint";
  return "text-muted";
}

function Line({ line, typing = false }: { line: TerminalLine; typing?: boolean }) {
  return (
    <p className={`truncate ${lineClass(line.kind)}`}>
      {line.kind === "cmd" ? <span className="text-muted">$ </span> : null}
      {line.kind === "ok" ? "✓ " : null}
      {line.text}
      {typing ? <span className="terminal-cursor" /> : null}
    </p>
  );
}

/**
 * A terminal that types its script in a loop. It runs only while on screen and
 * the tab is visible, shows the full transcript statically with reduced motion
 * or without JavaScript, and exposes the transcript to screen readers once.
 */
export function LiveTerminal({ title, lines, rows = 4, className = "" }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const active = useIsActive(ref);
  const [shown, setShown] = useState<TerminalLine[]>([]);
  const [typing, setTyping] = useState<TerminalLine | null>(null);
  const step = useRef({ line: 0, char: 0 });

  useEffect(() => {
    if (reduced || !active) return;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const { line, char } = step.current;

      if (line >= lines.length) {
        timer = setTimeout(() => {
          step.current = { line: 0, char: 0 };
          setShown([]);
          tick();
        }, BEFORE_RESTART_MS);
        return;
      }

      const current = lines[line];
      if (current.kind === "cmd" && char < current.text.length) {
        step.current.char = char + 1;
        setTyping({ kind: "cmd", text: current.text.slice(0, char + 1) });
        timer = setTimeout(tick, TYPE_MS + Math.random() * 40);
        return;
      }

      setTyping(null);
      setShown((previous) => [...previous, current]);
      step.current = { line: line + 1, char: 0 };
      const next = lines[line + 1];
      const delay =
        current.kind === "cmd" ? AFTER_COMMAND_MS : next?.kind === "cmd" || !next ? AFTER_GROUP_MS : BETWEEN_OUTPUT_MS;
      timer = setTimeout(tick, delay);
    };

    timer = setTimeout(tick, 300);
    return () => clearTimeout(timer);
  }, [active, reduced, lines]);

  // The last row is always the prompt: either the command being typed or an
  // idle cursor, like a real shell waiting for input.
  const history = shown.slice(-(rows - 1));

  return (
    <div ref={ref} dir="ltr" className={`rounded-lg border border-line-strong bg-card-2 px-5 py-4 font-mono text-[0.8125rem] ${className}`}>
      <div className="flex items-center justify-between text-[0.6875rem] text-muted">
        <span>{title}</span>
        <span className="flex items-center gap-2 text-mint">
          <span className="pulse-dot h-1.5 w-1.5 rounded-full bg-mint" aria-hidden="true" />
          LIVE
        </span>
      </div>

      <div className="sr-only">
        {lines.map((line, index) => (
          <p key={index}>{line.kind === "cmd" ? `$ ${line.text}` : line.text}</p>
        ))}
      </div>

      {/* Static transcript: shown until JavaScript takes over (html.js). */}
      <div aria-hidden="true" className="terminal-static mt-3 space-y-1.5">
        {lines.slice(-rows).map((line, index) => (
          <Line key={index} line={line} />
        ))}
      </div>

      <div aria-hidden="true" className="terminal-live mt-3 space-y-1.5" style={{ minHeight: `${rows * 1.625}rem` }}>
        {reduced
          ? lines.slice(-rows).map((line, index) => <Line key={index} line={line} />)
          : (
            <>
              {history.map((line, index) => (
                <Line key={`${shown.length - history.length + index}`} line={line} />
              ))}
              {typing ? (
                <Line line={typing} typing />
              ) : (
                <p>
                  <span className="text-muted">$ </span>
                  <span className="terminal-cursor" />
                </p>
              )}
            </>
          )}
      </div>
    </div>
  );
}
