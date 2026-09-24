import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive tools for the AI model landscape — cost calculator, intelligence-vs-cost value map, and more.",
};

const tools = [
  {
    href: "/tools/calculator",
    name: "Cost calculator",
    desc: "Estimate your real monthly spend across any models — input/output volume, cache hits, batch pricing. Now with budget advisor, project complexity, and model recommendations within your budget.",
    cta: "Estimate my bill →",
  },
  {
    href: "/tools/value-map",
    name: "Value map",
    desc: "Every model plotted by intelligence vs cost per task. Each band is a provider — see which models give the most intelligence for the least money.",
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
      <Reveal>
        <div className="mb-10">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-violet-600 dark:text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
            04 · Tools
          </div>
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tools</h1>
          <p className="mt-3 max-w-2xl text-muted">
            Small, fast, dependency-free tools built on the same verified registry as the rest of the site. No accounts, no data leaves your browser.
          </p>
        </div>
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2">
        {tools.map((t, i) => (
          <Reveal key={t.href} delay={i}>
            <Link href={t.href} className="group flex flex-col rounded-2xl border border-border-subtle bg-surface p-6 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5">
              <h2 className="text-lg font-semibold group-hover:text-accent">{t.name}</h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t.desc}</p>
              <span className="mt-4 text-sm font-medium text-accent">{t.cta}</span>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
