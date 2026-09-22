import type { Metadata } from "next";
import Link from "next/link";
import { providers } from "@/data/providers";
import { modelsByProvider } from "@/data/models";

export const metadata: Metadata = {
  title: "AI providers",
  description:
    "The labs behind the models — OpenAI, Anthropic, Google DeepMind, xAI, Meta, DeepSeek, Qwen, Moonshot, Z.ai and more.",
};

export default function ProvidersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Providers</h1>
        <p className="mt-2 max-w-2xl text-muted">
          The labs shaping the frontier — who they are, what they ship, and how
          their models are doing.
        </p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((p) => {
          const count = modelsByProvider(p.id).length;
          return (
            <Link
              key={p.id}
              href={`/providers/${p.id}`}
              className="group rounded-2xl border border-border-subtle bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
            >
              <div className="flex items-center gap-3">
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-sm font-bold text-white"
                  style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}bb)` }}
                >
                  {p.shortName.slice(0, 2).toUpperCase()}
                </span>
                <div>
                  <div className="font-semibold group-hover:text-accent">{p.name}</div>
                  <div className="text-xs text-muted">
                    {count} model{count === 1 ? "" : "s"} tracked
                  </div>
                </div>
              </div>
              <p className="mt-3 line-clamp-2 text-sm text-muted">{p.tagline}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
