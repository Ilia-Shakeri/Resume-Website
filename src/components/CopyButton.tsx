"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/Icon";
import { useIsHydrated } from "@/lib/use-motion";

/** Copies a value to the clipboard; announces the result to screen readers. Hidden without JavaScript. */
export function CopyButton({ value, label, copiedLabel, errorLabel }: { value: string; label: string; copiedLabel: string; errorLabel: string }) {
  const hydrated = useIsHydrated();
  const [status, setStatus] = useState<"idle" | "copied" | "error">("idle");
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => {
    if (timer.current) clearTimeout(timer.current);
  }, []);

  const copy = async () => {
    if (timer.current) clearTimeout(timer.current);
    try {
      await navigator.clipboard.writeText(value);
      setStatus("copied");
      timer.current = setTimeout(() => setStatus("idle"), 2000);
    } catch {
      setStatus("error");
    }
  };

  if (!hydrated) return null;

  return (
    <span className="inline-flex flex-col items-start gap-2">
      <button
        type="button"
        onClick={copy}
        className="inline-flex min-h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-sm text-ink transition-colors hover:border-mint/60"
      >
        <Icon name={status === "copied" ? "check" : "file"} size={16} className="text-mint" />
        <span>{status === "copied" ? copiedLabel : label}</span>
      </button>
      <span role="status" className={status === "error" ? "max-w-sm text-sm text-text" : "sr-only"}>
        {status === "error" ? errorLabel : status === "copied" ? copiedLabel : ""}
      </span>
    </span>
  );
}
