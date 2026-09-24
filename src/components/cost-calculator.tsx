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
  const [slugs, setSlugs] = useState<string[]>(
    preselected.length > 0
      ? preselected
      : ["gpt-6-luna", "claude-opus-5-5", "gemini-3-8-flash"],
  );
  const [inTok, setInTok] = useState(3000);
  const [outTok, setOutTok] = useState(800);
  const [reqs, setReqs] = useState(100);
  const [cache, setCache] = useState(50);
  const [batch, setBatch] = useState(false);

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
        // per-month, reqs is per-day => ×30
        const perDay = (freshTok * inRate + cacheTok * cacheRate + outTok * outRate) / 1_000_000;
        const monthly = perDay * reqs * 30;
        return { model: m, perDay, monthly };
      })
      .sort((a, b) => a.monthly - b.monthly);
  }, [allModels, slugs, inTok, outTok, reqs, cache, batch]);

  const max = Math.max(...results.map((r) => r.monthly), 0.0001);

  function toggle(slug: string) {
    if (single) {
      setSlugs([slug]);
      return;
    }
    setSlugs((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug].slice(-6)));
  }

  return (
    <div className="grid gap-6 lg:grid-cols-5">
      {/* Controls */}
      <div className="lg:col-span-2">
        <div className="rounded-2xl border border-border-subtle bg-surface p-5">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Workload</h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {presets.map((p) => {
              const active = p.inTok === inTok && p.outTok === outTok && p.reqs === reqs && p.cache === cache;
              return (
                <button
                  key={p.name}
                  type="button"
                  title={p.desc}
                  onClick={() => {
                    setInTok(p.inTok);
                    setOutTok(p.outTok);
                    setReqs(p.reqs);
                    setCache(p.cache);
                  }}
                  className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                    active
                      ? "bg-accent font-medium text-white"
                      : "border border-border-subtle bg-surface text-muted hover:text-foreground"
                  }`}
                >
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
              <input
                type="range"
                min={0}
                max={95}
                value={cache}
                onChange={(e) => setCache(Number(e.target.value))}
                className="mt-1.5 w-full accent-[var(--accent)]"
              />
            </div>
            <label className="flex cursor-pointer items-center gap-2.5 text-[13px]">
              <input
                type="checkbox"
                checked={batch}
                onChange={(e) => setBatch(e.target.checked)}
                className="h-4 w-4 accent-[var(--accent)]"
              />
              Use batch pricing where available
            </label>
          </div>
        </div>

        {!single && (
          <div className="mt-4 rounded-2xl border border-border-subtle bg-surface p-5">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Models <span className="normal-case tracking-normal">(pick up to 6)</span>
            </h3>
            <div className="scrollbar-thin mt-3 max-h-72 space-y-1 overflow-y-auto pr-1">
              {withPricing.map((m) => {
                const p = getProvider(m.provider);
                const active = slugs.includes(m.slug);
                return (
                  <button
                    key={m.slug}
                    type="button"
                    onClick={() => toggle(m.slug)}
                    className={`flex w-full items-center gap-2.5 rounded-lg px-2.5 py-1.5 text-left text-[13px] transition-colors ${
                      active ? "bg-accent-soft font-medium text-accent" : "text-muted hover:bg-surface-2 hover:text-foreground"
                    }`}
                  >
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p.color }} />
                    <span className="flex-1 truncate">{m.name}</span>
                    <span className="font-mono text-[11px] tabular-nums">
                      ${m.pricing!.input}/{m.pricing!.output}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Results */}
      <div className="lg:col-span-3">
        <div className="rounded-2xl border border-border-subtle bg-surface p-5">
          <div className="flex items-baseline justify-between">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
              Estimated monthly cost
            </h3>
            <span className="font-mono text-[11px] text-muted">30 days · {reqs} req/day</span>
          </div>
          {results.length === 0 ? (
            <p className="mt-6 text-sm text-muted">Pick at least one model with known pricing.</p>
          ) : (
            <div className="mt-5 space-y-4">
              {results.map(({ model: m, monthly, perDay }) => {
                const p = getProvider(m.provider);
                const perReq = perDay / Math.max(reqs, 1);
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
                    <div className="h-6 border-l border-dashed border-border-subtle bg-surface-2/60">
                      <div
                        className="flex h-full items-center justify-end pr-2 font-mono text-[11px] transition-all duration-300"
                        style={{
                          width: `${Math.max(8, (monthly / max) * 100)}%`,
                          background: `linear-gradient(90deg, ${p.color}55, ${p.color}22)`,
                        }}
                      >
                        <span className="text-muted">≈{fmtMoney(perReq)}/req</span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          <p className="mt-5 border-t border-dashed border-border-subtle pt-3 text-xs text-muted">
            Cache-priced at each provider&apos;s published cache-read rate where known; otherwise
            billed as fresh input. Estimates only — verify against your provider bill.
          </p>
        </div>
      </div>
    </div>
  );
}

function NumberRow({
  label,
  value,
  setValue,
  min,
  max,
  step,
}: {
  label: string;
  value: number;
  setValue: (v: number) => void;
  min: number;
  max: number;
  step: number;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between text-[13px]">
        <span className="text-muted">{label}</span>
        <input
          type="number"
          value={value}
          min={min}
          max={max}
          step={step}
          onChange={(e) => setValue(Math.max(min, Math.min(max, Number(e.target.value) || min)))}
          className="w-28 rounded-md border border-border-subtle bg-surface-2/60 px-2 py-1 text-right font-mono text-[13px] tabular-nums outline-none focus:border-accent"
        />
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => setValue(Number(e.target.value))}
        className="mt-1.5 w-full accent-[var(--accent)]"
      />
    </div>
  );
}
