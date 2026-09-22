import Link from "next/link";
import type { Model } from "@/data/models";
import { formatContext } from "@/data/models";
import { getProvider } from "@/data/providers";
import { ModalityBadges } from "./modality-badges";

export function ModelCard({ model }: { model: Model }) {
  const provider = getProvider(model.provider);

  return (
    <Link
      href={`/models/${model.slug}`}
      className="group relative flex flex-col rounded-2xl border border-border-subtle bg-surface p-5 transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-lg hover:shadow-accent/5"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-[13px] font-bold text-white"
            style={{ background: `linear-gradient(135deg, ${provider.color}, ${provider.color}bb)` }}
          >
            {provider.shortName.slice(0, 2).toUpperCase()}
          </span>
          <div>
            <div className="font-semibold leading-tight group-hover:text-accent">
              {model.name}
            </div>
            <div className="text-xs text-muted">{provider.name}</div>
          </div>
        </div>
        {model.scores["aa-intelligence"] != null && (
          <div
            className="rounded-lg px-2 py-1 text-center"
            style={{ background: `${provider.color}18` }}
          >
            <div className="font-mono text-base font-bold leading-none" style={{ color: provider.color }}>
              {model.scores["aa-intelligence"]}
            </div>
            <div className="mt-0.5 text-[9px] uppercase tracking-wide text-muted">AA idx</div>
          </div>
        )}
      </div>

      <p className="mt-3 line-clamp-2 text-sm text-muted">{model.tagline}</p>

      <div className="mt-auto pt-4">
        <div className="flex items-center gap-3 text-xs text-muted">
          {model.contextWindow ? (
            <span>
              <span className="font-mono font-semibold text-foreground">
                {formatContext(model.contextWindow)}
              </span>{" "}
              ctx
            </span>
          ) : (
            <span className="italic opacity-60">ctx n/a</span>
          )}
          {model.openWeights && (
            <span className="rounded-md bg-emerald-500/10 px-1.5 py-0.5 font-medium text-emerald-600 dark:text-emerald-400">
              Open weights
            </span>
          )}
          {model.status === "beta" && (
            <span className="rounded-md bg-amber-500/10 px-1.5 py-0.5 font-medium text-amber-600 dark:text-amber-400">
              Beta
            </span>
          )}
          {model.status === "legacy" && (
            <span className="rounded-md bg-zinc-500/10 px-1.5 py-0.5 font-medium text-zinc-500 dark:text-zinc-400">
              Legacy
            </span>
          )}
        </div>
        <div className="mt-3 border-t border-border-subtle pt-3">
          <ModalityBadges modalities={model.modalities.slice(0, 4)} />
        </div>
      </div>
    </Link>
  );
}
