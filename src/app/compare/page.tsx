import type { Metadata } from "next";
import { CompareTable } from "@/components/compare-table";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Compare models",
  description:
    "Sort AI models by benchmark quality, context, publisher pricing and cost per task. Unverified values remain clearly marked.",
};

export default function ComparePage() {
  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Comparison matrix
          </div>
          <h1>Compare the numbers that change decisions.</h1>
          <p>
            Sort by intelligence, arena preference, context, publisher pricing
            or cost per task. Pin up to four models for a focused view.
          </p>
        </div>
        <div className="page-header-stat">
          <strong>{models.length}</strong>
          <span>models in the matrix</span>
          <small>Publisher prices unless a source says otherwise</small>
        </div>
      </header>

      <CompareTable allModels={models} />
    </div>
  );
}
