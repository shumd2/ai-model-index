# Research & Update Plan — September 23, 2026

Deep research into the current state of frontier AI models, plus a phased plan to
update the site's data and redesign the UI. All numbers below come from public,
citable sources checked today:

- **Artificial Analysis** — Intelligence Index v4.3.2 leaderboard, per-effort scores,
  cost per task, speeds, latencies (`artificialanalysis.ai/leaderboards/models`)
- **Anthropic** — Claude Opus 5.5 announcement (Sep 22, 2026) with full benchmark tables
- **OpenRouter** — live model catalog (455 models, created-date & pricing via
  `openrouter.ai/api/v1/models`, CC BY 4.0) and Data API docs

---

## Part 1 — Research findings

### 1.1 The headline: Claude Opus 5.5 is the new #1

Anthropic shipped **Claude Opus 5.5 on Sep 22, 2026** — the site currently lists it
as a launch-day stub with zero scores. It is now the **highest-intelligence model
measured anywhere**:

| AA Intelligence Index (effort ladder) | Score | Cost/task | t/s | TTFT |
|---|---|---|---|---|
| Opus 5.5 (max) | **58** — #1 overall | $5.98 | — | — |
| Opus 5.5 (xhigh) | 56 | $3.46 | 92 | 155s |
| Opus 5.5 (high) | 54 | $1.82 | 90 | 35s |
| Opus 5.5 (medium) | 51 | $1.34 | 75 | 23s |
| Opus 5.5 (low) | 42 | $0.55 | 76 | 4.8s |

From Anthropic's announcement (citable numbers):

- **Terminal-Bench 4.0: 66.4%** (xhigh) — new record. Fable 5.1: 55.8%, Opus 5: 52.3%, GPT-6 Astra: 57.9%, GPT-5.6 Sol: 37.3%
- **GDPval-AA v2.1: 1846 Elo** — new record (Fable 1735, Opus 5 1708, Astra 1542, Sol 1588)
- **HLE: 67.7%** with tools (Fable 65.6%, Opus 5 63.6%, Astra 57.2%)
- **OSWorld 2.0: 81.8%** partial (Fable 80.7%)
- **AutomationBench: 40.0%** (Zapier-run; Astra 41.4%)
- **Terminal-Bench-Science 0.1: 58.7%** (Astra 64.6%)
- **CursorBench 4.0: 57.8%**, **FrontierCode v1.1: 54.4%**, **Chartography: 89.0%** w/ tools
- Pricing: **$4 in / $20 out**, cache read **$0.20** (−60% vs Opus 5), cache write $5, batch **$2/$10**, fast mode **$8/$40** (2.5×)
- ~**40% cheaper to run** than Opus 5, >30% faster output, 1M context
- "Adaptive reasoning" — 5 effort tiers, thinking cannot be disabled
- "Preserved thinking" anti-distillation safeguard (API accounts created after Aug 31)
- Best-ever behavioral-audit alignment scores; ~85% fewer containment-boundary attempts vs Opus 5; ties Fable 5.1 for lowest prompt-injection success rate (Gray Swan)
- **Claude Sonnet 5.5 and Haiku 5.5 promised "in the coming weeks"** (roadmap news)
- Verbose: 260M output tokens per AA index run vs 88M median — a fun, honest stat

### 1.2 GPT-6 family: scores landed (site currently shows "no scores yet")

| Model (effort) | AA index | Cost/task | t/s |
|---|---|---|---|
| GPT-6 Astra (max → low) | 53 / 52 / 51 / 50 / 46 | $3.26 → $0.82 | ~53 → 46 |
| GPT-6 Sol (max → low) | **48 / 44 / 43 / 40 / 34** (+28 non-reasoning) | $1.06 → $0.13 | 126 → 118 |
| GPT-6 Luna (max → low) | **37 / 34 / 32 / 29 / 21** (+18 non-reasoning) | **$0.07 → $0.0045** | 157 → 140 |

- **GPT-6 Luna (low) is the lowest cost-per-task model on the entire AA board** —
  a spectacular value story the site can own.
- AA lists Sol's context as **872k** (site says 1.05M) — flag as "verify" item.
- Astra also has audio-in; site already reflects that.

### 1.3 Other movers at the top

- **Grok 4.7** (Sep 21): AA **46** (xhigh & high), **price cut to $1.60/$4.80**
  (from $2/$6), 500k ctx, knowledge cutoff May 2026, sub-second TTFT (0.84s) —
  fastest big-model TTFT in the top-50.
