import type { Metadata } from "next";
import { ValueScatter } from "@/components/value-scatter";
import { Reveal } from "@/components/reveal";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Value map",
  description:
    "Every model plotted by intelligence vs cost per task. Each band is a provider — dots show which models give the most intelligence for the least money.",
};

export default function ValueMapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-violet-600 dark:text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            03 · Tools
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Value map</h1>
          <p className="mt-2 max-w-2xl text-muted">
            Every model plotted by AA Intelligence Index (x) vs cost per intelligence task (y, log). Each horizontal band is a provider — dots show which models give the most intelligence for the least money. Bigger dots = frontier scores. Hover for details.
          </p>
        </div>
      </Reveal>
      <Reveal delay={1}>
        <ValueScatter allModels={models} />
      </Reveal>
      <Reveal delay={2}>
        <div className="mt-6 rounded-2xl border border-amber-500/20 bg-gradient-to-br from-amber-500/5 to-amber-500/10 p-5 text-sm leading-relaxed text-muted">
          <strong className="text-foreground">Reading the map.</strong> Dots stacked at the left are cheap but limited; dots at the top-right are powerful but expensive. Models sitting at the top-left frontier are the Pareto-optimal picks — nothing cheaper scores higher and nothing smarter costs less. Data: AA Intelligence Index v4.3.2, verified Sep 23, 2026.
        </div>
      </Reveal>
    </div>
  );
}
