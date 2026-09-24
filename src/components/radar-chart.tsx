"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Model } from "@/data/models";
import { getProvider } from "@/data/providers";

/**
 * Radar chart of a model's benchmark scores, normalized against the
 * display ranges used elsewhere on the site. Optionally overlays a rival.
 */

// Same ranges as score-bar.tsx — normalized 0..1
const ranges: Record<string, { min: number; max: number }> = {
  "aa-intelligence": { min: 0, max: 60 },
  "lmarena-text": { min: 1150, max: 1550 },
  "lmarena-webdev": { min: 1200, max: 1850 },
  "lmarena-agent": { min: 0, max: 15 },
  hle: { min: 0, max: 70 },
  deepswe: { min: 0, max: 80 },
  "terminal-bench": { min: 0, max: 70 },
  "terminal-bench-science": { min: 0, max: 70 },
  automationbench: { min: 0, max: 45 },
  frontiercode: { min: 0, max: 60 },
  cursorbench: { min: 0, max: 60 },
  chartography: { min: 0, max: 95 },
  "gdpval-aa": { min: 1300, max: 1900 },
  "gdp-pdf": { min: 0, max: 45 },
  osworld: { min: 0, max: 85 },
};

const labels: Record<string, string> = {
  "aa-intelligence": "AA idx",
  "lmarena-text": "Text",
  "lmarena-webdev": "WebDev",
  "lmarena-agent": "Agent",
  hle: "HLE",
  deepswe: "DeepSWE",
  "terminal-bench": "Term-Bench",
  "terminal-bench-science": "TB-Sci",
  automationbench: "Autom.",
  frontiercode: "FrCode",
  cursorbench: "Cursor",
  chartography: "Charts",
  "gdpval-aa": "GDPval",
  "gdp-pdf": "GDP.pdf",
  osworld: "OSWorld",
};

export function RadarChart({
  model,
  rivals,
}: {
  model: Model;
  rivals: Model[];
}) {
  const [rivalSlug, setRivalSlug] = useState<string>("");

  const axes = useMemo(() => {
    return Object.keys(model.scores).filter(
      (id) => ranges[id] != null && typeof model.scores[id] === "number",
    );
  }, [model]);

  const rival = rivals.find((r) => r.slug === rivalSlug);

  if (axes.length < 3) {
    return null; // not enough axes to be meaningful
  }

  const SIZE = 380;
  const C = SIZE / 2;
  const R = SIZE / 2 - 56;

  const point = (index: number, value: number) => {
    const angle = (Math.PI * 2 * index) / axes.length - Math.PI / 2;
    const clamped = Math.max(0, Math.min(1, value));
    const r = R * clamped;
    return [C + r * Math.cos(angle), C + r * Math.sin(angle)];
  };

  const norm = (id: string, value: number) => {
    const { min, max } = ranges[id];
    return (value - min) / (max - min);
  };

  const poly = (m: Model) =>
    axes
      .map((id, i) => {
        const v = m.scores[id];
        return v != null ? point(i, norm(id, v)).join(",") : null;
      })
      .filter(Boolean)
      .join(" ");

  const provider = getProvider(model.provider);
  const rivalProvider = rival ? getProvider(rival.provider) : null;

  return (
    <div className="grid gap-6 sm:grid-cols-[380px,1fr] sm:items-center">
      <div className="mx-auto">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} role="img" aria-label={`Benchmark radar chart for ${model.name}`}>
          {/* rings */}
          {[0.25, 0.5, 0.75, 1].map((f) => (
            <polygon
              key={f}
              points={axes.map((_, i) => point(i, f).join(",")).join(" ")}
              fill="none"
              stroke="var(--border-subtle)"
              strokeWidth="1"
            />
          ))}
          {/* spokes + labels */}
          {axes.map((id, i) => {
            const [x, y] = point(i, 1);
            const [lx, ly] = point(i, 1.16);
            return (
              <g key={id}>
                <line x1={C} y1={C} x2={x} y2={y} stroke="var(--border-subtle)" strokeWidth="1" />
                <text
                  x={lx}
                  y={ly}
                  textAnchor={Math.abs(lx - C) < 8 ? "middle" : lx > C ? "start" : "end"}
                  dominantBaseline="middle"
                  fontSize="10.5"
                  fill="var(--muted)"
                >
                  {labels[id] ?? id}
                </text>
              </g>
            );
          })}
          {/* rival polygon */}
          {rival && (
            <polygon
              points={poly(rival)}
              fill={`${getProvider(rival.provider).color}22`}
              stroke={getProvider(rival.provider).color}
              strokeWidth="1.5"
              strokeDasharray="4 3"
            />
          )}
          {/* model polygon */}
          <polygon points={poly(model)} fill={`${provider.color}33`} stroke={provider.color} strokeWidth="2" />
        </svg>
      </div>

      <div>
        <div className="text-xs text-muted">
          Normalized against the same display ranges used in the benchmark bars —
          shape, not absolute values, is the signal. Need ≥3 verified scores.
        </div>
        {rivals.length > 0 && (
          <div className="mt-4">
            <label className="text-[13px] text-muted">Overlay a rival:</label>
            <select
              value={rivalSlug}
              onChange={(e) => setRivalSlug(e.target.value)}
              className="mt-1.5 w-full rounded-lg border border-border-subtle bg-surface px-3 py-2 text-sm outline-none focus:border-accent"
            >
              <option value="">No overlay</option>
              {rivals.map((r) => (
                <option key={r.slug} value={r.slug}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {rival && rivalProvider && (
          <div className="mt-3 flex flex-wrap gap-4 text-[13px]">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-sm" style={{ background: provider.color }} />
              <Link href={`/models/${model.slug}`} className="hover:text-accent">{model.name}</Link>
            </span>
            <span className="flex items-center gap-2 text-muted">
              <span className="h-2.5 w-2.5 rounded-sm border-2 border-dashed" style={{ borderColor: rivalProvider.color }} />
              <Link href={`/models/${rival.slug}`} className="hover:text-accent">{rival.name}</Link>
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
