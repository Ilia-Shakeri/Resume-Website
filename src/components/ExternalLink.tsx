import type { AnchorHTMLAttributes } from "react";

/** Link to another origin: opens in a new tab without leaking the opener. */
export function ExternalLink({ children, ...rest }: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <a target="_blank" rel="noopener noreferrer" {...rest}>
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
}
