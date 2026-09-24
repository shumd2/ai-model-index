"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Model } from "@/data/models";
import { getProvider } from "@/data/providers";

const SAMPLE =
  "The frontier moves weekly now. The model that topped the intelligence index last month is already the value pick, and the value pick has become the fallback route for agent fleets that used to burn flagship tokens on routine work. Speed is its own kind of intelligence.";

/**
 * Animated speed race: bars grow to each model's measured output speed,
 * plus a "feel it" demo that streams text at each model's real rate.
 */
export function SpeedRace({ allModels }: { allModels: Model[] }) {
  const fastest = useMemo(
    () =>
      [...allModels]
        .filter((m) => m.speed != null && m.speed > 0)
        .sort((a, b) => b.speed! - a.speed!)
        .slice(0, 10),
    [allModels],
  );

  const [started, setStarted] = useState(false);
  const [progress, setProgress] = useState<Record<string, number>>({});
  const [racing, setRacing] = useState(false);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (!racing) return;
    const start = performance.now();
    const tick = (now: number) => {
      const elapsed = now - start;
      const next: Record<string, number> = {};
      let done = true;
      for (const m of fastest) {
        const tokens = (m.speed! * elapsed) / 1000 / 8; // 8× slowdown
        next[m.slug] = Math.min(100, (tokens / SAMPLE.length) * 100);
        if (tokens < SAMPLE.length) done = false;
      }
      setProgress(next);
      if (!done) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [racing, fastest]);

  // Streaming demo: how many chars the selected model has "produced"
  const [demoModel, setDemoModel] = useState(fastest[0]?.slug ?? "");
  const [chars, setChars] = useState(0);
  useEffect(() => {
    if (!started || !demoModel) return;
    const speed = allModels.find((m) => m.slug === demoModel)?.speed ?? 100;
    // 1 real second ≈ speed/4 tokens to keep it watchable; ~4 chars/token
    const id = setInterval(() => {
      setChars((c) => {
        const next = c + Math.max(1, Math.round((speed / 4 / 4) * 0.1));
        return next >= SAMPLE.length ? SAMPLE.length : next;
      });
    }, 100);
    return () => clearInterval(id);
  }, [started, demoModel, allModels]);

  return (
    <div className="space-y-8">
      {/* The race */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-5">
        <div className="flex flex-wrap items-baseline justify-between gap-2">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
            Output speed race — top 10
          </h3>
          <button
            type="button"
            onClick={() => {
              setProgress({});
              setRacing((r) => !r);
            }}
            className="rounded-lg bg-accent px-3.5 py-1.5 text-[13px] font-medium text-white transition-opacity hover:opacity-90"
          >
            {racing ? "Reset" : "Run the race ▸"}
          </button>
        </div>
        <div className="mt-5 space-y-3">
          {fastest.map((m) => {
            const p = getProvider(m.provider);
            const pct = racing ? (progress[m.slug] ?? 0) : 100;
            const finished = racing && (progress[m.slug] ?? 0) >= 100;
            return (
              <div key={m.slug} className="grid grid-cols-[9rem,1fr,4.5rem] items-center gap-3 sm:grid-cols-[11rem,1fr,5rem]">
                <Link href={`/models/${m.slug}`} className="truncate text-[13px] hover:text-accent">
                  <span className="mr-2 inline-block h-2 w-2 rounded-full align-middle" style={{ background: p.color }} />
                  <span className="align-middle">{m.name}</span>
                </Link>
                <div className="h-5 border-l border-dashed border-border-subtle bg-surface-2/60">
                  <div
                    className="flex h-full items-center justify-end pr-2 transition-[width] duration-200"
                    style={{
                      width: `${Math.max(2, pct)}%`,
                      background: `linear-gradient(90deg, ${p.color}55, ${p.color}22)`,
                    }}
                  >
                    {finished && <span className="font-mono text-[10px] text-emerald-600 dark:text-emerald-400">done ✓</span>}
                  </div>
                </div>
                <div className="text-right font-mono text-[12px] tabular-nums text-muted">
                  {m.speed!.toLocaleString()} t/s
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-4 text-xs text-muted">
          Real measured output speeds (Artificial Analysis, Sep 23, 2026), 8×
          slower than reality so you can watch. Click run — the gaps are the point.
        </p>
      </div>

      {/* Feel the speed */}
      <div className="rounded-2xl border border-border-subtle bg-surface p-5">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted">
          Feel the difference
        </h3>
        <p className="mt-2 text-[13px] text-muted">
          The same paragraph, streamed at each model&apos;s real rate (scaled to be
          watchable). Switch models mid-stream to compare.
        </p>
        <div className="mt-4 flex flex-wrap gap-2">
          {fastest.slice(0, 6).map((m) => {
            const p = getProvider(m.provider);
            const active = demoModel === m.slug;
            return (
              <button
                key={m.slug}
                type="button"
                onClick={() => {
                  setDemoModel(m.slug);
                  setStarted(true);
                }}
                className={`rounded-full px-3 py-1.5 text-[12px] transition-colors ${
                  active ? "font-medium text-white" : "border border-border-subtle bg-surface text-muted hover:text-foreground"
                }`}
                style={active ? { background: p.color } : undefined}
              >
                {m.name}
              </button>
            );
          })}
          {!started && (
            <button
              type="button"
              onClick={() => setStarted(true)}
              className="rounded-full bg-accent px-3 py-1.5 text-[12px] font-medium text-white"
            >
              Start streaming ▸
            </button>
          )}
        </div>
        <div className="mt-4 min-h-[7rem] rounded-xl border border-border-subtle bg-surface-2/40 p-4 font-mono text-[13px] leading-relaxed">
          {started ? (
            <>
              {SAMPLE.slice(0, chars)}
              {chars < SAMPLE.length && (
                <span className="ml-0.5 inline-block h-4 w-[7px] animate-pulse bg-accent align-middle" />
              )}
            </>
          ) : (
            <span className="text-muted">Press start — then switch models while it types.</span>
          )}
        </div>
        {started && (
          <div className="mt-2 flex items-baseline justify-between text-[11px] text-muted">
            <span>
              {allModels.find((m) => m.slug === demoModel)?.name} ·{" "}
              {allModels.find((m) => m.slug === demoModel)?.speed} t/s measured
            </span>
            <span>
              {chars} / {SAMPLE.length} chars
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
