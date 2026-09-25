"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { formatScore } from "@/data/benchmarks";
import type { Model } from "@/data/models";
import { formatContext } from "@/data/models";
import { getProvider, providers } from "@/data/providers";

type SortKey =
  | "name"
  | "aa-intelligence"
  | "lmarena-text"
  | "lmarena-webdev"
  | "lmarena-agent"
  | "context"
  | "input"
  | "output"
  | "costPerTask"
  | "value";

type Row = {
  model: Model;
  name: string;
  "aa-intelligence": number | null;
  "lmarena-text": number | null;
  "lmarena-webdev": number | null;
  "lmarena-agent": number | null;
  context: number | null;
  input: number | null;
  output: number | null;
  costPerTask: number | null;
  value: number | null; // AA index points per $/task
};

const columns: { key: SortKey; label: string; hint: string; numeric: boolean }[] = [
  { key: "name", label: "Model", hint: "", numeric: false },
  { key: "aa-intelligence", label: "AA Index", hint: "0–60", numeric: true },
  { key: "lmarena-text", label: "Text Elo", hint: "arena", numeric: true },
  { key: "lmarena-webdev", label: "WebDev", hint: "arena", numeric: true },
  { key: "lmarena-agent", label: "Agent %", hint: "arena", numeric: true },
  { key: "context", label: "Context", hint: "tokens", numeric: true },
  { key: "input", label: "In $", hint: "/1M", numeric: true },
  { key: "output", label: "Out $", hint: "/1M", numeric: true },
  { key: "costPerTask", label: "$/task", hint: "AA", numeric: true },
  { key: "value", label: "AA pts/$", hint: "value", numeric: true },
];

function toRows(models: Model[]): Row[] {
  return models.map((m) => {
    const cost = m.costPerTask ?? null;
    const aa = m.scores["aa-intelligence"] ?? null;
    return {
      model: m,
      name: m.name,
      "aa-intelligence": aa,
      "lmarena-text": m.scores["lmarena-text"] ?? null,
      "lmarena-webdev": m.scores["lmarena-webdev"] ?? null,
      "lmarena-agent": m.scores["lmarena-agent"] ?? null,
      context: m.contextWindow,
      input: m.pricing?.input ?? null,
      output: m.pricing?.output ?? null,
      costPerTask: cost,
      // AA points per $/task; free models get a huge-but-finite score via null (shown as ∞-ish)
      value: cost != null && cost > 0 && aa != null ? aa / cost : null,
    };
  });
}