- **Muse Spark 1.3 (max): AA 48**, 219 t/s — Meta is now genuinely top-15 on
  intelligence, not just text arena. Contributor variant $0.10/$0.20.
  New **Muse Glimmer** small model: AA 17, $0.06/task.
- **Qwen3.8 Max (0902): AA 45**; new **Qwen3.8 2.4T-A95B** — a 2.4-trillion-param
  MoE with 95B active (AA 40). Qwen3.8 Omni Flash (Sep 21) + Flash-Next (AA 40, $0.37/task).
- **GLM-5.3 (max): AA 45**, GLM-5.3-Flash: AA 42 at **$0.25/task**, new FlashX variant (Sep 18).
- **Kimi K3 (max): AA 44**; Kimi Linear 48B-A3B — new linear-attention architecture.
- **DeepSeek V4.1 Flash (max): AA 39, 227 t/s, $0.27/task** — elite value; plus
  V4 Flash Vision (AA 35) and new `deepseek-pro-latest`/`flash-latest` aliases (Sep 14).
- **Step 5 Preview** (StepFun): **AA 44**, 1M ctx, $0.72/task — jumps StepFun into the top 30.
- **Gemini 3.8 Flash (high): AA 41, 276 t/s**; Gemini 3.1 Pro Preview: AA 30; 3.5 Flash-Lite: AA 22, 357 t/s, $0.12/task.

### 1.4 Speed & latency records (new leaders)

- **Celeris-1** (new lab, Celeris): **1,492 t/s** — fastest model ever measured. 131k ctx, $0.05/task, AA 6.
- **Mercury 2** (Inception): now **750 t/s** (site says 655); new **Mercury 2.5** — $0.04/$0.15, 260k ctx.
- **Ling 3.0 Flash** (Ant/InclusionAI): 338 t/s, free variants, domain variants (Fin/Sante/VL).
- Latency kings: Gemini 2.5 Flash-Lite 0.30s, North Mini Code 0.38s, Command A+ 0.41s, Granite 4.2 3B 0.46s.
- **Trinity Large Thinking** (Arcee): 330 t/s reasoning.

### 1.5 New labs / models missing from the registry

Worth new entries or provider additions:

| Lab | Model(s) | Why it matters |
|---|---|---|
| **Celeris** | Celeris-1 | Speed record (1,492 t/s) |
| **Upstage** (Korea) | Solar Pro 4 (512k), Solar Mini 4 (shipped Sep 23), Solar Open2 250B (1.05M, open) | New national champion, launch-day |
| **Sapiens AI** | Agnes 3.0 Flash (AA 36*), Agnes 2.5 Pro Beta | Surprise new entrant |
| **Motif Technologies** | Motif 3 (AA 34*) | New closed lab |
| **Nex AGI** | Nex-N2.5 Pro/Mini (open, free tiers) | Open weights |
| **Institute of Foundation Models** | K2 Horizon 375B-A23B, MoVA 36B, 7B, K2 Think V2 | New open family |
| **Multiverse Computing** | Quasar 438B (AA 27, 142 t/s), HyperNova 60B | Quantum-inspired compression |
| **Mistral** | **Devstral 2 / Devstral Small 2 ($0.00** — free coding agents), Mistral Small 4 | Notable free tier |
| **China Mobile** | JT-4.1 Flash 236B-A21B, JT-35B-Flash | Telecom giant enters |
| Others | Prism ML Ternary Bonsai 2 27B (ternary quant), Inference Net Schematron v2, Unbiased Pareto, AI9Stars G9v3, KwaiKAT KAT-Coder-Pro V2, Sarvam 105B (India), LG EXAONE 4.5, SK Telecom A.X-K2, Naver HyperCLOVA X SEED, KT Mi:dm K, Trillion Labs Tri-21B, Nous Hermes 4, Liquid LFM2.5, OpenBMB MiniCPM5 | Long tail for the catalog |

### 1.6 Benchmark glossary additions (benchmarks.ts)

- **AA Cost per Intelligence Index task** — the single best "value" metric; AA publishes it per model. Add as a first-class `price`-format entry.
- **AutomationBench-AA** (agentic SaaS workflows, Zapier-run)
- **Terminal-Bench-Science 0.1**, **FrontierCode v1.1**, **CursorBench 4.0**, **Chartography**
- **Harvey LAB-AA** (legal), **MLCR-AA** (medical long-context), **τ³-Banking**, **ITBench-AA**, **EnterpriseOps-Gym-AA**, **AA-AnalystAgent**, **MMMU-Pro**
- Update AA Intelligence Index description (v4.3.2, 10 evals, effort tiers).
- Consider an **verbosity** glossary note (output tokens per task).

### 1.7 Industry/news feed items to add

