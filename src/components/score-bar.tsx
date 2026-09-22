import { benchmarkMap, formatScore } from "@/data/benchmarks";
import type { Model } from "@/data/models";
import { getProvider } from "@/data/providers";

/**
 * Competitive display ranges — bars are scaled within the band where
 * real models actually score, so differences are visible at a glance.
 */
const ranges: Record<string, { min: number; max: number }> = {
  "aa-intelligence": { min: 0, max: 60 },
  "lmarena-text": { min: 1150, max: 1550 },
  "lmarena-webdev": { min: 1200, max: 1850 },
  "lmarena-agent": { min: 0, max: 15 },
};

export function ScoreBar({
  benchmarkId,
  value,
  color,
}: {
  benchmarkId: string;
  value: number;
  color: string;
}) {
  const range = ranges[benchmarkId] ?? { min: 0, max: 100 };
  const pct = Math.max(0, Math.min(100, ((value - range.min) / (range.max - range.min)) * 100));
  const bm = benchmarkMap.get(benchmarkId);

  return (
    <div>
      <div className="mb-1.5 flex items-baseline justify-between gap-2">
        <span className="text-[13px] text-muted">{bm?.name ?? benchmarkId}</span>
        <span className="font-mono text-[13px] font-semibold tabular-nums" style={{ color }}>
          {bm ? formatScore(value, bm.format) : value}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className="h-full rounded-full transition-all"
          style={{ width: `${pct}%`, background: `linear-gradient(90deg, ${color}88, ${color})` }}
        />
      </div>
    </div>
  );
}

export function ModelBenchmarkChart({ model }: { model: Model }) {
  const provider = getProvider(model.provider);
  const entries = Object.entries(model.scores).filter(
    (entry): entry is [string, number] => typeof entry[1] === "number",
  );

  if (entries.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-border-subtle bg-surface-2/50 p-6 text-center text-sm text-muted">
        No verified headline scores yet for this model. Community data welcome —
        see our <a href="/benchmarks" className="text-accent underline">benchmarks guide</a> for how scores are added.
      </div>
    );
  }

  return (
    <div className="grid gap-5 sm:grid-cols-2">
      {entries.map(([id, value]) => (
        <ScoreBar key={id} benchmarkId={id} value={value} color={provider.color} />
      ))}
    </div>
  );
}
