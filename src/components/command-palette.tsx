"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";

export type PaletteItem = {
  label: string;
  sub: string;
  href: string;
  kind: "model" | "provider" | "benchmark" | "page";
};

export function CommandPalette({ items }: { items: PaletteItem[] }) {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => {
          if (!o) {
            setQuery("");
            setCursor(0);
          }
          return !o;
        });
      }
      if (e.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    if (open) {
      // focus after paint
      requestAnimationFrame(() => inputRef.current?.focus());
    }
  }, [open]);

  function openPalette() {
    setQuery("");
    setCursor(0);
    setOpen(true);
  }

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items.slice(0, 9);
    return items
      .filter(
        (i) => i.label.toLowerCase().includes(q) || i.sub.toLowerCase().includes(q),
      )
      .slice(0, 9);
  }, [items, query]);

  if (!open) {
    return (
      <button
        type="button"
        onClick={openPalette}
        aria-label="Search (⌘K)"
        className="hidden items-center gap-1.5 rounded-lg border border-border-subtle bg-surface px-2.5 py-1.5 text-[12px] text-muted transition-colors hover:text-foreground lg:flex"
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
          <circle cx="11" cy="11" r="7" />
          <path d="m20 20-3.5-3.5" />
        </svg>
        Search
        <kbd className="rounded border border-border-subtle bg-surface-2 px-1 font-mono text-[10px]">⌘K</kbd>
      </button>
    );
  }

  function go(href: string) {
    setOpen(false);
    router.push(href);
  }

  return (
    <div
      className="fixed inset-0 z-[60] flex items-start justify-center bg-black/40 px-4 pt-[12vh] backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="w-full max-w-lg overflow-hidden rounded-2xl border border-border-subtle bg-surface shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center gap-2 border-b border-border-subtle px-4 py-3">
          <svg className="text-muted" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setCursor(0);
            }}
            onKeyDown={(e) => {
              if (e.key === "ArrowDown") {
                e.preventDefault();
                setCursor((c) => Math.min(results.length - 1, c + 1));
              } else if (e.key === "ArrowUp") {
                e.preventDefault();
                setCursor((c) => Math.max(0, c - 1));
              } else if (e.key === "Enter" && results[cursor]) {
                go(results[cursor].href);
              }
            }}
            placeholder="Search models, labs, benchmarks…"
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted"
          />
          <kbd className="rounded border border-border-subtle bg-surface-2 px-1.5 py-0.5 font-mono text-[10px] text-muted">esc</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-1.5">
          {results.length === 0 ? (
            <div className="px-3 py-6 text-center text-sm text-muted">No matches.</div>
          ) : (
            results.map((r, i) => (
              <button
                key={r.href + r.label}
                type="button"
                onMouseEnter={() => setCursor(i)}
                onClick={() => go(r.href)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left transition-colors ${
                  i === cursor ? "bg-accent-soft" : ""
                }`}
              >
                <span
                  className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-md font-mono text-[10px] font-bold ${
                    i === cursor ? "bg-accent text-white" : "bg-surface-2 text-muted"
                  }`}
                >
                  {r.kind === "model" ? "M" : r.kind === "provider" ? "L" : r.kind === "benchmark" ? "B" : "→"}
                </span>
                <span className="min-w-0 flex-1">
                  <span className={`block truncate text-[13px] font-medium ${i === cursor ? "text-accent" : ""}`}>
                    {r.label}
                  </span>
                  <span className="block truncate text-[11px] text-muted">{r.sub}</span>
                </span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
