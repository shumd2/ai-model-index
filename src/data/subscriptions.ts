/**
 * Consumer and developer subscriptions — how most people actually
 * access frontier models. Prices are USD list prices verified against
 * official pricing pages on the date in `verifiedOn`.
 *
 * `source: "reported"` means the price could not be confirmed on the
 * provider's own page by our fetch (region-blocked) and is attributed
 * to reputable secondary sources instead. Unknowns stay null.
 */

export type SubscriptionTier = {
  name: string;
  /** USD per month; null = custom / contact sales */
  priceMonthly: number | null;
  /** Effective monthly price on annual billing, if offered */
  annualMonthly?: number;
  /** Billing caveats (e.g. "$200 billed up front") */
  billingNote?: string;
  /** Models / effort tiers included */
  models: string;
  /** Usage limits as published */
  usage: string;
  features: string[];
  note?: string;
  url: string;
};

export type SubscriptionProduct = {
  id: string;
  /** Lab id from providers.ts, or "openrouter" */
  providerId: string;
  product: string;
  kind: "consumer" | "coding" | "credits";
  tiers: SubscriptionTier[];
  verifiedOn: string;
  source: "official" | "reported";
  notes?: string[];
};

export const subscriptionProducts: SubscriptionProduct[] = [
  {
    id: "chatgpt",
    providerId: "openai",
    product: "ChatGPT",
    kind: "consumer",
    verifiedOn: "2026-10-12",
    source: "official",
    notes: [
      "GPT-6 with Intelligent UI powers the Chat tab: GPT-6 Sol on Plus/Pro/Business/Enterprise, GPT-6 Luna on Free/Go (rolled out Oct 7–8). Work and Codex models are unchanged by that release.",
      "GPT-6.1 Sol Ultrafast (Oct 8) is gated to Pro 500, eligible usage-based Enterprise and credit-based Edu plans — buying credits on Pro 100/200 does not unlock it at launch.",
      "Pro 200 (20×) grandfathering: eligible subscribers keep the older, higher allowance through Oct 29, 2026, then drop to the new lower allowance. The $200 price is unchanged, and it does not grant Pro 500 features.",
      "New sign-ups and upgrades to Pro 200 remain paused; one 30-day return window applies after access ends.",
      "GPT-5.5 retires from ChatGPT, ChatGPT Work and Codex on all plans on Oct 14, 2026. Codex replacements: GPT-6 Sol (paid tiers), GPT-6 Luna (Free/Go).",
      "Codex and ChatGPT Work share a single usage allowance with regular chat. Fast mode burns included usage at 2.5x; GPT-6 Astra Ultrafast at 8x.",
    ],
    tiers: [
      {
        name: "Free",
        priceMonthly: 0,
        models: "Limited GPT-5.5 Instant",
        usage: "Limited messages, uploads, image generation, deep research, memory, Codex",
        features: ["Web, iOS, Android", "Limited Codex access"],
        url: "https://openai.com/chatgpt/pricing",
      },
      {
        name: "Go",
        priceMonthly: 8,
        models: "More GPT-5.5 Instant access",
        usage: "More messages, uploads, image creation; longer memory",
        features: ["May include ads"],
        url: "https://openai.com/chatgpt/pricing",
      },
      {
        name: "Plus",
        priceMonthly: 20,
        models:
          "GPT-5.5 Thinking; Codex with GPT-6.1 Sol, GPT-6 Sol and GPT-6 Luna",
        usage:
          "Expanded limits; Codex ≈15–160 GPT-6.1 Sol / 15–150 GPT-6 Sol / 350–3,000 GPT-6 Luna local messages per 5h",
        features: [
          "Advanced reasoning",
          "Expanded deep research and agent mode",
          "Projects, scheduled tasks, custom GPTs",
          "Codex on web, CLI, IDE and iOS",
          "Extend usage with ChatGPT credits",
        ],
        url: "https://openai.com/chatgpt/pricing",
      },
      {
        name: "Pro (5×)",
        priceMonthly: 100,
        models: "Everything in Plus, plus Pro models",
        usage: "5× more Codex usage than Plus; no fixed five-hour limit on Pro",
        features: ["Higher-usage Codex for long sessions"],
        url: "https://openai.com/chatgpt/pricing",
      },
      {
        name: "Pro (20×)",
        priceMonthly: 200,
        models: "Everything in Plus, plus Pro models",
        usage: "20× more Codex usage than Plus",
        features: ["Highest usage tier"],
        note: "New sign-ups and upgrades paused Sep 10, 2026",
        url: "https://help.openai.com/en/articles/9793128-about-chatgpt-pro-plans",
      },
      {
        name: "Pro (500)",
        priceMonthly: 500,
        models: "Everything in Pro, plus GPT-6 Astra Ultrafast access",
        usage: "Top usage allowance with Ultrafast speed mode",
        features: ["Astra Ultrafast (8× usage burn rate)"],
        url: "https://learn.chatgpt.com/docs/pricing",
      },
      {
        name: "Business",
        priceMonthly: 25,
        annualMonthly: 20,
        billingNote: "Standard seat, per user",
        models: "GPT-6.1 Sol, GPT-6 Astra, GPT-5.6 family (flexible)",
        usage:
          "Unlimited core chat; Codex ≈ Pro 5× estimates; Business Codex is pay-as-you-go with no fixed seat fee",
        features: [
          "Secure shared workspace",
          "60+ app connectors (Slack, Google Drive, GitHub, Atlassian…)",
          "SAML SSO, MFA, admin controls",
          "GPT-6.1 Sol Ultrafast on eligible usage-based workspaces",
        ],
        url: "https://openai.com/chatgpt/pricing",
      },
      {
        name: "Business (Premium seat)",
        priceMonthly: 125,
        annualMonthly: 100,
        billingNote: "Premium seat, per user",
        models: "Everything in Business",
        usage: "5× Standard seat usage, with no 5-hour usage limit",
        features: [
          "Purchased capacity reassignable between users",
          "For teams that need sustained high-volume usage",
        ],
        url: "https://help.openai.com/en/articles/8792828-what-is-chatgpt-business",
      },
      {
        name: "Enterprise",
        priceMonthly: null,
        models: "Full model lineup with expanded context",
        usage: "Flexible plans: no fixed rate limits, usage scales with credits",
        features: [
          "SCIM, EKM, domain verification, role-based access",
          "No training on business data by default",
          "Data residency in ten regions",
          "24/7 priority support, SLAs",
        ],
        url: "https://openai.com/chatgpt/pricing",
      },
    ],
  },
  {
    id: "claude",
    providerId: "anthropic",
    product: "Claude",
    kind: "consumer",
    verifiedOn: "2026-10-12",
    source: "official",
    notes: [
      "Monthly Claude Platform API credits are now bundled with Max and Team (rolled out Oct 7): Max 5× gets $100/mo, Max 20× $200/mo, Team up to $500/mo pooled across users. Requires linking a Claude Console org. Credits work on any model.",
      "Claude Haiku 5.5 (Oct 7) is available on every tier including Free; Opus requires Pro or above.",
      "Docs, Slides and Design left beta on Oct 8 and are available on every plan including Free. Enterprise admins get them by default from Oct 15.",
      "Motion (code-generated animations, beta) is Team and Enterprise only — not Pro, Max or Free. Dashboards (beta) is on paid plans.",
      "Claude Cowork has merged into Claude, rolling out Pro → Max → Team/Free.",
      "Max usage is measured per 5-hour session; Max is monthly-only on web checkout. Team requires a 2-seat minimum.",
      "The updated 2026 Usage Policy takes effect Nov 12, 2026.",
    ],
    tiers: [
      {
        name: "Free",
        priceMonthly: 0,
        models: "Base Claude models",
        usage: "Limited usage",
        features: [
          "Chat on web, desktop, mobile",
          "Web search, files, code execution",
          "Memory, connectors, Artifacts",
        ],
        url: "https://claude.com/pricing",
      },
      {
        name: "Pro",
        priceMonthly: 20,
        annualMonthly: 17,
        billingNote: "$200 billed up front on annual",
        models: "More Claude models; Fable via usage credits",
        usage: "More usage than Free (per 5-hour session)",
        features: [
          "Claude Code",
          "Claude Design, Slides, Docs",
          "Claude Science",
          "Projects; hand off and schedule tasks",
          "Claude in Chrome and Microsoft 365",
          "$100/mo Claude Platform API credits at Max 5x, $200/mo at Max 20x",
        ],
        url: "https://claude.com/pricing",
      },
      {
        name: "Max (5×)",
        priceMonthly: 100,
        models: "Everything in Pro; Fable at 50% of weekly limits",
        usage: "5× Pro usage per 5-hour session; higher output limits",
        features: [
          "Early access to advanced Claude features",
          "Priority access at high-traffic times",
        ],
        url: "https://claude.com/pricing",
      },
      {
        name: "Max (20×)",
        priceMonthly: 200,
        models: "Everything in Pro; Fable at 50% of weekly limits",
        usage: "20× Pro usage per 5-hour session; higher output limits",
        features: [
          "Early access to advanced Claude features",
          "Priority access at high-traffic times",
        ],
        url: "https://claude.com/pricing",
      },
      {
        name: "Team (Standard)",
        priceMonthly: 25,
        annualMonthly: 20,
        billingNote: "Per seat, 2-seat minimum",
        models: "Everything in Pro",
        usage: "Standard seat usage",
        features: [
          "Shared workspace, central billing, admin",
          "Usage analytics, spend controls",
          "No training on business data by default",
          "Up to $500/mo Claude Platform API credits, pooled across users",
          "Motion (beta) — code-generated animation to MP4",
        ],
        url: "https://claude.com/pricing",
      },
      {
        name: "Team (Premium)",
        priceMonthly: 125,
        annualMonthly: 100,
        billingNote: "Per seat, 5× Standard usage",
        models: "Everything in Pro",
        usage: "5× Standard seat usage",
        features: ["Priority access", "SSO and domain capture"],
        url: "https://claude.com/pricing",
      },
      {
        name: "Enterprise",
        priceMonthly: null,
        models: "Full lineup with governance controls",
        usage: "Custom limits",
        features: [
          "SSO/SCIM, compliance API, HIPAA-ready offering",
          "Custom data retention",
          "Organization-wide skills deployment",
        ],
        url: "https://claude.com/pricing",
      },
    ],
  },
  {
    id: "gemini",
    providerId: "google",
    product: "Google AI plans",
    kind: "consumer",
    verifiedOn: "2026-10-12",
    source: "official",
    notes: [
      "The Oct 9, 2026 change shipped: users without an AI subscription lost manual model selection. The Gemini app now routes automatically — most prompts to Flash-Lite, deeper-reasoning prompts to Flash or Pro. If smart selection is turned off, free users get Flash-Lite for everything.",
      "Model access by plan: Free = automatic routing only · AI Plus = Flash-Lite + Flash (no Pro) · AI Pro and AI Ultra = Flash-Lite, Flash and Pro, plus Deep Think on Ultra.",
      "Effort levels (low/medium/high) are selectable per model and consume more of the limit.",
      "AI Ultra 5× and 20× refer to usage limits vs AI Pro. Limits are compute-based, refreshing every 5 hours until the weekly cap.",
      "Workspace (work/school) accounts are unaffected by the Oct 9 change.",
    ],
    tiers: [
      {
        name: "Free",
        priceMonthly: 0,
        models:
          "Automatic routing only (from Oct 9) — 3.5 Flash-Lite baseline; deeper prompts may reach Flash or Pro",
        usage: "Base limits, compute-based, 5-hour refresh until weekly cap",
        features: [
          "Image generation and editing",
          "Deep Research, Gemini Live, Canvas, Gems",
          "15 GB Google storage",
        ],
        url: "https://gemini.google/subscriptions",
      },
      {
        name: "AI Plus",
        priceMonthly: 4.99,
        models: "3.6 Flash + 3.1 Pro access",
        usage: "2× higher usage than Free",
        features: [
          "200 Google Flow credits",
          "Video generation, Daily Brief",
          "Gemini in Gmail, Vids; Chrome early access",
          "400 GB Google storage",
        ],
        url: "https://gemini.google/subscriptions",
      },
      {
        name: "AI Pro",
        priceMonthly: 19.99,
        models: "3.8 Flash + 3.1 Pro access",
        usage: "4× higher usage than Free",
        features: [
          "1,000 Google Flow credits",
          "Jules coding agent, Antigravity entry limits",
          "Deep Search and agentic capabilities in AI Mode",
          "Gemini in Gmail, Docs",
          "5 TB Google storage",
        ],
        url: "https://gemini.google/subscriptions",
      },
      {
        name: "AI Ultra (5×)",
        priceMonthly: 99.99,
        models: "3.8 Flash + 3.1 Pro, plus Deep Think; Gemini Spark (select countries)",
        usage: "5× higher usage than AI Pro",
        features: [
          "10,000 Google Flow credits",
          "Project Genie, highest limits to Jules",
          "Highest access to Gemini 3 Pro in Search",
          "20 TB+ storage, YouTube Premium",
        ],
        url: "https://gemini.google/subscriptions",
      },
      {
        name: "AI Ultra (20×)",
        priceMonthly: 199.99,
        models: "3.8 Flash + 3.1 Pro, plus Deep Think; Gemini Spark (select countries)",
        usage: "20× higher usage than AI Pro",
        features: [
          "25,000 Google Flow credits",
          "Highest rate limits to the Antigravity agent model",
          "Veo 3.1 Lite trial",
          "20 TB+ storage, YouTube Premium",
        ],
        url: "https://gemini.google/subscriptions",
      },
    ],
  },
  {
    id: "grok",
    providerId: "xai",
    product: "Grok",
    kind: "consumer",
    verifiedOn: "2026-10-12",
    source: "official",
    notes: [
      "xAI published no plan changes in the Oct 7–12 window; the pricing page shows a single 'Grok 4.7' model row rather than a per-tier split.",
      "SuperGrok Lite ($10) and SuperGrok Heavy ($300) are listed in the plan comparison but their price tabs did not render on the fetched page — treat those two figures as unconfirmed.",
      "X Premium+ ($40/mo) bundles SuperGrok-level Grok access — separate from standalone SuperGrok plans.",
      "SuperGrok plans draw from a single weekly usage allowance across Chat, Imagine, Voice and Build.",
      "Subscriptions do not include xAI API access. On the API, grok-4.7 and grok-4.6 are identically priced ($2.00 in / $0.50 cached / $6.00 out per MTok under 200k prompt tokens, doubled above).",
    ],
    tiers: [
      {
        name: "Free",
        priceMonthly: 0,
        models: "Grok base access",
        usage: "Generous but limited rate limits",
        features: [
          "Real-time web and X search",
          "Voice mode",
          "Connectors",
        ],
        url: "https://x.ai/pricing",
      },
      {
        name: "SuperGrok Lite",
        priceMonthly: 10,
        models: "Grok 4 access",
        usage: "Entry-level paid limits",
        features: ["Grok Imagine (480p)", "1 AI agent"],
        url: "https://x.ai/pricing",
      },
      {
        name: "SuperGrok",
        priceMonthly: 30,
        models: "Grok 4.6",
        usage: "Higher rate limits across all features",
        features: [
          "Grok Bot access",
          "Expert mode",
          "Image and video generation",
          "Connectors",
        ],
        url: "https://x.ai/pricing",
      },
      {
        name: "SuperGrok Plus",
        priceMonthly: 100,
        models: "Everything in SuperGrok",
        usage: "Significantly higher usage across Chat, Imagine, Voice and Build",
        features: [
          "1080p video creation",
          "Lightning-fast replies",
          "Priority access at peak times",
          "Early access to new features",
        ],
        url: "https://x.ai/pricing",
      },
      {
        name: "SuperGrok Heavy",
        priceMonthly: 300,
        models: "Grok 4 Heavy (multi-agent)",
        usage: "Highest usage at the fastest speed",
        features: [
          "Collaborating agents for extremely hard problems",
          "X Premium+ included at no extra cost",
          "Dedicated support and early access",
        ],
        url: "https://x.ai/pricing",
      },
      {
        name: "Business",
        priceMonthly: null,
        models: "Grok 4.6 for teams",
        usage: "Per-seat plans with team usage management",
        features: [
          "Team seat management, consolidated billing",
          "Role-based access control, domain verification",
          "SOC 2 (Type I & II), no training",
        ],
        url: "https://x.ai/pricing",
      },
      {
        name: "Enterprise",
        priceMonthly: null,
        models: "Custom rate limits and dedicated infrastructure",
        usage: "Tailored throughput",
        features: ["SSO & SCIM", "Data residency", "Volume pricing"],
        url: "https://x.ai/pricing",
      },
    ],
  },
  {
    id: "mistral-vibe",
    providerId: "mistral",
    product: "Mistral Vibe",
    kind: "consumer",
    verifiedOn: "2026-10-12",
    source: "official",
    notes: [
      "Le Chat was rebranded to Vibe in August 2026; chat.mistral.ai still serves the product.",
      "Free and Pro plans include monthly Claude-Platform-style API credits: $15/mo on Pro, $25.50/mo on Education. API billing is separate from the subscription.",
      "The Education price is taken from Mistral's own pricing-page FAQ ($5.99/mo, normally $14.99). Its pricing cards render inconsistently — confirm at checkout.",
      "Note the inversion: Education ($5.99) ships more API credit than Pro ($14.99).",
      "Mistral publishes no exact free-tier message number, only 'limited messages and web searches'.",
    ],
    tiers: [
      {
        name: "Free",
        priceMonthly: 0,
        models: "Core Mistral models (3.5 Flash-Lite)",
        usage: "Limited messages and web searches (no published number)",
        features: ["API credits included", "100+ connectors"],
        url: "https://mistral.ai/pricing",
      },
      {
        name: "Education",
        priceMonthly: 5.99,
        models: "Same as Pro",
        usage: "Pro-level limits for verified students",
        features: [
          "Verified .edu email at an accredited institution",
          "Capped at 12 months; only for users new to Vibe/Le Chat",
          "$25.50/mo in API credits",
        ],
        url: "https://mistral.ai/pricing",
      },
      {
        name: "Pro",
        priceMonthly: 14.99,
        models: "All Mistral chat models",
        usage: "Up to 6× Free messages, 5× web searches, 40× image generations",
        features: [
          "All-day agentic coding in CLI, IDE and web",
          "Deep research, task scheduling",
          "15 GB library",
          "$15/mo in API credits",
          "Opt out of model training",
        ],
        url: "https://mistral.ai/pricing",
      },
      {
        name: "Team",
        priceMonthly: 24.99,
        billingNote: "Per user",
        models: "Everything in Pro",
        usage: "Up to 6× Free per seat; 200 Flash answers/day",
        features: [
          "Shared collaborative workspace",
          "30 GB storage per user",
          "Domain verification, data export",
        ],
        url: "https://mistral.ai/pricing",
      },
      {
        name: "Enterprise",
        priceMonthly: null,
        models: "Custom",
        usage: "Custom limits",
        features: ["SAML SSO, audit logs", "White label"],
        url: "https://mistral.ai/pricing",
      },
    ],
  },
  {
    id: "glm-coding-plan",
    providerId: "zai",
    product: "GLM Coding Plan",
    kind: "coding",
    verifiedOn: "2026-10-12",
    source: "official",
    notes: [
      "GLM-5.3 and GLM-5.3-Flash serve every plan. Requests for GLM-5.2/5.1 auto-route to GLM-5.3, and GLM-4.7 auto-routes to GLM-5.3-Flash.",
      "Off-peak credits are charged at 50%; peak is Mon–Fri 14:00–18:00 SGT (UTC+8) — up to 92% cheaper than pay-as-you-go.",
      "A flat-rate subscription for AI coding agents, not a general API key: quotas work inside 20+ supported tools (ZCode, Claude Code, Codex, Cursor, OpenCode, OpenClaw, Cline and more).",
      "Credit quotas are metered on both a 5-hour window and a weekly total; the weekly allowance resets every 7 days.",
      "Z.ai states only the $18/mo Lite starting price on its own page — verify Pro and Max figures at checkout.",
    ],
    tiers: [
      {
        name: "Lite",
        priceMonthly: 18,
        annualMonthly: 12.6,
        billingNote: "Quarterly 20% off; yearly 30% off",
        models: "GLM-5.3, GLM-5.3-Flash (5.2/5.1 and 4.7 auto-route here)",
        usage: "2,000 credits per 5h · 10,000 credits per week",
        features: [
          "Built for lightweight iteration on small repos",
          "Rolling access to the latest flagship models",
          "20+ agent tools supported",
          "Default data privacy",
        ],
        url: "https://z.ai/subscribe",
      },
      {
        name: "Pro",
        priceMonthly: 80,
        annualMonthly: 56,
        billingNote: "Quarterly 20% off; yearly 30% off",
        models: "Everything in Lite",
        usage: "12,000 credits per 5h · 60,000 credits per week",
        features: [
          "Built for day-to-day development on mid-sized repos",
          "Priority access to the latest flagship models",
          "Curated selection of MCP tools",
          "Faster generation speeds",
        ],
        url: "https://z.ai/subscribe",
      },
      {
        name: "Max",
        priceMonthly: 168,
        annualMonthly: 117.6,
        billingNote: "Quarterly 20% off; yearly 30% off",
        models: "Everything in Pro",
        usage: "28,000 credits per 5h · 140,000 credits per week",
        features: [
          "Built for advanced users on mid-to-large repos",
          "First access to the latest flagship models",
          "Dedicated resources during peak times",
        ],
        url: "https://z.ai/subscribe",
      },
      {
        name: "Team (Standard seat)",
        priceMonthly: 88,
        annualMonthly: 79.2,
        billingNote: "Per seat; 10% off annually",
        models: "Everything in Pro",
        usage: "66,000 credits per week",
        features: [
          "Unified seat and permission management",
          "Team analytics and dashboard",
          "Flexible usage billing, centralized invoicing",
        ],
        url: "https://z.ai/subscribe",
      },
      {
        name: "Team (Premium seat)",
        priceMonthly: 188,
        annualMonthly: 169.2,
        billingNote: "Per seat; 10% off annually",
        models: "Everything in Pro at higher limits",
        usage: "Highest weekly credit quota",
        features: ["For daily medium and large repo development"],
        url: "https://z.ai/subscribe",
      },
    ],
  },
  {
    id: "openrouter",
    providerId: "openrouter",
    product: "OpenRouter",
    kind: "credits",
    verifiedOn: "2026-10-12",
    source: "official",
    notes: [
      "No subscription on standard accounts: you buy credits once and draw them down with usage. Credits do not expire; Auto Top-Up is optional and off by default.",
      "Inference is billed at each provider's list price on every plan — OpenRouter does not mark up tokens. Its fee is charged when credits are purchased.",
      "Failed or fallback attempts are not billed; with fallback routing you pay only for the run that answers.",
      "Catalog additions in the Oct 7–12 window: Claude Haiku 5.5 (Oct 7, $0.10/$0.50, batch variant 50% off), StepFun Step 5 Preview (Oct 8, 1M ctx, $1.00/$2.70), and ElevenLabs — 9 TTS plus 2 STT models, 50% off through Oct 19, 2026.",
      "Only three catalog models were added in that window; the rest of the announcement feed dates from Sep 22–Oct 2.",
      "Catalog: 500+ models across 80+ providers on paid plans (company-reported).",
      "Public rankings (daily token totals for the top 50 models) are at openrouter.ai/rankings under CC BY 4.0, with a JSON data API. Rankings figures are not snapshotted here because the page is client-rendered and changes daily.",
    ],
    tiers: [
      {
        name: "Free",
        priceMonthly: 0,
        models: "25+ free models (`:free` suffix)",
        usage: "50 requests per day",
        features: ["No platform fee", "Community support"],
        url: "https://openrouter.ai/pricing",
      },
      {
        name: "Standard (pay-as-you-go)",
        priceMonthly: null,
        models: "Full catalog at provider list price",
        usage: "Rate limits pass through from the provider",
        features: [
          "5.5% fee when buying credits by card ($0.80 minimum); 5% with crypto",
          "BYOK: first $25,000 of list-price inference per month with no fee, 5% after",
          "Email support",
        ],
        url: "https://openrouter.ai/pricing",
      },
      {
        name: "Business",
        priceMonthly: null,
        models: "Full catalog at provider list price",
        usage: "Rate limits pass through from the provider",
        features: [
          "8% platform fee on credit purchases",
          "BYOK: $25,000 of list-price inference per month with no fee, 5% after",
          "Invoicing options",
        ],
        url: "https://openrouter.ai/pricing",
      },
      {
        name: "Enterprise",
        priceMonthly: null,
        models: "Full catalog, contract terms",
        usage: "Higher allowances available",
        features: [
          "Pricing set by contract (volume, prepaid credits, annual commitments)",
          "BYOK: $200,000 per month with no fee, 5% after",
          "Dedicated support team",
        ],
        url: "https://openrouter.ai/pricing",
      },
    ],
  },
];

/** Every priced tier across all products, cheapest first. */
export const pricedTiers = subscriptionProducts
  .flatMap((product) =>
    product.tiers
      .filter((tier) => tier.priceMonthly !== null && tier.priceMonthly > 0)
      .map((tier) => ({ product, tier })),
  )
  .sort((a, b) => a.tier.priceMonthly! - b.tier.priceMonthly!);
