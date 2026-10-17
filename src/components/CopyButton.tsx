"use client";

import { useState } from "react";
import { Icon } from "@/components/Icon";

/** Copies a value to the clipboard; announces the result to screen readers. Hidden without JavaScript. */
export function CopyButton({ value, label, copiedLabel }: { value: string; label: string; copiedLabel: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard access can be denied; the address stays visible and selectable.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="js-only inline-flex min-h-11 items-center gap-2 rounded-md border border-line-strong px-4 text-sm text-ink transition-colors hover:border-mint/60"
    >
      <Icon name={copied ? "check" : "file"} size={16} className="text-mint" />
      <span aria-live="polite">{copied ? copiedLabel : label}</span>
    </button>
  );
}