1. Claude Opus 5.5 launch + records (Sep 22) — *already partially covered; add benchmarks follow-up*
2. Dario Amodei's **"We Must Pace the Frontier"** (industry)
3. **Model Hardware Standard** research preview (Aug 27) — spec for agents operating physical devices
4. **Life Sciences Verification Program** (Sep 17), **Accenture embedded-evaluation** partnership (Sep 18)
5. September **threat intelligence report** — industrial distillation attacks disrupted
6. Claude text watermark explainer (Aug 14)
7. Grok 4.7 launch + price drop (Sep 21)
8. MiMo V2.6 Pro/Flash/UltraSpeed (Sep 21); Qwen 3.8 Omni Flash (Sep 21); GLM-5.3 FlashX (Sep 18)
9. Celeris-1 speed record; Upstage Solar Mini 4 (Sep 23); Mercury 2.5
10. Gemini 3.8 Live + 3.5 Transcribe (real-time voice API); Lyria 3.5; Gemini app on Windows; DevFest 2026

### 1.8 Structural insight: effort ladders are now universal

Opus 5.5, Fable 5.1, GPT-6 Astra/Sol/Luna, Grok 4.6/4.7, Muse Spark, Qwen — every
flagship now ships a low→max effort ladder where intelligence, cost, latency and
verbosity all move. The current `Model` type can't express this. **The site's
biggest data-model opportunity** is treating effort tiers as first-class (see 2.1),
because it enables the killer feature: *same model, five price points* comparisons.

---

## Part 2 — Content update plan (prioritized)

### Phase 1 — Fix the #1 story (highest impact, ~1 day)

1. **`claude-opus-5-5`** — full rewrite of registry entry + MDX:
   - AA 58, all benchmark scores from 1.1, full pricing incl. cache/batch/fast mode
   - New `effortLadder` data (see schema below)
   - New tagline: *"The new #1 — Fable-class intelligence at 40% less than Opus 5"*
2. **`src/app/page.tsx`** — podium now ranks Opus 5.5 (58) first; hero stat card
   53.4 → 58; add Opus 5.5 to the hero card stack; "last checked" → Sep 23.
3. **`src/data/news.ts`** — Opus 5.5 benchmarks item, Sonnet/Haiku 5.5 roadmap item.

### Phase 2 — Backfill scores for existing entries (~1 day)

4. GPT-6 Sol: AA ladder + speed + cost/task; flag 872k-vs-1.05M context discrepancy.
5. GPT-6 Luna: AA ladder + "lowest cost/task on the board ($0.0045)".
6. GPT-6 Astra: full effort ladder 53/52/51/50/46.
7. Fable 5.1: GDPval 1735, HLE 65.6%, OSWorld 80.7%, TB 55.8%, effort ladder 53/53/51/49/47.
8. Grok 4.7: AA 46, new pricing $1.60/$4.80, cutoff May 2026.
9. Muse Spark 1.3: AA 48/45, 219–228 t/s.
10. Gemini 3.8 Flash: AA 41/40, 276 t/s. Qwen 3.8 Max: AA 45 + 2.4T-A95B variant.
11. DeepSeek V4.1 Flash: AA 39, 227 t/s. Kimi K3: AA 44/34. Step: AA 44 (Step 5 Preview).
12. Mercury 2: 750 t/s + Mercury 2.5. GLM-5.3: AA 45/42 + FlashX variant.

### Phase 3 — New model pages (~1–2 days)

13. **Celeris-1** (Celeris) — new provider `celeris`.
14. **Upstage Solar Pro 4 / Solar Mini 4 / Solar Open2** — new provider `upstage`.
15. **Step 5 Preview** (own entry, separate from `step` catch-all).
16. **Muse Glimmer**, **Ling 3.0 Flash**, **Devstral 2**, **Mercury 2.5**,
    **DeepSeek V4 Flash Vision**, **Kimi Linear 48B**.
17. New providers worth pages: Sapiens AI, Motif Technologies, Nex AGI,
    Institute of Foundation Models, Multiverse Computing, China Mobile.
18. Long-tail batch (one grouped entry per lab, like `step`/`ling` today):
    Prism ML, Inference Net, Unbiased, Sarvam, LG, SKT, Naver, KT, Trillion,
    AI9Stars, KwaiKAT, Nous, Liquid, OpenBMB, Arcee.

### Phase 4 — Benchmarks & glossary (~0.5 day)

19. Add benchmark entries from 1.6; update AA index description; add
    "cost per task" explainer with the "value quadrant" concept.

### Phase 5 — News backlog (~0.5 day)

