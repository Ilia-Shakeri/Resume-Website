import type { AnchorHTMLAttributes } from "react";

type Props = AnchorHTMLAttributes<HTMLAnchorElement> & { href: string; newTabLabel?: string };

/** Link to another origin: opens in a new tab without leaking the opener. */
export function ExternalLink({ children, newTabLabel = "(opens in a new tab)", ...rest }: Props) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> {newTabLabel}</span>
    </a>
  );
}
