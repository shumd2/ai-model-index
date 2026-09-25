import Link from "next/link";
import { ModelCard } from "@/components/model-card";
import { ExternalLink } from "@/components/external-link";
import { formatContext, models, modelMap } from "@/data/models";
import { newsSorted } from "@/data/news";
import { getProvider, providers } from "@/data/providers";
import { benchmarks } from "@/data/benchmarks";
import {
  apiProviders,
  apiProvidersForLab,
  type ApiProviderKind,
} from "@/data/api-providers";

const featuredSlugs = [
  "claude-opus-5-5",
  "gpt-6-astra",
  "kimi-k3-multimodal",
];

const tagColors: Record<string, string> = {
  release: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  benchmark: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  research: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  industry: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "open-source": "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  data: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
};

const accessLabels: Record<ApiProviderKind, string> = {
  "first-party": "Direct APIs",
  "multi-model": "Model routers",
  cloud: "Cloud catalogs",
  infrastructure: "Self-hosting",
};

export default function HomePage() {
  const rankedModels = [...models]
    .filter(
      (model) =>
        model.scores["aa-intelligence"] != null && model.verifiedOn != null,
    )
    .sort(
      (a, b) =>
        (b.scores["aa-intelligence"] ?? 0) -
        (a.scores["aa-intelligence"] ?? 0),
    );
  const leaderboard = rankedModels.slice(0, 8);
  const currentLeader = leaderboard[0];
  const fastest = [...models]
    .filter((model) => model.speed != null && model.verifiedOn != null)
    .sort((a, b) => b.speed! - a.speed!)[0];
  const bestValue = [...models]
    .filter(
      (model) =>
        model.scores["aa-intelligence"] != null &&
        model.costPerTask != null &&
        model.costPerTask > 0 &&
        model.verifiedOn != null,
    )
    .sort(
      (a, b) =>
        b.scores["aa-intelligence"]! / b.costPerTask! -
        a.scores["aa-intelligence"]! / a.costPerTask!,
    )[0];
  const featuredModels = featuredSlugs
    .map((slug) => modelMap.get(slug))
    .filter((model) => model != null);
  const accessCounts = apiProviders.reduce<Record<ApiProviderKind, number>>(
    (counts, provider) => {
      counts[provider.kind] += 1;
      return counts;
    },
    { "first-party": 0, "multi-model": 0, cloud: 0, infrastructure: 0 },
  );

  return (
    <div className="page-shell home-shell">
      <section className="home-hero">
        <div className="home-hero-copy">
          <div className="page-kicker">
            <span className="status-dot" /> Independent model registry
          </div>
          <h1>
            Find the right model.
            <br />
            <span>Then find the right way to run it.</span>
          </h1>
          <p>
            Verified model specs, benchmark context, official lab links and the
            API routes that put each model into production. Unknown numbers stay
            unknown.
          </p>
          <div className="home-hero-actions">
            <Link href="/compare" className="btn-primary">Compare models</Link>
            <Link href="/api-providers" className="btn-ghost">Explore API access</Link>
          </div>
          <div className="home-hero-sources">
            <span>Registry checked Sep 25, 2026</span>
            <ExternalLink href="https://artificialanalysis.ai/models">
              AA scores
            </ExternalLink>
            <ExternalLink href="https://lmarena.ai/">LMArena</ExternalLink>
            <ExternalLink href="https://openrouter.ai/models">OpenRouter</ExternalLink>
          </div>
        </div>

        <aside className="home-pulse" aria-label="Registry snapshot">
          <div className="home-pulse-heading">
            <div>
              <span>Registry pulse</span>
              <strong>September 2026</strong>
            </div>
            <span className="live-label">Live index</span>
          </div>
          <div className="pulse-list">
            {currentLeader && (
              <Link href={`/models/${currentLeader.slug}`} className="pulse-row">
                <span>Current leader</span>
                <div>
                  <strong>{currentLeader.name}</strong>
                  <small>{getProvider(currentLeader.provider).name}</small>
                </div>
                <b>{currentLeader.scores["aa-intelligence"]}</b>
              </Link>
            )}
            {fastest && (
              <Link href={`/models/${fastest.slug}`} className="pulse-row">
                <span>Fastest measured</span>
                <div>
                  <strong>{fastest.name}</strong>
                  <small>Output speed</small>
                </div>
                <b>{fastest.speed!.toLocaleString()} t/s</b>
              </Link>
            )}
            {bestValue && (
              <Link href={`/models/${bestValue.slug}`} className="pulse-row">
                <span>Best AA / cost</span>
                <div>
                  <strong>{bestValue.name}</strong>
                  <small>Verified index score</small>
                </div>
                <b>${bestValue.costPerTask!.toFixed(2)}</b>
              </Link>
            )}
          </div>
          <Link href="/benchmarks" className="pulse-footer">
            How scores are verified <span>→</span>
          </Link>
        </aside>
      </section>

      <section className="home-route-grid" aria-label="Start here">
        <Link href="/models" className="home-route-card">
          <span>01</span>
          <div>
            <h2>Browse the catalog</h2>
            <p>Filter {models.length} models by maker, weights, context, price and modality.</p>
          </div>
          <b>Explore models →</b>
        </Link>
        <Link href="/api-providers" className="home-route-card">
          <span>02</span>
          <div>
            <h2>Choose an access route</h2>
            <p>Compare direct APIs, routers, cloud catalogs and self-hosted infrastructure.</p>
          </div>
          <b>Compare APIs →</b>
        </Link>
        <Link href="/tools/calculator" className="home-route-card">
          <span>03</span>
          <div>
            <h2>Estimate real cost</h2>
            <p>Model input, output, cache and batch usage before choosing a provider.</p>
          </div>
          <b>Open calculator →</b>
        </Link>
      </section>

      <dl className="home-metric-strip">
        <div>
          <dt>Models</dt>
          <dd>{models.length}</dd>
          <span>one verified page each</span>
        </div>
        <div>
          <dt>Model labs</dt>
          <dd>{providers.length}</dd>
          <span>maker profiles</span>
        </div>
        <div>
          <dt>API routes</dt>
          <dd>{apiProviders.length}</dd>
          <span>official access links</span>
        </div>
        <div>
          <dt>Benchmarks</dt>
          <dd>{benchmarks.length}</dd>
          <span>explained and sourced</span>
        </div>
      </dl>

      <section className="home-leaderboard">
        <div className="section-heading">
          <div>
            <span>Verified ranking</span>
            <h2>AA Intelligence Index leaders</h2>
          </div>
          <p>Configurations can differ by effort tier. Open a model for its exact variant and source notes.</p>
        </div>
        <div className="leaderboard-table-wrap">
          <table className="leaderboard-table">
            <caption className="sr-only">
              Models ranked by the Artificial Analysis Intelligence Index
            </caption>
            <thead>
              <tr>
                <th scope="col">Rank</th>
                <th scope="col">Model</th>
                <th scope="col">Maker</th>
                <th scope="col">AA index</th>
                <th scope="col">Context</th>
                <th scope="col">Input / output</th>
                <th scope="col">Access</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((model, index) => {
                const provider = getProvider(model.provider);
                const routes = apiProvidersForLab(model.provider).slice(0, 2);
                return (
                  <tr key={model.slug}>
                    <td><span className="rank-number">{String(index + 1).padStart(2, "0")}</span></td>
                    <th scope="row">
                      <Link href={`/models/${model.slug}`}>{model.name}</Link>
                    </th>
                    <td>{provider.name}</td>
                    <td className="numeric score-cell">{model.scores["aa-intelligence"]}</td>
                    <td className="numeric">
                      {model.contextWindow ? formatContext(model.contextWindow) : "—"}
                    </td>
                    <td className="numeric price-cell">
                      {model.pricing?.input != null && model.pricing.output != null
                        ? `$${model.pricing.input} / $${model.pricing.output}`
                        : "—"}
                    </td>
                    <td>
                      <div className="route-chips">
                        {routes.length > 0 ? (
                          routes.map((route) => (
                            <ExternalLink
                              key={route.id}
                              href={route.modelsUrl}
                              ariaLabel={`${route.name} models page`}
                            >
                              {route.shortName}
                            </ExternalLink>
                          ))
                        ) : (
                          <Link href={`/providers/${provider.id}`}>Lab profile</Link>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="leaderboard-footer">
          <span>Prices shown per 1M tokens where published.</span>
          <Link href="/compare">Compare full specifications →</Link>
        </div>
      </section>

      <section className="home-featured">
        <div className="section-heading">
          <div>
            <span>Model pages</span>
            <h2>Start with these frontier models</h2>
          </div>
          <Link href="/models" className="text-link">View all {models.length} models</Link>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {featuredModels.map((model) => (
            <ModelCard key={model.slug} model={model} />
          ))}
        </div>
      </section>

      <section className="home-access">
        <div className="home-access-copy">
          <div className="page-kicker">Access directory</div>
          <h2>One model. Several ways to run it.</h2>
          <p>
            First-party APIs expose new features first. Routers simplify
            multi-provider apps. Clouds add governance and regional deployment.
            Self-hosted infrastructure keeps the serving layer under your control.
          </p>
          <Link href="/api-providers" className="btn-primary">Compare access routes</Link>
        </div>
        <div className="home-access-grid">
          {(Object.keys(accessLabels) as ApiProviderKind[]).map((kind) => (
            <Link key={kind} href="/api-providers">
              <span>{accessLabels[kind]}</span>
              <strong>{accessCounts[kind]}</strong>
              <small>verified routes</small>
              <b>→</b>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-news">
        <div className="section-heading">
          <div>
            <span>Latest changes</span>
            <h2>Models, benchmarks and market moves</h2>
          </div>
          <Link href="/news" className="text-link">All news →</Link>
        </div>
        <div className="news-directory">
          {newsSorted.slice(0, 5).map((item) => (
            <Link key={item.slug} href={`/news/${item.slug}`} className="news-row">
              <time dateTime={item.date}>
                {new Date(`${item.date}T00:00:00`).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                })}
              </time>
              <span className={`news-tag ${tagColors[item.tag] ?? ""}`}>
                {item.tag.replace("-", " ")}
              </span>
              <strong>{item.title}</strong>
              <b aria-hidden="true">→</b>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
