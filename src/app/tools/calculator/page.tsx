import type { Metadata } from "next";
import { CostCalculator } from "@/components/cost-calculator";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Cost calculator",
  description:
    "Estimate monthly LLM costs across any models — input/output volume, cache-hit share and batch pricing included. Built on verified published pricing.",
};

export default function CalculatorPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Cost calculator</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Pick a workload, pick your models, see the monthly bill. Uses each
          provider&apos;s published input, output, cache-read and batch rates —
          the same numbers on every model page here.
        </p>
      </div>
      <CostCalculator allModels={models} />
    </div>
  );
}
