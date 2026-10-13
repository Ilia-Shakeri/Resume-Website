"use client";

import { Icon } from "@/components/Icon";

export function PrintButton() {
  return (
    <button type="button" onClick={() => window.print()} className="btn btn-outline min-h-10 px-4">
      Print
      <Icon name="printer" className="text-mint" />
    </button>
  );
}
