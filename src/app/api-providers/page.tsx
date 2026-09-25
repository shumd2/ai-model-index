import type { Metadata } from "next";
import Link from "next/link";
import { ApiProviderBrowser } from "./browser";
import { apiProviders } from "@/data/api-providers";
import { ExternalLink } from "@/components/external-link";

export const metadata: Metadata = {
  title: "AI API providers",
  description:
    "Compare official AI API providers, model routers, cloud catalogs and self-hosted inference platforms — with direct documentation, model, pricing and console links.",
};

const routes = [
  {
    label: "Direct model API",
    description: "Use the lab that built the model for the newest capabilities and first-party tools.",
    example: "OpenAI · Anthropic · Google",
  },
  {
    label: "One API, many models",
    description: "Compare providers and add fallbacks without maintaining every vendor integration.",
    example: "OpenRouter · Hugging Face",
  },
  {
    label: "Cloud deployment",
    description: "Keep inference inside an existing cloud account, region and governance boundary.",
    example: "Azure · AWS · Google Cloud",
  },
];

export default function ApiProvidersPage() {
  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Official access directory
          </div>
          <h1>Choose where to run the model.</h1>
          <p>
            Model labs build the weights. API providers expose them. Compare
            first-party endpoints, multi-model routers, cloud catalogs and
            self-hosted infrastructure—without leaving the index.
          </p>
        </div>
        <div className="page-header-stat">
          <strong>{apiProviders.length}</strong>
          <span>verified access routes</span>
          <small>Links checked Sep 25, 2026</small>
        </div>
      </header>

      <section className="route-grid" aria-label="API access routes">
        {routes.map((route, index) => (
          <article key={route.label} className="route-card">
            <span className="route-number">0{index + 1}</span>
            <h2>{route.label}</h2>
            <p>{route.description}</p>
            <span>{route.example}</span>
          </article>
        ))}
      </section>

      <div className="section-heading">
        <div>
          <span>Directory</span>
          <h2>API providers and model access</h2>
        </div>
        <p>Prices and model availability change often. Always confirm terms on the provider&apos;s official page.</p>
      </div>

      <ApiProviderBrowser />

      <section className="method-banner">
        <div>
          <span className="page-kicker">How to use this directory</span>
          <h2>Access route ≠ model benchmark.</h2>
          <p>
            The same model can have different latency, limits and data terms
            through a lab, cloud or router. Compare the route that fits your
            deployment—not just the model&apos;s headline score.
          </p>
        </div>
        <div className="method-actions">
          <Link href="/compare" className="btn-primary">Compare models</Link>
          <Link href="/tools/calculator" className="btn-ghost">Estimate cost</Link>
          <ExternalLink href="https://openrouter.ai/models" className="text-link">
            Open model catalog
          </ExternalLink>
        </div>
      </section>
    </div>
  );
}
