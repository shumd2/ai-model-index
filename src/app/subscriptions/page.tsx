import type { Metadata } from "next";
import Link from "next/link";
import { subscriptionProducts, pricedTiers } from "@/data/subscriptions";
import { providers } from "@/data/providers";
import { ExternalLink } from "@/components/external-link";

export const metadata: Metadata = {
  title: "Subscriptions",
  description:
    "Compare how people actually use frontier models: ChatGPT, Claude, Gemini and Grok subscription tiers, the GLM Coding Plan, and OpenRouter's no-subscription credit model — verified against official pricing pages.",
};

/** Codex usage estimates: local messages per 5-hour period (official docs). */
const codexUsage = [
  { model: "GPT-6 Astra", plus: "5–45", pro5x: "25–225", pro20x: "100–900" },
  { model: "GPT-6.1 Sol", plus: "15–160", pro5x: "—", pro20x: "—" },
  { model: "GPT-6 Sol", plus: "15–150", pro5x: "70–700", pro20x: "300–3,000" },
  { model: "GPT-6 Luna", plus: "350–3,000", pro5x: "1,750–14,000", pro20x: "7,000–56,000" },
  { model: "GPT-5.6 Sol", plus: "10–100", pro5x: "50–500", pro20x: "200–2,000" },
  { model: "GPT-5.5 (retires Oct 14)", plus: "15–80", pro5x: "75–400", pro20x: "300–1,600" },
];

function formatPrice(price: number | null): string {
  if (price === null) return "Custom";
  if (price === 0) return "$0";
  return `$${price.toLocaleString()}`;
}

