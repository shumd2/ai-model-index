import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive tools for the AI model landscape — cost calculator, intelligence-vs-cost value map, and more.",
};

const tools = [
  {
    href: "/tools/calculator",
    name: "Cost calculator",
    desc: "Estimate your real monthly spend across any models — input/output volume, cache hits, batch pricing. Presets for chat bots, doc analysis and agent fleets.",
    cta: "Estimate my bill →",
  },
  {
    href: "/tools/value-map",
    name: "Value map",
    desc: "Intelligence vs cost per task, plotted. The Pareto frontier shows the models nothing else beats — smarter ones all cost more, cheaper ones all score lower.",
    cta: "Open the map →",
  },
  {
    href: "/tools/speed-race",
    name: "Speed race",
    desc: "Models racing at their real measured output speeds — Celeris-1 at 1,492 t/s vs Mercury 2 at 750 vs everyone else. Watch it, then feel it.",
    cta: "Run the race →",
  },
];

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tools</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Small, fast, dependency-free tools built on the same verified registry as
          the rest of the site. No accounts, no data leaves your browser.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((t) => (
          <Link
            key={t.href}
            href={t.href}
            className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
          >
            <h2 className="text-lg font-semibold group-hover:text-accent">{t.name}</h2>
            <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.desc}</p>
            <span className="mt-4 text-sm font-medium text-accent">{t.cta}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
