import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ModelCard } from "@/components/model-card";
import { modelsByProvider } from "@/data/models";
import { providers } from "@/data/providers";

export const dynamicParams = false;

export function generateStaticParams() {
  return providers.map((p) => ({ slug: p.id }));
}

export async function generateMetadata({
  params,
}: PageProps<"/providers/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const provider = providers.find((p) => p.id === slug);
  if (!provider) return {};
  return {
    title: `${provider.name} — models, standings and overview`,
    description: `${provider.name}: ${provider.tagline}. Every model we track, their benchmark standings and what sets the lab apart.`,
  };
}

export default async function ProviderPage({ params }: PageProps<"/providers/[slug]">) {
  const { slug } = await params;
  const provider = providers.find((p) => p.id === slug);
  if (!provider) notFound();

  const providerModels = modelsByProvider(provider.id);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
      <nav className="flex items-center gap-1.5 text-sm text-muted">
        <Link href="/providers" className="hover:text-foreground">Providers</Link>
        <span>/</span>
        <span className="text-foreground">{provider.name}</span>
      </nav>

      <header
        className="relative mt-6 overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-br from-surface to-surface-2 p-8 sm:p-10"
        style={{
          background: `linear-gradient(135deg, ${provider.color}14, transparent 60%)`,
        }}
      >
        {/* Ambient glow */}
        <div aria-hidden className="absolute -right-20 -top-20 h-48 w-48 rounded-full blur-[80px]" style={{ background: `radial-gradient(closest-side, ${provider.color}25, transparent)` }} />
        <div aria-hidden className="absolute -left-10 bottom-0 h-32 w-32 rounded-full blur-[60px]" style={{ background: `radial-gradient(closest-side, ${provider.color}15, transparent)` }} />

        <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center">
          <span
            className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl text-2xl font-bold text-white shadow-xl"
            style={{
              background: `linear-gradient(135deg, ${provider.color}, ${provider.color}99)`,
              boxShadow: `0 12px 32px -8px ${provider.color}66`,
            }}
          >
            {provider.shortName.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{provider.name}</h1>
            <p className="mt-1 text-muted">{provider.tagline}</p>
            <div className="mt-3 flex flex-wrap gap-2 text-xs text-muted">
              <span className="rounded-full border border-border-subtle bg-surface px-2.5 py-1">
                {provider.hq}
              </span>
              <span className="rounded-full border border-border-subtle bg-surface px-2.5 py-1">
                Founded {provider.founded}
              </span>
              <a
                href={provider.website}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-border-subtle bg-surface px-2.5 py-1 transition-colors hover:text-foreground"
              >
                {provider.website.replace("https://", "")} ↗
              </a>
            </div>
          </div>
        </div>
        <p className="mt-6 max-w-3xl leading-relaxed text-muted">{provider.description}</p>
      </header>

      {/* Highlights as animated cards */}
      <section className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {provider.highlights.map((h) => (
          <div key={h} className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30">
            <span
              className="absolute -bottom-6 -right-6 h-16 w-16 rounded-full blur-[40px]"
              style={{ background: `radial-gradient(closest-side, ${provider.color}12, transparent)` }}
            />
            <span
              className="mb-3 inline-block h-1 w-8 rounded-full"
              style={{ background: provider.color }}
            />
            <p className="text-sm leading-relaxed text-muted group-hover:text-foreground">{h}</p>
          </div>
        ))}
      </section>

      <section className="mt-12">
        <h2 className="mb-5 text-sm font-semibold uppercase tracking-wider text-muted">
          Models ({providerModels.length})
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {providerModels.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </section>
    </div>
  );
}
