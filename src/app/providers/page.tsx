import type { Metadata } from "next";
import Link from "next/link";
import { providers } from "@/data/providers";
import { modelsByProvider } from "@/data/models";
import { Reveal } from "@/components/reveal";

export const metadata: Metadata = {
  title: "AI providers",
  description:
    "The labs behind the models — OpenAI, Anthropic, Google DeepMind, xAI, Meta, DeepSeek, Qwen, Moonshot, Z.ai and more.",
};

export default function ProvidersPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <Reveal>
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
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {providers.map((p, i) => {
          const count = modelsByProvider(p.id).length;
          return (
            <Reveal key={p.id} delay={i % 3}>
              <Link
                href={`/providers/${p.id}`}
                className="group relative overflow-hidden rounded-2xl border border-border-subtle bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/30 hover:shadow-xl hover:shadow-accent/5"
              >
                <div aria-hidden className="absolute -bottom-10 -right-10 h-24 w-24 rounded-full blur-[40px]" style={{ background: `radial-gradient(closest-side, ${p.color}15, transparent)` }} />
                <div className="relative flex items-center gap-3">
                  <span
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-[12px] font-bold text-white"
                    style={{ background: `linear-gradient(135deg, ${p.color}, ${p.color}aa)` }}
                  >
                    {p.shortName.slice(0, 2).toUpperCase()}
                  </span>
                  <div>
                    <div className="text-sm font-semibold group-hover:text-accent">{p.name}</div>
                    <div className="text-[11px] text-muted">{count} model{count !== 1 ? "s" : ""} · {p.hq}</div>
                  </div>
                </div>
                <p className="mt-3 text-xs leading-relaxed text-muted line-clamp-2">{p.tagline}</p>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </div>
  );
}