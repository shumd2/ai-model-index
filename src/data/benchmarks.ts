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
    id: "deepswe",
    name: "DeepSWE",
    source: "Agentica",
    scale: "% tasks resolved",
    format: "percent",
    description:
      "Agentic software engineering: models operate a real terminal and coding environment to resolve tasks end-to-end. Community favourite for spotting under-hyped models — a high DeepSWE score with low buzz (see Gemini 3.8 Flash) is the classic hidden-gem signal.",
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
];

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
