import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelBenchmarkChart } from "@/components/score-bar";
import { ModalityBadges } from "@/components/modality-badges";
import { EffortLadderExplorer } from "@/components/effort-ladder";
import { PricingCard } from "@/components/pricing-card";
import { RadarChart } from "@/components/radar-chart";
import { PinButton } from "@/components/compare-tray";
import { formatContext, getModel, models, modelsByProvider } from "@/data/models";
import { getProvider } from "@/data/providers";

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
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1.5 text-sm text-muted">
        <Link href="/models" className="hover:text-foreground">Models</Link>
        <span>/</span>
        <Link href={`/providers/${provider.id}`} className="hover:text-foreground">
          {provider.name}
        </Link>
        <span>/</span>
        <span className="text-foreground">{model.name}</span>
      </nav>

      {/* Dramatic hero header */}
      <div className="relative overflow-hidden rounded-2xl border border-border-subtle bg-gradient-to-br from-surface to-surface-2/50 p-6 sm:p-8">
        <div aria-hidden className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-[80px]" style={{ background: `radial-gradient(closest-side, ${provider.color}18, transparent)` }} />
        <div className="relative grid grid-cols-12 gap-6">
          <div className="col-span-12 sm:col-span-4">
            <div className="relative mb-4 flex h-20 w-20 items-center justify-center rounded-2xl text-xl font-bold text-white shadow-xl transition-transform hover:scale-105" style={{ background: `linear-gradient(135deg, ${provider.color}, ${provider.color}88)`, boxShadow: `0 12px 32px -8px ${provider.color}55` }}>
              {provider.shortName.slice(0, 2).toUpperCase()}
            </div>
            <nav className="flex items-center gap-1.5 text-sm text-muted">
              <Link href="/models" className="hover:text-foreground">Models</Link>
              <span>/</span>
              <Link href={`/providers/${provider.id}`} className="hover:text-foreground">{provider.name}</Link>
              <span>/</span>
              <span className="text-foreground font-medium">{model.name}</span>
            </nav>
          </div>
          <div className="col-span-12 sm:col-span-8 flex items-start justify-between gap-4">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{model.name}</h1>
              {model.verifiedOn && <span className="shrink-0 rounded-full bg-emerald-500/15 px-2.5 py-1 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">✓ verified {model.verifiedOn}</span>}
            </div>
            <p className="mt-1.5 max-w-xl text-muted">{model.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="rounded-full px-2.5 py-1 font-medium" style={{ background: `${provider.color}18`, color: provider.color }}>{provider.name}</span>
              {model.openWeights && <span className="tag-pill bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">open weights</span>}
              {model.reasoning && <span className="tag-pill bg-violet-500/15 text-violet-600 dark:text-violet-400">reasoning</span>}
              {model.status === "beta" && <span className="tag-pill bg-amber-500/15 text-amber-600 dark:text-amber-400">beta</span>}
              {model.status === "legacy" && <span className="tag-pill bg-zinc-500/15 text-zinc-500 dark:text-zinc-400">legacy</span>}
              {model.released && <span className="rounded-full border border-border-subtle px-2.5 py-1 text-[11px] text-muted">{model.released}</span>}
            </div>
            <PinButton slug={model.slug} name={model.name} />
          </div>
        </div>
      </div>

      {/* Quick stat strip */}
      <div className="mt-6 grid grid-cols-3 gap-3 sm:grid-cols-6">
        {model.scores["aa-intelligence"] != null && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{model.scores["aa-intelligence"]}</div><div className="text-[10px] uppercase tracking-wider text-muted">AA index</div></div>}
        {model.costPerTask != null && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{model.costPerTask === 0 ? "Free" : model.costPerTask < 0.01 ? `$${model.costPerTask.toFixed(4)}` : `$${model.costPerTask.toFixed(2)}`}</div><div className="text-[10px] uppercase tracking-wider text-muted">per task</div></div>}
        {model.speed != null && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{model.speed}</div><div className="text-[10px] uppercase tracking-wider text-muted">t/s</div></div>}
        {model.contextWindow && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{formatContext(model.contextWindow)}</div><div className="text-[10px] uppercase tracking-wider text-muted">context</div></div>}
        {model.latency != null && <div className="card !rounded-xl !p-3 text-center"><div className="font-mono text-2xl font-bold tabular-nums">{model.latency < 1 ? model.latency.toFixed(2) : model.latency.toFixed(1)}s</div><div className="text-[10px] uppercase tracking-wider text-muted">TTFT</div></div>}
        <div className="card !rounded-xl !p-3 text-center"><div className="flex items-center justify-center gap-1">{model.modalities.slice(0, 3).map((m) => <span key={m} className="rounded-md border border-border-subtle bg-surface-2 px-1 py-0.5 font-mono text-[10px] text-muted">{m}</span>)}</div><div className="mt-1 text-[10px] uppercase tracking-wider text-muted">modalities</div></div>
      </div>

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
