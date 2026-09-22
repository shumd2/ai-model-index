"use client";

import { useMemo, useState } from "react";
import type { Model } from "@/data/models";
import { formatContext } from "@/data/models";
import { getProvider, providers } from "@/data/providers";
import { ModelCard } from "./model-card";

type Filter = "all" | "open" | "closed" | "current" | "reasoning";

const filters: { id: Filter; label: string }[] = [
  { id: "all", label: "All" },
  { id: "current", label: "Current gen" },
  { id: "open", label: "Open weights" },
  { id: "closed", label: "Proprietary" },
  { id: "reasoning", label: "Reasoning" },
];

export function ModelExplorer({ allModels }: { allModels: Model[] }) {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState<Filter>("all");
  const [provider, setProvider] = useState<string>("all");

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    return allModels.filter((m) => {
      if (provider !== "all" && m.provider !== provider) return false;
      if (filter === "open" && !m.openWeights) return false;
      if (filter === "closed" && m.openWeights) return false;
      if (filter === "current" && (m.status === "legacy")) return false;
      if (filter === "reasoning" && !m.reasoning) return false;
      if (!q) return true;
      const providerName = getProvider(m.provider).name.toLowerCase();
      return (
        m.name.toLowerCase().includes(q) ||
        m.provider.toLowerCase().includes(q) ||
        providerName.includes(q) ||
        m.tagline.toLowerCase().includes(q)
      );
    });
  }, [allModels, query, filter, provider]);

  return (
    <div>
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <svg
            className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-muted"
            width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" />
          </svg>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Search ${allModels.length} models — try "kimi" or "webdev"…`}
            className="w-full rounded-xl border border-border-subtle bg-surface py-2.5 pl-10 pr-4 text-sm outline-none transition-colors placeholder:text-muted focus:border-accent"
          />
        </div>
        <select
          value={provider}
          onChange={(e) => setProvider(e.target.value)}
          className="rounded-xl border border-border-subtle bg-surface px-3 py-2.5 text-sm outline-none focus:border-accent"
        >
          <option value="all">All providers</option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f.id}
            type="button"
            onClick={() => setFilter(f.id)}
            className={`rounded-full px-3.5 py-1.5 text-[13px] transition-colors ${
              filter === f.id
                ? "bg-accent font-medium text-white"
                : "border border-border-subtle bg-surface text-muted hover:text-foreground"
            }`}
          >
            {f.label}
          </button>
        ))}
        <span className="ml-auto hidden self-center font-mono text-xs text-muted sm:block">
          {shown.length} / {allModels.length}
        </span>
      </div>

      {shown.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-border-subtle p-12 text-center text-muted">
          No models match — try clearing filters.
        </div>
      ) : (
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      )}
    </div>
  );
}

export function ContextBadge({ tokens }: { tokens: number }) {
  return <span className="font-mono">{formatContext(tokens)}</span>;
}
