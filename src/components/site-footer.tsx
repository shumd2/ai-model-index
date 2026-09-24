import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-20 border-t border-border-subtle">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:flex-row sm:items-start sm:justify-between sm:px-6">
        <div className="max-w-sm">
          <div className="flex items-center gap-2">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-violet-500 to-indigo-600 font-mono text-xs font-bold text-white">
              AI
            </span>
            <span className="font-semibold">AI Model Index</span>
          </div>
          <p className="mt-3 text-sm text-muted">
            An independent, community-driven guide to frontier AI models — specs,
            benchmarks and context you won&apos;t find on official pages.
          </p>
        </div>
        <div className="flex gap-14 text-sm">
          <div className="flex flex-col gap-2">
            <span className="font-medium">Explore</span>
            <Link href="/models" className="text-muted hover:text-foreground">Models</Link>
            <Link href="/compare" className="text-muted hover:text-foreground">Compare</Link>
            <Link href="/providers" className="text-muted hover:text-foreground">Providers</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium">Tools</span>
            <Link href="/tools/calculator" className="text-muted hover:text-foreground">Cost calculator</Link>
            <Link href="/tools/value-map" className="text-muted hover:text-foreground">Value map</Link>
          </div>
          <div className="flex flex-col gap-2">
            <span className="font-medium">Reference</span>
            <Link href="/benchmarks" className="text-muted hover:text-foreground">Benchmarks</Link>
            <Link href="/news" className="text-muted hover:text-foreground">News</Link>
          </div>
        </div>
      </div>
      <div className="border-t border-border-subtle">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-5 text-xs text-muted sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <span>© {new Date().getFullYear()} AI Model Index. Community-maintained.</span>
          <span>
            Data from{" "}
            <a href="https://lmarena.ai" target="_blank" rel="noreferrer" className="underline hover:text-foreground">LMArena</a>{" "}
            &{" "}
            <a href="https://artificialanalysis.ai" target="_blank" rel="noreferrer" className="underline hover:text-foreground">Artificial Analysis</a>
            . Verify critical numbers before decisions.
          </span>
        </div>
      </div>
    </footer>
  );
}
