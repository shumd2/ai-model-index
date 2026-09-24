"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { providers } from "@/data/providers";
import { modelsByProvider } from "@/data/models";
import { Reveal } from "@/components/reveal";

export function ProviderBrowser() {
  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState<"name" | "models" | "founded">("name");

  const filtered = useMemo(() => {
    return providers
      .filter((p) =>
        p.name.toLowerCase().includes(query.toLowerCase()) ||
        p.shortName.toLowerCase().includes(query.toLowerCase()) ||
        p.tagline.toLowerCase().includes(query.toLowerCase()),
      )
      .toSorted((a, b) => {
        if (sortBy === "name") return a.name.localeCompare(b.name);
        if (sortBy === "models") return modelsByProvider(b.id).length - modelsByProvider(a.id).length;
        return a.founded.localeCompare(b.founded);
      });
  }, [query, sortBy]);

  return (
    <>
      {/* Controls bar */}
      <Reveal delay={1}>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative">
            <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="search"
              placeholder="Search labs…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="rounded-xl border border-border-subtle bg-surface px-4 py-2 pl-10 text-sm outline-none focus:border-accent/50"
            />
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[12px] text-muted">Sort:</span>
            {(["name", "models", "founded"] as const).map((s) => (
              <button key={s} type="button" onClick={() => setSortBy(s)}
                className={`rounded-lg px-3 py-1.5 text-[12px] transition-colors ${
                  sortBy === s ? "bg-accent font-medium text-white" : "border border-border-subtle text-muted hover:text-foreground"
                }`}>
                {s === "models" ? "by models" : s === "founded" ? "by age" : "by name"}
              </button>
            ))}
          </div>
        </div>
      </Reveal>

      {/* Provider grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((p, i) => {
          const models = modelsByProvider(p.id);
          const topModel = [...models].sort((a, b) => (b.scores["aa-intelligence"] ?? 0) - (a.scores["aa-intelligence"] ?? 0))[0];
          return (
            <Reveal key={p.id} delay={(i % 3) * 0.1}>
              <Link
                href={`/providers/${p.id}`}
                className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-6 transition-all hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
              >
                {/* Glow */}
                <div aria-hidden className="absolute -bottom-12 -right-12 h-32 w-32 rounded-full blur-[60px]" style={{ background: `radial-gradient(closest-side, ${p.color}20, transparent)` }} />

                <div className="relative">
                  {/* Header */}
                  <div className="mb-4 flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <span
                        className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-lg"
                        style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`, boxShadow: `0 8px 24px -6px ${p.color}55` }}
                      >
                        {p.shortName.slice(0, 2).toUpperCase()}
                      </span>
                      <div>
                        <div className="text-base font-semibold group-hover:text-accent">{p.name}</div>
                        <div className="text-[11px] text-muted">founded {p.founded}</div>
                      </div>
                    </div>
                    <span className="rounded-full border border-border-subtle bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted">
                      {models.length} model{models.length !== 1 ? "s" : ""}
                    </span>
                  </div>

                  {/* Tagline */}
                  <p className="text-sm leading-relaxed text-muted">{p.tagline}</p>

                  {/* Top model */}
                  {topModel && (
                    <div className="mt-3 flex items-center gap-2 rounded-lg bg-surface-2/50 px-3 py-2 text-[12px]">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: p.color }} />
                      <span className="text-muted">best:</span>
                      <span className="font-medium">{topModel.name}</span>
                      <span className="font-mono text-accent">AA {topModel.scores["aa-intelligence"]}</span>
                    </div>
                  )}

                  {/* Highlights */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {p.highlights.slice(0, 2).map((h, j) => (
                      <span key={j} className="rounded-full bg-violet-500/10 px-2 py-0.5 text-[10px] text-violet-600 dark:text-violet-400">
                        {h}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="mt-4 flex items-center text-[12px] text-accent opacity-0 transition-opacity group-hover:opacity-100">
                    View all models →
                  </div>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted">
          No labs match <code>{query}</code>.
        </div>
      )}
    </>
  );
}
