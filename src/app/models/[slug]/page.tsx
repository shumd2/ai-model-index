import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelBenchmarkChart } from "@/components/score-bar";
import { ModalityBadges } from "@/components/modality-badges";
import { EffortLadderExplorer } from "@/components/effort-ladder";
import { PricingCard } from "@/components/pricing-card";
import { RadarChart } from "@/components/radar-chart";
import { PinButton } from "@/components/compare-tray";
import { ExternalLink } from "@/components/external-link";
import { formatContext, getModel, models, modelsByProvider } from "@/data/models";
import { getProvider } from "@/data/providers";
import { apiProvidersForLab } from "@/data/api-providers";

export const dynamicParams = false;

export function generateStaticParams() {
  return models.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/models/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) return {};
  const provider = getProvider(model.provider);
  return {
    title: `${model.name} — specs, benchmarks & insights`,
    description: `${model.name} by ${provider.name}. ${model.tagline}. Context window, pricing, benchmark scores and community insights.`,
  };
}

function SpecCell({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border-subtle bg-surface p-4">
      <div className="text-[11px] uppercase tracking-wider text-muted">{label}</div>
      <div className="mt-1.5 font-mono text-lg font-semibold">{value}</div>
    </div>
  );
}

/** Find a cheaper model within ~3 AA points, and a stronger model at ≤ same price. */
function findAlternatives(slug: string) {
  const model = getModel(slug);
  if (!model) return { cheaper: undefined, stronger: undefined };
  const aa = model.scores["aa-intelligence"];
  const myCost = model.costPerTask;
  const myPrice = model.pricing?.input;
  let cheaper: typeof model | undefined;
  let stronger: typeof model | undefined;
  for (const m of models) {
    if (m.slug === slug || m.status === "legacy") continue;
    const maa = m.scores["aa-intelligence"];
    if (myCost != null && m.costPerTask != null && aa != null && maa != null) {
      if (m.costPerTask < myCost && maa >= aa - 3 && (!cheaper || m.costPerTask < cheaper.costPerTask!)) {
        cheaper = m;
      }
    }
    if (myPrice != null && m.pricing?.input != null && maa != null) {
      if (m.pricing.input <= myPrice && maa > (aa ?? 0) && (!stronger || maa > (stronger.scores["aa-intelligence"] ?? 0))) {
        stronger = m;
      }
    }
  }
  return { cheaper, stronger };
}

