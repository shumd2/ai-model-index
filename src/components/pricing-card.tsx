import type { Pricing } from "@/data/models";

function usd(v: number | null | undefined): string {
  if (v == null) return "—";
  if (v === 0) return "Free";
  if (v < 0.01) return `$${v.toFixed(4)}`;
  if (v < 1) return `$${v.toFixed(2)}`;
  return `$${v.toFixed(2)}`;
}

/** Full pricing detail: input/output plus cache, batch and fast-mode tiers. */
export function PricingCard({ pricing }: { pricing: Pricing }) {
  const rows: { label: string; value: string; hint?: string }[] = [
    { label: "Input", value: `${usd(pricing.input)} / 1M` },
    { label: "Output", value: `${usd(pricing.output)} / 1M` },
  ];
  if (pricing.cacheRead != null) {
    rows.push({ label: "Cache read", value: `${usd(pricing.cacheRead)} / 1M`, hint: "dominates agentic cost" });
  }
  if (pricing.cacheWrite != null) {
    rows.push({ label: "Cache write", value: `${usd(pricing.cacheWrite)} / 1M` });
  }
  if (pricing.batch) {
    rows.push({
      label: "Batch",
      value: `${usd(pricing.batch.input)} / ${usd(pricing.batch.output)}`,
      hint: "per 1M in/out",
    });
  }
  if (pricing.fastMode) {
    rows.push({
      label: "Fast mode",
      value: `${usd(pricing.fastMode.input)} / ${usd(pricing.fastMode.output)}`,
      hint: pricing.fastMode.multiplier,
    });
  }

  return (
    <div className="rounded-2xl border border-border-subtle bg-surface p-5">
      <div className="flex items-baseline justify-between">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">Pricing</h3>
        <span className="font-mono text-[11px] text-muted">USD / 1M tokens</span>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
        {rows.map((r) => (
          <div key={r.label} className="rounded-xl border border-border-subtle bg-surface-2/50 p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted">{r.label}</div>
            <div className="mt-1 font-mono text-base font-semibold tabular-nums">{r.value}</div>
            {r.hint && <div className="mt-0.5 text-[10px] text-muted">{r.hint}</div>}
          </div>
        ))}
      </div>
      {pricing.note && <p className="mt-3 text-xs text-muted">{pricing.note}</p>}
    </div>
  );
}
