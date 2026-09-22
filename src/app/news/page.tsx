import type { Metadata } from "next";
import Link from "next/link";
import { newsSorted } from "@/data/news";
import { providerMap } from "@/data/providers";

const tagColors: Record<string, string> = {
  release: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  benchmark: "bg-violet-500/10 text-violet-600 dark:text-violet-400",
  research: "bg-sky-500/10 text-sky-600 dark:text-sky-400",
  industry: "bg-amber-500/10 text-amber-600 dark:text-amber-400",
  "open-source": "bg-rose-500/10 text-rose-600 dark:text-rose-400",
};

export const metadata: Metadata = {
  title: "News & changelog",
  description:
    "Model releases, benchmark shake-ups and industry news — the feed for what's actually happening on the AI frontier.",
};

export default function NewsPage() {
  const byMonth = new Map<string, typeof newsSorted>();
  for (const item of newsSorted) {
    const key = item.date.slice(0, 7);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(item);
  }

  return (
    <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">News & changelog</h1>
        <p className="mt-3 max-w-2xl text-muted">
          Every release and benchmark shake-up that matters, newest first.
        </p>
      </div>

      <div className="space-y-10">
        {[...byMonth.entries()].map(([month, items]) => (
          <div key={month}>
            <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-muted">
              {new Date(month + "-01T00:00:00").toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="relative space-y-4 border-l border-border-subtle pl-6">
              {items.map((n) => {
                const provider = n.provider ? providerMap.get(n.provider) : undefined;
                return (
                  <Link
                    key={n.slug}
                    href={`/news/${n.slug}`}
                    className="group relative block rounded-2xl border border-border-subtle bg-surface p-5 transition-colors hover:border-accent/40"
                  >
                    <span
                      className="absolute -left-[31px] top-6 h-2.5 w-2.5 rounded-full border-2 border-background"
                      style={{ background: provider?.color ?? "var(--accent)" }}
                    />
                    <div className="flex flex-wrap items-center gap-2 text-xs">
                      <span className={`rounded-md px-2 py-0.5 font-medium capitalize ${tagColors[n.tag]}`}>
                        {n.tag.replace("-", " ")}
                      </span>
                      {provider && (
                        <span
                          className="rounded-md px-2 py-0.5 font-medium"
                          style={{ background: `${provider.color}18`, color: provider.color }}
                        >
                          {provider.name}
                        </span>
                      )}
                      <span className="text-muted">
                        {new Date(n.date + "T00:00:00").toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                    <h3 className="mt-3 font-semibold leading-snug group-hover:text-accent">
                      {n.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted">{n.summary}</p>
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
