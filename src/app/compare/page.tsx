import type { Metadata } from "next";
import { CompareTable } from "@/components/compare-table";
import { models } from "@/data/models";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Compare models",
  description:
    "Sortable comparison table of AI models across benchmark scores, context windows and pricing. Filter by provider and open weights.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-violet-600 dark:text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            01 · Compare
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
            Compare models
          </h1>
          <p className="mt-2 max-w-2xl text-muted">
            Sort by any column — benchmark scores, context windows, pricing.
            Scores with no verified public data are marked with a dash rather
            than guessed. Pin models from any card to build a side-by-side
            set.
          </p>
        </div>
      </Reveal>
      <Reveal delay={1}>
        <CompareTable allModels={models} />
      </Reveal>
    </div>
  );
}
