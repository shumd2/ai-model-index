import type { ReactNode } from "react";

export function ExternalLink({
  href,
  children,
  className = "",
  ariaLabel,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  ariaLabel?: string;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      aria-label={ariaLabel ? `${ariaLabel} (opens in new tab)` : undefined}
      className={className}
    >
      {children}
      <span className="sr-only"> (opens in new tab)</span>
      <svg
        aria-hidden="true"
        viewBox="0 0 16 16"
        className="inline-block h-3 w-3 shrink-0"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M6 3h7v7M13 3 5.5 10.5" />
        <path d="M11 9.5V13H3V5h3.5" />
      </svg>
    </a>
  );
}
