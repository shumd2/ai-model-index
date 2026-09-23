import Link from "next/link";
import { ModelCard } from "@/components/model-card";
import { models, modelMap } from "@/data/models";
import { newsSorted } from "@/data/news";
import { getProvider, providerMap, providers } from "@/data/providers";
import { benchmarks } from "@/data/benchmarks";

const featuredBig = ["claude-fable-5-1", "gpt-6-sol"];
const featuredSmall = ["gpt-6-luna", "gemini-3-8-flash", "kimi-k3", "grok-4-7"];

const tagColors: Record<string, string> = {
  release: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  benchmark: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  research: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  industry: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "open-source": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

// OpenRouter routed volume, week of Sep 14–21 2026 (openrouter.ai/rankings, CC BY 4.0)
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
    <div className="mb-8 border-b border-border-subtle pb-4">
      <div className="grid grid-cols-12 items-baseline gap-4">
        <span className="col-span-2 font-mono text-xs text-accent sm:col-span-1">{num}</span>
        <h2 className="col-span-10 text-2xl font-bold tracking-tight sm:col-span-6 sm:text-3xl">
          {title}
        </h2>
        <p className="col-span-10 col-start-3 text-sm text-muted sm:col-span-4 sm:col-start-9 sm:text-right">
          {sub}
        </p>
      </div>
      {href && (
        <Link href={href} className="mt-2 inline-block text-sm text-accent hover:underline sm:hidden">
          {linkLabel} →
        </Link>
      )}
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

  return (
    <div className="mx-auto max-w-6xl px-4 sm:px-6">
      {/* ————— Hero ————— */}
      <section className="relative pt-14 sm:pt-20">
        {/* layered backdrop */}
        <div aria-hidden className="bg-grid fade-mask absolute inset-x-0 top-0 h-72 opacity-60" />
        <div
          aria-hidden
          className="absolute -top-24 right-[8%] h-72 w-72 rounded-full opacity-30 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #6d5cff, transparent)" }}
        />
        <div
          aria-hidden
          className="absolute left-[30%] top-24 h-40 w-40 rounded-full opacity-20 blur-3xl"
          style={{ background: "radial-gradient(closest-side, #10a37f, transparent)" }}
        />

        <div className="relative grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-7">
            <p className="inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-amber-600 dark:text-amber-400">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-amber-500" />
              Sep 23 · GPT-6 Sol + Luna shipped today
            </p>
            <h1 className="mt-6 text-[2.6rem] font-bold leading-[0.98] tracking-tight sm:text-6xl lg:text-[4.2rem]">
              Every model
              <br />
              that matters,
              <br />
              <span className="bg-gradient-to-r from-violet-500 to-indigo-500 bg-clip-text text-transparent">
                measured honestly.
              </span>
            </h1>
            <p className="mt-6 max-w-md text-base leading-relaxed text-muted">
              {models.length} model pages, official pricing, benchmark scores,
              and what the communities say behind the scenes. Where a number
              can&apos;t be verified, you get a dash, not a guess.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                href="/compare"
                className="bg-accent px-5 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90"
              >
                Compare all {models.length}
              </Link>
              <Link
                href="/models"
                className="border border-border-subtle bg-surface px-5 py-2.5 text-sm font-medium transition-colors hover:border-accent/40"
              >
                Browse the catalog
              </Link>
            </div>
          </div>

          {/* layered launch cards */}
          <div className="relative col-span-12 hidden min-h-[420px] lg:col-span-5 lg:block">
            <div
              aria-hidden
              className="bg-dots absolute right-4 top-2 h-56 w-56 rounded-full opacity-70"
            />
            <Link
              href="/models/claude-fable-5-1"
              className="absolute right-0 top-0 z-10 w-72 rotate-[3deg] border border-border-subtle bg-surface p-5 shadow-xl transition-transform hover:rotate-1"
            >
              <div className="text-[10px] uppercase tracking-widest text-muted">AA Intelligence</div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-4xl font-bold text-[#d97757]">53.4</span>
                <span className="text-sm text-muted">Claude Fable 5.1</span>
              </div>
              <p className="mt-2 text-xs text-muted">Tied #1 with GPT-6 Astra · agent arena #1</p>
            </Link>
            <Link
              href="/models/gpt-6-sol"
              className="absolute left-0 top-44 z-20 w-80 -rotate-2 border border-accent/40 bg-surface p-5 shadow-2xl transition-transform hover:rotate-0"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
                  Shipped today
                </span>
                <span className="font-mono text-[10px] text-muted">1.05M ctx</span>
              </div>
              <div className="mt-1 font-semibold">GPT-6 Sol</div>
              <div className="mt-1 font-mono text-2xl font-bold text-accent">$2 <span className="text-sm text-muted">/</span> $10</div>
              <p className="mt-2 text-xs text-muted">Astra-class reasoning at 20% of the price</p>
            </Link>
            <Link
              href="/models/gpt-6-luna"
              className="absolute bottom-0 right-6 z-30 w-64 rotate-1 border border-border-subtle bg-surface p-4 shadow-xl transition-transform hover:-rotate-1"
            >
              <div className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Volume king, halved
              </div>
              <div className="mt-1 font-semibold">GPT-6 Luna · $0.10/$0.50</div>
              <p className="mt-1 text-xs text-muted">5.6 Luna moved 50T tokens/month. This is cheaper.</p>
            </Link>
          </div>
        </div>

        {/* stats strip — table-like, not cards */}
        <div className="relative mt-14 grid grid-cols-2 divide-x divide-border-subtle border-y border-border-subtle sm:grid-cols-4">
          {[
            { v: String(models.length), l: "model pages", sub: "one per model" },
            { v: String(providers.length), l: "labs", sub: "US, China, EU" },
            { v: String(benchmarks.length), l: "benchmarks", sub: "explained, not just cited" },
            { v: "Sep 22", l: "last checked", sub: "scores re-verified" },
          ].map((s) => (
            <div key={s.l} className="px-4 py-5">
              <div className="font-mono text-2xl font-bold tabular-nums">{s.v}</div>
              <div className="mt-0.5 text-xs font-medium">{s.l}</div>
              <div className="text-[11px] text-muted">{s.sub}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ————— 01 · Podium ————— */}
      <section className="pt-16">
        <SectionHead
          num="01"
          title="Who's on top"
          sub="Artificial Analysis Intelligence Index v4.3.2 — the only composite that weights ten separate evals"
          href="/compare"
          linkLabel="Full table"
        />
        <div className="grid grid-cols-12 gap-4">
          {p1 && (
            <Link
              href={`/models/${p1.slug}`}
              className="group relative col-span-12 overflow-hidden border border-border-subtle bg-surface p-6 transition-colors hover:border-accent/40 md:col-span-7 md:row-span-2 md:p-8"
            >
              <span
                aria-hidden
                className="absolute -right-8 -top-10 font-mono text-[10rem] font-bold leading-none opacity-[0.06]"
              >
                1
              </span>
              <span className="font-mono text-[11px] uppercase tracking-widest text-amber-500">
                Current leader
              </span>
              <h3 className="mt-2 text-2xl font-bold group-hover:text-accent sm:text-3xl">{p1.name}</h3>
              <p className="mt-1 text-sm text-muted">{getProvider(p1.provider).name} · {p1.tagline}</p>
              <div className="mt-6 flex items-end gap-6">
                <div>
                  <div className="font-mono text-5xl font-bold text-[#d97757]">
                    {p1.scores["aa-intelligence"]}
                  </div>
                  <div className="text-[10px] uppercase tracking-widest text-muted">AA index</div>
                </div>
                {p1.scores["lmarena-agent"] && (
                  <div>
                    <div className="font-mono text-2xl font-semibold">{p1.scores["lmarena-agent"]}%</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted">agent arena #1</div>
                  </div>
                )}
                {p1.scores["lmarena-webdev"] && (
                  <div>
                    <div className="font-mono text-2xl font-semibold">{p1.scores["lmarena-webdev"]}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted">webdev elo</div>
                  </div>
                )}
              </div>
            </Link>
          )}
          {[p2, p3].filter(Boolean).map((m, i) => {
            const provider = getProvider(m.provider);
            return (
              <Link
                key={m.slug}
                href={`/models/${m.slug}`}
                className={`group col-span-12 border border-border-subtle bg-surface p-6 transition-colors hover:border-accent/40 md:col-span-5 ${
                  i === 0 ? "" : "md:row-span-1"
                }`}
              >
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-[11px] uppercase tracking-widest text-muted">
                    #{i + 2}
                  </span>
                  <span className="font-mono text-3xl font-bold" style={{ color: provider.color }}>
                    {m.scores["aa-intelligence"]}
                  </span>
                </div>
                <h3 className="mt-3 text-lg font-semibold group-hover:text-accent">{m.name}</h3>
                <p className="mt-1 text-xs text-muted">{provider.name}</p>
              </Link>
            );
          })}
          {[p4, p5].filter(Boolean).map((m, i) => {
            const provider = getProvider(m.provider);
            return (
              <Link
                key={m.slug}
                href={`/models/${m.slug}`}
                className="group col-span-12 flex items-center gap-4 border border-border-subtle bg-surface px-5 py-4 transition-colors hover:border-accent/40 md:col-span-6"
              >
                <span className="font-mono text-sm text-muted">#{i + 4}</span>
                <span
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[10px] font-bold text-white"
                  style={{ background: provider.color }}
                >
                  {provider.shortName.slice(0, 2).toUpperCase()}
                </span>
                <span className="flex-1 truncate text-sm font-medium group-hover:text-accent">
                  {m.name}
                </span>
                <span className="font-mono text-lg font-bold" style={{ color: provider.color }}>
                  {m.scores["aa-intelligence"]}
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ————— 02 · Usage ————— */}
      <section className="pt-16">
        <SectionHead
          num="02"
          title="What people actually run"
          sub="Tokens routed through OpenRouter — preference and usage are different sports"
        />
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 border border-border-subtle bg-surface p-6 lg:col-span-8">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Tokens processed, trailing 30 days
            </h3>
            <div className="mt-5 space-y-4">
              {usageLeaders.map((u) => {
                const p = providerMap.get(u.providerId);
                const isNew = u.tokens === 0;
                return (
                  <div key={u.name} className="grid grid-cols-[10rem,1fr,4.5rem] items-center gap-3 sm:grid-cols-[13rem,1fr,5.5rem]">
                    <div className="truncate text-sm">
                      <span
                        className="mr-2 inline-block h-2 w-2 rounded-full align-middle"
                        style={{ background: p?.color ?? "var(--accent)" }}
                      />
                      <span className="align-middle">{u.name}</span>
                    </div>
                    <div className="h-6 border-l border-dashed border-border-subtle bg-surface-2/60">
                      {u.tokens > 0 && (
                        <div
                          className="flex h-full items-center pl-2 font-mono text-[11px]"
                          style={{
                            width: `${(u.tokens / 50.3) * 100}%`,
                            background: `linear-gradient(90deg, ${p?.color}55, ${p?.color}22)`,
                          }}
                        >
                          {u.tokens}T
                        </div>
                      )}
                      {isNew && (
                        <div className="flex h-full items-center pl-2 font-mono text-[11px] italic text-emerald-600 dark:text-emerald-400">
                          launch day — watch this bar
                        </div>
                      )}
                    </div>
                    <div className="text-right text-[11px] text-muted">{u.note}</div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="col-span-12 flex flex-col border border-border-subtle bg-surface p-6 lg:col-span-4">
            <h3 className="font-mono text-[11px] uppercase tracking-widest text-muted">
              Share of routed requests
            </h3>
            <div className="mt-5 space-y-2.5">
              {marketShare.map((s) => {
                const p = providerMap.get(s.id);
                return (
                  <div key={s.id} className="grid grid-cols-[5.5rem,1fr,3rem] items-center gap-2">
                    <span className="truncate text-xs text-muted">{s.label}</span>
                    <div className="h-2 overflow-hidden bg-surface-2">
                      <div
                        className="h-full"
                        style={{ width: `${(s.share / 25.4) * 100}%`, background: p?.color }}
                      />
                    </div>
                    <span className="text-right font-mono text-xs tabular-nums">{s.share}%</span>
                  </div>
                );
              })}
            </div>
            <p className="mt-auto border-t border-dashed border-border-subtle pt-4 text-[13px] italic leading-relaxed text-muted">
              DeepSeek serves a quarter of all routed requests. Anthropic serves
              2.7% and still tops every quality board. Volume and quality are
              different sports, and most coverage conflates them.
            </p>
          </div>
        </div>
      </section>

      {/* ————— 03 · Start here ————— */}
      <section className="pt-16">
        <SectionHead
          num="03"
          title="Start here"
          sub="Two you've heard of, four you should know"
          href="/models"
          linkLabel={`All ${models.length} models`}
        />
        <div className="grid grid-cols-12 gap-4">
          {big.map((m) => (
            <div key={m.slug} className="col-span-12 md:col-span-6">
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

      {/* ————— 04 · News ————— */}
      <section className="py-16">
        <SectionHead
          num="04"
          title="Latest"
          sub="Releases and benchmark shake-ups, newest first"
          href="/news"
          linkLabel="All news"
        />
        <div className="divide-y divide-border-subtle border-y border-border-subtle">
          {newsSorted.slice(0, 5).map((n, i) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="group grid grid-cols-12 items-baseline gap-2 px-1 py-5 transition-colors hover:bg-surface"
            >
              <span className="col-span-3 font-mono text-xs tabular-nums text-muted sm:col-span-2">
                {new Date(n.date + "T00:00:00").toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}
              </span>
              <span className={`col-span-9 w-fit px-2 py-0.5 text-center text-[10px] font-medium uppercase tracking-wider sm:col-span-2 ${tagColors[n.tag]}`}>
                {n.tag.replace("-", " ")}
              </span>
              <span className="col-span-12 text-[15px] font-medium leading-snug group-hover:text-accent sm:col-span-7">
                {n.title}
              </span>
              <span className="hidden font-mono text-xs text-muted sm:col-span-1 sm:block">
                {String(i + 1).padStart(2, "0")}
              </span>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