export function CompareTable({ allModels }: { allModels: Model[] }) {
  const [sort, setSort] = useState<{ key: SortKey; dir: "asc" | "desc" }>({
    key: "aa-intelligence",
    dir: "desc",
  });
  const [providerFilter, setProviderFilter] = useState<string>("all");
  const [openOnly, setOpenOnly] = useState(false);
  const [hideNulls, setHideNulls] = useState(false);
  const [pinnedSelection, setPinnedSelection] = useState<string[]>([]);

  // Read ?models=a,b,c (from the pin tray) after hydration — async so the
  // prerendered HTML matches and the page stays fully static.
  useEffect(() => {
    const t = setTimeout(() => {
      const q = new URLSearchParams(window.location.search).get("models");
      if (q) {
        const slugs = q
          .split(",")
          .map((s) => s.trim())
          .filter((s) => allModels.some((m) => m.slug === s));
        if (slugs.length > 0) setPinnedSelection(slugs.slice(0, 4));
      }
    }, 0);
    return () => clearTimeout(t);
  }, [allModels]);

  const rows = useMemo(() => {
    let filtered = allModels;
    if (pinnedSelection.length > 0) {
      filtered = filtered.filter((m) => pinnedSelection.includes(m.slug));
    } else {
      if (providerFilter !== "all") filtered = filtered.filter((m) => m.provider === providerFilter);
      if (openOnly) filtered = filtered.filter((m) => m.openWeights);
      if (hideNulls) filtered = filtered.filter((m) => m.scores["aa-intelligence"] != null || m.scores["lmarena-text"] != null);
    }

    const mapped = toRows(filtered);
    const dir = sort.dir === "asc" ? 1 : -1;
    return mapped.sort((a, b) => {
      if (sort.key === "name") return dir * a.name.localeCompare(b.name);
      const av = a[sort.key];
      const bv = b[sort.key];
      if (av == null && bv == null) return 0;
      if (av == null) return 1;
      if (bv == null) return -1;
      return dir * (av - bv);
    });
  }, [allModels, sort, providerFilter, openOnly, hideNulls, pinnedSelection]);

  function toggleSort(key: SortKey) {
    setSort((s) =>
      s.key === key
        ? { key, dir: s.dir === "desc" ? "asc" : "desc" }
        : { key, dir: key === "name" ? "asc" : "desc" },
    );
  }

  const maxes = useMemo(() => {
    const vals = (k: keyof Row) =>
      rows.map((r) => r[k]).filter((v): v is number => typeof v === "number");
    return {
      "aa-intelligence": Math.max(...vals("aa-intelligence"), 1),
      "lmarena-text": Math.max(...vals("lmarena-text"), 1),
      "lmarena-webdev": Math.max(...vals("lmarena-webdev"), 1),
      "lmarena-agent": Math.max(...vals("lmarena-agent"), 1),
    } as Record<string, number>;
  }, [rows]);

  function cell(row: Row, key: SortKey) {
    if (key === "name") {
      const provider = getProvider(row.model.provider);
      return (
        <Link
          href={`/models/${row.model.slug}`}
          className="flex items-center gap-2.5 font-medium hover:text-accent"
        >
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full"
            style={{ background: provider.color }}
          />
          <span className="whitespace-nowrap">{row.model.name}</span>
          {row.model.openWeights && (
            <span className="hidden rounded bg-emerald-500/10 px-1.5 py-0.5 text-[10px] font-medium text-emerald-600 lg:inline dark:text-emerald-400">
              open
            </span>
          )}
        </Link>
      );
    }

    const raw = row[key];
    if (raw == null) return <span className="text-muted/50">—</span>;

    if (key === "context") return <span className="font-mono">{formatContext(raw)}</span>;
    if (key === "input" || key === "output")
      return <span className="font-mono">${raw.toFixed(2)}</span>;
    if (key === "costPerTask") {
      const best = row.costPerTask != null && row.costPerTask === Math.min(...rows.map((r) => r.costPerTask).filter((v): v is number => v != null && v > 0 || v === 0));
      return (
        <span className={`font-mono ${best ? "font-semibold text-emerald-600 dark:text-emerald-400" : ""}`}>
          {raw === 0 ? "Free" : raw < 0.01 ? raw.toFixed(4) : raw.toFixed(2)}
        </span>
      );
    }
    if (key === "value") {
      // best value = max
      const best = row.value != null && row.value === Math.max(...rows.map((r) => r.value).filter((v): v is number => v != null));
      return (
        <span className={`font-mono ${best ? "font-semibold text-emerald-600 dark:text-emerald-400" : ""}`}>
          {Math.round(raw).toLocaleString()}
        </span>
      );
    }
    if (key === "lmarena-agent") return <span className="font-mono">{raw.toFixed(2)}%</span>;
    if (key === "lmarena-text" || key === "lmarena-webdev")
      return <span className="font-mono">{formatScore(raw, "elo")}</span>;

    // AA index with mini bar
    const pct = Math.min(100, (raw / (maxes[key] ?? 100)) * 100);
    const provider = getProvider(row.model.provider);
    return (
      <span className="flex items-center gap-2">
        <span className="font-mono tabular-nums">{raw}</span>
        <span className="hidden h-1.5 w-14 overflow-hidden rounded-full bg-surface-2 xl:block">
          <span
            className="block h-full rounded-full"
            style={{ width: `${pct}%`, background: provider.color }}
          />
        </span>
      </span>
    );
  }

  return (
    <div>
      {pinnedSelection.length > 0 && (
        <div className="mb-4 flex flex-wrap items-center gap-2 rounded-xl border border-accent/40 bg-accent-soft px-4 py-3">
          <span className="font-mono text-[11px] uppercase tracking-widest text-accent">
            Side-by-side
          </span>
          <div className="flex flex-wrap gap-1.5">
            {pinnedSelection.map((slug) => (
              <span
                key={slug}
                className="rounded-full border border-border-subtle bg-surface px-2.5 py-1 text-[12px]"
              >
                {allModels.find((m) => m.slug === slug)?.name ?? slug}
              </span>
            ))}
          </div>
          <button
            type="button"
            onClick={() => setPinnedSelection([])}
            className="ml-auto text-[13px] text-muted underline hover:text-foreground"
          >
            Show all models
          </button>
        </div>
      )}
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <select
          aria-label="Filter by model maker"
          value={providerFilter}
          onChange={(e) => setProviderFilter(e.target.value)}
          className="rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
        >
          <option value="all">All providers</option>
          {providers.map((p) => (
            <option key={p.id} value={p.id}>{p.name}</option>
          ))}
        </select>
        <button
          type="button"
          aria-pressed={openOnly}
          onClick={() => setOpenOnly((v) => !v)}
          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
            openOnly
              ? "bg-emerald-500/15 font-medium text-emerald-600 dark:text-emerald-400"
              : "border border-border-subtle bg-surface text-muted hover:text-foreground"
          }`}
        >
          Open weights only
        </button>
        <button
          type="button"
          aria-pressed={hideNulls}
          onClick={() => setHideNulls((v) => !v)}
          className={`rounded-lg px-3 py-2 text-sm transition-colors ${
            hideNulls
              ? "bg-accent-soft font-medium text-accent"
              : "border border-border-subtle bg-surface text-muted hover:text-foreground"
          }`}
        >
          Only models with verified scores
        </button>
        <span className="ml-auto font-mono text-xs text-muted" role="status" aria-live="polite">
          {rows.length} models
        </span>
      </div>

      <div className="scrollbar-thin overflow-x-auto rounded-2xl border border-border-subtle bg-surface">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <caption className="sr-only">
            AI models sorted by the selected column. Use the column buttons to change sorting.
          </caption>
          <thead>
            <tr className="border-b border-border-subtle bg-surface-2/60">
              {columns.map((c) => (
                <th
                  key={c.key}
                  scope="col"
                  aria-sort={
                    sort.key === c.key
                      ? sort.dir === "asc"
                        ? "ascending"
                        : "descending"
                      : "none"
                  }
                  className={`px-4 py-3 text-[11px] font-medium uppercase tracking-wider text-muted ${
                    c.numeric ? "text-right" : "text-left"
                  }`}
                >
                  <button
                    type="button"
                    aria-label={`Sort by ${c.label}${sort.key === c.key ? (sort.dir === "asc" ? ", currently ascending" : ", currently descending") : ""}`}
                    onClick={() => toggleSort(c.key)}
                    className={`inline-flex items-center gap-1 transition-colors hover:text-foreground ${
                      sort.key === c.key ? "text-accent" : ""
                    }`}
                  >
                    {c.label}
                    {c.hint && <span className="font-normal normal-case opacity-60">({c.hint})</span>}
                    <span className="text-[9px]">
                      {sort.key === c.key ? (sort.dir === "desc" ? "▼" : "▲") : "↕"}
                    </span>
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr
                key={r.model.slug}
                className="border-b border-border-subtle/60 transition-colors last:border-0 hover:bg-surface-2/40"
              >
                {columns.map((c) => {
                  const content = cell(r, c.key);
                  const className = `px-4 py-3 font-normal ${
                    c.numeric ? "text-right tabular-nums" : "text-left"
                  }`;
                  return c.key === "name" ? (
                    <th key={c.key} scope="row" className={className}>
                      {content}
                    </th>
                  ) : (
                    <td key={c.key} className={className}>
                      {content}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        — = no verified public score yet. <strong>$/task</strong> is the weighted
        cost to run one AA Intelligence Index task (price × verbosity).
        <strong> AA pts/$</strong> is intelligence per dollar — higher is better
        value. Pin models from any card to build a side-by-side set.
      </p>
    </div>
  );
}
