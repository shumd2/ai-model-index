"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Model } from "@/data/models";
import { getProvider } from "@/data/providers";

type Preset = {
  name: string;
  desc: string;
  inTok: number;
  outTok: number;
  reqs: number;
  cache: number;
};

const presets: Preset[] = [
  { name: "100 chats/day", desc: "customer-support style", inTok: 3000, outTok: 800, reqs: 100, cache: 50 },
  { name: "Doc analysis", desc: "10 long docs/day", inTok: 800000, outTok: 5000, reqs: 10, cache: 0 },
  { name: "Agent fleet", desc: "200 sub-agent runs/day", inTok: 60000, outTok: 15000, reqs: 200, cache: 70 },
  { name: "Code review bot", desc: "50 PRs/day", inTok: 40000, outTok: 4000, reqs: 50, cache: 80 },
  { name: "Bulk pipeline", desc: "1M short calls/month", inTok: 800, outTok: 200, reqs: 34000, cache: 20 },
];

const complexityLevels = [
  { key: "casual", label: "Casual", desc: "chat, light tasks" },
  { key: "standard", label: "Standard", desc: "workloads, research" },
  { key: "heavy", label: "Heavy", desc: "agent fleets, coding" },
  { key: "enterprise", label: "Enterprise", desc: "production systems" },
];

