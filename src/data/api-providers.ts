export type ApiProviderKind =
  | "first-party"
  | "multi-model"
  | "cloud"
  | "infrastructure";

export type ApiProvider = {
  id: string;
  name: string;
  shortName: string;
  color: string;
  kind: ApiProviderKind;
  summary: string;
  bestFor: string[];
  compatibility: string[];
  deployment: string[];
  labIds: string[];
  docsUrl: string;
  consoleUrl: string;
  modelsUrl: string;
  pricingUrl?: string;
  verifiedOn: string;
};

/**
 * API access is separate from model ownership. A lab can expose a first-party
 * API while the same model is also available through clouds, routers and
 * inference providers. These links intentionally point to official sources.
 */
export const apiProviders: ApiProvider[] = [
  {
    id: "openai-api",
    name: "OpenAI API",
    shortName: "OpenAI",
    color: "#10a37f",
    kind: "first-party",
    summary:
      "First-party access to GPT, Codex, realtime, image and audio models through the Responses and Chat Completions APIs.",
    bestFor: ["GPT models", "Realtime voice", "Structured outputs"],
    compatibility: ["OpenAI Responses", "Chat Completions"],
    deployment: ["Hosted API"],
    labIds: ["openai"],
    docsUrl: "https://developers.openai.com/api/docs/",
    consoleUrl: "https://platform.openai.com/",
    modelsUrl: "https://developers.openai.com/api/docs/models",
    pricingUrl: "https://openai.com/api/pricing/",
    verifiedOn: "2026-09-25",
  },
  {
    id: "anthropic-api",
    name: "Anthropic API",
    shortName: "Anthropic",
    color: "#d97757",
    kind: "first-party",
    summary:
      "Direct access to the Claude model family, including long-context tools, prompt caching and computer use.",
    bestFor: ["Claude", "Agents", "Long context"],
    compatibility: ["Anthropic Messages", "Tool use"],
    deployment: ["Hosted API"],
    labIds: ["anthropic"],
    docsUrl: "https://platform.claude.com/docs/en/overview",
    consoleUrl: "https://platform.claude.com/",
    modelsUrl:
      "https://platform.claude.com/docs/en/about-claude/models/overview",
    pricingUrl: "https://www.anthropic.com/pricing#api",
    verifiedOn: "2026-09-25",
  },
  {
    id: "google-gemini-api",
    name: "Google Gemini API",
    shortName: "Gemini",
    color: "#4285f4",
    kind: "first-party",
    summary:
      "Gemini models, live multimodal interaction and Google AI Studio tooling through the Gemini developer API.",
    bestFor: ["Gemini", "Multimodal", "Developer tooling"],
    compatibility: ["Google Gen AI SDK", "REST"],
    deployment: ["Hosted API"],
    labIds: ["google"],
    docsUrl: "https://ai.google.dev/gemini-api/docs",
    consoleUrl: "https://aistudio.google.com/",
    modelsUrl: "https://ai.google.dev/gemini-api/docs/models",
    pricingUrl: "https://ai.google.dev/gemini-api/docs/pricing",
    verifiedOn: "2026-09-25",
  },
  {
    id: "xai-api",
    name: "xAI API",
    shortName: "xAI",
    color: "#9ca3af",
    kind: "first-party",
    summary:
      "Direct Grok API access with function calling, structured outputs and optional live search tools.",
    bestFor: ["Grok", "Live search", "Low-latency tools"],
    compatibility: ["OpenAI-compatible", "xAI REST"],
    deployment: ["Hosted API"],
    labIds: ["xai"],
    docsUrl: "https://docs.x.ai/",
    consoleUrl: "https://console.x.ai/",
    modelsUrl: "https://docs.x.ai/docs/models",
    pricingUrl: "https://docs.x.ai/docs/models",
    verifiedOn: "2026-09-25",
  },
  {
    id: "mistral-api",
    name: "Mistral API",
    shortName: "Mistral",
    color: "#f97316",
    kind: "first-party",
    summary:
      "Mistral's hosted catalog for frontier, compact, OCR, audio and open-weight models, with private deployment options.",
    bestFor: ["European hosting", "OCR", "Private deployment"],
    compatibility: ["Mistral SDK", "OpenAI-compatible"],
    deployment: ["Hosted API", "Private cloud"],
    labIds: ["mistral"],
    docsUrl: "https://docs.mistral.ai/",
    consoleUrl: "https://console.mistral.ai/",
    modelsUrl: "https://docs.mistral.ai/models",
    pricingUrl: "https://docs.mistral.ai/getting-started/pricing",
    verifiedOn: "2026-09-25",
  },
  {
    id: "deepseek-api",
    name: "DeepSeek API",
    shortName: "DeepSeek",
    color: "#4d6bfe",
    kind: "first-party",
    summary:
      "Low-cost direct API for DeepSeek V4 Flash and Pro, with OpenAI and Anthropic-compatible request formats.",
    bestFor: ["Reasoning", "Agent coding", "Low cost"],
    compatibility: ["OpenAI-compatible", "Anthropic-compatible"],
    deployment: ["Hosted API"],
    labIds: ["deepseek"],
    docsUrl: "https://api-docs.deepseek.com/",
    consoleUrl: "https://platform.deepseek.com/",
    modelsUrl: "https://api-docs.deepseek.com/quick_start/pricing",
    pricingUrl: "https://api-docs.deepseek.com/quick_start/pricing",
    verifiedOn: "2026-09-25",
  },
  {
    id: "alibaba-model-studio",
    name: "Alibaba Cloud Model Studio",
    shortName: "Model Studio",
    color: "#7c3aed",
    kind: "cloud",
    summary:
      "Hosted Qwen APIs plus selected third-party models, with native, OpenAI-compatible and Anthropic-compatible interfaces.",
    bestFor: ["Qwen", "Multimodal", "Regional endpoints"],
    compatibility: ["DashScope", "OpenAI-compatible", "Anthropic-compatible"],
    deployment: ["Hosted API", "Multi-region"],
    labIds: ["alibaba"],
    docsUrl: "https://www.alibabacloud.com/help/en/model-studio/",
    consoleUrl: "https://bailian.console.alibabacloud.com/",
    modelsUrl:
      "https://www.alibabacloud.com/help/en/model-studio/getting-started/models",
    pricingUrl: "https://www.alibabacloud.com/product/modelstudio",
    verifiedOn: "2026-09-25",
  },
  {
    id: "z-ai-api",
    name: "Z.ai API",
    shortName: "Z.ai",
    color: "#6366f1",
    kind: "first-party",
    summary:
      "Direct GLM text, vision, coding, image and audio APIs from Z.ai, with coding-plan integrations.",
    bestFor: ["GLM", "Coding agents", "Multimodal tools"],
    compatibility: ["OpenAI-compatible", "Z.ai SDK"],
    deployment: ["Hosted API"],
    labIds: ["zai"],
    docsUrl: "https://docs.z.ai/",
    consoleUrl: "https://z.ai/",
    modelsUrl: "https://docs.z.ai/llms.txt",
    pricingUrl: "https://docs.z.ai/guides/overview/pricing",
    verifiedOn: "2026-09-25",
  },
  {
    id: "moonshot-api",
    name: "Moonshot AI API",
    shortName: "Kimi",
    color: "#0ea5e9",
    kind: "first-party",
    summary:
      "Kimi API for long-context multimodal models, coding and agent workloads with OpenAI-compatible endpoints.",
    bestFor: ["Kimi", "Long context", "Coding agents"],
    compatibility: ["OpenAI-compatible", "Anthropic-compatible"],
    deployment: ["Hosted API"],
    labIds: ["moonshot"],
    docsUrl: "https://platform.moonshot.ai/docs/introduction",
    consoleUrl: "https://platform.moonshot.ai/console/api-keys",
    modelsUrl: "https://platform.moonshot.ai/docs/models",
    pricingUrl: "https://platform.moonshot.ai/docs/pricing/chat",
    verifiedOn: "2026-09-25",
  },
  {
    id: "openrouter",
    name: "OpenRouter",
    shortName: "OpenRouter",
    color: "#6467f2",
    kind: "multi-model",
    summary:
      "One OpenAI-compatible endpoint for a broad model catalog, with provider routing, fallbacks and usage data.",
    bestFor: ["Model comparison", "Provider fallback", "One API key"],
    compatibility: ["OpenAI-compatible", "OpenRouter SDK"],
    deployment: ["Hosted router"],
    labIds: [],
    docsUrl: "https://openrouter.ai/docs/quickstart",
    consoleUrl: "https://openrouter.ai/keys",
    modelsUrl: "https://openrouter.ai/models",
    pricingUrl: "https://openrouter.ai/pricing",
    verifiedOn: "2026-09-25",
  },
  {
    id: "fireworks-ai",
    name: "Fireworks AI",
    shortName: "Fireworks",
    color: "#f97316",
    kind: "multi-model",
    summary:
      "Fast serverless inference, dedicated GPU deployments and fine-tuning for leading open models.",
    bestFor: ["Open-model inference", "Fine-tuning", "Dedicated GPUs"],
    compatibility: ["OpenAI-compatible", "Fireworks SDK"],
    deployment: ["Serverless", "Dedicated GPU"],
    labIds: ["fireworks"],
    docsUrl: "https://docs.fireworks.ai/",
    consoleUrl: "https://fireworks.ai/login",
    modelsUrl: "https://fireworks.ai/models",
    pricingUrl: "https://fireworks.ai/pricing",
    verifiedOn: "2026-09-25",
  },
  {
    id: "groq",
    name: "Groq",
    shortName: "Groq",
    color: "#f55036",
    kind: "multi-model",
    summary:
      "Low-latency inference on LPU infrastructure with an OpenAI-compatible API and developer tooling.",
    bestFor: ["Very low latency", "Real-time apps", "Fast prototypes"],
    compatibility: ["OpenAI-compatible", "Groq SDK"],
    deployment: ["Hosted API"],
    labIds: [],
    docsUrl: "https://console.groq.com/docs/overview",
    consoleUrl: "https://console.groq.com/keys",
    modelsUrl: "https://console.groq.com/docs/models",
    pricingUrl: "https://groq.com/pricing",
    verifiedOn: "2026-09-25",
  },
  {
    id: "together-ai",
    name: "Together AI",
    shortName: "Together",
    color: "#0f6fff",
    kind: "multi-model",
    summary:
      "Serverless, provisioned and dedicated inference for open models, plus fine-tuning and fast experimentation.",
    bestFor: ["Open models", "Fine-tuning", "Reserved throughput"],
    compatibility: ["OpenAI-compatible", "Together SDK"],
    deployment: ["Serverless", "Provisioned", "Dedicated"],
    labIds: ["moonshot"],
    docsUrl: "https://docs.together.ai/docs/introduction",
    consoleUrl: "https://api.together.ai/settings/api-keys",
    modelsUrl: "https://docs.together.ai/docs/serverless/models",
    pricingUrl: "https://docs.together.ai/docs/serverless/overview",
    verifiedOn: "2026-09-25",
  },
  {
    id: "microsoft-foundry",
    name: "Microsoft Foundry",
    shortName: "Foundry",
    color: "#0078d4",
    kind: "cloud",
    summary:
      "Azure's model catalog for first-party and partner models, with managed compute, serverless APIs and Foundry tooling.",
    bestFor: ["Azure governance", "Enterprise APIs", "Managed compute"],
    compatibility: ["Azure SDK", "OpenAI-compatible endpoints"],
    deployment: ["Azure regions", "Serverless", "Managed compute"],
    labIds: ["microsoft", "openai", "anthropic", "meta", "mistral", "deepseek", "cohere", "moonshot", "xai"],
    docsUrl: "https://learn.microsoft.com/azure/foundry/",
    consoleUrl: "https://ai.azure.com/",
    modelsUrl:
      "https://learn.microsoft.com/azure/foundry/foundry-models/concepts/models-from-partners",
    pricingUrl: "https://azure.microsoft.com/pricing/details/ai-foundry-models/",
    verifiedOn: "2026-09-25",
  },
  {
    id: "amazon-bedrock",
    name: "Amazon Bedrock",
    shortName: "Bedrock",
    color: "#ff9900",
    kind: "cloud",
    summary:
      "AWS managed access to a curated set of frontier and open models through Converse and model-specific APIs.",
    bestFor: ["AWS", "Regional data controls", "Enterprise governance"],
    compatibility: ["Bedrock Converse", "InvokeModel", "OpenAI-compatible endpoints"],
    deployment: ["AWS regions", "Global inference"],
    labIds: ["amazon", "anthropic", "meta", "mistral", "ai21", "cohere", "xai"],
    docsUrl: "https://docs.aws.amazon.com/bedrock/",
    consoleUrl: "https://console.aws.amazon.com/bedrock/",
    modelsUrl: "https://docs.aws.amazon.com/bedrock/latest/userguide/models-supported.html",
    pricingUrl: "https://aws.amazon.com/bedrock/pricing/",
    verifiedOn: "2026-09-25",
  },
  {
    id: "google-vertex-ai",
    name: "Google Vertex AI Model Garden",
    shortName: "Vertex AI",
    color: "#4285f4",
    kind: "cloud",
    summary:
      "Google Cloud's curated catalog for Gemini, partner models and self-deployed open models with enterprise controls.",
    bestFor: ["Google Cloud", "Model tuning", "VPC deployment"],
    compatibility: ["Google Gen AI SDK", "OpenAI-compatible endpoints"],
    deployment: ["Google Cloud", "Managed API", "Self-deployed"],
    labIds: ["google", "anthropic", "meta", "mistral", "nvidia", "ai2", "xai"],
    docsUrl: "https://cloud.google.com/vertex-ai/generative-ai/docs",
    consoleUrl: "https://console.cloud.google.com/vertex-ai/model-garden",
    modelsUrl:
      "https://cloud.google.com/vertex-ai/generative-ai/docs/model-garden/explore-models",
    pricingUrl: "https://cloud.google.com/vertex-ai/generative-ai/pricing",
    verifiedOn: "2026-09-25",
  },
  {
    id: "nvidia-nim",
    name: "NVIDIA NIM",
    shortName: "NVIDIA",
    color: "#76b900",
    kind: "infrastructure",
    summary:
      "Self-hosted inference microservices with OpenAI- and Anthropic-compatible APIs for NVIDIA and open models.",
    bestFor: ["Self-hosting", "GPU control", "Air-gapped deployment"],
    compatibility: ["OpenAI-compatible", "Anthropic-compatible"],
    deployment: ["Self-hosted", "NVIDIA Cloud"],
    labIds: ["nvidia"],
    docsUrl: "https://docs.nvidia.com/nim/",
    consoleUrl: "https://build.nvidia.com/",
    modelsUrl: "https://build.nvidia.com/models",
    verifiedOn: "2026-09-25",
  },
  {
    id: "cloudflare-workers-ai",
    name: "Cloudflare Workers AI",
    shortName: "Workers AI",
    color: "#f48120",
    kind: "cloud",
    summary:
      "Edge-hosted models that run close to application users through the Workers platform and AI Gateway.",
    bestFor: ["Edge apps", "Low latency", "Workers ecosystem"],
    compatibility: ["Workers binding", "REST"],
    deployment: ["Cloudflare edge", "AI Gateway"],
    labIds: ["zai"],
    docsUrl: "https://developers.cloudflare.com/workers-ai/",
    consoleUrl: "https://dash.cloudflare.com/",
    modelsUrl: "https://developers.cloudflare.com/workers-ai/models/",
    pricingUrl: "https://developers.cloudflare.com/workers/platform/pricing/",
    verifiedOn: "2026-09-25",
  },
  {
    id: "hugging-face-inference",
    name: "Hugging Face Inference Providers",
    shortName: "HF Inference",
    color: "#ff9d00",
    kind: "multi-model",
    summary:
      "A unified Hugging Face interface that routes model requests across third-party inference providers.",
    bestFor: ["Open-model discovery", "Provider routing", "HF ecosystem"],
    compatibility: ["InferenceClient", "OpenAI-compatible chat"],
    deployment: ["Hosted router", "Provider selection"],
    labIds: [],
    docsUrl: "https://huggingface.co/docs/inference-providers/index",
    consoleUrl: "https://huggingface.co/settings/tokens",
    modelsUrl: "https://huggingface.co/models?inference_provider=all",
    pricingUrl: "https://huggingface.co/docs/inference-providers/pricing",
    verifiedOn: "2026-09-25",
  },
];

export const apiProviderMap = new Map(
  apiProviders.map((provider) => [provider.id, provider]),
);

export function apiProvidersForLab(labId: string) {
  return apiProviders.filter((provider) => provider.labIds.includes(labId));
}

export const apiKindLabels: Record<ApiProviderKind, string> = {
  "first-party": "First-party API",
  "multi-model": "Multi-model platform",
  cloud: "Cloud platform",
  infrastructure: "Infrastructure",
};
