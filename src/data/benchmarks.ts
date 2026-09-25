export type Benchmark = {
  id: string;
  name: string;
  source: string;
  scale: string;
  description: string;
  format: "index" | "elo" | "percent" | "price";
};

export const benchmarks: Benchmark[] = [
  {
    id: "aa-intelligence",
    name: "AA Intelligence Index",
    source: "Artificial Analysis",
    scale: "0–100 index",
    format: "index",
    description:
      "A weighted composite of ten independent evaluations (AA-Briefcase, GDPval-AA, AutomationBench-AA, Terminal-Bench 4.0, SciCode, Humanity's Last Exam, GDP.pdf, CritPt, AA-Omniscience and AA-LCR). The single best at-a-glance measure of overall model capability in v4.3.2.",
  },
  {
    id: "lmarena-text",
    name: "LMArena Text Elo",
    source: "LMArena (chat)",
    scale: "Elo (≈1000–1550)",
    format: "elo",
    description:
      "Crowd-sourced Elo from anonymous head-to-head votes on real prompts. Measures human preference across instruction following, writing, reasoning and helpfulness.",
  },
  {
    id: "lmarena-webdev",
    name: "LMArena WebDev Elo",
    source: "LMArena (web dev)",
    scale: "Elo (≈1000–1850)",
    format: "elo",
    description:
      "Models build functional websites and web apps from prompts; humans vote on the better result. The benchmark of record for frontend generation quality.",
  },
  {
    id: "lmarena-agent",
    name: "LMArena Agent",
    source: "LMArena (agent)",
    scale: "% tasks passed",
    format: "percent",
    description:
      "Agentic benchmark measuring end-to-end task completion on real multi-step computer-use work. Low percentages are normal — tasks are genuinely hard.",
  },
  {
    id: "hle",
    name: "Humanity's Last Exam",
    source: "AA / CAIS & Scale AI",
    scale: "% correct",
    format: "percent",
    description:
      "A frontier-knowledge exam of expert questions across mathematics, science and humanities, designed to be near-impossible. Part of the AA intelligence index.",
  },
  {
    id: "ale-bench",
    name: "ALE-Bench",
    source: "Sakana AI",
    scale: "percentile vs human contestants",
    format: "percent",
    description:
      "Long-horizon optimization on score-based programming contests (AtCoder Heuristic Contests). Instead of pass/fail, models iteratively improve solutions to maximize their contest score — measured against human contestants. Rewards persistence and self-improvement, not one-shot answers.",
  },
  {
    id: "terminal-bench",
    name: "Terminal-Bench 4.0",
    source: "Artificial Analysis",
    scale: "% tasks solved",
    format: "percent",
    description:
      "Agentic coding and terminal use: models must navigate real shell environments, build projects and fix failing tasks unaided. Also part of the AA index.",
  },
  {
    id: "aa-briefcase",
    name: "AA-Briefcase v1.1",
    source: "Artificial Analysis",
    scale: "Elo (≈500–2500)",
    format: "elo",
    description:
      "Agentic knowledge work: analytical quality, presentation quality and rubric pass-rate are converted into a combined Elo. A proxy for real office-style work.",
  },
  {
    id: "gdpval-aa",
    name: "GDPval-AA v2.1",
    source: "Artificial Analysis",
    scale: "Elo (≈500–2500)",
    format: "elo",
    description:
      "Agentic real-world work tasks derived from OpenAI's GDPval set, scored by Artificial Analysis. Measures economically valuable output quality.",
  },
  {
    id: "deepswe",
    name: "DeepSWE v1.1",
    source: "Agentica / Google-reported",
    scale: "% tasks resolved",
    format: "percent",
    description:
      "Agentic software engineering: models operate a real terminal and coding environment to resolve tasks end-to-end, over long horizons. Community favourite for spotting under-hyped models — a high DeepSWE score with low buzz (see Gemini 3.8 Flash) is the classic hidden-gem signal.",
  },
  {
    id: "osworld",
    name: "OSWorld-2.0",
    source: "Google-reported",
    scale: "% partial score",
    format: "percent",
    description:
      "Agentic computer use: models complete real tasks inside a full desktop OS — files, browsers, apps. The closest thing to measuring 'can it use a computer like a person'.",
  },
  {
    id: "arc-agi-2",
    name: "ARC-AGI-2",
    source: "ARC Prize Foundation",
    scale: "% solved",
    format: "percent",
    description:
      "Abstract fluid-intelligence puzzles designed to be easy for humans and hard for AI. ARC-AGI-3 (2026) extends this to interactive novel environments where agents must learn the rules by playing. Efficiency matters: cost-per-task is part of the leaderboard.",
  },
  {
    id: "lmarena-vision",
    name: "LMArena Vision Elo",
    source: "LMArena (vision)",
    scale: "Elo (≈1000–1350)",
    format: "elo",
    description:
      "Crowd-sourced Elo for image understanding — models answer questions about images and humans vote on the better response.",
  },
  {
    id: "lmarena-search",
    name: "LMArena Search Elo",
    source: "LMArena (search)",
    scale: "Elo (≈1000–1300)",
    format: "elo",
    description:
      "Search-grounded answers with citations, voted on head-to-head. Measures how well a model finds and synthesizes fresh information.",
  },
  {
    id: "lmarena-t2v",
    name: "LMArena Text-to-Video Elo",
    source: "LMArena (video)",
    scale: "Elo (≈1000–1550)",
    format: "elo",
    description:
      "Prompt-to-video generation, voted head-to-head. The reference leaderboard for generative video models.",
  },
  {
    id: "scicode",
    name: "SciCode",
    source: "Artificial Analysis",
    scale: "% problems solved",
    format: "percent",
    description:
      "Research-level scientific coding problems drawn from physics, chemistry and biology papers. Tests whether models can do real science.",
  },
  {
    id: "aa-omniscience",
    name: "AA-Omniscience",
    source: "Artificial Analysis",
    scale: "−100 to 100 index",
    format: "index",
    description:
      "Knowledge reliability: rewards correct answers, penalises hallucinations, and ignores refusals. A model that says 'I don't know' is not penalised.",
  },
  {
    id: "aa-lcr",
    name: "AA-LCR v1.1",
    source: "Artificial Analysis",
    scale: "% correct",
    format: "percent",
    description:
      "Long-context reasoning: multi-hop questions over documents far beyond typical context tests. Stresses retrieval plus synthesis at scale.",
  },
  {
    id: "critpt",
    name: "CritPt",
    source: "Artificial Analysis",
    scale: "% correct",
    format: "percent",
    description:
      "Graduate-level physics reasoning problems requiring multi-step symbolic work. One of the hardest public science benchmarks.",
  },
  {
    id: "gdp-pdf",
    name: "GDP.pdf",
    source: "Artificial Analysis",
    scale: "% all-pass",
    format: "percent",
    description:
      "Professional document reasoning over messy real-world PDFs — contracts, filings, reports. Scored on strict all-parts-correct criteria.",
  },
  {
    id: "cost-per-task",
    name: "Cost per Intelligence Task",
    source: "Artificial Analysis",
    scale: "USD per task",
    format: "price",
    description:
      "The weighted-average dollar cost to run one task across the AA Intelligence Index, computed from each model's input, cache-hit, cache-write, reasoning and answer token prices. The single best 'value' metric: it captures both sticker price and how many tokens a model burns (verbosity). A cheap model that thinks for 10,000 tokens can cost more per task than a pricier, terser one.",
  },
  {
    id: "automationbench",
    name: "AutomationBench-AA",
    source: "Artificial Analysis / Zapier",
    scale: "% tasks completed",
    format: "percent",
    description:
      "Agentic SaaS workflows — models operate real automation tools to complete multi-step business processes. Zapier runs the public leaderboard, which makes it one of the most 'real job' benchmarks available.",
  },
  {
    id: "frontiercode",
    name: "FrontierCode v1.1",
    source: "Anthropic-reported",
    scale: "% tasks resolved",
    format: "percent",
    description:
      "Agentic software engineering at the frontier: long-horizon coding tasks resolved end-to-end in a real harness. The 'Main' split measures standard difficulty.",
  },
  {
    id: "cursorbench",
    name: "CursorBench 4.0",
    source: "Cursor / provider-reported",
    scale: "% tasks resolved",
    format: "percent",
    description:
      "In-IDE agentic coding: models drive a real editor harness through refactors, fixes and feature work. What code assistants are actually scored on.",
  },
  {
    id: "chartography",
    name: "Chartography",
    source: "Provider-reported",
    scale: "% correct",
    format: "percent",
    description:
      "Visual chart recognition: read values, trends and mislabeled axes from real charts and figures — the skill behind financial and scientific document understanding.",
  },
  {
    id: "terminal-bench-science",
    name: "Terminal-Bench-Science 0.1",
    source: "Public leaderboard",
    scale: "% tasks solved",
    format: "percent",
    description:
      "Agentic scientific research in a terminal: plan experiments, run analyses, and iterate on real computational science tasks end-to-end.",
  },
  {
    id: "aa-coding",
    name: "AA Coding Index",
    source: "Artificial Analysis",
    scale: "0–100 index",
    format: "index",
    description:
      "Aggregated coding benchmark: Fable 5.1 leads at 81.6%, followed by Claude Opus 5 (78.0%) and GPT-5.6 Sol (77.4%). Display-only as of v4.3.2 — excluded from the overall AA Intelligence Index scoring formula.",
  },
];

