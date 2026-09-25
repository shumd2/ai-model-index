import type { Metadata } from "next";
import { ModelExplorer } from "@/components/model-explorer";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "All models",
  description:
    "Browse every tracked AI model — filter by provider, open weights, and more. Each model has its own page with verified specs and scores.",
};

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Model catalog</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          Every model we track, one page each. Filter and search for full specs and verified benchmark scores.
        </p>
      </div>
      <ModelExplorer allModels={models} />
    </div>
  );
}
