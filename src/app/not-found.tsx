import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-6xl flex-col items-center px-4 py-32 text-center sm:px-6">
      <div className="font-mono text-7xl font-bold text-accent">404</div>
      <h1 className="mt-4 text-2xl font-bold">This model doesn&apos;t exist (yet)</h1>
      <p className="mt-3 max-w-md text-muted">
        Maybe it was renamed, deprecated, or it&apos;s a model we should be
        tracking. Browse the catalog instead.
      </p>
      <div className="mt-8 flex gap-3">
        <Link
          href="/models"
          className="rounded-xl bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90"
        >
          Browse models
        </Link>
        <Link
          href="/"
          className="rounded-xl border border-border-subtle bg-surface px-5 py-2.5 text-sm font-medium hover:border-accent/40"
        >
          Home
        </Link>
      </div>
    </div>
  );
}
