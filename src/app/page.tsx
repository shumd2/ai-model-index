import Link from "next/link";
import { ModelCard } from "@/components/model-card";
import { models, modelMap } from "@/data/models";
import { newsSorted } from "@/data/news";
import { getProvider, providerMap, providers } from "@/data/providers";
import { benchmarks } from "@/data/benchmarks";

const featuredSlugs = [
  "claude-fable-5-1",
  "gpt-6-astra",
  "gemini-3-8-flash",
  "kimi-k3",
  "mimo-v2-6-pro",
  "grok-4-7",
];

const tagColors: Record<string, string> = {
  release: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  benchmark: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  research: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  industry: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "open-source": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

// OpenRouter usage, week of Sep 14–21 2026 (openrouter.ai/rankings, CC BY 4.0)
const usageLeaders = [
  { providerId: "openai", name: "GPT-5.6 Luna", tokens: "50.3T", note: "+208% month over month" },
  { providerId: "tencent", name: "Hy4 Preview", tokens: "49T", note: "new, already #2" },
  { providerId: "zai", name: "GLM 5.3 Flash", tokens: "48.9T", note: "$0.15 input" },
  { providerId: "deepseek", name: "DeepSeek V4 Flash", tokens: "48.3T", note: "+53%" },
  { providerId: "xiaomi", name: "MiMo V2.5", tokens: "28.7T", note: "open weights" },
];

const marketShare = [
  { id: "deepseek", label: "DeepSeek", share: 25.4 },
  { id: "google", label: "Google", share: 18.6 },
  { id: "openai", label: "OpenAI", share: 17.0 },
  { id: "zai", label: "Z.ai", share: 9.4 },
  { id: "alibaba", label: "Qwen", share: 6.7 },
  { id: "tencent", label: "Tencent", share: 6.4 },
  { id: "anthropic", label: "Anthropic", share: 2.7 },
];

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
            {models.length} models · {providers.length} labs · last checked Sep 22, 2026
          </span>
          <h1 className="mx-auto mt-6 max-w-3xl text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
            Every AI model that matters,{" "}
            <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
              in one place
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-muted sm:text-lg">
            Specs, real pricing, benchmark scores and what communities actually
            say about these models. If a number can&apos;t be verified, we print a
            dash instead of a guess.
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
              Browse all {models.length}
            </Link>
          </div>

          <div className="mx-auto mt-12 grid max-w-2xl grid-cols-3 gap-3 text-center">
            {[
              { value: String(models.length), label: "model pages" },
              { value: String(benchmarks.length), label: "benchmarks explained" },
              { value: String(providers.length), label: "labs tracked" },
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
            <h2 className="text-2xl font-bold tracking-tight">Who&apos;s on top</h2>
            <p className="mt-1 text-sm text-muted">
              Artificial Analysis Intelligence Index v4.3.2, September 2026
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

      {/* Real usage */}
      <section className="py-10">
        <div className="mb-6">
          <h2 className="text-2xl font-bold tracking-tight">What people actually run</h2>
          <p className="mt-1 max-w-2xl text-sm text-muted">
            Leaderboards measure preference. This measures traffic: tokens pushed
            through OpenRouter, the routing layer half the internet codes on.
            The gap between the two lists is the interesting part.
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border-subtle bg-surface p-5">
            <h3 className="text-sm font-semibold">Top models by tokens, last 30 days</h3>
            <div className="mt-4 space-y-3">
              {usageLeaders.map((u) => {
                const p = providerMap.get(u.providerId);
                return (
                  <div key={u.name} className="flex items-center gap-3">
                    <span
                      className="h-2.5 w-2.5 shrink-0 rounded-full"
                      style={{ background: p?.color ?? "var(--accent)" }}
                    />
                    <span className="w-36 shrink-0 truncate text-sm font-medium">{u.name}</span>
                    <span className="font-mono text-sm font-bold text-accent">{u.tokens}</span>
                    <span className="ml-auto truncate text-xs text-muted">{u.note}</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-muted">
              Notice who&apos;s missing from the top five. Preference and usage are
              different sports.
            </p>
          </div>
          <div className="rounded-2xl border border-border-subtle bg-surface p-5">
            <h3 className="text-sm font-semibold">Share of text requests by lab</h3>
            <div className="mt-4 space-y-2.5">
              {marketShare.map((s) => {
                const p = providerMap.get(s.id);
                return (
                  <div key={s.id} className="flex items-center gap-3">
                    <span className="w-20 shrink-0 text-xs text-muted">{s.label}</span>
                    <div className="h-2.5 flex-1 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(s.share / 25.4) * 100}%`,
                          background: p?.color ?? "var(--accent)",
                        }}
                      />
                    </div>
                    <span className="w-12 shrink-0 text-right font-mono text-xs tabular-nums">
                      {s.share}%
                    </span>
                  </div>
                );
              })}
            </div>
            <p className="mt-4 text-xs text-muted">
              DeepSeek alone serves a quarter of all routed requests. Anthropic
              runs 2.7% by request count and still tops every quality board.
            </p>
          </div>
        </div>
      </section>

      {/* Featured models */}
      <section className="py-10">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <h2 className="text-2xl font-bold tracking-tight">Start here</h2>
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
            <h2 className="text-2xl font-bold tracking-tight">Latest</h2>
            <p className="mt-1 text-sm text-muted">Releases and benchmark shake-ups, newest first</p>
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
