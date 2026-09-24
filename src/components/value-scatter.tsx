"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Model } from "@/data/models";
import { getProvider, providers } from "@/data/providers";

/**
 * Intelligence vs cost-per-task scatter. X = AA Intelligence Index,
 * Y = cost per AA task (log scale). Pareto frontier highlighted.
 */
export function ValueScatter({ allModels }: { allModels: Model[] }) {
  const [hover, setHover] = useState<string | null>(null);
  const [activeProviders, setActiveProviders] = useState<Set<string>>(new Set());

  const points = useMemo(() => {
    return allModels
      .filter(
        (m) =>
          m.scores["aa-intelligence"] != null &&
          m.costPerTask != null &&
          (activeProviders.size === 0 || activeProviders.has(m.provider)),
      )
      .map((m) => ({
        slug: m.slug,
        name: m.name,
        provider: m.provider,
        aa: m.scores["aa-intelligence"]!,
        cost: m.costPerTask!,
      }));
  }, [allModels, activeProviders]);

  // Pareto frontier: points not dominated (higher aa, lower cost)
  const frontier = useMemo(() => {
    const sorted = [...points].sort((a, b) => b.aa - a.aa || a.cost - b.cost);
    const f: typeof sorted = [];
    let bestCost = Infinity;
    for (const p of sorted) {
      if (p.cost < bestCost) {
        f.push(p);
        bestCost = p.cost;
      }
    }
    return new Set(f.map((p) => p.slug));
  }, [points]);

  const W = 760;
  const H = 460;
  const PAD = { l: 64, r: 24, t: 24, b: 44 };

  const xMin = 0;
  const xMax = 60;
  const costs = points.map((p) => p.cost).filter((c) => c > 0);
  const yMin = Math.min(...costs, 0.004) * 0.5;
  const yMax = Math.max(...costs, 1) * 2;

  const sx = (aa: number) =>
    PAD.l + ((Math.max(xMin, Math.min(xMax, aa)) - xMin) / (xMax - xMin)) * (W - PAD.l - PAD.r);
  const sy = (c: number) => {
    const logC = Math.log10(Math.max(yMin, Math.min(yMax, c)));
    const logMin = Math.log10(yMin);
    const logMax = Math.log10(yMax);
    return H - PAD.b - ((logC - logMin) / (logMax - logMin)) * (H - PAD.t - PAD.b);
  };

  const yTicks = [0.005, 0.01, 0.05, 0.1, 0.5, 1, 5].filter((t) => t >= yMin && t <= yMax);
  const xTicks = [0, 10, 20, 30, 40, 50, 60];

  // frontier path in sorted-by-x order
  const frontierPts = points
    .filter((p) => frontier.has(p.slug))
    .sort((a, b) => a.aa - b.aa);

  const hoveredPoint = points.find((p) => p.slug === hover);

  return (
    <div>
      {/* provider filter */}
      <div className="mb-4 flex flex-wrap gap-1.5">
        {providers
          .filter((p) => points.some((pt) => pt.provider === p.id))
          .map((p) => {
            const active = activeProviders.size === 0 || activeProviders.has(p.id);
            return (
              <button
                key={p.id}
                type="button"
                onClick={() =>
                  setActiveProviders((s) => {
                    const next = new Set(s);
                    if (next.size === 0) {
                      // first click: isolate this provider
                      return next.has(p.id) ? new Set() : new Set([p.id]);
                    }
                    if (next.has(p.id)) next.delete(p.id);
                    else next.add(p.id);
                    return next;
                  })
                }
                className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] transition-colors ${
                  active ? "border-transparent text-white" : "border-border-subtle bg-surface text-muted hover:text-foreground"
                }`}
                style={active ? { background: p.color } : undefined}
              >
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{ background: active ? "#fff" : p.color }}
                />
                {p.shortName}
              </button>
            );
          })}
        {activeProviders.size > 0 && (
          <button
            type="button"
            onClick={() => setActiveProviders(new Set())}
            className="rounded-full px-2.5 py-1 text-[11px] text-muted underline hover:text-foreground"
          >
            reset
          </button>
        )}
      </div>

      <div className="overflow-x-auto rounded-2xl border border-border-subtle bg-surface p-2">
        <svg viewBox={`0 0 ${W} ${H}`} className="min-w-[640px]" role="img" aria-label="Intelligence vs cost per task scatter plot">
          {/* grid */}
          {xTicks.map((t) => (
            <g key={`x${t}`}>
              <line x1={sx(t)} y1={PAD.t} x2={sx(t)} y2={H - PAD.b} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <text x={sx(t)} y={H - PAD.b + 16} textAnchor="middle" fontSize="10" fill="var(--muted)">{t}</text>
            </g>
          ))}
          {yTicks.map((t) => (
            <g key={`y${t}`}>
              <line x1={PAD.l} y1={sy(t)} x2={W - PAD.r} y2={sy(t)} stroke="var(--border-subtle)" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />
              <text x={PAD.l - 8} y={sy(t) + 3} textAnchor="end" fontSize="10" fill="var(--muted)">
                ${t >= 1 ? t : t.toFixed(3)}
              </text>
            </g>
          ))}
          <text x={W / 2} y={H - 6} textAnchor="middle" fontSize="11" fill="var(--muted)">AA Intelligence Index →</text>
          <text x={14} y={H / 2} textAnchor="middle" fontSize="11" fill="var(--muted)" transform={`rotate(-90 14 ${H / 2})`}>
            cost per task (log) →
          </text>

          {/* "value zone" annotation */}
          <text x={sx(2)} y={sy(yMin * 2.2)} fontSize="11" fill="var(--muted)" fontStyle="italic">
            ↙ value zone: smarter + cheaper
          </text>

          {/* Pareto frontier */}
          {frontierPts.length > 1 && (
            <polyline
              points={frontierPts.map((p) => `${sx(p.aa)},${sy(p.cost)}`).join(" ")}
              fill="none"
              stroke="var(--accent)"
              strokeWidth="1.5"
              strokeDasharray="5 4"
              opacity="0.7"
            />
          )}

          {/* points */}
          {points.map((p) => {
            const c = getProvider(p.provider).color;
            const isFrontier = frontier.has(p.slug);
            const isHover = hover === p.slug;
            return (
              <g key={p.slug}>
                <circle
                  cx={sx(p.aa)}
                  cy={sy(p.cost)}
                  r={isHover ? 7 : isFrontier ? 5.5 : 4}
                  fill={c}
                  fillOpacity={isHover || isFrontier ? 0.95 : 0.55}
                  stroke={isFrontier ? c : "none"}
                  strokeWidth="1"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHover(p.slug)}
                  onMouseLeave={() => setHover(null)}
                />
                {(isHover || isFrontier) && (
                  <text
                    x={sx(p.aa) + 9}
                    y={sy(p.cost) + 3.5}
                    fontSize="10.5"
                    fill="var(--foreground)"
                    className="pointer-events-none"
                  >
                    {p.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      {/* legend / hover detail */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-muted">
        {hoveredPoint ? (
          <span>
            <strong className="text-foreground">{hoveredPoint.name}</strong> — AA {hoveredPoint.aa} at{" "}
            ${hoveredPoint.cost < 0.01 ? hoveredPoint.cost.toFixed(4) : hoveredPoint.cost.toFixed(2)}/task ·{" "}
            <Link href={`/models/${hoveredPoint.slug}`} className="text-accent hover:underline">
              open page →
            </Link>
          </span>
        ) : (
          <span>Hover a dot for details. Dashed line = Pareto frontier (nothing cheaper scores higher).</span>
        )}
        <span>{points.length} models with verified score + cost/task</span>
      </div>
    </div>
  );
}
