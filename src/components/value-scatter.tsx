"use client";

import { useMemo, useState } from "react";
import type { Model } from "@/data/models";
import { getProvider, providers } from "@/data/providers";

/**
 * Provider-as-axis value map: each provider is a horizontal band,
 * each model is a dot positioned by AA index (x) vs cost-per-task (y, log).
 * Dots are color-coded by model generation/version.
 */
export function ValueScatter({ allModels }: { allModels: Model[] }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const [activeProviders, setActiveProviders] = useState<string[]>([]);

  // Group models by provider, sort providers by best AA score
  const providerGroups = useMemo(() => {
    const groups = new Map<string, typeof allModels>();
    for (const m of allModels) {
      if (
        m.scores["aa-intelligence"] == null ||
        m.costPerTask == null ||
        m.verifiedOn == null
      ) continue;
      const list = groups.get(m.provider) || [];
      list.push(m);
      groups.set(m.provider, list);
    }
    return [...groups.entries()]
      .map(([providerId, models]) => ({
        providerId,
        models,
        bestAa: Math.max(...models.map((m) => m.scores["aa-intelligence"]!), 0),
      }))
      .sort((a, b) => b.bestAa - a.bestAa);
  }, [allModels]);

  const activeGroups =
    activeProviders.length > 0
      ? providerGroups.filter((group) => activeProviders.includes(group.providerId))
      : providerGroups;

  const paretoSlugs = useMemo(() => {
    const candidates = activeGroups
      .flatMap((group) => group.models)
      .sort((a, b) => a.costPerTask! - b.costPerTask!);
    let bestScore = -Infinity;
    const frontier = new Set<string>();
    for (const model of candidates) {
      const score = model.scores["aa-intelligence"]!;
      if (score > bestScore) {
        frontier.add(model.slug);
        bestScore = score;
      }
    }
    return frontier;
  }, [activeGroups]);

  function toggleProvider(providerId: string) {
    setActiveProviders((current) =>
      current.includes(providerId)
        ? current.filter((id) => id !== providerId)
        : [...current, providerId],
    );
  }

  if (activeGroups.length === 0) {
    return <p className="py-12 text-center text-muted">No models with both verified scores and pricing.</p>;
  }

  const W = 780;
  const H = Math.max(300, activeGroups.length * 52 + 60);
  const PAD = { l: 70, r: 30, t: 20, b: 40 };

  const costs = allModels.filter((m) => m.costPerTask != null && m.costPerTask > 0).map((m) => m.costPerTask!);
  const yMin = Math.min(...costs, 0.004) * 0.3;
  const yMax = Math.max(...costs, 1) * 3;

  const xMin = 0;
  const xMax = 60;

  const sx = (aa: number) => PAD.l + ((Math.max(xMin, Math.min(xMax, aa)) - xMin) / (xMax - xMin)) * (W - PAD.l - PAD.r);
  const sy = (c: number) => {
    const logC = Math.log10(Math.max(yMin, Math.min(yMax, c)));
    const logMin = Math.log10(yMin);
    const logMax = Math.log10(yMax);
    return PAD.t + (H - PAD.t - PAD.b) - ((logC - logMin) / (logMax - logMin)) * (H - PAD.t - PAD.b);
  };

  // Provider bands
  const bandHeight = (H - PAD.t - PAD.b) / activeGroups.length;

  return (
    <div>
      {/* Provider filter */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {providers
          .filter((p) => providerGroups.some((g) => g.providerId === p.id))
          .map((p) => {
            const group = providerGroups.find((g) => g.providerId === p.id);
            const count = group?.models.length ?? 0;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={activeProviders.includes(p.id)}
                onClick={() => toggleProvider(p.id)}
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  activeProviders.includes(p.id)
                    ? "border-accent bg-accent-soft text-accent"
                    : "border-border-subtle bg-surface text-muted hover:text-foreground"
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full" style={{ background: p.color }} />
                {p.shortName}
                <span className="font-mono text-[10px] opacity-50">{count}</span>
              </button>
            );
          })}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-surface p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[640px]" role="img" aria-label="Provider value map — models plotted by intelligence vs cost">
          {/* Background bands per provider */}
          {activeGroups.map((g, i) => {
            const y0 = PAD.t + i * bandHeight;
            const prov = getProvider(g.providerId);
            return (
              <g key={g.providerId}>
                {/* Band background */}
                <rect x={PAD.l} y={y0} width={W - PAD.l - PAD.r} height={bandHeight - 2} fill={`${prov.color}06`} rx={4} />
                {/* Provider label */}
                <text x={PAD.l - 8} y={y0 + bandHeight / 2 + 4} textAnchor="end" fontSize="11" fill={prov.color} fontWeight="600">
                  {prov.shortName}
                </text>
              </g>
            );
          })}

          {/* Y axis ticks */}
          {[0.005, 0.01, 0.05, 0.1, 0.5, 1, 5].filter((t) => t >= yMin && t <= yMax).map((t) => (
            <text key={`y${t}`} x={PAD.l - 8} y={sy(t) + 4} textAnchor="end" fontSize="10" fill="var(--muted)">
              ${t >= 1 ? t : t < 0.01 ? t.toFixed(4) : t.toFixed(2)}
            </text>
          ))}

          {/* Grid lines */}
          {[0, 10, 20, 30, 40, 50, 60].map((x) => (
            <line key={`x${x}`} x1={sx(x)} y1={PAD.t} x2={sx(x)} y2={H - PAD.b} stroke="var(--border-subtle)" strokeWidth="0.5" opacity="0.4" strokeDasharray="2 2" />
          ))}

          {/* Axis labels */}
          <text x={W / 2} y={H - 4} textAnchor="middle" fontSize="11" fill="var(--muted)">AA Intelligence Index →</text>
          <text x={14} y={H / 2} textAnchor="middle" fontSize="11" fill="var(--muted)" transform={`rotate(-90 14 ${H / 2})`}>cost per task (log)</text>

          {/* Model dots */}
          {activeGroups.map((g) => {
            const prov = getProvider(g.providerId);
            return g.models.map((m) => {
              const cx = sx(m.scores["aa-intelligence"]!);
              const cy = sy(m.costPerTask!);
              const isHover = hovered === m.slug;
              const isTop = m.scores["aa-intelligence"]! >= 45;
              const isPareto = paretoSlugs.has(m.slug);
              return (
                <g key={m.slug}>
                  <circle
                    cx={cx} cy={cy} r={isHover ? 7 : isPareto ? 5.5 : isTop ? 5 : 3.5}
                    fill={prov.color} fillOpacity={isHover || isPareto || isTop ? 0.95 : 0.6}
                    stroke={isPareto ? "var(--foreground)" : isHover ? "#fff" : "none"} strokeWidth={isPareto ? "1.5" : "1.5"}
                    className="cursor-pointer transition-all duration-200"
                    onMouseEnter={() => setHovered(m.slug)}
                    onMouseLeave={() => setHovered(null)}
                  />
                  {(isHover || isPareto || isTop) && (
                    <text x={cx + 8} y={cy + 3.5} fontSize="10" fill="var(--foreground)" className="pointer-events-none">
                      {m.name}
                    </text>
                  )}
                </g>
              );
            });
          })}
        </svg>
      </div>

      {/* Legend & hover detail */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        {hovered ? (
          <span>
            <strong className="text-foreground">{allModels.find((m) => m.slug === hovered)?.name}</strong> — Hover a dot for details
          </span>
        ) : (
          <span>Each band is a provider. Outlined dots mark the verified cost–intelligence Pareto frontier.</span>
        )}
        <span>{activeGroups.length} providers · {activeGroups.reduce((total, group) => total + group.models.length, 0)} verified models plotted</span>
      </div>
    </div>
  );
}
