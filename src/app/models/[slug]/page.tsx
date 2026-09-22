import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelBenchmarkChart } from "@/components/score-bar";
import { ModalityBadges } from "@/components/modality-badges";
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

export default async function ModelPage({ params }: PageProps<"/models/[slug]">) {
  const { slug } = await params;
  const model = getModel(slug);
  if (!model) notFound();

  const provider = getProvider(model.provider);
  const siblings = modelsByProvider(model.provider).filter((m) => m.slug !== model.slug);
  const { default: ModelContent } = await import(`@/content/models/${model.slug}.mdx`);

  const rankPills = [
    model.ranks.text && { label: "Text arena", value: `#${model.ranks.text}` },
    model.ranks.webdev && { label: "WebDev arena", value: `#${model.ranks.webdev}` },
    model.ranks.agent && { label: "Agent arena", value: `#${model.ranks.agent}` },
  ].filter(Boolean) as { label: string; value: string }[];

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

      {/* Header */}
      <header className="mt-6 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <span
            className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-lg font-bold text-white shadow-lg"
            style={{
              background: `linear-gradient(135deg, ${provider.color}, ${provider.color}99)`,
              boxShadow: `0 8px 24px -8px ${provider.color}66`,
            }}
          >
            {provider.shortName.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{model.name}</h1>
            <p className="mt-1.5 max-w-xl text-muted">{model.tagline}</p>
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              <span
                className="rounded-full px-2.5 py-1 font-medium"
                style={{ background: `${provider.color}18`, color: provider.color }}
              >
                {provider.name}
              </span>
              {model.openWeights && (
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 font-medium text-emerald-600 dark:text-emerald-400">
                  Open weights
                </span>
              )}
              {model.reasoning && (
                <span className="rounded-full bg-violet-500/10 px-2.5 py-1 font-medium text-violet-600 dark:text-violet-400">
                  Reasoning
                </span>
              )}
              {model.status === "beta" && (
                <span className="rounded-full bg-amber-500/10 px-2.5 py-1 font-medium text-amber-600 dark:text-amber-400">
                  Beta
                </span>
              )}
              {model.status === "legacy" && (
                <span className="rounded-full bg-zinc-500/10 px-2.5 py-1 font-medium text-zinc-500">
                  Legacy
                </span>
              )}
              {model.released && (
                <span className="rounded-full border border-border-subtle px-2.5 py-1 text-muted">
                  {model.released}
                </span>
              )}
            </div>
          </div>
        </div>
        {rankPills.length > 0 && (
          <div className="flex gap-2">
            {rankPills.map((r) => (
              <div
                key={r.label}
                className="rounded-xl border border-border-subtle bg-surface px-4 py-3 text-center"
              >
                <div className="font-mono text-xl font-bold text-accent">{r.value}</div>
                <div className="mt-0.5 text-[10px] uppercase tracking-wide text-muted">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </header>

      {/* Specs */}
      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">Specifications</h2>
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
            label="Price in"
            value={model.pricing?.input != null ? `$${model.pricing.input.toFixed(2)}` : "—"}
          />
          <SpecCell
            label="Price out"
            value={model.pricing?.output != null ? `$${model.pricing.output.toFixed(2)}` : "—"}
          />
          <SpecCell label="Speed" value={model.speed ? `${model.speed} t/s` : "—"} />
          <SpecCell label="License" value={model.openWeights ? "Open" : "API"} />
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl border border-border-subtle bg-surface p-4">
          <span className="text-[11px] uppercase tracking-wider text-muted">Modalities</span>
          <ModalityBadges modalities={model.modalities} />
          {model.pricing?.note && (
            <span className="ml-auto text-xs text-muted">{model.pricing.note}</span>
          )}
        </div>
      </section>

      {/* Benchmarks */}
      <section className="mt-10">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Benchmark scores
        </h2>
        <ModelBenchmarkChart model={model} />
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
