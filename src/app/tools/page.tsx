import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive tools for AI model cost, value and speed — built on the same verified registry as the rest of the site.",
};

const tools = [
  {
    href: "/tools/calculator",
    number: "01",
    name: "Cost calculator",
    description:
      "Estimate monthly spend from input, output, cache and batch usage. Switch to budget mode to find the strongest models inside a monthly limit.",
    tag: "Pricing",
  },
  {
    href: "/tools/value-map",
    number: "02",
    name: "Value map",
    description:
      "Compare intelligence with cost per task across model makers. Find efficient points without treating one benchmark as the whole answer.",
    tag: "Value",
  },
  {
    href: "/tools/speed-race",
    number: "03",
    name: "Speed race",
    description:
      "Compare measured output throughput in a visual race. Useful for interactive agents, high-volume apps and latency-sensitive work.",
    tag: "Performance",
  },
];

export default function ToolsPage() {
  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Client-side tools
          </div>
          <h1>Turn the registry into a decision.</h1>
          <p>
            Estimate operating cost, find efficient models and compare measured
            throughput. Every tool runs entirely in your browser.
          </p>
        </div>
        <div className="page-header-stat">
          <strong>0</strong>
          <span>runtime API calls</span>
          <small>No accounts · no tracking · static export</small>
        </div>
      </header>

      <div className="home-route-grid">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="home-route-card">
            <span>{tool.number}</span>
            <div>
              <div className="mb-2 inline-flex rounded-full bg-accent-soft px-2 py-0.5 text-[10px] font-semibold text-accent">
                {tool.tag}
              </div>
              <h2>{tool.name}</h2>
              <p>{tool.description}</p>
            </div>
            <b>Open tool →</b>
          </Link>
        ))}
      </div>

      <section className="method-banner">
        <div>
          <span className="page-kicker">Calculation scope</span>
          <h2>Estimates are only as honest as their inputs.</h2>
          <p>
            Results use the build-time model registry. Provider prices, cached
            input rules, batch discounts and rate limits can change—confirm the
            official pricing page before committing to a production budget.
          </p>
        </div>
        <div className="method-actions">
          <Link href="/api-providers" className="btn-ghost">Compare API routes</Link>
          <Link href="/methodology" className="text-link">Read methodology</Link>
        </div>
      </section>
    </div>
  );
}
