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

function SectionHead({ num, title, sub, href, linkLabel }: {
  num: string; title: string; sub: string; href?: string; linkLabel?: string;
}) {
  return (
    <div className="mb-10 flex flex-col gap-2 border-b border-border-subtle pb-4 sm:flex-row sm:items-baseline sm:justify-between">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-[13px] font-bold text-accent sm:text-sm">
          {num}
        </span>
        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {title}
        </h2>
      </div>
      <div className="flex items-center gap-3">
        <p className="text-sm text-muted">{sub}</p>
        {href && (
          <Link href={href} className="hidden text-sm text-accent hover:underline sm:block">
            {linkLabel} →
          </Link>
        )}
      </div>
    </div>
  );
}

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
    <div className="grain relative mx-auto max-w-6xl px-4 sm:px-6">
      {/* ── Ambient orbs ── */}
      <div aria-hidden className="orb orb-1" />
      <div aria-hidden className="orb orb-2" />
      <div aria-hidden className="orb orb-3" />

      {/* ── Hero ── */}
      <section className="relative pt-10 sm:pt-16">
        {/* Grid + dot backdrops */}
        <div aria-hidden className="bg-grid absolute inset-x-0 top-0 h-80 opacity-[0.06]" />
        <div aria-hidden className="bg-dots absolute right-[10%] top-20 h-64 w-64 opacity-[0.08]" />

        {/* Gradient orbs */}
        <div aria-hidden className="absolute -top-40 right-[5%] h-96 w-96 rounded-full bg-gradient-to-bl from-violet-500/10 to-transparent blur-[100px]" />
        <div aria-hidden className="absolute bottom-20 left-[20%] h-64 w-64 rounded-full bg-gradient-to-tr from-emerald-500/8 to-transparent blur-[80px]" />

        <div className="relative grid grid-cols-12 gap-x-12 lg:grid-cols-7">
          {/* Left: headline */}
          <Reveal className="col-span-12 lg:col-span-5">
            <div>
              <div className="mb-6 inline-flex items-center gap-2 overflow-hidden rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" />
                </span>
                Sep 23 · Opus 5.5 takes #1
              </div>

              <h1 className="text-[2.4rem] font-bold leading-[0.96] tracking-tight sm:text-5xl lg:text-[4rem]">
                Every model{" "}
                <span className="relative inline-block">
                  <span className="gradient-text">that matters,</span>
                </span>{" "}
                <br />
                <span className="relative inline-block">
                  <span className="gradient-text" data-text="measured honestly">measured honestly.</span>
                </span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-muted">
                {models.length} model pages, official pricing, benchmark scores,
                and what the community says behind the scenes. Where a number
                can&apos;t be verified, you get a dash — not a guess.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/compare" className="btn-primary">
                  Compare all {models.length}
                </Link>
                <Link href="/models" className="btn-ghost">
                  Browse the catalog
                </Link>
              </div>
            </div>
          </Reveal>

          {/* Right: hero cards with floating effect — big and spacious */}
          <Reveal delay={1} className="col-span-12 lg:col-span-5">
            <div className="relative hidden min-h-[440px] lg:block">
              {/* Opus 5.5 — big floating card */}
              <div className="hero-card absolute -right-6 top-4 z-10 w-96 rounded-2xl border border-border-subtle bg-surface/90 backdrop-blur-md p-6 shadow-2xl shadow-violet-500/10">
                <div className="flex items-center justify-between">
                  <span className="tag-pill bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    ● Live
                  </span>
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">AA #1</span>
                </div>
                <div className="mt-5 flex items-end gap-4">
                  <span className="font-mono text-7xl font-bold text-[#d97757] tabular-nums leading-none">58</span>
                  <div>
                    <div className="text-xl font-semibold">Claude Opus 5.5</div>
                    <div className="mt-1 text-sm text-muted">Fable-class · 40% cheaper than Opus 5</div>
                  </div>
                </div>
                <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-2">
                  <div className="h-full w-[85%] rounded-full bg-gradient-to-r from-[#d97757] to-amber-500 progress-sheen" />
                </div>
              </div>

              {/* GPT-6 Sol — medium card */}
              <div className="hero-card absolute left-2 top-[160px] z-20 w-80 rounded-2xl border border-accent/20 bg-surface/90 backdrop-blur-md p-6 shadow-xl shadow-emerald-500/10">
                <div className="flex items-center justify-between">
                  <span className="tag-pill bg-emerald-500/20 text-emerald-600 dark:text-emerald-400">New</span>
                  <span className="font-mono text-[11px] text-muted">1.05M ctx</span>
                </div>
                <div className="mt-5">
                  <div className="text-xl font-bold">GPT-6 Sol</div>
                  <div className="mt-2 font-mono text-3xl font-bold text-accent">$2<span className="text-base text-muted"> / </span>$10</div>
                </div>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex-1 overflow-hidden rounded-full bg-surface-2">
                    <div className="h-full w-[92%] rounded-full bg-gradient-to-r from-accent to-emerald-400 progress-sheen" />
                  </div>
                  <span className="text-[12px] font-mono text-muted">AA 48</span>
                </div>
              </div>

              {/* Luna — small card */}
              <div className="hero-card absolute -bottom-2 right-6 z-30 w-72 rounded-2xl border border-border-subtle bg-surface/90 backdrop-blur-md p-5 shadow-xl">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">Cheap</span>
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                </div>
                <div className="mt-3">
                  <div className="text-lg font-semibold">GPT-6 Luna</div>
                  <div className="font-mono text-2xl font-bold text-emerald-500">$0.0045/task</div>
                </div>
                <div className="mt-3 text-sm text-muted">AA 37 max · cheapest on the board</div>
              </div>
            </div>
          </Reveal>
        </div>

        {/* ── Stats strip with animated counters ── */}
        <div className="relative mt-14 grid grid-cols-2 divide-x divide-border-subtle border-y border-border-subtle sm:grid-cols-4">
          {[
            { label: "models", value: models.length, sub: "one per model", variant: "accent" as const },
            { label: "labs", value: providers.length, sub: "US, China, EU, KR", variant: "emerald" as const },
            { label: "benchmarks", value: benchmarks.length, sub: "explained, not just cited", variant: "amber" as const },
            { label: "last checked", value: "Sep 23", sub: "scores re-verified", variant: "rose" as const },
          ].map((s, i) => (
            <Reveal key={s.label} delay={i % 2} className="px-4 py-6">
              <div className="font-mono text-3xl font-bold tabular-nums">
                {typeof s.value === "number" ? <AnimatedCount target={s.value} duration={1200} /> : s.value}
              </div>
              <div className="mt-0.5 text-xs font-medium">{s.label}</div>
              <div className="text-[11px] text-muted">{s.sub}</div>
            </Reveal>
          ))}
        </div>

        {/* ── Frontier snapshot strip ── */}
        <Reveal delay={2} className="mt-4 grid grid-cols-2 gap-px border border-border-subtle bg-border-subtle lg:grid-cols-4">
          {[
            p1 && { label: "Smartest", model: p1, stat: `AA ${p1.scores["aa-intelligence"]}`, href: `/models/${p1.slug}`, variant: "violet" },
            fastest && { label: "Fastest", model: fastest, stat: `${fastest.speed!.toLocaleString()} t/s`, href: `/models/${fastest.slug}`, variant: "emerald" },
            bestValue && { label: "Best value", model: bestValue, stat: `$${bestValue.costPerTask!.toFixed(2)}/task`, href: `/models/${bestValue.slug}`, variant: "amber" },
            cheapestTask && { label: "Cheapest", model: cheapestTask, stat: cheapestTask.costPerTask! < 0.01 ? `$${cheapestTask.costPerTask!.toFixed(4)}/task` : `$${cheapestTask.costPerTask!.toFixed(2)}/task`, href: `/models/${cheapestTask.slug}`, variant: "rose" },
          ]
            .filter(Boolean)
            .map((s) => {
              const item = s!;
              const prov = getProvider(item.model.provider);
              return (
                <Link key={item.label} href={item.href} className="group relative block bg-background p-4 transition-all hover:bg-surface">
                  <div className="flex items-center gap-2 text-[10px] uppercase tracking-widest text-muted">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: prov.color }} />
                    {item.label}
                  </div>
                  <div className="mt-1.5 truncate text-sm font-semibold group-hover:text-accent">{item.model.name}</div>
                  <div className="mt-0.5 font-mono text-xs tabular-nums text-muted">{item.stat}</div>
                </Link>
              );
            })}
        </Reveal>
      </section>

      {/* ── 01 · Podium ── */}
      <section className="pt-16 sm:pt-20">
        <SectionHead num="01" title="Who's on top" sub="AA Intelligence Index v4.3.2 — ten separate evals, one composite" href="/compare" linkLabel="Full table →" />
        <div className="grid grid-cols-12 gap-4">
          {p1 && (
            <Reveal className="col-span-12 md:col-span-7">
              <Link href={`/models/${p1.slug}`} className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-xl sm:p-8">
                {/* Background glow */}
                <div aria-hidden className="absolute -right-20 -top-20 h-40 w-40 rounded-full bg-[#d97757]/10 blur-[60px]" />
                <div className="relative">
                  <span className="tag-pill bg-amber-500/20 text-amber-600 dark:text-amber-400">
                    <span className="mr-1.5 inline-block h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
                    Current leader
                  </span>
                  <h3 className="mt-3 text-2xl font-bold group-hover:text-accent sm:text-3xl">{p1.name}</h3>
                  <p className="mt-1 text-sm text-muted">{getProvider(p1.provider).name} · {p1.tagline}</p>
                  <div className="mt-6 flex items-end gap-8">
                    <div>
                      <div className="font-mono text-6xl font-bold text-[#d97757] tabular-nums">{p1.scores["aa-intelligence"]}</div>
                      <div className="mt-1 text-[11px] uppercase tracking-widest text-muted">AA index</div>
                    </div>
                    {p1.scores["lmarena-agent"] && (
                      <div className="rounded-lg border border-border-subtle bg-surface-2 px-4 py-2">
                        <div className="font-mono text-xl font-bold tabular-nums">{p1.scores["lmarena-agent"]}%</div>
                        <div className="text-[10px] uppercase tracking-widest text-muted">agent arena #1</div>
                      </div>
                    )}
                    {p1.scores["lmarena-webdev"] && (
                      <div className="rounded-lg border border-border-subtle bg-surface-2 px-4 py-2">
                        <div className="font-mono text-xl font-bold tabular-nums">{p1.scores["lmarena-webdev"]}</div>
                        <div className="text-[10px] uppercase tracking-widest text-muted">webdev elo</div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            </Reveal>
          )}
          {[p2, p3].filter(Boolean).map((m, i) => {
            const provider = getProvider(m.provider);
            return (
              <Reveal key={m.slug} delay={i + 1} className="col-span-12 md:col-span-5">
                <Link href={`/models/${m.slug}`} className="group flex items-baseline justify-between gap-4 rounded-2xl border border-border-subtle bg-surface p-6 transition-all hover:border-accent/30 hover:shadow-lg md:h-full">
                  <div>
                    <span className="font-mono text-[12px] uppercase tracking-widest text-muted">#{i + 2}</span>
                    <h3 className="mt-2 text-xl font-semibold group-hover:text-accent">{m.name}</h3>
                    <p className="mt-0.5 text-xs text-muted">{provider.name}</p>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-4xl font-bold tabular-nums" style={{ color: provider.color }}>
                      {m.scores["aa-intelligence"]}
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
          {[p4, p5].filter(Boolean).map((m, i) => {
            const provider = getProvider(m.provider);
            return (
              <Reveal key={m.slug} delay={i + 3} className="col-span-12 sm:col-span-6">
                <Link href={`/models/${m.slug}`} className="group flex items-center gap-4 rounded-xl border border-border-subtle bg-surface px-5 py-4 transition-all hover:border-accent/30 hover:bg-surface-2">
                  <span className="font-mono text-sm text-muted">#{i + 4}</span>
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-[11px] font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${provider.color}, ${provider.color}aa)` }}
                  >
                    {provider.shortName.slice(0, 2).toUpperCase()}
                  </div>
                  <span className="flex-1 truncate text-sm font-medium group-hover:text-accent">{m.name}</span>
                  <span className="font-mono text-xl font-bold tabular-nums" style={{ color: provider.color }}>
                    {m.scores["aa-intelligence"]}
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </section>

      {/* ── 02 · Usage ── */}
      <section className="pt-16 sm:pt-20">
        <SectionHead num="02" title="What people actually run" sub="OpenRouter routed volume — preference and quality are different sports" />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 rounded-2xl border border-border-subtle bg-surface p-6 lg:col-span-8">
            <div className="flex items-center justify-between">
              <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">Tokens processed, trailing 30 days</h3>
              <span className="tag-pill bg-emerald-500/15 text-emerald-600 dark:text-emerald-400">live</span>
            </div>
            <div className="mt-6 space-y-3">
              {usageLeaders.map((u) => {
                const p = providerMap.get(u.providerId);
                const isNew = u.tokens === 0;
                return (
                  <div key={u.name} className="group flex items-center gap-3">
                    <span className="h-2 w-2 shrink-0 rounded-full" style={{ background: p?.color ?? "var(--accent)" }} />
                    <span className="w-44 truncate text-sm">{u.name}</span>
                    <div className="flex-1 overflow-hidden rounded-full bg-surface-2">
                      {u.tokens > 0 ? (
                        <div
                          className="h-full rounded-full bg-gradient-to-r progress-sheen transition-all duration-700"
                          style={{ width: `${(u.tokens / 50.3) * 100}%`, background: `linear-gradient(90deg, ${p?.color}, ${p?.color}88)` }}
                        />
                      ) : (
                        <div className="h-full w-0 rounded-full bg-emerald-500" />
                      )}
                    </div>
                    <span className="w-20 truncate text-right text-xs text-muted">
                      {isNew ? (
                        <span className="italic text-emerald-500">just launched</span>
                      ) : (
                        <>{u.tokens}T</>
                      )}
                    </span>
                    <span className="hidden w-16 text-right font-mono text-[11px] text-muted sm:block">{u.note}</span>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 rounded-2xl border border-border-subtle bg-surface p-6 lg:col-span-4">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">Share of routed requests</h3>
            <div className="mt-6 space-y-3">
              {marketShare.map((s) => {
                const p = providerMap.get(s.id);
                return (
                  <div key={s.id} className="group flex items-center gap-3">
                    <span className="w-28 truncate text-xs text-muted group-hover:text-foreground">{s.label}</span>
                    <div className="flex-1 overflow-hidden rounded-full bg-surface-2">
                      <div
                        className="h-full rounded-full transition-all duration-700 group-hover:h-[110%]"
                        style={{ width: `${(s.share / 25.4) * 100}%`, background: p?.color }}
                      />
                    </div>
                    <span className="w-12 text-right font-mono text-xs tabular-nums text-muted">{s.share}%</span>
                  </div>
                );
              })}
            </div>
            <div className="mt-6 rounded-xl border border-dashed border-border-subtle bg-surface-2/50 p-4">
              <p className="text-[13px] leading-relaxed text-muted">
                DeepSeek serves a quarter of all routed requests. Anthropic serves
                2.7% and still tops every quality board. Volume and quality are
                different sports — and most coverage conflates them.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── 03 · Featured models ── */}
      <section className="pt-16 sm:pt-20">
        <SectionHead num="03" title="Start here" sub="Two you've heard of, four you should know" href="/models" linkLabel={`All ${models.length} models →`} />
        <div className="model-grid grid grid-cols-12 gap-4">
          {big.map((m) => (
            <div key={m.slug} className="col-span-12 sm:col-span-6">
              <ModelCard model={m} />
            </div>
          ))}
          {small.map((m) => (
            <div key={m.slug} className="col-span-12 sm:col-span-6 lg:col-span-3">
              <ModelCard model={m} />
            </div>
          ))}
        </div>
      </section>

      {/* ── 04 · News ── */}
      <section className="pt-16 pb-20 sm:pt-20">
        <SectionHead num="04" title="Latest" sub="Releases and benchmark shake-ups, newest first" href="/news" linkLabel="All news →" />
        <div className="divide-y divide-border-subtle border-y border-border-subtle">
          {newsSorted.slice(0, 5).map((n, i) => (
            <Reveal key={n.slug} delay={0} className="timeline-dot">
              <Link href={`/news/${n.slug}`} className="group grid min-h-[3.5rem] grid-cols-12 items-baseline gap-2 px-2 py-5 transition-colors hover:bg-surface-2 sm:gap-4">
                <span className="col-span-2 font-mono text-[11px] tabular-nums text-muted sm:col-span-1">
                  {new Date(n.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                </span>
                <span className={`col-span-3 w-fit px-2 py-0.5 text-center text-[10px] font-medium uppercase tracking-wider sm:col-span-2 ${tagColors[n.tag] || "bg-gray-500/15 text-gray-600 dark:text-gray-400"}`}>
                  {n.tag.replace("-", " ")}
                </span>
                <span className="col-span-12 text-[15px] font-medium leading-snug group-hover:text-accent sm:col-span-6 sm:col-start-5">
                  {n.title}
                </span>
                <span className="col-span-1 hidden font-mono text-[11px] text-muted sm:block sm:col-span-1">
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