function fmtMoney(v: number): string {
  if (v === 0) return "$0";
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(2)}`;
  if (v >= 10000) return `$${(v / 1000).toFixed(1)}k`;
  if (v >= 1000) return `$${(v / 1000).toFixed(2)}k`;
  return `$${v.toFixed(2)}`;
}

export function CostCalculator({
  allModels,
  preselected = [],
  single = false,
}: {
  allModels: Model[];
  preselected?: string[];
  single?: boolean;
}) {
  const withPricing = useMemo(
    () => allModels.filter((m) => m.pricing?.input != null && m.pricing?.output != null),
    [allModels],
  );

  // Workload state
  const [slugs, setSlugs] = useState<string[]>(
    preselected.length > 0 ? preselected : ["gpt-6-luna", "claude-opus-5-5", "gemini-3-8-flash"],
  );
  const [inTok, setInTok] = useState(3000);
  const [outTok, setOutTok] = useState(800);
  const [reqs, setReqs] = useState(100);
  const [cache, setCache] = useState(50);
  const [batch, setBatch] = useState(false);

  // Budget mode
  const [budgetMode, setBudgetMode] = useState(false);
  const [budgetAmount, setBudgetAmount] = useState(50);
  const [complexity, setComplexity] = useState("standard");

  const results = useMemo(() => {
    return slugs
      .map((slug) => allModels.find((m) => m.slug === slug))
      .filter((m): m is Model => Boolean(m) && m!.pricing?.input != null && m!.pricing?.output != null)
      .map((m) => {
        const p = m.pricing!;
        const inRate = batch && p.batch?.input != null ? p.batch.input : p.input ?? 0;
        const outRate = batch && p.batch?.output != null ? p.batch.output : p.output ?? 0;
        const cacheRate = p.cacheRead ?? inRate;
        const cacheTok = (inTok * cache) / 100;
        const freshTok = inTok - cacheTok;
        const perRequest =
          (freshTok * inRate + cacheTok * cacheRate + outTok * outRate) /
          1_000_000;
        const perDay = perRequest * reqs;
        const monthly = perDay * 30;
        const dailyInputTokens = (freshTok + cacheTok) * reqs;
        const dailyOutputTokens = outTok * reqs;
        return { model: m, perRequest, perDay, monthly, dailyInputTokens, dailyOutputTokens };
      })
      .sort((a, b) => a.monthly - b.monthly);
  }, [allModels, slugs, inTok, outTok, reqs, cache, batch]);

  // Monthly cost per model for the selected complexity, ranked by intelligence
  const recommendations = useMemo(() => {
    if (!budgetMode) return [];
    const complexityTokens: Record<string, { input: number; output: number }> = {
      casual: { input: 300_000, output: 5_000 },
      standard: { input: 1_000_000, output: 10_000 },
      heavy: { input: 10_000_000, output: 50_000 },
      enterprise: { input: 50_000_000, output: 200_000 },
    };
    const vol = complexityTokens[complexity] ?? complexityTokens.standard;
    return allModels
      .filter((m) => m.pricing?.input != null && m.pricing?.output != null && m.scores["aa-intelligence"] != null)
      .map((m) => {
        const p = m.pricing!;
        const cacheRate = p.cacheRead ?? p.input ?? 0;
        const cacheTok = vol.input * 0.7;
        const freshTok = vol.input - cacheTok;
        const monthly = ((freshTok * (p.input ?? 0) + cacheTok * cacheRate + vol.output * (p.output ?? 0)) / 1_000_000) * 30;
        return { model: m, monthly, aa: m.scores["aa-intelligence"]! };
      })
      .sort((a, b) => {
        const aIn = a.monthly <= budgetAmount;
        const bIn = b.monthly <= budgetAmount;
        if (aIn && !bIn) return -1;
        if (!aIn && bIn) return 1;
        return b.aa - a.aa;
      });
  }, [allModels, budgetAmount, complexity, budgetMode]);

  const max = Math.max(...results.map((r) => r.monthly), 0.0001);

  function toggle(slug: string) {
    if (single) { setSlugs([slug]); return; }
    setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug].slice(-6)));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Controls */}
      <div className="lg:col-span-2">
        {/* Budget mode toggle */}
        <div className="mb-4 flex rounded-2xl border border-border-subtle bg-surface overflow-hidden">
          <button
            type="button"
            onClick={() => setBudgetMode(false)}
            className={`flex-1 px-3 py-2 text-[12px] font-medium transition-colors ${!budgetMode ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
          >
            Calculate costs
          </button>
          <button
            type="button"
            onClick={() => setBudgetMode(true)}
            className={`flex-1 px-3 py-2 text-[12px] font-medium transition-colors ${budgetMode ? "bg-accent text-white" : "text-muted hover:text-foreground"}`}
          >
            💰 Budget advisor
          </button>
        </div>

        <div className="rounded-2xl border border-border-subtle bg-surface p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
            {budgetMode ? "Budget & complexity" : "Workload"}
          </h3>

          {budgetMode ? (
            <div className="mt-4 space-y-5">
              <div>
                <div className="flex items-baseline justify-between text-[13px]">
                  <span className="text-muted">Monthly budget</span>
                  <span className="font-mono font-semibold tabular-nums">{fmtMoney(budgetAmount)}</span>
                </div>
                <input
                  type="range"
                  min={5}
                  max={500}
                  value={budgetAmount}
                  onChange={(e) => setBudgetAmount(Number(e.target.value))}
                  className="mt-1.5 w-full accent-[var(--accent)]"
                />
                <div className="mt-1 flex justify-between text-[11px] text-muted">
                  <span>$5</span>
                  <span>$500</span>
                </div>
              </div>
              <div>
                <div className="text-[13px] text-muted mb-2">Project complexity</div>
                <div className="grid grid-cols-2 gap-2">
                  {complexityLevels.map((l) => (
                    <button
                      key={l.key}
                      type="button"
                      onClick={() => setComplexity(l.key)}
                      className={`rounded-lg px-3 py-2 text-[12px] text-left transition-colors ${
                        complexity === l.key ? "bg-accent font-medium text-white" : "border border-border-subtle bg-surface-2 text-muted hover:text-foreground"
                      }`}
                    >
                      <div className="font-semibold">{l.label}</div>
                      <div className="text-[10px] opacity-70">{l.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/5 p-4">
                <div className="text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                  Your budget covers
                </div>
                <div className="mt-1.5 font-mono text-lg font-bold text-emerald-600 dark:text-emerald-400 tabular-nums">
                  {fmtMoney(budgetAmount)}/month
                </div>
                <div className="mt-0.5 text-[11px] text-muted">
                  {complexity === "casual" && "~300K in + 5K out/day"}
                  {complexity === "standard" && "~1M in + 10K out/day"}
                  {complexity === "heavy" && "~10M in + 50K out/day"}
                  {complexity === "enterprise" && "~50M in + 200K out/day"}
                </div>
                <div className="mt-2 font-mono text-[11px] text-accent">
                  {recommendations.filter((r) => r.monthly <= budgetAmount).length} of {recommendations.length} models fit in budget
                </div>
              </div>
            </div>
          ) : (
            <>
              <div className="mt-3 flex flex-wrap gap-2">
                {presets.map((p) => {
                  const active = p.inTok === inTok && p.outTok === outTok && p.reqs === reqs && p.cache === cache;
                  return (
                    <button key={p.name} type="button" title={p.desc} onClick={() => { setInTok(p.inTok); setOutTok(p.outTok); setReqs(p.reqs); setCache(p.cache); }}
                      className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${active ? "bg-accent font-medium text-white" : "border border-border-subtle bg-surface text-muted hover:text-foreground"}`}>
                      {p.name}
                    </button>
                  );
                })}
              </div>
              <div className="mt-5 space-y-4">
                <NumberRow label="Input tokens / request" value={inTok} setValue={setInTok} min={1} max={2_000_000} step={100} />
                <NumberRow label="Output tokens / request" value={outTok} setValue={setOutTok} min={1} max={200_000} step={50} />
                <NumberRow label="Requests / day" value={reqs} setValue={setReqs} min={1} max={100_000} step={10} />
                <div>
                  <div className="flex items-baseline justify-between text-[13px]">
                    <span className="text-muted">Cache-hit share of input</span>
                    <span className="font-mono font-semibold tabular-nums">{cache}%</span>
                  </div>
                  <input type="range" min={0} max={95} value={cache} onChange={(e) => setCache(Number(e.target.value))} className="mt-1.5 w-full accent-[var(--accent)]" />
                </div>
                <label className="flex cursor-pointer items-center gap-2.5 text-[13px]">
                  <input type="checkbox" checked={batch} onChange={(e) => setBatch(e.target.checked)} className="h-4 w-4 accent-[var(--accent)]" />
                  Use batch pricing where available
                </label>
              </div>
            </>
          )}
        </div>

        {!single && (
          <div className="mt-4 rounded-2xl border border-border-subtle bg-surface p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Models <span className="normal-case tracking-normal">(pick up to 6)</span></h3>
            <div className="scrollbar-thin mt-3 max-h-60 space-y-1 overflow-y-auto pr-1">
              {withPricing.map((m) => {
                const p = getProvider(m.provider);
                const active = slugs.includes(m.slug);
                return (
                  <button key={m.slug} type="button" onClick={() => toggle(m.slug)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors ${active ? "bg-accent-soft font-medium text-accent" : "text-muted hover:bg-surface-2 hover:text-foreground"}`}>
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
                    <span className="flex-1 truncate">{m.name}</span>
                    <span className="font-mono text-[11px] tabular-nums">${m.pricing!.input}/${m.pricing!.output}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        {budgetMode && (
          <div className="mb-6 rounded-2xl border border-accent/30 bg-accent-soft p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-accent">Models ranked by intelligence within budget</h3>
            <p className="mt-1 text-xs text-muted">
              {complexity} complexity · {fmtMoney(budgetAmount)}/month · cached rates
            </p>
            <div className="mt-4 space-y-2">
              {recommendations.slice(0, 10).map((r, i) => {
                const p = getProvider(r.model.provider);
                const inBudget = r.monthly <= budgetAmount;
                return (
                  <div key={r.model.slug} className={`flex items-center gap-3 rounded-xl border px-4 py-3 ${inBudget ? "border-emerald-500/20 bg-emerald-500/5" : "border-border-subtle bg-surface-2/30 opacity-50"}`}>
                    <span className="font-mono text-[11px] font-bold text-muted">#{i + 1}</span>
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
                    <span className="flex-1 text-sm font-medium">{r.model.name}</span>
                    <span className="font-mono text-sm tabular-nums" style={{ color: p.color }}>AA {r.aa}</span>
                    <span className="font-mono text-sm tabular-nums" style={{ color: inBudget ? "var(--positive)" : "var(--muted)" }}>
                      {fmtMoney(r.monthly)}/mo
                    </span>
                    {inBudget && <span className="text-[10px] text-emerald-600">✓ fits</span>}
                    {!inBudget && <span className="text-[10px] text-muted">over</span>}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        <div className="rounded-2xl border border-border-subtle bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {budgetMode ? "Est. monthly at complexity" : "Estimated monthly cost"}
            </h3>
            <span className="font-mono text-[11px] text-muted">
              {budgetMode ? "cached rates" : "30 days · " + reqs + " req/day"}
            </span>
          </div>
          {results.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Pick at least one model with known pricing.</p>
          ) : (
            <div className="mt-5 space-y-4">
              {results.map(({ model: m, monthly, perRequest, dailyInputTokens, dailyOutputTokens }) => {
                const p = getProvider(m.provider);
                return (
                  <div key={m.slug}>
                    <div className="mb-1 flex items-baseline justify-between gap-3">
                      <Link href={`/models/${m.slug}`} className="truncate text-[13px] font-medium hover:text-accent">
                        <span className="mr-2 inline-block h-2 w-2 rounded-full align-middle" style={{ background: p.color }} />
                        {m.name}
                      </Link>
                      <span className="shrink-0 font-mono text-sm font-semibold tabular-nums" style={{ color: p.color }}>
                        {fmtMoney(monthly)}<span className="text-muted">/mo</span>
                      </span>
                    </div>
                    <div className="flex items-center gap-4 text-[11px] text-muted">
                      <span>≈{fmtMoney(perRequest)}/req</span>
                      <span>{dailyInputTokens.toLocaleString()} in/day</span>
                      <span>{dailyOutputTokens.toLocaleString()} out/day</span>
                      <span>{m.costPerTask != null ? `$${m.costPerTask.toFixed(4)}/task` : ""}</span>
                    </div>
                    <div className="mt-0.5 h-5 border-l border-dashed border-border-subtle bg-surface-2/60">
                      <div className="flex h-full items-center justify-end pr-2 transition-all duration-300"
                        style={{ width: `${Math.max(8, (monthly / max) * 100)}%`, background: `linear-gradient(90deg, ${p.color}55, ${p.color}22)` }}>
                        <span className="font-mono text-[11px] text-muted">{fmtMoney(perRequest)}/req</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="mt-5 border-t border-dashed border-border-subtle pt-3 text-xs text-muted">
            Cache-priced at each provider&rsquo;s published cache-read rate where known; otherwise billed as fresh input. {budgetMode ? "Recommendations based on cost-per-task within your budget." : "Estimates only — verify against your provider bill."}
          </p>
        </div>
      </div>
    </div>
  );
}

function NumberRow({ label, value, setValue, min, max, step }: { label: string; value: number; setValue: (v: number) => void; min: number; max: number; step: number }) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="text-muted">{label}</span>
        <input type="number" value={value} min={min} max={max} step={step} onChange={(e) => setValue(Math.max(min, Math.min(max, Number(e.target.value) || min)))}
          className="w-28 rounded-md border border-border-subtle bg-surface-2/60 px-2 py-1 text-right font-mono text-[13px] tabular-nums outline-none focus:border-accent" />
      </div>
      <input type="range" min={min} max={max} step={step} value={value} onChange={(e) => setValue(Number(e.target.value))} className="mt-1.5 w-full accent-[var(--accent)]" />
    </div>
  );
}
