import type { Metadata } from "next";
import { benchmarkSourceUrls, benchmarks } from "@/data/benchmarks";
import { ExternalLink } from "@/components/external-link";

export const metadata: Metadata = {
  title: "Benchmark glossary",
  description:
    "What each AI benchmark measures — AA Intelligence Index, LMArena, Humanity's Last Exam, Terminal-Bench and more — with official source links.",
};

export default function BenchmarksPage() {
  return (
    <div className="page-shell">
      <header className="page-header page-header--split">
        <div>
          <div className="page-kicker">
            <span className="status-dot" /> Measurement guide
          </div>
          <h1>Benchmarks, explained.</h1>
          <p>
            Every score answers a different question. Learn what each benchmark
            measures, where it comes from and why a single number should never
            stand in for “best model.”
          </p>
        </div>
        <div className="page-header-stat">
          <strong>{benchmarks.length}</strong>
          <span>benchmarks in the glossary</span>
          <small>Official sources linked where available</small>
        </div>
      </header>

      <div className="benchmark-directory">
        {benchmarks.map((benchmark) => {
          const sourceUrl = benchmarkSourceUrls[benchmark.id];
          return (
            <article key={benchmark.id} className="benchmark-row">
              <div className="benchmark-row-heading">
                <h2>{benchmark.name}</h2>
                <div className="benchmark-row-meta">
                  <span>{benchmark.source}</span>
                  <span>{benchmark.scale}</span>
                </div>
              </div>
              <p>{benchmark.description}</p>
              {sourceUrl ? (
                <ExternalLink href={sourceUrl} className="benchmark-source-link">
                  Official source
                </ExternalLink>
              ) : (
                <span className="benchmark-source-missing">Source link pending</span>
              )}
            </article>
          );
        })}
      </div>

      <section className="method-banner">
        <div>
          <span className="page-kicker">Read the result in context</span>
          <h2>A benchmark is a lens, not the whole landscape.</h2>
          <p>
            Preference arenas, expert exams and agent evaluations measure
            different capabilities. Check the model variant, reasoning effort,
            source date and access route before making a decision.
          </p>
        </div>
      </section>
    </div>
  );
}
