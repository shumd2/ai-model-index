import type { Metadata } from "next";
import { ValueScatter } from "@/components/value-scatter";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Value map",
  description:
    "Every model plotted by intelligence vs cost per task. The Pareto frontier shows which models nothing else beats on value.",
};

export default function ValueMapPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Value map</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Intelligence Index (x) vs cost per intelligence task (y, log scale).
          Cost-per-task captures both sticker price <em>and</em> how many tokens a
          model burns — a cheap model that overthinks can lose to a pricey, terse one.
        </p>
      </div>
      <ValueScatter allModels={models} />
      <div className="mt-6 rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5 text-sm leading-relaxed text-muted">
        <strong className="text-foreground">Reading the frontier.</strong> Dots on
        the dashed line are Pareto-optimal: no measured model is both cheaper and
        smarter. Dots far above the line are paying premium prices without premium
        scores; dots deep in the bottom-left are cheap but limited. Data: AA
        Intelligence Index v4.3.2 and cost-per-task, verified Sep 23, 2026.
      </div>
    </div>
  );
}
