"use client";

import { useState } from "react";
import type { EffortTier } from "@/data/models";

function fmtMoney(v: number): string {
  if (v === 0) return "free";
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(2)}`;
  return `$${v.toFixed(2)}`;
}

/**
 * Interactive effort-ladder explorer: shows how the same model trades
 * intelligence for cost/latency across its reasoning tiers.
 */
export function EffortLadderExplorer({
  ladder,
  color,
}: {
  ladder: EffortTier[];
  color: string;
}) {
  const [selected, setSelected] = useState(ladder.length - 1);
  const tier = ladder[selected];

  const maxAa = Math.max(...ladder.map((t) => t.aa ?? 0), 1);
  const maxCost = Math.max(...ladder.map((t) => t.costPerTask ?? 0), 0.0001);
  const maxLat = Math.max(...ladder.map((t) => t.latency ?? 0), 0.0001);

  const rows: { label: string; value: string; pct: number }[] = [
    tier.aa != null
      ? { label: "Intelligence (AA index)", value: String(tier.aa), pct: (tier.aa / maxAa) * 100 }
      : { label: "Intelligence (AA index)", value: "—", pct: 0 },
    tier.costPerTask != null
      ? { label: "Cost per task", value: fmtMoney(tier.costPerTask), pct: (tier.costPerTask / maxCost) * 100 }
      : { label: "Cost per task", value: "—", pct: 0 },
    tier.speed != null
      ? { label: "Output speed", value: `${tier.speed} t/s`, pct: 100 }
      : { label: "Output speed", value: "—", pct: 0 },
    tier.latency != null
      ? {
          label: "Time to first token",
          value: tier.latency < 1 ? `${tier.latency.toFixed(2)}s` : `${tier.latency.toFixed(1)}s`,
          pct: (tier.latency / maxLat) * 100,
        }
      : { label: "Time to first token", value: "—", pct: 0 },
  ];

  return (
    <div>
      {/* tier selector */}
      <div className="flex flex-wrap gap-2">
        {ladder.map((t, i) => (
          <button
            key={t.effort}
            type="button"
            onClick={() => setSelected(i)}
            className={`rounded-full px-3.5 py-1.5 font-mono text-[13px] transition-colors ${
              i === selected
                ? "font-medium text-white"
                : "border border-border-subtle bg-surface text-muted hover:text-foreground"
            }`}
            style={i === selected ? { background: color } : undefined}
          >
            {t.effort}
            {t.aa != null && (
              <span className={`ml-1.5 ${i === selected ? "text-white/70" : "opacity-50"}`}>
                {t.aa}
              </span>
            )}
          </button>
        ))}
      </div>

      {/* detail bars */}
      <div className="mt-5 space-y-3.5">
        {rows.map((r) => (
          <div key={r.label}>
            <div className="mb-1 flex items-baseline justify-between text-[13px]">
              <span className="text-muted">{r.label}</span>
              <span className="font-mono font-semibold tabular-nums">{r.value}</span>
            </div>
            <div className="h-2 overflow-hidden rounded-full bg-surface-2">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{
                  width: `${Math.max(2, r.pct)}%`,
                  background: `linear-gradient(90deg, ${color}88, ${color})`,
                }}
              />
            </div>
          </div>
        ))}
      </div>
      <p className="mt-4 text-xs text-muted">
        Same model, {ladder.length} operating points. Higher effort = smarter, slower,
        pricier. Bars are scaled within this model&apos;s own ladder.
      </p>
    </div>
  );
}
