import type { MetadataRoute } from "next";
import { models } from "@/data/models";
import { providers } from "@/data/providers";
import { newsSorted } from "@/data/news";

const baseUrl = "https://ai-model-index.vercel.app";
const lastVerified = new Date("2026-09-25T00:00:00Z");

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: lastVerified, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/models`, lastModified: lastVerified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/compare`, lastModified: lastVerified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/providers`, lastModified: lastVerified, changeFrequency: "weekly", priority: 0.8 },
    { url: `${baseUrl}/api-providers`, lastModified: lastVerified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/tools`, lastModified: lastVerified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/benchmarks`, lastModified: lastVerified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/methodology`, lastModified: lastVerified, changeFrequency: "monthly", priority: 0.6 },
    { url: `${baseUrl}/news`, lastModified: lastVerified, changeFrequency: "daily", priority: 0.7 },
  ];

  return [
    ...staticRoutes,
    ...models.map((model) => ({
      url: `${baseUrl}/models/${model.slug}`,
      lastModified: model.verifiedOn ? new Date(model.verifiedOn) : lastVerified,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...providers.map((provider) => ({
      url: `${baseUrl}/providers/${provider.id}`,
      lastModified: lastVerified,
      changeFrequency: "weekly" as const,
      priority: 0.7,
    })),
    ...newsSorted.map((item) => ({
      url: `${baseUrl}/news/${item.slug}`,
      lastModified: new Date(`${item.date}T00:00:00Z`),
      changeFrequency: "yearly" as const,
      priority: 0.6,
    })),
  ];
}
