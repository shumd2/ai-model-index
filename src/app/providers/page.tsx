import type { Metadata } from "next";
import { ProviderBrowser } from "./browser";

export const metadata: Metadata = {
  title: "AI providers",
  description:
    "The labs behind the models — OpenAI, Anthropic, Google DeepMind, xAI, Meta, DeepSeek, Qwen, Moonshot, Z.ai and more.",
};

export default function ProvidersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-10">
        <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-violet-600 dark:text-violet-400">
          <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
          03 · Labs
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Providers</h1>
        <p className="mt-2 max-w-2xl text-muted">
          The labs shaping the frontier — who they are, what they ship, and how
          their models are doing.
        </p>
      </div>
      <ProviderBrowser />
    </div>
  );
}
