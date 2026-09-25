"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { providers } from "@/data/providers";
import { modelsByProvider } from "@/data/models";
import { apiProvidersForLab } from "@/data/api-providers";
import { ExternalLink } from "@/components/external-link";

type CategoryId = "all" | "frontier" | "open" | "emerging";

const categories: {
  id: CategoryId;
  label: string;
  description: string;
}[] = [
  {
    id: "frontier",
    label: "Frontier labs",
    description: "First-party developers of leading proprietary and platform models.",
  },
  {
    id: "open",
    label: "Open-weight labs",
    description: "Labs shipping downloadable weights, efficient model families or open research.",
  },
  {
    id: "emerging",
    label: "Emerging labs",
    description: "New research groups and specialized model providers entering the index.",
  },
];

export function ProviderBrowser() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<CategoryId>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return providers.filter((provider) => {
      if (category !== "all" && provider.category !== category) {
        return false;
      }
      if (!q) return true;
      return [provider.name, provider.shortName, provider.tagline, provider.hq]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [category, query]);

  const visibleCategories =
    category === "all" ? categories : categories.filter((item) => item.id === category);

  return (
    <div>
      <div className="directory-toolbar">
        <label className="search-field">
          <span className="sr-only">Search model labs</span>
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-3.5-3.5" strokeLinecap="round" />
          </svg>
          <input
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search labs, regions, or specialties…"
          />
        </label>

        <div className="filter-tabs" role="group" aria-label="Filter model labs">
          <button
            type="button"
            className={`filter-tab ${category === "all" ? "active" : ""}`}
            aria-pressed={category === "all"}
            onClick={() => setCategory("all")}
          >
            All labs
          </button>
          {categories.map((item) => (
            <button
              key={item.id}
              type="button"
              className={`filter-tab ${category === item.id ? "active" : ""}`}
              aria-pressed={category === item.id}
              onClick={() => setCategory(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <span className="result-count" aria-live="polite">
          {filtered.length} / {providers.length}
        </span>
      </div>

      <div className="lab-directory">
        {visibleCategories.map((group) => {
          const groupProviders = filtered.filter(
            (provider) => provider.category === group.id,
          );
          if (groupProviders.length === 0) return null;

          return (
            <section key={group.id} className="lab-group">
              <div className="lab-group-heading">
                <div>
                  <h2>{group.label}</h2>
                  <p>{group.description}</p>
                </div>
                <span>{groupProviders.length}</span>
              </div>

              <div className="provider-directory">
                {groupProviders.map((provider) => {
                  const providerModels = modelsByProvider(provider.id);
                  const verifiedScoredModels = providerModels.filter(
                    (model) =>
                      model.scores["aa-intelligence"] != null &&
                      model.verifiedOn != null,
                  );
                  const topModel = [...verifiedScoredModels].sort(
                    (a, b) =>
                      (b.scores["aa-intelligence"] ?? -1) -
                      (a.scores["aa-intelligence"] ?? -1),
                  )[0];
                  const openCount = providerModels.filter((model) => model.openWeights).length;
                  const accessRoutes = apiProvidersForLab(provider.id).length;

                  return (
                    <article key={provider.id} className="provider-row">
                      <div
                        className="provider-monogram provider-monogram--lg"
                        style={
                          { "--provider-color": provider.color } as React.CSSProperties
                        }
                        aria-hidden="true"
                      >
                        {provider.shortName.slice(0, 2).toUpperCase()}
                      </div>

                      <div className="provider-row-main">
                        <div className="provider-name-row">
                          <Link href={`/providers/${provider.id}`}>{provider.name}</Link>
                          {openCount > 0 && <span>Open weights</span>}
                        </div>
                        <p>{provider.tagline}</p>
                        <small>{provider.hq}</small>
                      </div>

                      <dl className="provider-row-metrics">
                        <div>
                          <dt>Tracked</dt>
                          <dd>{providerModels.length} models</dd>
                        </div>
                        <div>
                          <dt>Best AA</dt>
                          <dd>
                            {topModel?.scores["aa-intelligence"] != null
                              ? topModel.scores["aa-intelligence"]
                              : "—"}
                          </dd>
                        </div>
                        <div>
                          <dt>API routes</dt>
                          <dd>{accessRoutes || "—"}</dd>
                        </div>
                      </dl>

                      <div className="provider-row-actions">
                        <Link href={`/providers/${provider.id}`}>View lab</Link>
                        <ExternalLink href={provider.website}>Official site</ExternalLink>
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <strong>No labs match “{query}”.</strong>
          <span>Try another name, region, or model category.</span>
        </div>
      )}
    </div>
  );
}
