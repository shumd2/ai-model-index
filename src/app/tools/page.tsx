import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tools",
  description:
    "Interactive tools — cost calculator, value map, and speed race. Built on the same verified data as the rest of the site.",
};

export default function ToolsPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Tools</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          Small, fast, dependency-free tools. No accounts, no data leaves your browser.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <a
          href="/tools/calculator"
          className="group flex flex-col rounded-2xl border border-border p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold group-hover:text-accent">Cost calculator</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Estimate your real monthly spend across models — input/output volume, cache hits, batch pricing.
          </p>
        </a>
        <a
          href="/tools/value-map"
          className="group flex flex-col rounded-2xl border border-border p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold group-hover:text-accent">Value map</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Every model plotted by intelligence vs cost per task. See which gives the most for the least.
          </p>
        </a>
        <a
          href="/tools/speed-race"
          className="group flex flex-col rounded-2xl border border-border p-6 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-lg"
        >
          <h3 className="text-lg font-semibold group-hover:text-accent">Speed race</h3>
          <p className="mt-2 text-sm text-text-secondary">
            Models racing at real measured output speeds. Watch it, then feel it.
          </p>
        </a>
      </div>
    </div>
  );
}
