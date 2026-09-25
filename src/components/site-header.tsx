import { SiteHeaderClient } from "@/components/site-header-client";
import type { PaletteItem } from "@/components/command-palette";
import { benchmarks } from "@/data/benchmarks";
import { models } from "@/data/models";
import { providers } from "@/data/providers";
import { apiProviders } from "@/data/api-providers";

const links = [
  { href: "/models", label: "Models" },
  { href: "/compare", label: "Compare" },
  { href: "/providers", label: "Labs" },
  { href: "/api-providers", label: "API access" },
  { href: "/tools", label: "Tools" },
  { href: "/news", label: "News" },
];

const paletteItems: PaletteItem[] = [
  ...models.map((model) => ({
    label: model.name,
    sub: model.tagline,
    href: `/models/${model.slug}`,
    kind: "model" as const,
  })),
  ...providers.map((provider) => ({
    label: provider.name,
    sub: provider.tagline,
    href: `/providers/${provider.id}`,
    kind: "provider" as const,
  })),
  ...apiProviders.map((provider) => ({
    label: provider.name,
    sub: provider.summary,
    href: "/api-providers",
    kind: "provider" as const,
  })),
  ...benchmarks.map((benchmark) => ({
    label: benchmark.name,
    sub: benchmark.source,
    href: "/benchmarks",
    kind: "benchmark" as const,
  })),
  ...links.map((link) => ({
    label: link.label,
    sub: "page",
    href: link.href,
    kind: "page" as const,
  })),
  {
    label: "Cost calculator",
    sub: "tool",
    href: "/tools/calculator",
    kind: "page" as const,
  },
  {
    label: "Value map",
    sub: "tool",
    href: "/tools/value-map",
    kind: "page" as const,
  },
  {
    label: "Speed race",
    sub: "tool",
    href: "/tools/speed-race",
    kind: "page" as const,
  },
  {
    label: "Methodology",
    sub: "reference",
    href: "/methodology",
    kind: "page" as const,
  },
];

export function SiteHeader() {
  return <SiteHeaderClient links={links} paletteItems={paletteItems} />;
}
