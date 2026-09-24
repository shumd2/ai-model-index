# AI Model Index

An independent, community-driven guide to frontier AI models — specs, benchmark scores, arena rankings and insights you won't find on official pages.

**Stack:** Next.js 16 (App Router, static output) · Tailwind CSS v4 · MDX · next-themes · Deployed on Vercel.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build (fully static)
```

## Interactive tools

- **`/tools/calculator`** — monthly cost estimator across any models, with cache-hit share and batch pricing. Uses each provider's published rates from the registry.
- **`/tools/value-map`** — intelligence vs cost-per-task scatter with a Pareto frontier.
- **`/tools/speed-race`** — models racing at their real measured output speeds.

All tools are dependency-free client components over `src/data/models.ts` — no network calls, no accounts.

## Editing content

### Model pages

Each model is two files that share a slug:

1. **`src/data/models.ts`** — the registry entry: specs (context window, pricing incl. cache/batch/fast tiers), variants, effort ladders, verified benchmark scores, cost-per-task, arena ranks, strengths/considerations/best-for. This drives the spec grid, benchmark bars, effort-ladder explorer, radar chart, comparison table and tools.
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

Benchmark scores and rankings were researched and re-verified in September 2026 from:

- [LMArena](https://lmarena.ai) — text/WebDev/agent arena Elo and pass rates
- [Artificial Analysis](https://artificialanalysis.ai) — Intelligence Index v4.3.2, cost-per-task, speed and latency (effort-tier ladders included)
- [OpenRouter](https://openrouter.ai/models) — live model catalog and routed pricing (CC BY 4.0)
- Official provider announcements (OpenAI, Anthropic, Google DeepMind, …)

Fields marked `null` are placeholders awaiting verified data — that's what the
community sections and future edits are for. Each model page shows a
"Numbers verified <date>" badge; keep it updated when you touch a number.

## Deployment (Vercel)

1. Push this repo to GitHub.
2. In Vercel: **Add New → Project → Import** the repo. Framework preset auto-detects Next.js.
3. Deploy — no environment variables needed. Every push to `main` auto-deploys.

## Project structure

```
src/
  app/            # routes: /, /models, /compare, /providers, /benchmarks, /news, /tools
  components/     # cards, score bars, effort ladder, radar, cost calculator, value map, speed race, compare tray, ⌘K palette
  content/        # MDX prose (models/, news/)
  data/           # registries: models, providers, benchmarks, news
```
