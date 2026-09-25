"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ThemeToggle } from "./theme-toggle";
import { CommandPalette, type PaletteItem } from "./command-palette";
import { benchmarks } from "@/data/benchmarks";
import { models } from "@/data/models";
import { providers } from "@/data/providers";

const links = [
  { href: "/models", label: "Models" },
  { href: "/compare", label: "Compare" },
  { href: "/tools", label: "Tools" },
  { href: "/providers", label: "Providers" },
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/news", label: "News" },
];

const paletteItems: PaletteItem[] = [
  ...models.map((m) => ({
    label: m.name,
    sub: `${m.tagline}`,
    href: `/models/${m.slug}`,
    kind: "model" as const,
  })),
  ...providers.map((p) => ({
    label: p.name,
    sub: p.tagline,
    href: `/providers/${p.id}`,
    kind: "provider" as const,
  })),
  ...benchmarks.map((b) => ({
    label: b.name,
    sub: b.source,
    href: "/benchmarks",
    kind: "benchmark" as const,
  })),
  ...links.map((l) => ({
    label: l.label,
    sub: "page",
    href: l.href,
    kind: "page" as const,
  })),
  { label: "Cost calculator", sub: "tool", href: "/tools/calculator", kind: "page" as const },
  { label: "Value map", sub: "tool", href: "/tools/value-map", kind: "page" as const },
  { label: "Speed race", sub: "tool", href: "/tools/speed-race", kind: "page" as const },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border-subtle bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 font-mono text-sm font-bold text-white">
            AI
          </span>
          <span className="text-[15px] font-semibold tracking-tight">
            Model Index
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`rounded-lg px-3 py-1.5 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-muted hover:text-foreground"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <div className="ml-4 flex items-center gap-3">
            <CommandPalette items={paletteItems} />
            <ThemeToggle />
          </div>
        </nav>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <button
            type="button"
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border-subtle bg-surface text-muted"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              {open ? <path d="M18 6 6 18M6 6l12 12" /> : <path d="M4 7h16M4 12h16M4 17h16" />}
            </svg>
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-border-subtle bg-background px-4 py-3 md:hidden">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className={`block rounded-lg px-3 py-2 text-sm ${
                pathname.startsWith(l.href)
                  ? "bg-accent-soft font-medium text-accent"
                  : "text-muted"
              }`}
            >
              {l.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
