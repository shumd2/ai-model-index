import type { Metadata } from "next";
import { benchmarks } from "@/data/benchmarks";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Benchmark glossary",
  description:
    "What each AI benchmark actually measures — AA Intelligence Index, LMArena arenas, Humanity's Last Exam, Terminal-Bench and more.",
};

export default function BenchmarksPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-violet-600 dark:text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            02 · Benchmarks
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Benchmark glossary
          </h1>
          <p className="mt-3 max-w-2xl text-muted">
            Benchmarks are how we compare models — but every score has a
            story. Here is what each one actually measures, who runs it,
            and how to read it.
          </p>
        </div>
      </Reveal>

      <div className="space-y-4">
        {benchmarks.map((b, i) => (
          <Reveal key={b.id} delay={i % 3}>
            <div className="group rounded-2xl border border-border-subtle bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg hover:shadow-accent/5">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-lg font-semibold group-hover:text-accent">{b.name}</h2>
                <div className="flex items-center gap-2 text-xs">
                  <span className="rounded-md bg-surface-2 px-2 py-1 font-mono text-muted">{b.scale}</span>
                  <span className="rounded-md bg-accent-soft px-2 py-1 font-medium text-accent">{b.source}</span>
                </div>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted">{b.description}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal delay={2}>
        <div className="mt-10 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-6 text-sm leading-relaxed text-muted">
          <strong className="text-foreground">Reading scores honestly.</strong> A
          model topping one benchmark isn&apos;t automatically &quot;the best&quot;
          — arenas measure human preference, indexes weight specific evals, and
          contamination is a real risk. Where we couldn&apos;t verify a score from
          a public source, we show a dash instead of a guess. Community-sourced
          numbers are labelled as such on model pages.
        </div>
      </Reveal>
    </div>
  );
}
