import * as simpleIcons from "simple-icons";
import { Icon } from "@/components/Icon";
import type { Tool } from "@/content/types";

type SimpleIcon = { title: string; hex: string; path: string };

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
  const icon = tool.brand ? (simpleIcons as unknown as Record<string, SimpleIcon | undefined>)[tool.brand] : undefined;

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
