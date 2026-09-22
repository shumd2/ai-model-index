# AI Model Index

An independent, community-driven guide to frontier AI models — specs, benchmark scores, arena rankings and insights you won't find on official pages.

**Stack:** Next.js 16 (App Router, static output) · Tailwind CSS v4 · MDX · next-themes · Deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static, 68 pages)
```

## Editing content

### Model pages

Each model is two files that share a slug:

1. **`src/data/models.ts`** — the registry entry: specs (context window, pricing, modalities), variants, verified benchmark scores, arena ranks, strengths/considerations/best-for. This drives the spec grid, benchmark bars and comparison table.
2. **`src/content/models/<slug>.mdx`** — the prose: an `## Overview` section and the `## Community insights` section.

**To add a model:** add a registry entry to `src/data/models.ts`, create `src/content/models/<slug>.mdx`, and (optionally) add a `provider` field if it's a new lab. The page, catalog card and comparison row are generated automatically. Static generation requires no other changes — `generateStaticParams` reads the registry.

> Score honesty rule: only put numbers in the registry that come from a public,
> citable source (LMArena, Artificial Analysis, official model cards). Unknown →
> leave `null` and it renders as "—". Put anecdotes and unofficial findings in
> the MDX community section instead.

### Providers

- **`src/data/providers.ts`** — everything: description, highlights, brand color, HQ. Colors cascade into charts, cards and badges site-wide.

### News

- Add metadata to **`src/data/news.ts`** and create **`src/content/news/<slug>.mdx`** with the article body.

## Where the data comes from

Benchmark scores and rankings were researched in September 2026 from:

- [LMArena](https://lmarena.ai) — text/WebDev/agent arena Elo and pass rates
- [Artificial Analysis](https://artificialanalysis.ai) — Intelligence Index v4.3.2, speed and pricing
- Official provider announcements (OpenAI, Anthropic, Google DeepMind, …)

Fields marked `null` (many pricing/context values for 2026 flagships) are
placeholders awaiting verified data — that's what the community sections and
future edits are for.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset auto-detects Next.js.
3. Deploy — no environment variables needed. Every push to `main` auto-deploys.

## Project structure

```
src/
  app/            # routes: /, /models, /compare, /providers, /benchmarks, /news
  components/     # cards, score bars, compare table, explorer, theme
  content/        # MDX prose (models/, news/)
  data/           # registries: models, providers, benchmarks, news
```