export const benchmarkSourceUrls: Record<string, string> = {
  "aa-intelligence": "https://artificialanalysis.ai/models",
  "lmarena-text": "https://lmarena.ai/leaderboard",
  "lmarena-webdev": "https://lmarena.ai/leaderboard",
  "lmarena-agent": "https://lmarena.ai/leaderboard",
  hle: "https://lastexam.ai",
  "ale-bench": "https://sakana.ai/ale-bench/",
  deepswe: "https://agentica.org/",
  "terminal-bench": "https://www.tbench.ai/",
  "aa-briefcase": "https://artificialanalysis.ai/evaluations/aa-briefcase",
  "gdpval-aa": "https://artificialanalysis.ai/evaluations/gdpval-aa",
  osworld: "https://os-world.github.io/",
  "arc-agi-2": "https://arcprize.org/leaderboard",
  "lmarena-vision": "https://lmarena.ai/leaderboard",
  "lmarena-search": "https://lmarena.ai/leaderboard",
  "lmarena-t2v": "https://lmarena.ai/leaderboard",
  scicode: "https://github.com/scidore/SciCode",
  "gdp-pdf": "https://artificialanalysis.ai/evaluations/gdp-pdf",
  "cost-per-task": "https://artificialanalysis.ai/models",
  "aa-coding": "https://artificialanalysis.ai/models",
};

export const benchmarkMap = new Map(benchmarks.map((b) => [b.id, b]));

export type BenchmarkId = string;

export function formatScore(
  value: number,
  format: Benchmark["format"],
): string {
  if (format === "elo") return Math.round(value).toLocaleString();
  if (format === "percent") return `${value}%`;
  if (format === "price") return `$${value.toFixed(2)}`;
  return String(value);
}
