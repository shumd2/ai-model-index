import type { Metadata } from "next";
import Link from "next/link";
import { ModelExplorer } from "@/components/model-explorer";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "All models",
  description:
    "Browse every tracked AI model — filter by maker, open weights, reasoning and more. Verified specs, context, pricing and benchmark scores.",
};

export default function ModelsPage() {
  const openModels = models.filter((model) => model.openWeights).length;
  const pricedModels = models.filter(
    (model) => model.pricing?.input != null && model.pricing.output != null,
  ).length;

  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Model registry
          </div>
          <h1>Every model, one searchable catalog.</h1>
          <p>
            Compare context, pricing, modalities and verified scores. Open any
            model for effort tiers, benchmark detail and official API access.
          </p>
        </div>
        <div className="page-header-stat">
          <strong>{models.length}</strong>
          <span>models tracked</span>
          <small>{openModels} open weights · {pricedModels} with published rates</small>
        </div>
      </header>

      <div className="lab-access-banner">
        <div>
          <span>Need a way to call them?</span>
          <h2>Model maker and API provider are different things.</h2>
          <p>
            Compare direct model APIs, multi-model routers, cloud catalogs and
            self-hosted infrastructure separately.
          </p>
        </div>
        <div className="lab-access-meta">
          <Link href="/api-providers" className="btn-ghost">API access directory</Link>
        </div>
      </div>

      <div className="section-heading">
        <div>
          <span>Explore</span>
          <h2>Search and filter the registry</h2>
        </div>
        <p>Search by model, maker, API ID, specialty or capability term.</p>
      </div>

      <ModelExplorer allModels={models} />
    </div>
  );
}