export default async function ModelPage({ params }: PageProps<"/models/[slug]">) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const provider = getProvider(model.provider);
  const siblings = modelsByProvider(model.provider).filter((m) => m.slug !== model.slug);
  const accessRoutes = apiProvidersForLab(model.provider);
  const { default: ModelContent } = await import(`@/content/models/${model.slug}.mdx`);
  const { cheaper, stronger } = findAlternatives(slug);

  // Radar rivals: strongest verified models outside this provider, plus siblings
  const radarRivals = [...models]
    .filter(
      (m) =>
        m.slug !== model.slug &&
        m.provider !== model.provider &&
        Object.keys(m.scores).length >= 3,
    )
    .sort(
      (a, b) =>
        (b.scores["aa-intelligence"] ?? 0) - (a.scores["aa-intelligence"] ?? 0),
    )
    .slice(0, 8);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="breadcrumb" aria-label="Breadcrumb">
        <Link href="/models">Models</Link>
        <span>/</span>
        <Link href={`/providers/${provider.id}`}>{provider.name}</Link>
        <span>/</span>
        <span aria-current="page">{model.name}</span>
      </nav>

      <header className="model-hero">
        <div
          className="provider-monogram provider-monogram--xl"
          style={{ "--provider-color": provider.color } as React.CSSProperties}
          aria-hidden="true"
        >
          {provider.shortName.slice(0, 2).toUpperCase()}
        </div>
        <div className="model-hero-copy">
          <div className="model-hero-title-row">
            <h1>{model.name}</h1>
            {model.verifiedOn && (
              <span className="verified-badge">Verified {model.verifiedOn}</span>
            )}
          </div>
          <p>{model.tagline}</p>
          <div className="model-hero-tags">
            <Link
              href={`/providers/${provider.id}`}
              className="provider-tag"
              style={{ color: provider.color }}
            >
              {provider.name}
            </Link>
            {model.openWeights && <span>Open weights</span>}
            {model.reasoning && <span>Reasoning</span>}
            {model.status === "beta" && <span>Beta</span>}
            {model.status === "legacy" && <span>Legacy</span>}
            {model.released && <span>{model.released}</span>}
          </div>
        </div>
        <div className="model-hero-action">
          <PinButton slug={model.slug} name={model.name} />
        </div>
      </header>

      {/* Quick stat strip */}
      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {model.scores["aa-intelligence"] != null && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{model.scores["aa-intelligence"]}</div><div className="text-[10px] uppercase tracking-wider text-muted">AA index</div></div>}
        {model.costPerTask != null && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{model.costPerTask === 0 ? "Free" : model.costPerTask < 0.01 ? `$${model.costPerTask.toFixed(4)}` : `$${model.costPerTask.toFixed(2)}`}</div><div className="text-[10px] uppercase tracking-wider text-muted">per task</div></div>}
        {model.speed != null && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{model.speed}</div><div className="text-[10px] uppercase tracking-wider text-muted">t/s</div></div>}
        {model.contextWindow && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{formatContext(model.contextWindow)}</div><div className="text-[10px] uppercase tracking-wider text-muted">context</div></div>}
        {model.latency != null && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{model.latency < 1 ? model.latency.toFixed(2) : model.latency.toFixed(1)}s</div><div className="text-[10px] uppercase tracking-wider text-muted">TTFT</div></div>}
        <div className="card !rounded-xl !p-3 text-center"><div className="flex items-center justify-center gap-1">{model.modalities.slice(0, 3).map((m) => <span key={m} className="rounded-md border border-border-subtle bg-surface-2 px-1 py-0.5 font-mono text-[10px] text-muted">{m}</span>)}</div><div className="mt-1 text-[10px] uppercase tracking-wider text-muted">modalities</div></div>
      </div>

      <section className="model-access-section">
        <div className="lab-section-heading lab-section-heading--split">
          <div>
            <span>Access this model</span>
            <h2>Official API and deployment routes</h2>
          </div>
          <Link href="/api-providers">Compare all providers →</Link>
        </div>
        <p className="model-access-note">
          Routes below expose {provider.name} model catalogs. Confirm that this
          exact model ID, context limit and price are available in your region
          before integrating.
        </p>
        <div className="model-access-grid">
          {accessRoutes.map((route) => (
            <article key={route.id} className="model-access-card">
              <div className="model-access-card-heading">
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
              {model.apiIds && model.apiIds.length > 0 && (
                <code>{model.apiIds[0]}</code>
              )}
              <div className="access-card-links">
                <ExternalLink href={route.docsUrl}>API docs</ExternalLink>
                <ExternalLink href={route.modelsUrl}>Model catalog</ExternalLink>
                {route.pricingUrl && (
                  <ExternalLink href={route.pricingUrl}>Pricing</ExternalLink>
                )}
                <ExternalLink href={route.consoleUrl}>Open console</ExternalLink>
              </div>
            </article>
          ))}
          <article className="model-access-card">
            <div className="model-access-card-heading">
              <div
                className="provider-monogram"
                style={{ "--provider-color": "#6467f2" } as React.CSSProperties}
                aria-hidden="true"
              >
                OR
              </div>
              <div>
                <h3>OpenRouter</h3>
                <span>Multi-model routing</span>
              </div>
            </div>
            <code>{model.apiIds?.find((id) => id.includes("/")) ?? "Search model catalog"}</code>
            <div className="access-card-links">
              <ExternalLink href="https://openrouter.ai/models">Search models</ExternalLink>
              <ExternalLink href="https://openrouter.ai/docs/quickstart">API docs</ExternalLink>
              <ExternalLink href="https://openrouter.ai/keys">Open console</ExternalLink>
            </div>
          </article>
        </div>
      </section>

      {/* Specs */}
      <section className="mt-10">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">Specifications</h2>
          {model.verifiedOn && (
            <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
              ✓ Numbers verified {model.verifiedOn}
            </span>
          )}
        </div>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <SpecCell
            label="Context"
            value={model.contextWindow ? formatContext(model.contextWindow) : "—"}
          />
          <SpecCell
            label="Max output"
            value={model.maxOutput ? formatContext(model.maxOutput) : "—"}
          />
          <SpecCell
            label="AA index"
            value={model.scores["aa-intelligence"] ?? "—"}
          />
          <SpecCell
            label="Cost / task"
            value={
              model.costPerTask != null
                ? model.costPerTask === 0
                  ? "Free"
                  : model.costPerTask < 0.01
                    ? `$${model.costPerTask.toFixed(4)}`
                    : `$${model.costPerTask.toFixed(2)}`
                : "—"
            }
          />
          <SpecCell label="Speed" value={model.speed ? `${model.speed} t/s` : "—"} />
          <SpecCell
            label="TTFT"
            value={model.latency != null ? `${model.latency < 1 ? model.latency.toFixed(2) : model.latency.toFixed(1)}s` : "—"}
          />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-border-subtle bg-surface p-4">
          <span className="text-[11px] uppercase tracking-wider text-muted">Modalities</span>
          <ModalityBadges modalities={model.modalities} />
          {model.apiIds && (
            <span className="ml-auto flex flex-wrap items-center gap-1.5">
              {model.apiIds.map((id) => (
                <code
                  key={id}
                  className="rounded-md border border-border-subtle bg-surface-2/60 px-2 py-1 font-mono text-[11px] text-muted"
                >
                  {id}
                </code>
              ))}
            </span>
          )}
        </div>
      </section>

      {/* Pricing detail */}
      {model.pricing && (
        <section className="mt-10">
          <PricingCard pricing={model.pricing} />
        </section>
      )}

      {/* Effort ladder */}
      {model.effortLadder && model.effortLadder.length > 1 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            Effort ladder — pick your trade-off
          </h2>
          <div className="rounded-2xl border border-border-subtle bg-surface p-5">
            <EffortLadderExplorer ladder={model.effortLadder} color={provider.color} />
          </div>
        </section>
      )}

      {/* Benchmarks */}
      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Benchmark scores
        </h2>
        <ModelBenchmarkChart model={model} />
        {Object.keys(model.scores).length >= 3 && (
          <div className="mt-8 rounded-2xl border border-border-subtle bg-surface p-5">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
              Capability shape
            </h3>
            <RadarChart model={model} rivals={radarRivals} />
          </div>
        )}
      </section>

      {/* Assessment */}
      <section className="mt-10 grid gap-4 lg:grid-cols-3">
        <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-emerald-600 dark:text-emerald-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-500/15 text-xs">✓</span>
            Strengths
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {model.strengths.map((s) => (
              <li key={s} className="flex gap-2 text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-emerald-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-amber-600 dark:text-amber-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-amber-500/15 text-xs">!</span>
            Considerations
          </h3>
          <ul className="mt-3 space-y-2 text-sm">
            {model.considerations.map((s) => (
              <li key={s} className="flex gap-2 text-muted">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
                {s}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5">
          <h3 className="flex items-center gap-2 font-semibold text-violet-600 dark:text-violet-400">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-violet-500/15 text-xs">★</span>
            Best for
          </h3>
          <div className="mt-3 flex flex-wrap gap-2">
            {model.bestFor.map((s) => (
              <span
                key={s}
                className="rounded-lg bg-violet-500/10 px-2.5 py-1.5 text-[13px] font-medium text-violet-600 dark:text-violet-300"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Variants */}
      {model.variants.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">Variants</h2>
          <div className="overflow-hidden rounded-2xl border border-border-subtle bg-surface">
            <table className="w-full text-sm">
              <tbody>
                {model.variants.map((v, i) => (
                  <tr
                    key={v.name}
                    className={i % 2 === 0 ? "border-b border-border-subtle/60" : ""}
                  >
                    <td className="px-5 py-3.5 font-mono font-medium">{v.name}</td>
                    <td className="px-5 py-3.5 text-right text-muted">{v.note ?? ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* Alternatives */}
      {(cheaper || stronger) && (
        <section className="mt-10 grid gap-4 sm:grid-cols-2">
          {cheaper && (
            <Link
              href={`/models/${cheaper.slug}`}
              className="group rounded-2xl border border-emerald-500/20 bg-emerald-500/5 p-5 transition-colors hover:border-emerald-500/40"
            >
              <div className="text-[11px] uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Cheaper at similar intelligence
              </div>
              <div className="mt-1.5 font-semibold group-hover:text-accent">{cheaper.name}</div>
              <p className="mt-1 text-xs text-muted">
                AA {cheaper.scores["aa-intelligence"]} at{" "}
                {cheaper.costPerTask === 0
                  ? "free"
                  : `$${cheaper.costPerTask!.toFixed(2)}/task`}{" "}
                vs AA {model.scores["aa-intelligence"]} at{" "}
                {model.costPerTask != null
                  ? model.costPerTask === 0
                    ? "free"
                    : `$${model.costPerTask.toFixed(2)}/task`
                  : "n/a"}
              </p>
            </Link>
          )}
          {stronger && (
            <Link
              href={`/models/${stronger.slug}`}
              className="group rounded-2xl border border-violet-500/20 bg-violet-500/5 p-5 transition-colors hover:border-violet-500/40"
            >
              <div className="text-[11px] uppercase tracking-wider text-violet-600 dark:text-violet-400">
                Smarter at a similar price
              </div>
              <div className="mt-1.5 font-semibold group-hover:text-accent">{stronger.name}</div>
              <p className="mt-1 text-xs text-muted">
                AA {stronger.scores["aa-intelligence"]} at ${stronger.pricing!.input}/M in vs AA{" "}
                {model.scores["aa-intelligence"] ?? "—"} at{" "}
                {model.pricing?.input != null ? `$${model.pricing.input}/M in` : "n/a"}
              </p>
            </Link>
          )}
        </section>
      )}

      {/* MDX content */}
      <section className="prose prose-ai mt-12 max-w-none">
        <ModelContent />
      </section>

      {/* Siblings */}
      {siblings.length > 0 && (
        <section className="mt-14">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
            More from {provider.name}
          </h2>
          <div className="flex flex-wrap gap-2">
            {siblings.map((s) => (
              <Link
                key={s.slug}
                href={`/models/${s.slug}`}
                className="rounded-xl border border-border-subtle bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:border-accent/40 hover:text-accent"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
