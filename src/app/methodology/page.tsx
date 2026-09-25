import type { Metadata } from "next";
import Link from "next/link";
import { ExternalLink } from "@/components/external-link";

export const metadata: Metadata = {
  title: "Methodology",
  description:
    "How AI Model Index verifies model specifications, benchmark scores, pricing and API access links — and how unknown data is handled.",
};

const evidenceLevels = [
  {
    label: "Verified",
    description:
      "The value appears in a current public source and the model configuration is recorded.",
  },
  {
    label: "Reported",
    description:
      "The value comes from the model maker but has not been independently reproduced.",
  },
  {
    label: "Calculated",
    description:
      "A transparent calculation is shown, such as estimated monthly token cost.",
  },
  {
    label: "Unknown",
    description:
      "No reliable public value is available. The interface shows a dash rather than guessing.",
  },
];

const sources = [
  {
    name: "Artificial Analysis",
    use: "Independent intelligence, speed and price measurements.",
    href: "https://artificialanalysis.ai/",
  },
  {
    name: "LMArena",
    use: "Human preference arenas for text, web development, agents and vision.",
    href: "https://lmarena.ai/",
  },
  {
    name: "OpenRouter",
    use: "Public model catalogs, routed pricing, provider coverage and usage data.",
    href: "https://openrouter.ai/models",
  },
  {
    name: "Provider documentation",
    use: "First-party model IDs, context limits, modalities, pricing and lifecycle.",
    href: "https://platform.claude.com/docs/en/about-claude/models/overview",
  },
  {
    name: "Cloud catalogs",
    use: "Deployment availability, protocol compatibility and regional access routes.",
    href: "https://learn.microsoft.com/azure/foundry/foundry-models/",
  },
  {
    name: "Open model hubs",
    use: "Weights, model cards, licenses and self-hosting documentation.",
    href: "https://huggingface.co/models",
  },
];

export default function MethodologyPage() {
  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Data integrity
          </div>
          <h1>How the index decides what is true.</h1>
          <p>
            AI benchmark numbers are only useful when their model, effort,
            provider and source are clear. This page explains what the index
            records, what it calculates and what it refuses to invent.
          </p>
        </div>
        <div className="page-header-stat">
          <strong>4</strong>
          <span>evidence states</span>
          <small>Verified · reported · calculated · unknown</small>
        </div>
      </header>

      <section className="evidence-grid" aria-label="Evidence levels">
        {evidenceLevels.map((level, index) => (
          <article key={level.label} className="route-card">
            <span className="route-number">0{index + 1}</span>
            <h2>{level.label}</h2>
            <p>{level.description}</p>
          </article>
        ))}
      </section>

      <section className="methodology-section">
        <div className="section-heading">
          <div>
            <span>Source hierarchy</span>
            <h2>Where each field comes from</h2>
          </div>
          <p>Primary sources win. Independent measurements are kept separate from maker-reported claims.</p>
        </div>
        <div className="source-grid">
          {sources.map((source, index) => (
            <a
              key={source.name}
              href={source.href}
              target="_blank"
              rel="noreferrer"
              className="source-card"
            >
              <span>{String(index + 1).padStart(2, "0")}</span>
              <div>
                <h2>{source.name}</h2>
                <p>{source.use}</p>
              </div>
              <b aria-hidden="true">↗</b>
            </a>
          ))}
        </div>
      </section>

      <section className="methodology-section">
        <div className="section-heading">
          <div>
            <span>Known limits</span>
            <h2>Numbers that need context</h2>
          </div>
        </div>
        <div className="methodology-list">
          <article>
            <span>01</span>
            <div>
              <h3>Benchmark versions are not interchangeable</h3>
              <p>
                A score from an older index version or a different reasoning effort
                should not be placed beside a newer configuration as if the two
                were measured identically. Open the model page for its exact
                profile and verification date.
              </p>
            </div>
          </article>
          <article>
            <span>02</span>
            <div>
              <h3>Access-route pricing can differ</h3>
              <p>
                Publisher, cloud, router and dedicated inference prices may use
                different context tiers, caching rules, batch discounts or region
                policies. The API directory keeps those routes separate.
              </p>
            </div>
          </article>
          <article>
            <span>03</span>
            <div>
              <h3>Missing is not zero</h3>
              <p>
                A dash means “not published or not verified.” It never means free,
                unlimited, unsupported or zero. Coverage improves as primary
                documentation publishes clearer model cards.
              </p>
            </div>
          </article>
        </div>
      </section>

      <section className="method-banner">
        <div>
          <span className="page-kicker">Use the directory with confidence</span>
          <h2>Check the model, then check the route.</h2>
          <p>
            Start with the model index for capability and cost context, then use
            official provider links to confirm current API terms.
          </p>
        </div>
        <div className="method-actions">
          <Link href="/models" className="btn-primary">Browse models</Link>
          <Link href="/api-providers" className="btn-ghost">API access directory</Link>
          <ExternalLink href="https://artificialanalysis.ai/models" className="text-link">
            AA methodology
          </ExternalLink>
        </div>
      </section>
    </div>
  );
}
