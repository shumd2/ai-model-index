"use client";

import Link from "next/link";
import type { Model } from "@/data/models";
import { formatContext } from "@/data/models";
import { getProvider } from "@/data/providers";
import { ModalityBadges } from "./modality-badges";
import { PinButton } from "./compare-tray";

function ScoreRing({ score, color, size = 40 }: { score: number; color: string; size?: number }) {
  const circumference = 2 * Math.PI * (size / 2 - 3);
  const offset = circumference * (1 - score / 60);

  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 3}
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          opacity={0.1}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={size / 2 - 3}
          fill="none"
          stroke={color}
          strokeWidth="3"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="transition-all duration-700"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="font-mono text-sm font-bold tabular-nums">{score}</span>
      </div>
    </div>
  );
}

export function ModelCard({ model }: { model: Model }) {
  const provider = getProvider(model.provider);
  const aaScore = model.scores["aa-intelligence"];

  return (
    <Link
      href={`/models/${model.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-border-subtle bg-surface p-0 transition-all duration-300 hover:-translate-y-1 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
    >
      {/* Colored top accent line */}
      <div
        className="h-[3px] w-full transition-all duration-300 group-hover:h-[4px]"
        style={{ background: `linear-gradient(90deg, ${provider.color}, ${provider.color}88, transparent)` }}
      />

      <div className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3">
            {/* Provider avatar with subtle glow */}
            <div
              className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-[12px] font-bold text-white transition-shadow group-hover:shadow-lg"
              style={{
                background: `linear-gradient(135deg, ${provider.color}, ${provider.color}aa)`,
                boxShadow: `0 4px 12px ${provider.color}33`,
              }}
            >
              {provider.shortName.slice(0, 2).toUpperCase()}
            </div>
            <div className="min-w-0">
              <div className="text-sm font-semibold leading-tight group-hover:text-accent">
                {model.name}
              </div>
              <div className="mt-0.5 text-[11px] text-muted">{provider.name}</div>
            </div>
          </div>
          {aaScore != null ? (
            <ScoreRing score={aaScore} color={provider.color} />
          ) : (
            <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border-subtle bg-surface-2 text-[11px] text-muted">
              —
            </div>
          )}
        </div>

        {/* Tagline */}
        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-muted">
          {model.tagline}
        </p>

        {/* Footer */}
        <div className="mt-auto pt-4">
          <div className="flex items-center justify-between gap-2 text-xs text-muted">
            <span className="font-mono">
              {model.contextWindow ? (
                <>
                  <span className="font-semibold text-foreground">
                    {formatContext(model.contextWindow)}
                  </span>{" "}
                  ctx
                </>
              ) : (
                <span className="italic opacity-50">ctx n/a</span>
              )}
            </span>
            <div className="flex items-center gap-1.5">
              {model.openWeights && (
                <span className="tag-pill bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
                  open
                </span>
              )}
              {model.status === "beta" && (
                <span className="tag-pill bg-amber-500/10 text-amber-600 dark:text-amber-400">
                  beta
                </span>
              )}
              {model.status === "legacy" && (
                <span className="tag-pill bg-zinc-500/10 text-zinc-500 dark:text-zinc-400">
                  legacy
                </span>
              )}
            </div>
          </div>

          <div className="mt-3 flex items-center justify-between border-t border-border-subtle pt-3">
            <ModalityBadges modalities={model.modalities.slice(0, 3)} />
            <PinButton slug={model.slug} name={model.name} />
          </div>
        </div>
      </div>
    </Link>
  );
}