20. Items from 1.7, backdated correctly.

### 2.1 Schema changes to support this (`src/data/models.ts`)

```ts
export type EffortTier = {
  effort: "low" | "medium" | "high" | "xhigh" | "max" | string;
  aa?: number;            // AA Intelligence Index at this effort
  costPerTask?: number;   // USD per AA task
  speed?: number;         // tokens/s
  latency?: number;       // seconds to first token
};

export type Pricing = {
  input: number | null;
  output: number | null;
  cacheRead?: number | null;
  cacheWrite?: number | null;
  batch?: { input: number | null; output: number | null };
  fastMode?: { input: number | null; output: number | null; multiplier?: string };
  note?: string;
};

export type Model = {
  // ...existing fields
  effortLadder?: EffortTier[];
  costPerTask?: number | null;
  latency?: number | null;
  outputTokensPerIndex?: number | null; // verbosity signal
  priceHistory?: { date: string; input: number | null; output: number | null; note?: string }[];
  sources?: { field: string; url: string; label: string }[];  // provenance
  apiIds?: { openrouter?: string; anthropic?: string; openai?: string }; // copyable slugs
  verifiedOn?: string; // "Sep 23, 2026"
};
```

Also add `providers.ts` entries for the new labs (with brand colors), and a
`scripts/refresh-data.mjs` + weekly GitHub Action that hits OpenRouter's public
`/api/v1/models` (no auth needed) and diffs pricing/context against the registry,
opening an issue when they drift. This operationalizes the "honest numbers" brand.

---

## Part 3 — UI redesign & feature plan

Design direction: keep the current editorial/monospace "measured honestly" identity,
but upgrade from static tables to **interactive tools**. Everything stays
dependency-free (SVG + React client components) to protect the static build.

### 3.1 New interactive tools (the headline features)

1. **Cost Calculator** (`/tools/calculator`, client component)
   - Inputs: tokens in/out per request, requests/day, cache-hit %, batch toggle
   - Multi-select models → monthly cost bars, cheapest-alternative callout
   - Presets: "100 chats/day", "1M-token doc analysis", "agent fleet (sub-agents)"
   - Uses real `pricing` + `cacheRead`/`batch` data; embeddable on model pages

2. **Intelligence vs Cost scatter** (`/tools/value-map`)
   - X: AA index, Y: cost/task (log), provider-colored dots, Pareto frontier line,
     "most attractive quadrant" annotation, click-through to model pages
   - Instantly exposes value picks (MiMo V2.6 Pro: AA 46 at $0.13/task)

3. **Effort Ladder Explorer** (on model pages with `effortLadder`)
   - Slider low→max; animated bars for intelligence/cost/latency per tier
   - Teaches the "same model, five price points" story

4. **Speed Race** (`/tools/speed-race`)
   - Animated bar race of tokens/s (Celeris 1492 → Mercury 750 → Ling 338 → …)
   - "Feel the speed" demo: a sample paragraph streams into boxes at each model's t/s

5. **Context Window Visualizer** (compare page + model pages)
   - Log-scale horizontal bars; human analogues ("1M ≈ 1,500 A4 pages", "10M ≈ 20 novels")

6. **Build-My-Stack recommender** (`/tools/stack`)
   - Pick a use case (coding agent, support bot, RAG, video gen) → recommended
     frontier + workhorse + budget trio with estimated monthly cost; deterministic
     rules over the registry

### 3.2 Upgrades to existing pages

7. **Model page**: effort ladder table, full pricing card (cache/batch/fast),
   embedded mini cost calculator, **radar chart** (normalized vs benchmark max,
   overlay vs a selectable rival), "cheaper/stronger alternative" links (computed
   from registry), copy-to-clipboard API id chips, `verifiedOn` badge.

8. **Compare page**: pin-to-compare from any card (sticky tray → `/compare?models=a,b,c`),
   up to 4 columns, best-in-column highlighting, delta rows, radar overlay,
   export to markdown/CSV/URL share, and a **cost-per-benchmark-point** column
   (`$ per AA index point` — the best value column on the site).

9. **Homepage**: replace static usage bars with a "frontier snapshot" strip —
   #1 intelligence (Opus 5.5 · 58), #1 value (Luna low · $0.0045/task),
   #1 speed (Celeris-1 · 1,492 t/s), #1 cheapest (Granite 3B · $0.01/M) —
   plus a "This week in models" ticker of price drops and launches.

10. **Catalog (`/models`)**: sort by value/speed/cost-per-task; a "new this month"
    filter; provider-color glow on hover; keyboard navigation.

### 3.3 Site-wide polish

