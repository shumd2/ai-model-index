import type { Metadata } from "next";
import Link from "next/link";
import { newsSorted } from "@/data/news";
import { providerMap } from "@/data/providers";

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
    "Model releases, benchmark changes and market moves across the AI model ecosystem, newest first.",
};

export default function NewsPage() {
  const byMonth = new Map<string, typeof newsSorted>();
  for (const item of newsSorted) {
    const key = item.date.slice(0, 7);
    if (!byMonth.has(key)) byMonth.set(key, []);
    byMonth.get(key)!.push(item);
  }

  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Registry changelog
          </div>
          <h1>What changed in the model landscape.</h1>
          <p>
            Releases, benchmark updates and market moves—newest first, with
            editorial context separated from the underlying model registry.
          </p>
        </div>
        <div className="page-header-stat">
          <strong>{newsSorted.length}</strong>
          <span>tracked updates</span>
          <small>Newest verified Sep 23, 2026</small>
        </div>
      </header>

      <div className="space-y-12">
        {[...byMonth.entries()].map(([month, items]) => (
          <section key={month}>
            <div className="lab-section-heading lab-section-heading--split">
              <h2>
                {new Date(`${month}-01T00:00:00`).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </h2>
              <span>{items.length} updates</span>
            </div>
            <div className="news-directory">
              {items.map((item) => {
                const provider = item.provider
                  ? providerMap.get(item.provider)
                  : undefined;
                return (
                  <Link
                    key={item.slug}
                    href={`/news/${item.slug}`}
                    className="news-row"
                  >
                    <time dateTime={item.date}>
                      {new Date(`${item.date}T00:00:00`).toLocaleDateString(
                        "en-US",
                        { month: "short", day: "2-digit" },
                      )}
                    </time>
                    <span className={`news-tag ${tagColors[item.tag] ?? ""}`}>
                      {item.tag.replace("-", " ")}
                    </span>
                    <div>
                      <strong>{item.title}</strong>
                      {provider && <small>{provider.name}</small>}
                    </div>
                    <b aria-hidden="true">→</b>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
