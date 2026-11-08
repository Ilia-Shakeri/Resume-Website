"use client";

import { Icon } from "@/components/Icon";
import { useIsHydrated } from "@/lib/use-motion";

export function PrintButton() {
  const hydrated = useIsHydrated();
  if (!hydrated) return null;
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-outline min-h-10 px-4">
      Print
      <Icon name="printer" className="text-mint" />
    </button>
  );
}
