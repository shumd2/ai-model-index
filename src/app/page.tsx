import Link from "next/link";
import { ModelCard } from "@/components/model-card";
import { models, modelMap } from "@/data/models";
import { newsSorted } from "@/data/news";
import { getProvider, providers } from "@/data/providers";
import { benchmarks } from "@/data/benchmarks";

const featuredSlugs = [
  "claude-fable-5-1",
  "gpt-6-astra",
  "gemini-3-8-flash",
  "kimi-k3",
  "mimo-v2-6-pro",
  "muse-spark",
];

const tagColors: Record<string, string> = {
  release: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  benchmark: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  research: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  industry: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "open-source": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export default function HomePage() {
  const featured = featuredSlugs
    .map((s) => modelMap.get(s))
    .filter((m): m is NonNullable<typeof m> => Boolean(m));

  const topByIndex = [...models]
    .filter((m) => m.scores["aa-intelligence"] != null)
    .sort((a, b) => (b.scores["aa-intelligence"] ?? 0) - (a.scores["aa-intelligence"] ?? 0))
    .slice(0, 5);

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* Hero */}
      <section className="relative overflow-hidden py-16 sm:py-24">
        <div
          aria-hidden
          className="pointer-events-none absolute -top-40 left-1/2 h-[480px] w-[720px] -translate-x-1/2 rounded-full opacity-25 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #6d5cff, transparent)" }}
        />
        <div className="relative text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border-subtle bg-surface px-3.5 py-1.5 text-xs text-muted">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Updated September 2026 · {models.length} models · {providers.length} providers
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Every frontier AI model,{" "}
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              decoded
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">
            Benchmarks, context windows, pricing and community insights for the
            newest AI models — including the context you won&apos;t find on any
            official page.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/compare"
              className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
            >
              Compare models
            </Link>
            <Link
              href="/models"
              className="rounded-xl border border-border-subtle bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40"
            >
              Browse the catalog
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3 text-center">
            {[
              { value: String(models.length), label: "model pages" },
              { value: String(benchmarks.length), label: "benchmarks tracked" },
              { value: "100%", label: "community-driven" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-border-subtle bg-surface px-2 py-4">
                <div className="font-mono text-2xl font-bold text-accent">{s.value}</div>
                <div className="mt-1 text-xs text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leaderboard snapshot */}
      <section className="py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">The podium, right now</h2>
            <p className="mt-1 text-sm text-muted">
              Top models by the Artificial Analysis Intelligence Index (v4.3.2)
            </p>
          </div>
          <Link href="/compare" className="hidden text-sm text-accent hover:underline sm:block">
            Full table →
          </Link>
        </div>
        <div className="grid gap-3">
          {topByIndex.map((m, i) => {
            const provider = getProvider(m.provider);
            return (
              <Link
                key={m.slug}
                href={`/models/${m.slug}`}
                className="group flex items-center gap-4 rounded-2xl border border-border-subtle bg-surface p-4 transition-colors hover:border-accent/40"
              >
                <span
                  className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl font-mono text-sm font-bold ${
                    i === 0
                      ? "bg-amber-400/20 text-amber-500"
                      : i === 1
                        ? "bg-zinc-400/20 text-zinc-400"
                        : i === 2
                          ? "bg-orange-400/15 text-orange-400"
                          : "bg-surface-2 text-muted"
                  }`}
                >
                  {i + 1}
                </span>
                <span
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                  style={{ background: provider.color }}
                >
                  {provider.shortName.slice(0, 2).toUpperCase()}
                </span>
                <div className="min-w-0 flex-1">
                  <div className="truncate text-sm font-semibold group-hover:text-accent">
                    {m.name}
                  </div>
                  <div className="truncate text-xs text-muted">{provider.name}</div>
                </div>
                <div className="hidden text-right sm:block">
                  <div className="font-mono text-sm font-bold" style={{ color: provider.color }}>
                    {m.scores["aa-intelligence"]}
                  </div>
                  <div className="text-[10px] uppercase tracking-wide text-muted">AA index</div>
                </div>
                {m.ranks.agent && (
                  <div className="hidden text-right md:block">
                    <div className="font-mono text-sm font-semibold">{m.scores["lmarena-agent"]}%</div>
                    <div className="text-[10px] uppercase tracking-wide text-muted">agent</div>
                  </div>
                )}
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured models */}
      <section className="py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Models everyone is talking about</h2>
            <p className="mt-1 text-sm text-muted">The releases defining this generation</p>
          </div>
          <Link href="/models" className="hidden text-sm text-accent hover:underline sm:block">
            All {models.length} models →
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </section>

      {/* News */}
      <section className="py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Latest from the frontier</h2>
            <p className="mt-1 text-sm text-muted">Releases, benchmarks and the stuff that matters</p>
          </div>
          <Link href="/news" className="hidden text-sm text-accent hover:underline sm:block">
            All news →
          </Link>
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {newsSorted.slice(0, 4).map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="group rounded-2xl border border-border-subtle bg-surface p-5 transition-colors hover:border-accent/40"
            >
              <div className="flex items-center gap-2 text-xs">
                <span className={`rounded-md px-2 py-0.5 font-medium capitalize ${tagColors[n.tag]}`}>
                  {n.tag.replace("-", " ")}
                </span>
                <span className="text-muted">
                  {new Date(n.date + "T00:00:00").toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
              <h3 className="mt-3 font-semibold leading-snug group-hover:text-accent">{n.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-muted">{n.summary}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
