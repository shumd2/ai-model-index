import type { Metadata } from "next";
import Link from "next/link";
import { newsSorted } from "@/data/news";

const tagColors: Record<string, string> = {
  release: "bg-emerald-500/15 text-emerald-600 dark:text-emerald-400",
  benchmark: "bg-violet-500/15 text-violet-600 dark:text-violet-400",
  research: "bg-sky-500/15 text-sky-600 dark:text-sky-400",
  industry: "bg-amber-500/15 text-amber-600 dark:text-amber-400",
  "open-source": "bg-rose-500/15 text-rose-600 dark:text-rose-400",
  data: "bg-cyan-500/15 text-cyan-600 dark:text-cyan-400",
};

export const metadata: Metadata = {
  title: "News & changelog",
  description:
    "Model releases, benchmark shake-ups, and industry news — the feed for what's happening on the AI frontier.",
};

export default function NewsPage() {
  const byMonth = new Map<string, typeof newsSorted>();
  for (const item of newsSorted) {
    const key = item.date.slice(0, 7);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(item);
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">News</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          Every release and benchmark shake-up that matters, newest first.
        </p>
      </div>

      <div className="divide-y divide-border">
        {[...byMonth.entries()].map(([month, items], mi) => (
          <div key={month} className={mi > 0 ? "pt-10" : ""}>
            <h2 className="mb-4 font-mono text-sm font-semibold uppercase tracking-wider text-text-secondary">
              {new Date(month + "-01T00:00:00").toLocaleDateString("en-US", {
                month: "long",
                year: "numeric",
              })}
            </h2>
            <div className="space-y-1">
              {items.map((n) => (
                <Link
                  key={n.slug}
                  href={`/news/${n.slug}`}
                  className="group grid min-h-[3rem] grid-cols-12 items-baseline gap-2 py-5 transition-colors hover:bg-surface-raised sm:gap-4"
                >
                  <span className="col-span-2 font-mono text-[11px] text-text-secondary sm:col-span-1">
                    {new Date(n.date + "T00:00:00").toLocaleDateString("en-US", { month: "short", day: "2-digit" })}
                  </span>
                  <span className={`col-span-2 w-fit px-2 py-0.5 text-center text-[10px] font-medium uppercase tracking-wider sm:col-span-2 ${tagColors[n.tag] || "bg-gray-500/15 text-gray-600"}`}>
                    {n.tag.replace("-", " ")}
                  </span>
                  <span className="col-span-12 text-[15px] font-medium group-hover:text-accent sm:col-span-7">
                    {n.title}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
