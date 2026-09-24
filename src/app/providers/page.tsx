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
      {/* Hero header */}
      <div className="relative mb-12 overflow-hidden rounded-3xl border border-border-subtle bg-gradient-to-br from-violet-950/40 via-surface to-amber-950/20 p-8 sm:p-12">
        {/* Ambient orbs */}
        <div aria-hidden className="absolute -left-20 -top-20 h-64 w-64 rounded-full bg-violet-500/20 blur-[80px]" />
        <div aria-hidden className="absolute -right-10 bottom-0 h-48 w-48 rounded-full bg-amber-500/15 blur-[60px]" />
        <div className="relative">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-violet-500/15 px-3 py-1 font-mono text-[11px] uppercase tracking-widest text-violet-400">
            <span className="h-1.5 w-1.5 rounded-full bg-violet-400 animate-pulse" />
            03 · Labs
          </div>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            The labs behind
            <span className="block bg-gradient-to-r from-violet-400 via-pink-500 to-amber-400 bg-clip-text text-transparent">
              the frontier
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-muted">
            {/* This count is safe — providers.ts is a static import, not server-only */}
            45+ labs shaping the AI landscape — who they are, what they ship, and how their models are doing on the board.
          </p>
        </div>
      </div>

      {/* Interactive browser */}
      <ProviderBrowser />
    </div>
  );
}
