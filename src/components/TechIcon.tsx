import * as simpleIcons from "simple-icons";
import { Icon } from "@/components/Icon";
import type { Tool } from "@/content/types";

type SimpleIcon = { title: string; hex: string; path: string };

/** Brand marks that Simple Icons no longer ships. */
const LOCAL_ICONS: Record<string, SimpleIcon> = {
  siLinkedin: {
    title: "LinkedIn",
    hex: "0A66C2",
    path: "M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z",
  },
};

const CARD_BACKGROUND = [0x12, 0x17, 0x19];

function luminance([r, g, b]: number[]): number {
  const channel = (value: number) => {
    const c = value / 255;
    return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4;
  };
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b);
}

function contrast(a: number[], b: number[]): number {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

/**
 * Brand colour, lightened toward white until it is legible on the dark card
 * (3:1, the WCAG minimum for graphics). Keeps the hue of dark logos such as
 * Helm or SQLite instead of rendering them invisible.
 */
function legibleColor(hex: string): string {
  let rgb = [0, 2, 4].map((i) => parseInt(hex.slice(i, i + 2), 16));
  for (let step = 0; step < 20 && contrast(rgb, CARD_BACKGROUND) < 3; step++) {
    rgb = rgb.map((c) => Math.round(c + (255 - c) * 0.12));
  }
  return `#${rgb.map((c) => c.toString(16).padStart(2, "0")).join("")}`;
}

/** Build-time brand icon (inlined SVG path, no client JavaScript). */
export function TechIcon({ tool, size = 18 }: { tool: Tool; size?: number }) {
  const icon = tool.brand
    ? (LOCAL_ICONS[tool.brand] ?? (simpleIcons as unknown as Record<string, SimpleIcon | undefined>)[tool.brand])
    : undefined;

  if (!icon) {
    return <Icon name={tool.fallback ?? "terminal"} size={size} className="shrink-0 text-muted" />;
  }

  return (
    <svg
      role="img"
      aria-hidden="true"
      focusable="false"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className="shrink-0"
      fill={legibleColor(icon.hex)}
    >
      <path d={icon.path} />
    </svg>
  );
}
