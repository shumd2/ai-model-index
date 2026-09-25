"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { providers } from "@/data/providers";
import { modelsByProvider } from "@/data/models";
import { Reveal } from "@/components/reveal";

const categories = [
  { id: "all", label: "All" },
  { id: "frontier", label: "Frontier Labs" },
  { id: "open", label: "Open Weights" },
  { id: "emerging", label: "Emerging" },
];

const providerCategory: Record<string, string> = {
  // Frontier Labs
  openai: "frontier",
  anthropic: "frontier",
  google: "frontier",
  xai: "frontier",
  meta: "frontier",
  amazon: "frontier",
  microsoft: "frontier",
  nvidia: "frontier",
  ibm: "frontier",
  cohere: "frontier",
  // Open Weights
  deepseek: "open",
  alibaba: "open",
  moonshot: "open",
  zai: "open",
  xiaomi: "open",
  minimax: "open",
  "shanghai-ai": "open",
  baidu: "open",
  mistral: "open",
  tmi: "open",
  tencent: "open",
  bytedance: "open",
  stepfun: "open",
  meituan: "open",
  ant: "open",
  inception: "open",
  "prime-intellect": "open",
  ai21: "open",
  reka: "open",
  "china-mobile": "open",
  ai2: "open",
  // Emerging
  salesforce: "emerging",
  "typesafe-ai": "emerging",
  fireworks: "emerging",
  celeris: "emerging",
  upstage: "emerging",
  sapiens: "emerging",
  motif: "emerging",
  "nex-agi": "emerging",
  ifm: "emerging",
  multiverse: "emerging",
};

export function ProviderBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(() => {
    let result = providers;
    if (category !== "all") {
      result = result.filter((p) => providerCategory[p.id] === category);
    }
    if (query.trim()) {
      const q = query.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.shortName.toLowerCase().includes(q) ||
          p.tagline.toLowerCase().includes(q),
      );
    }
    return result;
  }, [query, category]);

  return (
    <>
      {/* Search + Filters */}
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8" /><path d="m21 21-4.35-4.35" />
          </svg>
          <input
            type="search"
            placeholder="Search labs…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full rounded-xl border border-border-subtle bg-surface px-4 py-2.5 pl-10 text-sm outline-none focus:border-accent/50"
          />
        </div>
        <div className="flex gap-1 rounded-xl border border-border-subtle bg-surface p-1">
          {categories.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => setCategory(c.id)}
              className={`rounded-lg px-3 py-1.5 text-[13px] transition-colors ${
                category === c.id
                  ? "bg-accent font-medium text-white"
                  : "text-muted hover:text-foreground"
              }`}
            >
              {c.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category sections */}
      <div className="space-y-12">
        {categories
          .filter((c) => c.id !== "all")
          .map((cat) => {
            const catProviders = filtered.filter((p) => providerCategory[p.id] === cat.id);
            if (catProviders.length === 0) return null;
            return (
              <Reveal key={cat.id}>
                <div>
                  <h2 className="mb-4 font-mono text-[13px] font-bold uppercase tracking-widest text-text-secondary">
                    {cat.label}
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {catProviders.map((p) => {
                      const models = modelsByProvider(p.id);
                      const topModel = [...models].sort(
                        (a, b) => (b.scores["aa-intelligence"] ?? 0) - (a.scores["aa-intelligence"] ?? 0),
                      )[0];
                      return (
                        <Link
                          key={p.id}
                          href={`/providers/${p.id}`}
                          className="group relative flex items-start gap-4 rounded-xl border border-border-subtle bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg"
                        >
                          <span
                            className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl text-sm font-bold text-white shadow-md"
                            style={{
                              background: `linear-gradient(135deg, ${p.color}, ${p.color}88)`,
                            }}
                          >
                            {p.shortName.slice(0, 2).toUpperCase()}
                          </span>
                          <div className="min-w-0 flex-1">
                            <div className="text-base font-semibold group-hover:text-accent">{p.name}</div>
                            <div className="text-[11px] text-muted">{p.hq} · Founded {p.founded}</div>
                            <div className="mt-1 text-[12px] text-muted">{p.tagline}</div>
                            <div className="mt-2 flex items-center gap-3 text-[11px] text-muted">
                              <span>{models.length} model{models.length !== 1 ? "s" : ""}</span>
                              {topModel && (
                                <span className="font-mono text-accent">
                                  AA {topModel.scores["aa-intelligence"]}
                                </span>
                              )}
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              </Reveal>
            );
          })}
      </div>

      {filtered.length === 0 && (
        <div className="py-16 text-center text-muted">No labs match <code>{query}</code> in this category.</div>
      )}
    </>
  );
}
