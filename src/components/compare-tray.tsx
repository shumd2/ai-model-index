"use client";

import { useEffect, useState } from "react";

const KEY = "ai-index-pinned";
const EVENT = "ai-index-pin";

export function readPinned(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    const parsed = raw ? (JSON.parse(raw) as unknown) : [];
    return Array.isArray(parsed) ? parsed.filter((s): s is string => typeof s === "string") : [];
  } catch {
    return [];
  }
}

function writePinned(slugs: string[]) {
  window.localStorage.setItem(KEY, JSON.stringify(slugs));
  window.dispatchEvent(new CustomEvent(EVENT));
}

export function isPinned(slug: string): boolean {
  return readPinned().includes(slug);
}

/** Small toggle button placed on model cards. */
export function PinButton({ slug, name }: { slug: string; name: string }) {
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    const sync = () => setPinned(isPinned(slug));
    const t = setTimeout(sync, 0);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      clearTimeout(t);
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, [slug]);

  return (
    <button
      type="button"
      aria-label={pinned ? `Remove ${name} from compare` : `Add ${name} to compare`}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        const cur = readPinned();
        if (cur.includes(slug)) {
          writePinned(cur.filter((s) => s !== slug));
        } else {
          writePinned([...cur, slug].slice(-4));
        }
      }}
      className={`rounded-md px-1.5 py-0.5 text-[10px] font-medium transition-colors ${
        pinned
          ? "bg-accent text-white"
          : "border border-border-subtle text-muted hover:border-accent/40 hover:text-accent"
      }`}
    >
      {pinned ? "✓ compare" : "+ compare"}
    </button>
  );
}

/** Sticky bottom tray showing pinned models with a compare shortcut. */
export function CompareTray() {
  const [pinned, setPinned] = useState<string[]>([]);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    function sync() {
      setPinned(readPinned());
    }
    const t = setTimeout(sync, 0);
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      clearTimeout(t);
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  if (pinned.length === 0 || hidden) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-50 border-t border-border-subtle bg-background/95 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3 sm:px-6">
        <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
          Pinned ({pinned.length}/4)
        </span>
        <div className="flex flex-1 flex-wrap gap-1.5">
          {pinned.map((slug) => (
            <button
              key={slug}
              type="button"
              onClick={() => writePinned(readPinned().filter((s) => s !== slug))}
              className="group flex items-center gap-1.5 rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-[12px]"
            >
              {slug}
              <span className="text-muted transition-colors group-hover:text-foreground">×</span>
            </button>
          ))}
        </div>
        <a
          href={`/compare?models=${pinned.join(",")}`}
          className="shrink-0 bg-accent px-4 py-2 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
        >
          Compare →
        </a>
        <button
          type="button"
          aria-label="Hide compare tray"
          onClick={() => setHidden(true)}
          className="shrink-0 px-1 text-muted hover:text-foreground"
        >
          ×
        </button>
      </div>
    </div>
  );
}
