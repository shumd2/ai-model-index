import type { Metadata } from "next";
import Link from "next/link";
import { ProviderBrowser } from "./browser";
import { providers } from "@/data/providers";
import { models } from "@/data/models";
import { apiProviders } from "@/data/api-providers";

export const metadata: Metadata = {
  title: "AI model labs",
  description:
    "A structured directory of the labs building frontier, open-weight and emerging AI models — with official sites, tracked models and API access routes.",
};

export default function ProvidersPage() {
  const openLabs = providers.filter((provider) =>
    models.some(
      (model) => model.provider === provider.id && model.openWeights,
    ),
  ).length;

  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Model lab directory
          </div>
          <h1>The labs behind the models.</h1>
          <p>
            Browse the organizations training and shipping models—not reseller
            names. Compare their current catalog, open-weight output, verified
            benchmark standing and official access routes.
          </p>
        </div>
        <div className="page-header-stat">
          <strong>{providers.length}</strong>
          <span>labs tracked worldwide</span>
          <small>{openLabs} have tracked open-weight models</small>
        </div>
      </header>

      <section className="lab-access-banner">
        <div>
          <span>Model maker or API host?</span>
          <h2>Looking for a way to call a model?</h2>
          <p>
            Compare first-party APIs, model routers, cloud catalogs and
            self-hosted infrastructure in the access directory.
          </p>
        </div>
        <div className="lab-access-meta">
          <span>{apiProviders.length} verified routes</span>
          <Link href="/api-providers" className="btn-primary">Browse API access</Link>
        </div>
      </section>

      <div className="section-heading">
        <div>
          <span>Directory</span>
          <h2>Research labs and model providers</h2>
        </div>
        <p>Search by lab, region or specialty. Official links open in a new tab.</p>
      </div>

      <ProviderBrowser />
    </div>
  );
}
