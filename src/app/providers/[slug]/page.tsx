import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelCard } from "@/components/model-card";
import { ExternalLink } from "@/components/external-link";
import { modelsByProvider } from "@/data/models";
import { providers } from "@/data/providers";
import { apiProvidersForLab } from "@/data/api-providers";

export const dynamicParams = false;

export function generateStaticParams() {
  return providers.map((provider) => ({ slug: provider.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/providers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const provider = providers.find((item) => item.id === slug);
  if (!provider) return {};
  return {
    title: `${provider.name} — models and API access`,
    description: `${provider.name}: ${provider.tagline}. Tracked models, verified benchmark standing, official links and API access routes.`,
  };
}

export default async function ProviderPage({
  params,
}: PageProps<"/providers/[slug]">) {
  const { slug } = await params;
  const provider = providers.find((item) => item.id === slug);
  if (!provider) notFound();

  const providerModels = modelsByProvider(provider.id);
  const topModel = [...providerModels]
    .filter(
      (model) =>
        model.scores["aa-intelligence"] != null && model.verifiedOn != null,
    )
    .sort(
      (a, b) =>
        (b.scores["aa-intelligence"] ?? -1) -
        (a.scores["aa-intelligence"] ?? -1),
    )[0];
  const openModels = providerModels.filter((model) => model.openWeights).length;
  const accessRoutes = apiProvidersForLab(provider.id);

  return (
    <div className="page-shell">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/providers">Model labs</Link>
        <span>/</span>
        <span aria-current="page">{provider.name}</span>
      </nav>

      <header className="lab-profile-header">
        <div
          className="provider-monogram provider-monogram--xl"
          style={{ "--provider-color": provider.color } as React.CSSProperties}
          aria-hidden="true"
        >
          {provider.shortName.slice(0, 2).toUpperCase()}
        </div>
        <div className="lab-profile-copy">
          <div className="page-kicker">Model lab profile</div>
          <h1>{provider.name}</h1>
          <p className="lab-profile-tagline">{provider.tagline}</p>
          <div className="lab-profile-meta">
            <span>{provider.hq}</span>
            <span>Founded {provider.founded}</span>
            <ExternalLink href={provider.website}>Official website</ExternalLink>
          </div>
        </div>
        <p className="lab-profile-description">{provider.description}</p>
      </header>

      <dl className="lab-metrics">
        <div>
          <dt>Tracked models</dt>
          <dd>{providerModels.length}</dd>
          <span>In the AI Model Index</span>
        </div>
        <div>
          <dt>Best verified AA</dt>
          <dd>
            {topModel?.scores["aa-intelligence"] != null
              ? topModel.scores["aa-intelligence"]
              : "—"}
          </dd>
          <span>{topModel?.name ?? "No verified score"}</span>
        </div>
        <div>
          <dt>Open weights</dt>
          <dd>{openModels}</dd>
          <span>Downloadable model releases</span>
        </div>
        <div>
          <dt>Access routes</dt>
          <dd>{accessRoutes.length || "—"}</dd>
          <span>Official API and cloud links</span>
        </div>
      </dl>

      {provider.highlights.length > 0 && (
        <section className="lab-highlights">
          <div className="lab-section-heading">
            <span>What stands out</span>
            <h2>Lab profile</h2>
          </div>
          <ul className="highlight-list">
            {provider.highlights.map((highlight, index) => (
              <li key={highlight}>
                <span>{String(index + 1).padStart(2, "0")}</span>
                <p>{highlight}</p>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="lab-access-section">
        <div className="lab-section-heading lab-section-heading--split">
          <div>
            <span>Access</span>
            <h2>Official API and deployment links</h2>
          </div>
          <Link href="/api-providers">Compare all access routes →</Link>
        </div>

        {accessRoutes.length > 0 ? (
          <div className="access-grid">
            {accessRoutes.map((route) => (
              <article key={route.id} className="access-card">
                <div className="access-card-heading">
                  <div
                    className="provider-monogram"
                    style={{ "--provider-color": route.color } as React.CSSProperties}
                    aria-hidden="true"
                  >
                    {route.shortName.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h3>{route.name}</h3>
                    <span>{route.compatibility[0]}</span>
                  </div>
                </div>
                <p>{route.summary}</p>
                <div className="access-card-links">
                  <ExternalLink href={route.docsUrl}>Docs</ExternalLink>
                  <ExternalLink href={route.modelsUrl}>Models</ExternalLink>
                  {route.pricingUrl && (
                    <ExternalLink href={route.pricingUrl}>Pricing</ExternalLink>
                  )}
                  <ExternalLink href={route.consoleUrl}>Open console</ExternalLink>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="lab-no-api">
            <div>
              <strong>No first-party API is listed yet.</strong>
              <p>
                This lab may distribute weights directly or sell primarily through
                cloud and inference partners. Use the official site for current
                access terms.
              </p>
            </div>
            <ExternalLink href={provider.website} className="btn-ghost">
              Visit official site
            </ExternalLink>
          </div>
        )}
      </section>

      <section className="lab-models-section">
        <div className="lab-section-heading lab-section-heading--split">
          <div>
            <span>Catalog</span>
            <h2>Models from {provider.name}</h2>
          </div>
          <span>{providerModels.length} tracked</span>
        </div>
        {providerModels.length > 0 ? (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {providerModels.map((model) => (
              <ModelCard key={model.slug} model={model} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <strong>No model pages yet.</strong>
            <span>The lab is tracked, but its models have not been added to the index.</span>
          </div>
        )}
      </section>
    </div>
  );
}
