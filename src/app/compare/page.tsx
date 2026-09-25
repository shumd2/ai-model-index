import type { Metadata } from "next";
import { CompareTable } from "@/components/compare-table";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Compare models",
  description:
    "Sortable comparison of AI models across benchmark scores, context windows, and pricing.",
};

export default function ComparePage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Compare</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          Sort by any column. Scores without verified data show a dash, not a guess.
        </p>
      </div>
      <CompareTable allModels={models} />
    </div>
  );
}
