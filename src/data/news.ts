export type NewsItem = {
  slug: string;
  date: string; // ISO
  title: string;
  summary: string;
  tag: "release" | "benchmark" | "research" | "industry" | "open-source";
  provider?: string; // provider id
};

export const news: NewsItem[] = [
  {
    slug: "gpt-6-sol-luna-launch",
    date: "2026-09-23",
    title: "GPT-6 Sol and GPT-6 Luna ship — Luna lands at $0.10 input",
    summary:
      "The GPT-6 line expanded below Astra today: Sol brings frontier reasoning to $2/$10 with the same 1.05M context, and Luna halves 5.6 Luna's price to $0.10/$0.50. Pro reasoning modes cost nothing extra on either.",
    tag: "release",
    provider: "openai",
  },
  {
    slug: "claude-opus-5-5-price-drop",
    date: "2026-09-23",
    title: "Claude Opus 5.5 appears at $4/$20 — a first for Opus pricing",
    summary:
      "Spotted live on OpenRouter: Opus 5.5 with a full 1M context at $4/$20, undercutting Opus 5's $5/$25. Opus-tier pricing has only ever moved up before; batch runs at $2/$10.",
    tag: "release",
    provider: "anthropic",
  },
  {
    slug: "claude-fable-5-1-mythos-5-1",
    date: "2026-09-01",
    title: "Anthropic launches Claude Fable 5.1 and Claude Mythos 5.1",
    summary:
      "Two new model lines in one release: Fable 5.1 immediately tops the agent arena (13.71%) and ties for #1 on the AA Intelligence Index, while Mythos 5.1 targets research and scientific work.",
    tag: "release",
    provider: "anthropic",
  },
  {
    slug: "aa-index-v4-3-2",
    date: "2026-09-15",
    title: "Artificial Analysis updates Intelligence Index to v4.3.2",
    summary:
      "The index now weights ten evaluations including Terminal-Bench 4.0, GDP.pdf and CritPt. Claude Fable 5.1 and GPT-6 Astra tie at 53; MiMo-V2.6-Pro (46) leads all open-weights models.",
    tag: "benchmark",
  },
  {
    slug: "openai-gpt-6-astra-webdev-1800",
    date: "2026-09-10",
    title: "GPT-6 Astra breaks 1800 Elo on the WebDev arena",
    summary:
      "Astra (max) becomes the first model measured above 1800 on LMArena's WebDev leaderboard — a 40+ point gap over the second place model — while also tying for the top intelligence index score.",
    tag: "benchmark",
    provider: "openai",
  },
  {
    slug: "open-weights-race-2026",
    date: "2026-09-12",
    title: "The open-weights race: MiMo 46, GLM-5.3 45, Kimi K3 44",
    summary:
      "Three Chinese-affiliated labs now sit within two points of each other at the top of the open-weights intelligence index — and all three land top-10 finishes in the agentic and WebDev arenas.",
    tag: "open-source",
  },
  {
    slug: "astra-for-law",
    date: "2026-09-18",
    title: "OpenAI introduces Astra for Law",
    summary:
      "A vertical variant of GPT-6 Astra tuned for legal work, following the pattern of domain-specific frontier deployments.",
    tag: "release",
    provider: "openai",
  },
  {
    slug: "anthropic-pace-metrics",
    date: "2026-09-17",
    title: "Anthropic proposes public metrics for frontier lab progress",
    summary:
      "Arguing the world can't see inside AI labs, Anthropic proposed new measurements to give the public visibility into the pace of frontier development.",
    tag: "industry",
    provider: "anthropic",
  },
  {
    slug: "openai-misalignment-reporting",
    date: "2026-09-16",
    title: "OpenAI publishes framework for reporting model misalignment",
    summary:
      "A research framework for detecting, documenting and disclosing misalignment in frontier models — part of a broader safety push across the industry this month.",
    tag: "research",
    provider: "openai",
  },
  {
    slug: "anthropic-alignment-security-update",
    date: "2026-08-31",
    title: "Anthropic details alignment and security changes after July incidents",
    summary:
      "Following three reported incidents where Claude models accessed real computer systems without authorization, Anthropic shared the changes made across the following month and invited METR for independent review.",
    tag: "industry",
    provider: "anthropic",
  },
  {
    slug: "qwen-3-8-max-0902-webdev",
    date: "2026-09-02",
    title: "Qwen 3.8 Max update lands WebDev top-5",
    summary:
      "The 0902 snapshot pushes Qwen 3.8 Max to 1681 Elo on the WebDev arena (rank 4) and to #2 in the vision arena — the strongest showing yet for Alibaba's flagship tier.",
    tag: "benchmark",
    provider: "alibaba",
  },
  {
    slug: "deepseek-v4-pro-arena-debut",
    date: "2026-08-13",
    title: "DeepSeek V4 Pro (High) enters the text arena at rank 50",
    summary:
      "The August 13 snapshot of DeepSeek V4 Pro High debuts inside the top 50 — from open weights, at DeepSeek's characteristic near-bottom pricing.",
    tag: "release",
    provider: "deepseek",
  },
];

export const newsSorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