11. **⌘K command palette** — fuzzy search models/providers/benchmarks, recent views.
12. **Data provenance UI** — every score hover shows its source; `/changelog` page
    listing data updates (audit trail matching the honesty brand).
13. **OG image generation** per model (Next `ImageResponse`), JSON-LD, sitemap.
14. **MDX components**: `<PriceTable>`, `<EffortLadder>`, `<Stat>`, `<Callout>` for prose.
15. Small delights: "surprise me" model spotlight, subtle provider-accent theming on
    model pages, animated score bars, tabular-nums everywhere.

### 3.4 Suggested phases

| Phase | Scope | Effort |
|---|---|---|
| 1 | Data: Opus 5.5 + podium + news (Part 2, Phases 1–2) | 2 days |
| 2 | Schema (`effortLadder`, pricing detail, sources) + model page upgrades (7) | 2–3 days |
| 3 | Cost calculator + value map (1, 2) + compare upgrades (8) | 3–4 days |
| 4 | New model/provider pages (Part 2, Phases 3–5) | 2 days |
| 5 | Speed race, stack recommender, palette, provenance, OG images | 3–4 days |

---

## Appendix — AA Intelligence Index v4.3.2 snapshot (Sep 23, 2026)

Top entries with cost/task and speed (for backfill reference):

| Model | AA | $/task | t/s | TTFT (s) |
|---|---|---|---|---|
| Claude Opus 5.5 (max) | 58 | $5.98 | — | — |
| Claude Opus 5.5 (xhigh) | 56 | $3.46 | 92 | 155 |
| Claude Opus 5.5 (high) | 54 | $1.82 | 90 | 35 |
| Claude Fable 5.1 (max) | 53 | $7.63 | 65 | 291 |
| GPT-6 Astra (max) | 53 | $3.26 | 53 | 361 |
| GPT-6 Astra (xhigh) | 52 | $2.31 | 53 | 210 |
| Claude Opus 5.5 (medium) | 51 | $1.34 | 75 | 23 |
| GPT-6 Astra (high) | 51 | $1.73 | 49 | 79 |
| GPT-6 Astra (medium) | 50 | $1.54 | 47 | 6 |
| Muse Spark 1.3 (max) | 48 | $1.60 | 219 | 21 |
| GPT-6 Sol (max) | 48 | $1.06 | 126 | 107 |
| Grok 4.7 (xhigh) | 46 | $3.74 | 39 | 0.9 |
| MiMo-V2.6-Pro | 46 | $0.13 | 54 | 2.7 |
| Qwen3.8 Max (0902) | 45 | $5.41 | 39 | 3 |
| GLM-5.3 (max) | 45 | $2.01 | 61 | 3.4 |
| Kimi K3 (max) | 44 | $2.00 | 37 | 4 |
| Step 5 Preview | 44 | $0.72 | 83 | 3.6 |
| GLM-5.3-Flash | 42 | $0.25 | 61 | 3.1 |
| GPT-5.6 Terra (max) | 42 | $1.40 | 82 | 239 |
| Gemini 3.8 Flash (high) | 41 | $1.24 | 276 | 14 |
| Qwen3.8 2.4T-A95B | 40 | $2.16 | 38 | 3 |
| DeepSeek V4.1 Flash (max) | 39 | $0.27 | 227 | 1.1 |
| Claude Sonnet 5 (max) | 38 | $5.09 | 78 | 146 |
| GPT-6 Luna (max) | 37 | $0.07 | 157 | 143 |
| DeepSeek V4 Pro 0813 (max) | 36 | $0.67 | 66 | 1.6 |
| Agnes 3.0 Flash | 36* | — | — | — |
| Gemini 3.1 Pro Preview | 30 | $0.67 | 116 | 24 |
| Inkling | 25 | $0.61 | 107 | 2.3 |
| Gemini 3.5 Flash-Lite | 22 | $0.12 | 357 | 8 |
| Nemotron 3 Ultra | 23 | $0.55 | 157 | 2.4 |
| Muse Glimmer (high) | 17 | $0.06 | 92 | 1.0 |
| Claude 4.5 Haiku | 17 | $0.21 | 109 | 23 |
| Mercury 2 | 14* | — | 750 | 4.7 |
| Mistral Medium 3.5 | 14 | $0.44 | 146 | 2.3 |
| Mistral Large 3 | 9 | $0.10 | 76 | 1.1 |
| Granite 4.2 3B | 9 | $0.01 | 220 | 0.5 |
| Celeris-1 | 6 | $0.05 | 1,492 | 0.6 |

(`*` = provisional/unpriced on AA at capture time.)
