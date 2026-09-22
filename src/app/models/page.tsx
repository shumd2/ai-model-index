import type { Metadata } from "next";
import { ModelExplorer } from "@/components/model-explorer";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "All models",
  description:
    "Browse every tracked AI model — filter by provider, open weights, reasoning and more. Specs, context windows and verified benchmark scores.",
};

export default function ModelsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Model catalog</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Every model we track, one page each. Filter, search, and click through
          for full specs, benchmark bars and community insights.
        </p>
      </div>
      <ModelExplorer allModels={models} />
    </div>
  );
}
