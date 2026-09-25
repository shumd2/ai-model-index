import Link from "next/link";
import { ModelCard } from "@/components/model-card";
import { models, modelMap } from "@/data/models";
import { newsSorted } from "@/data/news";
import { getProvider, providerMap, providers } from "@/data/providers";
import { benchmarks } from "@/data/benchmarks";
import { Reveal } from "@/components/reveal";
import { AnimatedCount } from "@/components/reveal";

const featuredBig = ["claude-opus-5-5", "gpt-6-sol"];
const featuredSmall = ["gpt-6-luna", "gemini-3-8-flash", "kimi-k3", "grok-4-7"];

const tagColors: Record<string, string> = {
  release: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  benchmark: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  research: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  industry: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "open-source": "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  data: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
};

// OpenRouter routed volume, week of Sep 14–21 2026
const usageLeaders = [
  { providerId: "openai", name: "GPT-5.6 Luna", tokens: 50.3, note: "+208% MoM" },
  { providerId: "tencent", name: "Tencent Hy4 Preview", tokens: 49.0, note: "new entry" },
  { providerId: "zai", name: "GLM 5.3 Flash", tokens: 48.9, note: "$0.15 in" },
  { providerId: "deepseek", name: "DeepSeek V4 Flash", tokens: 48.3, note: "+53%" },
  { providerId: "xiaomi", name: "MiMo V2.5", tokens: 28.7, note: "open weights" },
  { providerId: "openai", name: "GPT-6 Luna", tokens: 0, note: "shipped today" },
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
  const big = featuredBig.map((s) => modelMap.get(s)!).filter(Boolean);
  const small = featuredSmall.map((s) => modelMap.get(s)!).filter(Boolean);

  const podium = [...models]
    .filter((m) => m.scores["aa-intelligence"] != null)
    .sort((a, b) => (b.scores["aa-intelligence"] ?? 0) - (a.scores["aa-intelligence"] ?? 0))
    .slice(0, 5);

  const [p1, p2, p3, p4, p5] = podium;

  const priced = models.filter((m) => m.scores["aa-intelligence"] != null && m.costPerTask != null && m.costPerTask > 0);
  const fastest = [...models].filter((m) => m.speed != null).sort((a, b) => b.speed! - a.speed!)[0];
  const bestValue = [...priced].sort((a, b) => b.scores["aa-intelligence"]! / b.costPerTask! - a.scores["aa-intelligence"]! / a.costPerTask!)[0];
  const cheapestTask = [...priced].sort((a, b) => a.costPerTask! - b.costPerTask!)[0];

  return (
    <div className="mx-auto max-w-5xl px-4 sm:px-6">
      {/* ── Hero ── */}
      <section className="relative pt-20 pb-16 sm:pt-28 sm:pb-24">
        <div className="max-w-2xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            AA Intelligence Index v4.3.2
          </div>

          <h1 className="text-4xl font-bold leading-[0.98] tracking-tight sm:text-5xl lg:text-6xl">
            Every model that matters,
            <br />
            <span className="text-accent">measured honestly.</span>
          </h1>

          <p className="mt-5 max-w-lg text-lg leading-relaxed text-text-secondary">
            {models.length} model pages with official pricing, benchmark
            scores, and verified data. Where a number can&apos;t be
            confirmed, you get a dash — not a guess.
          </p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/compare" className="btn-primary">
              Compare all {models.length}
            </Link>
            <Link href="/models" className="btn-ghost">
              Browse catalog
            </Link>
          </div>
        </div>
      </section>

      {/* ── Stats ── */}
      <div className="mb-20 grid grid-cols-2 divide-x divide-border border-b border-border sm:grid-cols-4">
        {[
          { label: "models", value: models.length, sub: "one per page" },
          { label: "labs", value: providers.length, sub: "worldwide" },
          { label: "benchmarks", value: benchmarks.length, sub: "verified" },
          { label: "updated", value: "Sep 23", sub: "scores re-verified" },
        ].map((s, i) => (
          <Reveal key={s.label} delay={i % 2} className="px-6 py-8">
            <div className="font-mono text-3xl font-bold tabular-nums">
              {typeof s.value === "number" ? <AnimatedCount target={s.value} duration={1200} /> : s.value}
            </div>
            <div className="mt-1 text-sm font-medium text-text-secondary">{s.label}</div>
            <div className="text-xs text-text-secondary/60">{s.sub}</div>
          </Reveal>
        ))}
      </div>

      {/* ── Frontline ── */}
      <section className="mb-20">
        <div className="mb-8 flex items-baseline gap-3 border-b border-border pb-4">
          <span className="font-mono text-[13px] font-bold text-accent">01</span>
          <h2 className="text-2xl font-bold tracking-tight">Frontline</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {p1 && (
            <Link href={`/models/${p1.slug}`} className="card card-interactive p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                #1 on AA index
              </div>
              <div className="mt-3 text-lg font-bold">{p1.name}</div>
              <div className="mt-1 text-sm text-text-secondary">{getProvider(p1.provider).name}</div>
              <div className="mt-4 font-mono text-4xl font-bold text-[#d97757]">{p1.scores["aa-intelligence"]}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-text-secondary">AA Intelligence</div>
            </Link>
          )}
          {fastest && (
            <Link href={`/models/${fastest.slug}`} className="card card-interactive p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                Fastest
              </div>
              <div className="mt-3 text-lg font-bold">{fastest.name}</div>
              <div className="mt-1 text-sm text-text-secondary">{getProvider(fastest.provider).name}</div>
              <div className="mt-4 font-mono text-4xl font-bold text-emerald-600">{fastest.speed!.toLocaleString()}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-text-secondary">tokens/sec</div>
            </Link>
          )}
          {bestValue && (
            <Link href={`/models/${bestValue.slug}`} className="card card-interactive p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                Best value
              </div>
              <div className="mt-3 text-lg font-bold">{bestValue.name}</div>
              <div className="mt-1 text-sm text-text-secondary">{getProvider(bestValue.provider).name}</div>
              <div className="mt-4 font-mono text-4xl font-bold text-accent">${bestValue.costPerTask!.toFixed(2)}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-text-secondary">per task</div>
            </Link>
          )}
          {cheapestTask && (
            <Link href={`/models/${cheapestTask.slug}`} className="card card-interactive p-6">
              <div className="flex items-center gap-2 text-[10px] uppercase tracking-wider text-text-secondary">
                <span className="h-1.5 w-1.5 rounded-full bg-rose-400" />
                Cheapest
              </div>
              <div className="mt-3 text-lg font-bold">{cheapestTask.name}</div>
              <div className="mt-1 text-sm text-text-secondary">{getProvider(cheapestTask.provider).name}</div>
              <div className="mt-4 font-mono text-4xl font-bold text-rose-600">${cheapestTask.costPerTask!.toFixed(4)}</div>
              <div className="mt-0.5 text-[11px] uppercase tracking-wider text-text-secondary">per task</div>
            </Link>
          )}
        </div>
      </section>

      {/* ── 02 · Rankings ── */}
      <section className="mb-20">
        <div className="mb-8 flex items-baseline gap-3 border-b border-border pb-4">
          <span className="font-mono text-[13px] font-bold text-accent">02</span>
          <h2 className="text-2xl font-bold tracking-tight">Rankings</h2>
        </div>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {[p1, p2, p3].filter(Boolean).map((m, i) => {
            const provider = getProvider(m.provider);
            return (
              <Reveal key={m.slug} delay={i}>
                <Link href={`/models/${m.slug}`} className="card card-interactive p-5">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-[12px] uppercase tracking-wider text-text-secondary">#{i + 1}</span>
                    <span className="h-2 w-2 rounded-full" style={{ background: provider.color }} />
                  </div>
                  <div className="mt-3 font-bold">{m.name}</div>
                  <div className="mt-1 text-sm text-text-secondary">{provider.name}</div>
                  <div className="mt-4 font-mono text-3xl font-bold" style={{ color: provider.color }}>
                    {m.scores["aa-intelligence"]}
                  </div>
                </Link>
              </Reveal>
            );
          })}
          {[p4, p5].filter(Boolean).map((m, i) => {
            const provider = getProvider(m.provider);
            return (
              <Reveal key={m.slug} delay={i + 3}>
                <Link href={`/models/${m.slug}`} className="card card-interactive flex items-center gap-3 p-4">
                  <span className="font-mono text-sm text-text-secondary">#{i + 4}</span>
                  <div
                    className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${provider.color}, ${provider.color}aa)` }}
                  >
                    {provider.shortName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="flex-1 truncate text-sm font-medium">{m.name}</span>
                  <span className="font-mono text-lg font-bold" style={{ color: provider.color }}>
                    {m.scores["aa-intelligence"]}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 03 · Featured ── */}
      <section className="mb-20">
        <div className="mb-8 flex items-baseline gap-3 border-b border-border pb-4">
          <span className="font-mono text-[13px] font-bold text-accent">03</span>
          <h2 className="text-2xl font-bold tracking-tight">Featured</h2>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {big.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
          {small.map((m) => (
            <ModelCard key={m.slug} model={m} />
          ))}
        </div>
      </section>

      {/* ── 04 · Usage ── */}
      <section className="mb-20">
        <div className="mb-8 flex items-baseline gap-3 border-b border-border pb-4">
          <span className="font-mono text-[13px] font-bold text-accent">04</span>
          <h2 className="text-2xl font-bold tracking-tight">Usage</h2>
          <span className="text-sm text-text-secondary">OpenRouter volume</span>
        </div>
        <div className="card p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-mono text-[11px] uppercase tracking-wider text-text-secondary">Tokens processed, trailing 30 days</h3>
            <span className="tag bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">live</span>
          </div>
          <div className="space-y-3">
            {usageLeaders.map((u) => {
              const p = providerMap.get(u.providerId);
              const isNew = u.tokens === 0;
              return (
                <div key={u.name} className="flex items-center gap-3">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p?.color ?? "var(--accent)" }} />
                  <span className="w-44 truncate text-sm">{u.name}</span>
                  <div className="flex-1 overflow-hidden rounded-full bg-surface-raised">
                    {u.tokens > 0 ? (
                      <div
                        className="h-full rounded-full bg-accent"
                        style={{ width: `${(u.tokens / 50.3) * 100}%` }}
                      />
                    ) : (
                      <div className="h-full w-0 rounded-full bg-emerald-500" />
                    )}
                  </div>
                  <span className="w-20 truncate text-right text-xs text-text-secondary">
                    {isNew ? "just launched" : `${u.tokens}T`}
                  </span>
                </div>
              );
            })}
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {marketShare.map((s) => {
              const p = providerMap.get(s.id);
              return (
                <div key={s.id} className="flex items-center gap-2">
                  <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p?.color }} />
                  <span className="text-xs text-text-secondary">{s.label}</span>
                  <span className="ml-auto font-mono text-xs">{s.share}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 05 · News ── */}
      <section className="pb-20">
        <div className="mb-8 flex items-baseline gap-3 border-b border-border pb-4">
          <span className="font-mono text-[13px] font-bold text-accent">05</span>
          <h2 className="text-2xl font-bold tracking-tight">Latest</h2>
          <Link href="/news" className="ml-auto text-sm text-accent hover:underline">All news →</Link>
        </div>
        <div className="divide-y divide-border">
          {newsSorted.slice(0, 5).map((n, i) => (
            <Reveal key={n.slug} className="">
              <Link href={`/news/${n.slug}`} className="group grid min-h-[3rem] grid-cols-12 items-baseline gap-2 py-5 transition-colors hover:bg-surface-raised sm:gap-4">
                <span className="col-span-2 font-mono text-[11px] text-text-secondary sm:col-span-1">
                  {new Date(n.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                </span>
                <span className={`col-span-2 w-fit px-2 py-0.5 text-center text-[10px] font-medium uppercase tracking-wider sm:col-span-2 ${tagColors[n.tag] || "bg-gray-500/15 text-gray-600"}`}>
                  {n.tag.replace("-", " ")}
                </span>
                <span className="col-span-12 text-[15px] font-medium group-hover:text-accent sm:col-span-7">
                  {n.title}
                </span>
                <span className="col-start-5 col-span-1 hidden font-mono text-[11px] text-text-secondary sm:block sm:col-span-1">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}
