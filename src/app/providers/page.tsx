import type { Metadata } from "next";
import { ProviderBrowser } from "./browser";

export const metadata: Metadata = {
  title: "Providers",
  description:
    "The labs behind the models — OpenAI, Anthropic, Google DeepMind, xAI, Meta, DeepSeek, Qwen, and more.",
};

export default function ProvidersPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <div className="mb-10">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Providers</h1>
        <p className="mt-2 max-w-xl text-text-secondary">
          The labs shaping the frontier. Search for a lab to see what they ship and how their models are performing.
        </p>
      </div>
      <ProviderBrowser />
    </div>
  );
}
