export type Provider = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  gradient: string;
  tagline: string;
  hq: string;
  founded: string;
  website: string;
  description: string;
  highlights: string[];
};

export const providers: Provider[] = [
  {
    id: "openai",
    name: "OpenAI",
    shortName: "OpenAI",
    color: "#10a37f",
    gradient: "from-emerald-500 to-teal-600",
    tagline: "GPT models and the ChatGPT ecosystem",
    hq: "San Francisco, USA",
    founded: "2015",
    website: "https://openai.com",
    description:
      "OpenAI builds the GPT family of frontier models, the ChatGPT assistant, and the Codex coding agent. In 2026 its flagship line is GPT-6 (Astra), sitting alongside the fast-moving GPT-5.5/5.6 tier and the open-weights GPT-OSS models.",
    highlights: [
      "GPT-6 Astra tops the LMArena WebDev leaderboard",
      "GPT-5.6 ships in three tunings — Sol, Luna and Terra",
      "GPT-OSS 120B is one of the strongest open-weight releases",
    ],
  },
  {
    id: "anthropic",
    name: "Anthropic",
    shortName: "Anthropic",
    color: "#d97757",
    gradient: "from-orange-400 to-amber-600",
    tagline: "Claude models for coding, agents and knowledge work",
    hq: "San Francisco, USA",
    founded: "2021",
    website: "https://anthropic.com",
    description:
      "Anthropic builds the Claude family. In September 2026 it introduced two new lines — Fable and Mythos — alongside the continuing Opus, Sonnet and Haiku tiers. Claude leads the major agent and intelligence leaderboards as of September 2026.",
    highlights: [
      "Claude Fable 5.1 is the #1 model on LMArena (agent + text)",
      "Claude Mythos 5.1 targets research and scientific work",
      "Claude Code is a favourite agentic coding tool",
    ],
  },
  {
    id: "google",
    name: "Google DeepMind",
    shortName: "Google",
    color: "#4285f4",
    gradient: "from-blue-500 to-indigo-600",
    tagline: "Gemini models and the omni-modal line",
    hq: "London, UK & Mountain View, USA",
    founded: "2023 (merger)",
    website: "https://deepmind.google",
    description:
      "Google DeepMind develops the Gemini family — Pro for frontier reasoning, Flash for speed, Flash-Lite for cost, and the Omni line for native video and audio generation. Gemini models ship across Gemini app, Search and Vertex AI.",
    highlights: [
      "Gemini 3.8 Flash is a top-10 text model at Flash prices",
      "Gemini Omni 1.1 Flash leads text-to-video arenas",
      "3.5 Flash-Lite is among the fastest mainstream models",
    ],
  },
  {
    id: "xai",
    name: "xAI",
    shortName: "xAI",
    color: "#9ca3af",
    gradient: "from-zinc-400 to-zinc-600",
    tagline: "Grok models with real-time knowledge",
    hq: "Palo Alto, USA",
    founded: "2023",
    website: "https://x.ai",
    description:
      "xAI builds the Grok family, integrated with X (Twitter) for real-time context. Grok 4.x models are strong generalists, and the Grok Imagine line covers image and video generation.",
    highlights: [
      "Grok 4.20 beta offers a 2M-token context window",
      "Grok 4.6 pushes reasoning quality forward",
      "Grok Imagine 2.0 competes in image editing arenas",
    ],
  },
  {
    id: "meta",
    name: "Meta AI",
    shortName: "Meta",
    color: "#0866ff",
    gradient: "from-sky-500 to-blue-700",
    tagline: "Llama open weights and the new Muse line",
    hq: "Menlo Park, USA",
    founded: "2013 (FAIR)",
    website: "https://ai.meta.com",
    description:
      "Meta's Llama releases made open weights mainstream. In 2026 the Muse Spark line appeared at the very top of chat arenas, while Llama 4 Scout holds one of the largest context windows available (10M tokens).",
    highlights: [
      "Muse Spark 1.3 Max ranks in LMArena's top 10 for text",
      "Llama 4 Scout offers a 10M-token context window",
      "Llama remains the most-deployed open-weight family",
    ],
  },
  {
    id: "deepseek",
    name: "DeepSeek",
    shortName: "DeepSeek",
    color: "#4d6bfe",
    gradient: "from-blue-500 to-violet-600",
    tagline: "Ultra-efficient frontier open weights",
    hq: "Hangzhou, China",
    founded: "2023",
    website: "https://deepseek.com",
    description:
      "DeepSeek became famous for R1 and its radically efficient training. The V4 generation (Pro and Flash) continues that playbook: near-frontier quality at open-weight prices, with V4 Pro entering the arena's top 50 for text.",
    highlights: [
      "V4 Pro High debuted August 2026 on the arenas",
      "V4 Flash targets cheap, fast reasoning",
      "V3.2 remains a workhorse open model",
    ],
  },
  {
    id: "alibaba",
    name: "Alibaba (Qwen)",
    shortName: "Qwen",
    color: "#7c3aed",
    gradient: "from-violet-500 to-purple-700",
    tagline: "The Qwen open-model juggernaut",
    hq: "Hangzhou, China",
    founded: "1999 (Alibaba)",
    website: "https://qwen.ai",
    description:
      "Alibaba's Qwen team releases open-weight models at a relentless pace — Max, Plus, Flash and Coder tiers across many sizes. Qwen 3.8 Max is a WebDev arena top-5 model, and the Qwen3 series spans everything from 27B to 397B.",
    highlights: [
      "Qwen 3.8 Max ranks top-5 on the WebDev arena",
      "Qwen3-Coder 480B is a leading open coding model",
      "One of the broadest open catalogs in the industry",
    ],
  },
  {
    id: "moonshot",
    name: "Moonshot AI",
    shortName: "Kimi",
    color: "#0ea5e9",
    gradient: "from-sky-400 to-cyan-600",
    tagline: "Kimi — open models with frontier ambition",
    hq: "Beijing, China",
    founded: "2023",
    website: "https://moonshotai.com",
    description:
      "Moonshot's Kimi models are the strongest open agentic models in the world right now. Kimi K3 (Max) ranks in the top 10 of both the agent arena and WebDev arena, while staying fully open-weight.",
    highlights: [
      "Kimi K3 Max: top-3 open model by intelligence index",
      "Top-10 agent arena finisher (6.22%)",
      "K2.5 Thinking brings strong reasoning to the K-series",
    ],
  },
  {
    id: "zai",
    name: "Z.ai (Zhipu)",
    shortName: "Z.ai",
    color: "#6366f1",
    gradient: "from-indigo-500 to-blue-700",
    tagline: "GLM models, born from Tsinghua research",
    hq: "Beijing, China",
    founded: "2019",
    website: "https://z.ai",
    description:
      "Zhipu (now Z.ai) develops the GLM family. GLM-5.3 Max is the #2 open-weight model on the Artificial Analysis intelligence index, and the GLM line is known for excellent price-performance and strong agentic behaviour.",
    highlights: [
      "GLM-5.3 Max: #2 open-weights intelligence score (45)",
      "GLM-5.x family spans max to flash tiers",
      "Strong presence in agentic coding harnesses",
    ],
  },
  {
    id: "xiaomi",
    name: "Xiaomi",
    shortName: "Xiaomi",
    color: "#ff6900",
    gradient: "from-orange-400 to-red-600",
    tagline: "MiMo — the surprise open-weights leader",
    hq: "Beijing, China",
    founded: "2010",
    website: "https://xiaomiat.com",
    description:
      "Best known for phones, Xiaomi quietly built one of the best open-weight models of 2026. MiMo-V2.6-Pro currently tops the open-weights intelligence index at 46, ahead of GLM-5.3 and Kimi K3.",
    highlights: [
      "MiMo-V2.6-Pro: #1 open model on AA intelligence index",
      "MiMo v2 line spans pro, omni and flash variants",
      "Strong efficiency per active parameter",
    ],
  },
  {
    id: "minimax",
    name: "MiniMax",
    shortName: "MiniMax",
    color: "#ef4444",
    gradient: "from-red-400 to-rose-600",
    tagline: "Efficient MoE models and media generation",
    hq: "Shanghai, China",
    founded: "2022",
    website: "https://minimax.io",
    description:
      "MiniMax builds the M-series of mixture-of-experts language models plus strong image/video generators. MiniMax M3 is a solid arena performer, and MiniMax H3 competes in video arenas.",
    highlights: [
      "M3 is a mid-80s arena rank generalist",
      "M2.x series popular for cheap agentic work",
      "H3 video model competes with big-budget rivals",
    ],
  },
  {
    id: "baidu",
    name: "Baidu",
    shortName: "Baidu",
    color: "#2932e1",
    gradient: "from-blue-600 to-indigo-800",
    tagline: "Ernie models for the Chinese market",
    hq: "Beijing, China",
    founded: "2000",
    website: "https://baidu.com",
    description:
      "Baidu's Ernie (Wenxin) models power its search and cloud ecosystem. Ernie 5.0 and 5.1 are capable multimodal models that place in the arena's top 50 for text.",
    highlights: [
      "Ernie 5.1 ranks #43 in text arena (+7 vs 5.0)",
      "Strong Chinese-language and multimodal focus",
      "Deep integration with Baidu Search ecosystem",
    ],
  },
  {
    id: "tmi",
    name: "Thinking Machines",
    shortName: "TMI",
    color: "#94a3b8",
    gradient: "from-slate-400 to-slate-600",
    tagline: "Mira Murati's lab and the Inkling models",
    hq: "San Francisco, USA",
    founded: "2025",
    website: "https://thinkingmachines.ai",
    description:
      "Founded by former OpenAI CTO Mira Murati, Thinking Machines entered the leaderboard in 2026 with Inkling and Inkling Small — dark-horse models that immediately ranked in the arena's top 90 for text.",
    highlights: [
      "Inkling debuted straight into the arena top-90",
      "Research-first culture from a star-studded team",
      "One to watch for the next generation",
    ],
  },
  {
    id: "mistral",
    name: "Mistral AI",
    shortName: "Mistral",
    color: "#fa520f",
    gradient: "from-orange-500 to-yellow-500",
    tagline: "European champion of open and efficient AI",
    hq: "Paris, France",
    founded: "2023",
    website: "https://mistral.ai",
    description:
      "Mistral pairs open-weight releases with European sovereign-cloud ambitions. Mistral Large 3 and the Medium 3.5 tier keep it competitive, and Magistral brings reasoning to the lineup.",
    highlights: [
      "Mistral Large 3 is a top-140 arena model",
      "Medium 3.5 tuned for enterprise efficiency",
      "Le Chat is Europe's flagship assistant",
    ],
  },
];

export const providerMap = new Map(providers.map((p) => [p.id, p]));

export function getProvider(id: string): Provider {
  const p = providerMap.get(id);
  if (!p) throw new Error(`Unknown provider: ${id}`);
  return p;
}
