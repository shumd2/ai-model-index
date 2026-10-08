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
    verifiedOn: "2026-10-07",
    source: "official",
    notes: [
      "Pro $200 (Pro 20×) paused for new sign-ups and upgrades as of Sep 10, 2026; existing subscriptions renew as usual, with a one-time return window of 30 days after access ends.",
      "GPT-5.5 retires from ChatGPT, ChatGPT Work and Codex on all plans on Oct 14, 2026.",
      "Codex and ChatGPT Work share a single usage allowance with regular chat.",
      "Fast mode burns included usage at 2.5× the standard rate; GPT-6 Astra Ultrafast at 8×.",
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
        priceMonthly: null,
        models: "GPT-6.1 Sol, GPT-6 Astra, GPT-5.6 family (flexible)",
        usage:
          "Unlimited core chat; Codex ≈ Pro 5× estimates; Business Codex is pay-as-you-go with no fixed seat fee",
        features: [
          "Secure shared workspace",
          "60+ app connectors (Slack, Google Drive, GitHub, Atlassian…)",
          "SAML SSO, MFA, admin controls",
        ],
        url: "https://openai.com/chatgpt/pricing",
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
    verifiedOn: "2026-10-07",
    source: "official",
    notes: [
      "Claude Cowork has merged into Claude, rolling out to Pro and Max plans first.",
      "Fable access: usage credits on Pro; 50% of weekly limits on Max 5× and Max 20×.",
      "Max usage is measured per 5-hour session; Max is monthly-only on web checkout.",
      "Team requires a 2-seat minimum (lowered from 5 in late July 2026).",
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
    verifiedOn: "2026-10-07",
    source: "official",
    notes: [
      "From Oct 9, 2026 the plan determines model access in the Gemini app: Free keeps Flash-Lite only; AI Plus keeps Flash-Lite + Flash; AI Pro and AI Ultra keep Flash-Lite, Flash and Pro plus Deep Think. Workspace accounts are unaffected.",
      "AI Ultra 5× and 20× refer to usage limits vs AI Pro.",
      "Plans include Google One storage and, on Ultra, YouTube Premium.",
    ],
    tiers: [
      {
        name: "Free",
        priceMonthly: 0,
        models:
          "Flash-Lite (from Oct 9); varying access to Gemini 3.1 Pro today",
        usage: "Base limits",
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
        models: "Flash-Lite + Flash (from Oct 9)",
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
        models: "Flash-Lite + Flash + Pro (from Oct 9)",
        usage: "4× higher usage than Free",
        features: [
          "1,000 Google Flow credits",
          "Deep Search and agentic capabilities in AI Mode",
          "Gemini in Gmail, Docs",
          "5 TB Google storage",
        ],
        url: "https://gemini.google/subscriptions",
      },
      {
        name: "AI Ultra (5×)",
        priceMonthly: 99.99,
        models: "All models plus Deep Think; Gemini Spark (select countries)",
        usage: "5× higher usage than AI Pro",
        features: [
          "10,000 Google Flow credits",
          "Highest limits to Jules coding agent",
          "Highest access to Gemini 3 Pro in Search",
          "20 TB+ storage, YouTube Premium",
        ],
        url: "https://gemini.google/subscriptions",
      },
      {
        name: "AI Ultra (20×)",
        priceMonthly: 199.99,
        models: "All models plus Deep Think; Gemini Spark (select countries)",
        usage: "20× higher usage than AI Pro",
        features: [
          "25,000 Google Flow credits",
          "Highest limits to Jules and agent model in Google Antigravity",
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
    verifiedOn: "2026-10-07",
    source: "official",
    notes: [
      "X Premium+ ($40/mo) bundles SuperGrok-level Grok access — separate from standalone SuperGrok plans.",
      "SuperGrok plans draw from a single weekly usage allowance across Chat, Imagine, Voice and Build.",
      "Subscriptions do not include xAI API access; the API bills per token.",
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
    verifiedOn: "2026-10-07",
    source: "reported",
    notes: [
      "Le Chat was rebranded to Vibe in August 2026; chat.mistral.ai still serves the product.",
      "Pro and Free plans include monthly API credits ($30/mo and $10/mo respectively); API billing is separate from the subscription.",
      "Prices below are from reputable secondary sources (verified Sep 25–30, 2026); confirm on mistral.ai/pricing before subscribing.",
    ],
    tiers: [
      {
        name: "Free",
        priceMonthly: 0,
        models: "Core Mistral models",
        usage: "Limited messages and web searches (no published number)",
        features: ["$10/mo in API credits", "100+ connectors"],
        url: "https://mistral.ai/pricing",
      },
      {
        name: "Education",
        priceMonthly: 5.99,
        models: "Same as Pro",
        usage: "Pro-level limits for verified students",
        features: ["Verified .edu email required", "Capped at 12 months"],
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
          "$30/mo in API credits",
          "Opt out of model training",
        ],
        url: "https://mistral.ai/pricing",
      },
      {
        name: "Team",
        priceMonthly: 24.99,
        billingNote: "Per user, $50/mo minimum",
        models: "Everything in Pro",
        usage: "Up to 6× Free per seat",
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
    verifiedOn: "2026-10-07",
    source: "official",
    notes: [
      "A flat-rate subscription for AI coding agents — not a general API key: quotas work inside 20+ supported tools (ZCode, Claude Code, Codex, Cursor, OpenCode, OpenClaw, Cline and more).",
      "Usage is metered with both a 5-hour limit and a weekly credit quota.",
      "Quarterly billing is 20% off; yearly is 30% off.",
      "Powers GLM-5.3, GLM-5.3-Flash (formerly OX Alpha), GLM-5.2 and GLM-5-Turbo.",
    ],
    tiers: [
      {
        name: "Lite",
        priceMonthly: 18,
        annualMonthly: 12.6,
        billingNote: "Quarterly 20% off; yearly 30% off",
        models: "GLM-5.3, GLM-5.3-Flash, GLM-5.2, GLM-5-Turbo",
        usage: "10,000 credits per week",
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
        usage: "6× Lite usage",
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
        usage: "14× Lite usage",
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
    verifiedOn: "2026-10-07",
    source: "official",
    notes: [
      "OpenRouter has no subscription on standard accounts: you buy credits once and draw them down with usage. Credits do not expire; Auto Top-Up is optional and off by default.",
      "Inference is billed at each provider's list price on every plan — OpenRouter does not mark up tokens. Its fee is charged when credits are purchased.",
      "Failed or fallback attempts are not billed; with fallback routing you pay only for the run that answers.",
      "Catalog: 300+ models across 60+ providers; 70T monthly tokens, 5M+ users (company-reported).",
      "Public rankings (daily token totals for the top 50 models) are at openrouter.ai/rankings under CC BY 4.0, with a JSON data API.",
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
