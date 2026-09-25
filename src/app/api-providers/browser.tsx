"use client";

import { useMemo, useState } from "react";
import {
  apiKindLabels,
  apiProviders,
  type ApiProviderKind,
} from "@/data/api-providers";
import { ExternalLink } from "@/components/external-link";

const filters: { id: "all" | ApiProviderKind; label: string }[] = [
  { id: "all", label: "All access" },
  { id: "first-party", label: "First-party" },
  { id: "multi-model", label: "Multi-model" },
  { id: "cloud", label: "Cloud" },
  { id: "infrastructure", label: "Self-host" },
];

export function ApiProviderBrowser() {
  const [query, setQuery] = useState("");
  const [kind, setKind] = useState<"all" | ApiProviderKind>("all");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return apiProviders.filter((provider) => {
      if (kind !== "all" && provider.kind !== kind) return false;
      if (!q) return true;
      return [
        provider.name,
        provider.shortName,
        provider.summary,
        ...provider.bestFor,
        ...provider.compatibility,
        ...provider.deployment,
      ]
        .join(" ")
        .toLowerCase()
        .includes(q);
    });
  }, [kind, query]);

  return (
    <div>
      <div className="directory-toolbar">
        <label className="search-field">
          <span className="sr-only">Search API providers</span>
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
            placeholder="Search APIs, clouds, protocols…"
          />
        </label>

        <div className="filter-tabs" role="group" aria-label="Filter API providers">
          {filters.map((filter) => (
            <button
              key={filter.id}
              type="button"
              className={`filter-tab ${kind === filter.id ? "active" : ""}`}
              aria-pressed={kind === filter.id}
              onClick={() => setKind(filter.id)}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <span className="result-count" aria-live="polite">
          {filtered.length} {filtered.length === 1 ? "provider" : "providers"}
        </span>
      </div>

      <div className="api-directory">
        {filtered.map((provider) => (
          <article key={provider.id} className="api-provider-row">
            <div
              className="provider-monogram provider-monogram--lg"
              style={{ "--provider-color": provider.color } as React.CSSProperties}
              aria-hidden="true"
            >
              {provider.shortName.slice(0, 2).toUpperCase()}
            </div>

            <div className="api-provider-main">
              <div className="api-provider-title-row">
                <h2>{provider.name}</h2>
                <span className={`api-kind api-kind--${provider.kind}`}>
                  {apiKindLabels[provider.kind]}
                </span>
              </div>
              <p>{provider.summary}</p>
              <div className="api-tags">
                {provider.bestFor.map((item) => (
                  <span key={item}>{item}</span>
                ))}
              </div>
            </div>

            <dl className="api-facts">
              <div>
                <dt>API style</dt>
                <dd>{provider.compatibility[0]}</dd>
              </div>
              <div>
                <dt>Deployment</dt>
                <dd>{provider.deployment[0]}</dd>
              </div>
            </dl>

            <div className="api-links">
              <ExternalLink href={provider.docsUrl}>Docs</ExternalLink>
              <ExternalLink href={provider.modelsUrl}>Models</ExternalLink>
              {provider.pricingUrl && (
                <ExternalLink href={provider.pricingUrl}>Pricing</ExternalLink>
              )}
              <ExternalLink href={provider.consoleUrl} className="api-console-link">
                Open API
              </ExternalLink>
            </div>
          </article>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="empty-state">
          <strong>No API providers match “{query}”.</strong>
          <span>Try a model family, protocol, or deployment type.</span>
        </div>
      )}
    </div>
  );
}