export default function SubscriptionsPage() {
  const officialCount = subscriptionProducts.filter(
    (p) => p.source === "official",
  ).length;

  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Access by subscription
          </div>
          <h1>
            Subscriptions are how most people
            <br />
            <span>use frontier models.</span>
          </h1>
          <p>
            Benchmarks describe the models; subscriptions decide what you can
            actually run. Compare every published tier — ChatGPT, Claude,
            Google AI plans, Grok, Mistral Vibe, the GLM Coding Plan and
            OpenRouter&apos;s no-subscription credit model — with prices
            verified against official pages.
          </p>
        </div>
        <div className="page-header-stat">
          <strong>{subscriptionProducts.length}</strong>
          <span>subscription products</span>
          <small>{officialCount} verified from official pages · Oct 7, 2026</small>
        </div>
      </header>

      <div className="section-heading">
        <div>
          <span>Price ladder</span>
          <h2>Every paid tier, cheapest first</h2>
        </div>
        <p>USD list prices. Annual-billing rates and caveats appear in each product section below.</p>
      </div>

      <div className="leaderboard-table-wrap">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Tier</th>
              <th>Monthly</th>
              <th>Headline access</th>
            </tr>
          </thead>
          <tbody>
            {pricedTiers.map(({ product, tier }) => (
              <tr key={`${product.id}-${tier.name}`}>
                <th>
                  <strong>{product.product}</strong>
                  <br />
                  <small className="text-muted">
                    {providers.find((p) => p.id === product.providerId)?.name ?? "OpenRouter"}
                  </small>
                </th>
                <td>{tier.name}</td>
                <td className="numeric">
                  {formatPrice(tier.priceMonthly)}
                  {tier.annualMonthly !== undefined && tier.annualMonthly < tier.priceMonthly! && (
                    <>
                      <br />
                      <small>${tier.annualMonthly.toLocaleString()} annual</small>
                    </>
                  )}
                </td>
                <td>{tier.models}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="section-heading">
        <div>
          <span>Products</span>
          <h2>Tiers in detail</h2>
        </div>
        <p>Models, usage limits and features as published by each provider.</p>
      </div>

      {subscriptionProducts.map((product) => (
        <section key={product.id} className="mt-12" id={product.id}>
          <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-muted">
              {product.product}
              <span className="ml-2 normal-case text-[11px] font-normal">
                {product.kind === "consumer"
                  ? "· consumer subscription"
                  : product.kind === "coding"
                    ? "· coding subscription"
                    : "· credit model"}
              </span>
            </h2>
            <span
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium ${
                product.source === "official"
                  ? "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
                  : "bg-amber-500/10 text-amber-600 dark:text-amber-400"
              }`}
            >
              {product.source === "official" ? "Official pricing page" : "Reported (secondary)"}
            </span>
          </div>

          {product.notes && product.notes.length > 0 && (
            <ul className="mb-4 mt-3 space-y-2 text-sm">
              {product.notes.map((note) => (
                <li key={note} className="flex gap-2 text-muted">
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                  <span>{note}</span>
                </li>
              ))}
            </ul>
          )}

          <div className="leaderboard-table-wrap">
            <table className="leaderboard-table">
              <thead>
                <tr>
                  <th>Tier</th>
                  <th>Price / month</th>
                  <th>Models included</th>
                  <th>Usage</th>
                  <th>Key features</th>
                </tr>
              </thead>
              <tbody>
                {product.tiers.map((tier) => (
                  <tr key={tier.name}>
                    <th>
                      {tier.name}
                      {tier.billingNote && (
                        <>
                          <br />
                          <small>{tier.billingNote}</small>
                        </>
                      )}
                    </th>
                    <td className="numeric">
                      {formatPrice(tier.priceMonthly)}
                      {tier.annualMonthly !== undefined && tier.annualMonthly < tier.priceMonthly! && (
                        <>
                          <br />
                          <small>${tier.annualMonthly.toLocaleString()} annual</small>
                        </>
                      )}
                    </td>
                    <td>{tier.models}</td>
                    <td>{tier.usage}</td>
                    <td>
                      <ul className="space-y-1.5 text-[13px]">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex gap-2 text-muted">
                            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-accent" />
                            <span>{feature}</span>
                          </li>
                        ))}
                        {tier.note && (
                          <li className="pt-1 text-amber-600 dark:text-amber-400">
                            {tier.note}
                          </li>
                        )}
                      </ul>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
            <ExternalLink href={product.tiers[0].url}>
              Official pricing page →
            </ExternalLink>
            <span className="verified-badge">Verified {product.verifiedOn}</span>
          </div>
        </section>
      ))}

      <div className="section-heading">
        <div>
          <span>Inside ChatGPT</span>
          <h2>Codex usage by plan</h2>
        </div>
        <p>
          Estimated local messages per 5-hour period from OpenAI&apos;s docs.
          Local and cloud chats share the allowance; weekly limits may also apply.
        </p>
      </div>

      <div className="leaderboard-table-wrap">
        <table className="leaderboard-table">
          <thead>
            <tr>
              <th>Model</th>
              <th>Plus ($20)</th>
              <th>Pro 5× ($100)</th>
              <th>Pro 20× ($200)</th>
            </tr>
          </thead>
          <tbody>
            {codexUsage.map((row) => (
              <tr key={row.model}>
                <th>{row.model}</th>
                <td className="numeric">{row.plus}</td>
                <td className="numeric">{row.pro5x}</td>
                <td className="numeric">{row.pro20x}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="mt-3 text-xs text-muted">
        Speed modes burn included usage faster: Fast mode at 2.5× and GPT-6
        Astra Ultrafast at 8× the standard rate. With an API key, Codex bills
        per token instead of consuming subscription usage.
      </p>

      <div className="section-heading">
        <div>
          <span>Subscription vs API</span>
          <h2>Which billing model fits you</h2>
        </div>
        <p>Rules of thumb, not recommendations — your volume decides.</p>
      </div>

      <section className="route-grid" aria-label="Billing models">
        <article className="route-card">
          <span className="route-number">01</span>
          <h2>Flat subscription</h2>
          <p>
            Best for steady, interactive use: chat, coding agents and deep
            research inside one product. Watch the 5-hour windows — Pro and Max
            reset on a rolling session clock, not a calendar month.
          </p>
          <span>ChatGPT · Claude · Gemini · Grok</span>
        </article>
        <article className="route-card">
          <span className="route-number">02</span>
          <h2>Coding plan</h2>
          <p>
            Flat-rate quotas for AI coding agents across 20+ tools. Cheaper
            than the API at high volume, but locked to the plan&apos;s model
            family and supported clients.
          </p>
          <span>GLM Coding Plan from $18/mo</span>
        </article>
        <article className="route-card">
          <span className="route-number">03</span>
          <h2>Pay-as-you-go credits</h2>
          <p>
            No subscription at all: buy credits once, draw them down at
            provider list price. OpenRouter adds a 5.5% fee on credit
            purchases; BYOK is fee-free to $25,000 of inference per month.
          </p>
          <span>
            <ExternalLink href="https://openrouter.ai/pricing">OpenRouter</ExternalLink>
          </span>
        </article>
      </section>

      <section className="method-banner">
        <div>
          <span className="page-kicker">Methodology</span>
          <h2>Prices are a snapshot, not a feed.</h2>
          <p>
            Subscription prices, tier names and usage limits were captured from
            official pricing pages on Oct 7, 2026 (Mistral Vibe from
            secondary sources, marked &quot;reported&quot;). Providers change
            tiers and limits without notice — confirm on the official page
            before subscribing. Usage figures are provider estimates and
            depend on model, context, reasoning effort and tooling.
          </p>
        </div>
        <div className="method-actions">
          <Link href="/api-providers" className="btn-primary">Compare API access</Link>
          <Link href="/methodology" className="btn-ghost">Read methodology</Link>
          <ExternalLink href="https://openrouter.ai/rankings" className="text-link">
            OpenRouter rankings
          </ExternalLink>
        </div>
      </section>
    </div>
  );
}
