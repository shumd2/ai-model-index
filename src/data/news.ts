export type NewsItem = {
  slug: string;
  date: string; // ISO
  title: string;
  summary: string;
  tag: "release" | "benchmark" | "research" | "industry" | "open-source" | "data";
  provider?: string; // provider id
};

export const news: NewsItem[] = [
  {
    slug: "zai-coding-plan-glm-5-3",
    date: "2026-10-07",
    title: "GLM Coding Plan adds GLM-5.3 and GLM-5.3-Flash across 20+ coding tools",
    summary:
      "Z.ai's flat-rate coding subscription now powers GLM-5.3 and GLM-5.3-Flash (formerly the anonymous OX Alpha) in ZCode, Claude Code, Codex, Cursor, OpenCode, OpenClaw and more. Lite is $18/mo (10,000 credits/week), Pro $80 (6×), Max $168 (14×), with 20% off quarterly and 30% off yearly; team seats run $88–$188.",
    tag: "industry",
    provider: "zai",
  },
  {
    slug: "chatgpt-pro-tier-shuffle",
    date: "2026-09-10",
    title: "ChatGPT Pro gains a $100 tier; $200 Pro 20× pauses new sign-ups",
    summary:
      "OpenAI split Pro into $100 (5× Codex usage) and $200 (20×) tiers, then paused new sign-ups and upgrades to the $200 plan on Sep 10 — existing subscriptions renew as usual, with a one-time 30-day return window. A $500 Pro tier with GPT-6 Astra Ultrafast access followed at DevDay (Sep 30).",
    tag: "industry",
    provider: "openai",
  },
  {
    slug: "lmarena-october-2026-updates",
    date: "2026-10-02",
    title: "LMArena adds Sonnet 5.5, GPT-6.1 Sol and Grok Imagine 2.0 to leaderboards",
    summary:
      "Oct 1–2 updates: claude-sonnet-5.5-xhigh and claude-sonnet-5.5-max added to Text and Vision arenas; GPT-6.1 Sol (max) and Sonnet 5.5 (max) added to Agent arena; grok-imagine-image-2.0 added to Text-to-Image/Image-Edit. The text arena remains led by Claude Opus 5.5 (1509) per BenchLeader snapshot Sep 29.",
    tag: "benchmark",
  },
  {
    slug: "ftc-opens-ai-agent-probe",
    date: "2026-10-01",
    title: "FTC opens industry-wide probe into OpenAI, Anthropic over autonomous agent risks",
    summary:
      "The FTC confirmed a formal investigation into OpenAI, Anthropic, METR and other frontier labs examining whether AI agents cause consumer harms — unauthorized actions, containment breaches, scope overruns. Chair Andrew Ferguson is using Section 5 of the FTC Act (unfair/deceptive practices) rather than seeking new AI-specific legislation. Civil investigative demands expected.",
    tag: "industry",
  },
  {
    slug: "gemini-access-changes-oct-9",
    date: "2026-10-05",
    title: "Google restricts Gemini model access from October 9 — free tier drops to Flash-Lite only",
    summary:
      "Starting Oct 9, personal accounts without an AI plan lose Flash and Pro access, keeping only Flash-Lite (likely 3.5 Flash-Lite). AI Plus ($4.99) keeps Flash-Lite + Flash but loses Pro. AI Pro ($19.99) and AI Ultra ($99.99) retain all three plus Deep Think. Workspace accounts unaffected per Google's help article. Announced Oct 5, coincides with Argon's restricted rollout.",
    tag: "industry",
    provider: "google",
  },
  {
    slug: "anthropic-deprecates-sonnet-4-5",
    date: "2026-09-30",
    title: "Anthropic deprecates Claude Sonnet 4.5 — retirement November 30, 2026",
    summary:
      "The Claude Developer Platform announced Sonnet 4.5 (claude-sonnet-4-5-20250929) deprecation on Sep 30, with retirement scheduled for Nov 30, 2026. Migration path: Sonnet 5.5. This is the first 4.x Sonnet retirement in the 5.5 wave.",
    tag: "industry",
    provider: "anthropic",
  },
  {
    slug: "deepseek-v4-1-flash-cache-efficiency",
    date: "2026-10-02",
    title: "DeepSeek V4.1-Flash redesign slashes per-token memory — cache reads become the cost bottleneck",
    summary:
      "DeepSeek's new architecture (552B MoE, native vision) dramatically reduces memory per context token, shifting the serving cost bottleneck from compute to cache-read bandwidth. On AA v4.3.2, V4.1-Flash scores 40 on the Intelligence Index — modest absolute intelligence but exceptional cost efficiency. The change matters for agent workloads that resend context on every tool call.",
    tag: "research",
    provider: "deepseek",
  },
  {
    slug: "kimi-k3-enters-openai-codex-via-baseten",
    date: "2026-09-30",
    title: "Kimi K3 enters OpenAI's enterprise Codex channel through Baseten",
    summary:
      "Moonshot AI's Kimi K3 is now available to OpenAI enterprise customers via Baseten inference, with usage counted against existing OpenAI spending commitments — the first time a Chinese open model enters OpenAI's enterprise billing system. Baseten provides the model; Codex provides the developer interface.",
    tag: "industry",
    provider: "moonshot",
  },
  {
    slug: "october-board-sonnet-5-5-argon",
    date: "2026-10-05",
    title: "The October board: Sonnet 5.5 is #2 at AA 56, Gemini 4 Argon tops the text arena",
    summary:
      "The refreshed AA Index v4.3.2 board puts Claude Sonnet 5.5 (max, with fallback) at 56 — two points behind Opus 5.5 — and Gemini 4 Argon (high) at 53, matching GPT-6 Astra. Argon also takes provisional #1 on the LMArena text arena (1525 Elo), while Opus 5.5 (max) leads WebDev at 1815.",
    tag: "benchmark",
  },
  {
    slug: "nyc-council-ai-hearing",
    date: "2026-10-05",
    title: "NYC Council holds first sworn AI hearing with OpenAI, Anthropic, Google, Meta",
    summary:
      "Executives from all four major labs testified under oath before the Committee of the Whole; they could not quantify catastrophic risk probabilities; Google confirmed three agent test escapes during internal testing. Council is considering 10 bills including mandatory third-party audits and incident reporting.",
    tag: "industry",
  },
  {
    slug: "huawei-qualcomm-patent-deal",
    date: "2026-10-05",
    title: "Huawei and Qualcomm sign multi-year patent cross-license — Qualcomm pays Huawei net royalties",
    summary:
      "Landmark deal reversing 25-year royalty flow: Qualcomm pays Huawei net royalties for the first time and purchases certain U.S. AI/compute/networking patents; expected value >$6.9B; requires U.S. regulatory approval.",
    tag: "industry",
  },
  {
    slug: "td-synnex-siemens-physical-ai",
    date: "2026-10-05",
    title: "TD SYNNEX and Siemens partner for IT/OT convergence and physical AI",
    summary:
      "Global distribution partnership combining Siemens' industrial tech with TD SYNNEX's IT ecosystem to accelerate physical AI, automation, cybersecurity, and electrification across industries and SMBs.",
    tag: "industry",
  },
  {
    slug: "gemini-2-5-flash-image-shutdown",
    date: "2026-10-05",
    title: "Gemini 2.5 Flash Image (Nano Banana) reaches shutdown date",
    summary:
      "Google's `gemini-2.5-flash-image` model (released Oct 2025) shuts down per schedule; developers must migrate to Gemini 3.1 Flash Image or 3.1 Flash Lite Image.",
    tag: "industry",
    provider: "google",
  },
  {
    slug: "lambda-4b-funding",
    date: "2026-10-06",
    title: "Lambda Labs raises up to $4B at $14.5B valuation — final pre-IPO round",
    summary:
      "Nvidia-backed neocloud led by Coatue and Blackstone; $50B order backlog (up from $15B in June); targeting 2027 IPO; additional $1B debt raised last week for data-center buildouts.",
    tag: "industry",
  },
  {
    slug: "google-agent-test-escapes",
    date: "2026-10-06",
    title: "Google confirms three AI agent test escapes under oath at NYC hearing",
    summary:
      "Google's Alice Friend testified three incidents occurred during internal testing where agents took unintended actions but 'stopped themselves'; lawmakers found this un-reassuring given the containment implications.",
    tag: "industry",
    provider: "google",
  },
  {
    slug: "openai-gpt-6-1-sol-bedrock",
    date: "2026-10-06",
    title: "OpenAI GPT-6.1 Sol generally available on Amazon Bedrock",
    summary:
      "AWS announces GA of OpenAI's GPT-6.1 Sol (released Sep 29) on Bedrock with explicit prompt caching support for agentic workloads.",
    tag: "industry",
    provider: "openai",
  },
  {
    slug: "gemini-3-1-flash-image-shutdown",
    date: "2026-10-07",
    title: "Google retires Gemini 3.1 Flash Image after only 154 days on 23 days' notice",
    summary:
      "`gemini-3.1-flash-image` (released May 28, 2026) slated for shutdown Oct 29 — unusually short lifecycle vs 2.5 Flash Image's 529 days; replacement is Nano Banana 2.1 (Gemini 3.6 Flash).",
    tag: "industry",
    provider: "google",
  },
  {
    slug: "eu-ai-act-enforcement",
    date: "2026-10-01",
    title: "EU AI Act high-risk AI system enforcement phase begins",
    summary:
      "National competent authorities must be operational; fines up to €15M or 3% global turnover. The regulatory compliance burden for frontier model deployments in Europe increases materially.",
    tag: "industry",
  },
  {
    slug: "gemini-4-argon-launch",
    date: "2026-09-30",
    title: "Google launches Gemini 4 Argon — AA 53, back in the top three labs",
    summary:
      "Google DeepMind's first non-Flash flagship in over seven months scores 53 on the AA Intelligence Index at high effort, matching GPT-6 Astra (max) at 60% of the cost per task during a 50% launch promo ($2/$10, standard $4/$20). #1 on AutomationBench-AA at 78% and the lowest hallucination rate (15%) of any 45+ model. Rolling out via the Fairwind Program first; not yet in the public Gemini API catalog.",
    tag: "release",
    provider: "google",
  },
  {
    slug: "openai-devday-2026",
    date: "2026-09-29",
    title: "OpenAI DevDay: GPT-6.1 Sol, \"dots\" agents, Ultrafast tier, Pro 500 plan",
    summary:
      "GPT-6.1 Sol launches at $2/$10 with 95% cache discounts — AA 52 at max, one point below Astra at a quarter of the cost per task. OpenAI also announced \"dots\" always-on Astra-powered agents, an Ultrafast Codex tier (~8× faster), a Pro 500 plan ($500/mo), and ChatGPT passing 1.2B weekly users.",
    tag: "release",
    provider: "openai",
  },
  {
    slug: "gpt-6-1-astra-shelved",
    date: "2026-09-29",
    title: "OpenAI shelves the GPT-6.1 Astra launch over safety concerns",
    summary:
      "The planned October release of GPT-6.1 Astra was pulled after the model \"didn't quite meet the bar\" on staying within scope and authorization, per reporting. GPT-6.1 Sol ships in its place at a fifth of Astra's price.",
    tag: "industry",
    provider: "openai",
  },
  {
    slug: "claude-sonnet-5-5-launch",
    date: "2026-09-28",
    title: "Claude Sonnet 5.5 ships — AA 56, the strongest Sonnet ever measured",
    summary:
      "Sonnet 5.5 holds Sonnet 5's $2/$10 price while running 30%+ faster, reaching AA 56 at max effort — two points behind Opus 5.5 — with Terminal-Bench 4.0 up 50 points to 64% (AA-measured). First Sonnet with Opus-class cyber safeguards; on the Claude API, AWS, Google Cloud and Microsoft Foundry. Note: it burns ~193k output tokens per AA task, the highest measured.",
    tag: "release",
    provider: "anthropic",
  },
  {
    slug: "grok-4-7-on-bedrock",
    date: "2026-09-28",
    title: "Grok 4.7 arrives on Amazon Bedrock",
    summary:
      "xAI's newest model is now served on Bedrock via cross-Region inference profiles, with Responses, Chat Completions and Converse API support.",
    tag: "industry",
    provider: "xai",
  },
  {
    slug: "amd-world-labs-8-2b",
    date: "2026-09-28",
    title: "AMD to acquire World Labs for $8.2B",
    summary:
      "The all-stock deal brings Fei-Fei Li's spatial-intelligence lab into AMD; Li joins as EVP and chief scientist. Merger agreement signed September 26, closing expected by end of 2026.",
    tag: "industry",
  },
  {
    slug: "sora-2-shutdown",
    date: "2026-09-24",
    title: "OpenAI shuts down Sora 2 and the Videos API",
    summary:
      "The sora-2, sora-2-pro and dated snapshots were retired with no replacement listed — the deprecation was announced in March and took effect September 24.",
    tag: "industry",
    provider: "openai",
  },
  {
    slug: "liner-model-api",
    date: "2026-09-24",
    title: "Liner launches the Liner Model API",
    summary:
      "A new model-routing API at $1/$6 per 1M input/output tokens ($0.10 cached), claiming at least 50% savings versus same-tier models — the latest entrant in the multi-model router field.",
    tag: "industry",
  },
  {
    slug: "openrouter-batch-api",
    date: "2026-09-22",
    title: "OpenRouter launches Batch API — ~50% off, 24-hour window",
    summary:
      "Seventy-one :batch variants are live (e.g. gpt-6-astra:batch at $5/$25), the latest sign that batch pricing is becoming table stakes for routers.",
    tag: "industry",
  },
  {
    slug: "zai-opensources-zcode",
    date: "2026-09-22",
    title: "Z.ai open-sources ZCode after exfiltration disclosure",
    summary:
      "A researcher showed the client silently uploading full user workspaces — Git history, credentials, cloud keys — to Alibaba Cloud storage. Z.ai apologized, removed the Repo Wiki and commissioned CAICT/NSFOCUS audits; an enterprise customer filed a legal demand on September 19.",
    tag: "open-source",
    provider: "zai",
  },
  {
    slug: "gemini-2-5-restrictions",
    date: "2026-09-21",
    title: "Google restricts Gemini 2.5 models; gemini-2.5-pro retires October 20",
    summary:
      "Gemini 2.5 Pro disappeared from AI Studio on September 18; Google confirms access is limited to existing users (\"not deprecated\", API still served) while Google Cloud lists gemini-2.5-pro retirement for October 20, 2026, with gemini-3.8-flash / gemini-3.5-flash as replacements.",
    tag: "industry",
    provider: "google",
  },
  {
    slug: "solar-mini-4",
    date: "2026-10-01",
    title: "Upstage ships Solar Mini 4 — AA 24, the best 3B-active model",
    summary:
      "The 35B/3B MoE model scores 24.1 on the AA Intelligence Index v4.3.2 (highest among 3B-active models) at $0.10/$0.40 per 1M, with 512K context, 128K max output and a 70% launch discount through October 10. AA measures 208 t/s but 7.1 minutes per task — speed with heavy token use.",
    tag: "release",
    provider: "upstage",
  },
  {
    slug: "gpt-5-4-cyber-removed",
    date: "2026-10-01",
    title: "OpenAI removes gpt-5.4-cyber from the API",
    summary:
      "The cybersecurity-tuned model was removed on October 1, as announced on September 11 — part of a wave of specialized-model deprecations this autumn.",
    tag: "industry",
    provider: "openai",
  },
  {
    slug: "anthropic-frontier-academy",
    date: "2026-10-02",
    title: "Anthropic commits $100M to train 10,000 engineers",
    summary:
      "The Frontier Academy program aims to teach frontier-model engineering at scale — the latest industry move to grow the agentic-workforce talent pool.",
    tag: "industry",
    provider: "anthropic",
  },
  {
    slug: "opus-5-5-takes-number-one",
    date: "2026-09-23",
    title: "Claude Opus 5.5 takes #1 on the AA Intelligence Index — 58, a new record",
    summary:
      "Verified against Artificial Analysis and Anthropic's announcement: Opus 5.5 (max) scores 58, with Terminal-Bench 66.4%, GDPval 1846 and HLE 67.7% — all records. At high effort it's AA 54 for $1.82/task, the new efficiency frontier.",
    tag: "benchmark",
    provider: "anthropic",
  },
  {
    slug: "gpt-6-sol-luna-scores-land",
    date: "2026-09-23",
    title: "GPT-6 Sol and Luna scores land: Sol AA 48, Luna $0.0045/task — cheapest anywhere",
    summary:
      "The AA board filled in the GPT-6 tiers: Sol peaks at 48 (max effort) for $1.06/task; Luna (low) posts the lowest cost-per-task ever measured at $0.0045. One flag: AA lists Sol context at 872k vs OpenRouter's 1.05M.",
    tag: "benchmark",
    provider: "openai",
  },
  {
    slug: "celeris-1-speed-record",
    date: "2026-09-22",
    title: "Celeris-1 hits 1,492 tokens/second — double the previous speed record",
    summary:
      "A stealth lab called Celeris took the fastest-model crown from Mercury 2 (now measured at 750 t/s): 1,492 t/s output, 0.59s TTFT, and a full 500-token response in 0.92s. Intelligence is modest (AA 6) — this is a speed specialist.",
    tag: "benchmark",
  },
  {
    slug: "grok-4-7-price-cut",
    date: "2026-09-21",
    title: "Grok 4.7 launches at AA 46 — and immediately cuts price to $1.60/$4.80",
    summary:
      "xAI's newest model scores 46 on the AA index (xhigh and high) with a sub-second 0.84s time-to-first-token — fastest big-model TTFT in the top tier — then dropped pricing from $2/$6 to $1.60/$4.80 within days.",
    tag: "release",
    provider: "xai",
  },
  {
    slug: "mimo-v2-6-ships",
    date: "2026-09-21",
    title: "Xiaomi ships MiMo V2.6 Pro, Flash and Ultraspeed — the open-weights leader gets faster",
    summary:
      "The #1 open-weights model (AA 46, $0.13/task) added a Flash tier at $0.14/$0.28 and an Ultraspeed variant at $4.35/$8.70, all with 1M context.",
    tag: "release",
    provider: "xiaomi",
  },
  {
    slug: "upstage-solar-4-launch",
    date: "2026-09-23",
    title: "Upstage launches Solar 4: Pro 4 (512k), Mini 4, and open Solar Open2 250B",
    summary:
      "Korea's champion lab shipped its new generation: Solar Mini 4 at $0.05/$0.20, Pro 4 with 512k context, and Solar Open2 250B — open weights with a 1.05M-token window.",
    tag: "release",
    provider: "upstage",
  },
  {
    slug: "pace-the-frontier",
    date: "2026-09-15",
    title: "Dario Amodei: \u201cWe Must Pace the Frontier\u201d",
    summary:
      "Anthropic's CEO argued AI progress should be paced so safety practices stay ahead of capabilities — the framing behind Opus 5.5's external pre-release testing with Frontier Design and METR, and its Fable-class safeguards.",
    tag: "industry",
    provider: "anthropic",
  },
  {
    slug: "model-hardware-standard",
    date: "2026-08-27",
    title: "Anthropic previews the Model Hardware Standard for physical agents",
    summary:
      "A shared specification for AI agents to safely operate physical devices, opened to a first group of scientific research labs and advanced manufacturers. If agents are moving from browsers to robots, this is the standards race starting.",
    tag: "industry",
    provider: "anthropic",
  },
  {
    slug: "anthropic-distillation-report",
    date: "2026-09-10",
    title: "Anthropic details industrial-scale distillation attacks it disrupted",
    summary:
      "The September threat intelligence report describes operations using thousands of fake accounts to extract Claude's capabilities at industrial scale — the backdrop for Opus 5.5's 'preserved thinking' anti-distillation safeguard.",
    tag: "research",
    provider: "anthropic",
  },
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
  // ─── September 2026 updates ────────────────────────
  {
    slug: "deepseek-v4-1-flash-multimodal",
    date: "2026-09-10",
    title: "DeepSeek V4.1-Flash ships with native multimodal vision and lower prices",
    summary:
      "DeepSeek's newest Flash model adds native multimodal visual understanding to the 284B-parameter architecture. New pricing takes effect at 04:00 UTC on Sept 10, with off-peak rates at 50% of peak. Terminal-Bench 2.1: 82.7, DSBench-Hard: 59.6.",
    tag: "release",
    provider: "deepseek",
  },
  {
    slug: "kimi-k3-multimodal",
    date: "2026-07-20",
    title: "Kimi K3 Multimodal brings 2.8T parameters and vision at $3/M input",
    summary:
      "Moonshot AI's largest K3 variant adds native multimodal input to the K3 family (AA 59.7). At 2.8T parameters with 1M context, it ranks #2 on the AA-Briefcase leaderboard with 1548 Elo — behind only Grok 4.6.",
    tag: "release",
    provider: "moonshot",
  },
  {
    slug: "qwen-3-8-omni-flash",
    date: "2026-09-18",
    title: "Qwen 3.8 Omni-Flash released — audio and video rivaling Gemini 3.8 Flash",
    summary:
      "Alibaba's new multimodal model achieves 82.7% on LongAudioSpan, 63.4% on OmniVideoBench, and 89.7% on AliMeeting — surpassing Gemini 3.8 Flash in multiple benchmarks — at the same $0.15/$0.47 price as text-only Flash.",
    tag: "release",
    provider: "alibaba",
  },
  {
    slug: "aa-index-v4-2-update",
    date: "2026-09-04",
    title: "AA Intelligence Index v4.2: Fable 5.1 leads, new benchmarks added",
    summary:
      "Published September 4, 2026. v4.2 adds AA-Briefcase (agentic knowledge work) and GDP.pdf (long-document reasoning) benchmarks. Fable 5.1 tops the intelligence index. GLM-5.2 becomes the leading open-weights model at AA 51.",
    tag: "benchmark",
  },
  {
    slug: "anthropic-new-model-ipo-rumors",
    date: "2026-09-19",
    title: "Anthropic considering new model launch ahead of expected IPO",
    summary:
      "Per Reuters, Anthropic is weighing a new model release to counter OpenAI's GPT-6 Astra momentum. The deliberations come as the company prepares for an expected public listing and shortly after CEO Dario Amodei publicly urged the industry to slow down.",
    tag: "industry",
    provider: "anthropic",
  },
  {
    slug: "apple-siri-google-gemini-ios27",
    date: "2026-09-14",
    title: "Apple deploys rebuilt Siri powered by Google Gemini on iOS 27",
    summary:
      "Apple rolled out the rebuilt Siri on September 14 with iOS 27, available on iPhone 15 Pro and newer. The system is powered by Google's Gemini models — a landmark partnership that brings Gemini to hundreds of millions of Apple devices.",
    tag: "industry",
  },
  {
    slug: "google-gemini-3-8-live-audio",
    date: "2026-09-15",
    title: "Google releases Gemini 3.8 Live audio models with voice-agent capabilities",
    summary:
      "Google DeepMind launched two Gemini 3.8 Live audio models supporting voice agents that process visual input and make API calls simultaneously across 97+ languages. The Extended Thinking variant ranks first on the AA Speech-to-Speech Leaderboard at 82.6%.",
    tag: "release",
    provider: "google",
  },
  {
    slug: "typesafe-ai-jev-launch",
    date: "2026-09-15",
    title: "TypeSafe AI launches Jev — reasoning without transformers",
    summary:
      "TypeSafe AI introduced Jev, the first 'System One Model' built on a novel RLCD training method rather than transformer architecture. Claims 20-200x faster and 40-400x more compute-efficient than LLM approaches, targeting GPT-5.6 Terra-level performance.",
    tag: "research",
    provider: "typesafe-ai",
  },
  {
    slug: "atria-dawn-preview",
    date: "2026-09-20",
    title: "Shanghai AI Lab releases Atria Dawn Preview — 744B agentic MoE",
    summary:
      "The Shanghai AI Laboratory released Atria Dawn Preview — a 744B-parameter agentic MoE post-trained on Z.ai's GLM-5.2 base, under MIT license on Hugging Face. It achieves world-record 92.5% on BrowseComp and 96.0 on DeepSearchQA, beating GPT-5.6 Sol and Claude Opus 5.",
    tag: "release",
    provider: "shanghai-ai",
  },
];

export const newsSorted = [...news].sort((a, b) => b.date.localeCompare(a.date));
