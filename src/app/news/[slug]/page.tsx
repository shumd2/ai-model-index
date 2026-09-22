import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { news, newsSorted } from "@/data/news";
import { getProvider } from "@/data/providers";

export const dynamicParams = false;

export function generateStaticParams() {
  return news.map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/news/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

export default async function NewsPostPage({ params }: PageProps<"/news/[slug]">) {
  const { slug } = await params;
  const item = news.find((n) => n.slug === slug);
  if (!item) notFound();

  const provider = item.provider ? getProvider(item.provider) : null;
  const { default: Content } = await import(`@/content/news/${item.slug}.mdx`);

  const related = newsSorted.filter((n) => n.slug !== item.slug).slice(0, 3);

  return (
    <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6">
      <nav className="text-sm text-muted">
        <Link href="/news" className="hover:text-foreground">News</Link>
        <span className="mx-1.5">/</span>
      </nav>

      <article>
        <header className="mt-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
            {provider && (
              <span
                className="rounded-md px-2 py-1 font-medium"
                style={{ background: `${provider.color}18`, color: provider.color }}
              >
                {provider.name}
              </span>
            )}
            <span>
              {new Date(item.date + "T00:00:00").toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </span>
          </div>
          <h1 className="mt-4 text-3xl font-bold leading-tight tracking-tight sm:text-4xl">
            {item.title}
          </h1>
          <p className="mt-4 text-lg text-muted">{item.summary}</p>
        </header>

        <div className="prose prose-ai mt-10 max-w-none">
          <Content />
        </div>
      </article>

      <section className="mt-14 border-t border-border-subtle pt-8">
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-muted">
          Keep reading
        </h2>
        <div className="grid gap-3 sm:grid-cols-3">
          {related.map((n) => (
            <Link
              key={n.slug}
              href={`/news/${n.slug}`}
              className="rounded-xl border border-border-subtle bg-surface p-4 text-sm transition-colors hover:border-accent/40"
            >
              <div className="font-medium leading-snug group-hover:text-accent">{n.title}</div>
              <div className="mt-1.5 text-xs text-muted">{n.date}</div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
