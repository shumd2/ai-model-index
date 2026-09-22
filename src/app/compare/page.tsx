import type { Metadata } from "next";
import { CompareTable } from "@/components/compare-table";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Compare models",
  description:
    "Sortable comparison table of AI models across benchmark scores, context windows and pricing. Filter by provider and open weights.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Compare models</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Sort by any column — benchmark scores, context windows, pricing. Scores
          with no verified public data are marked with a dash rather than guessed.
        </p>
      </div>
      <CompareTable allModels={models} />
    </div>
  );
}
