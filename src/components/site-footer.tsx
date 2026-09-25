import Link from "next/link";
import { ExternalLink } from "@/components/external-link";

const explore = [
  { href: "/models", label: "Model catalog" },
  { href: "/compare", label: "Compare models" },
  { href: "/providers", label: "Model labs" },
  { href: "/api-providers", label: "API access" },
];

const tools = [
  { href: "/tools/calculator", label: "Cost calculator" },
  { href: "/tools/value-map", label: "Value map" },
  { href: "/tools/speed-race", label: "Speed race" },
];

const reference = [
  { href: "/benchmarks", label: "Benchmarks" },
  { href: "/news", label: "News" },
  { href: "/methodology", label: "Methodology" },
];

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="footer-grid">
        <div className="footer-brand">
          <Link href="/" className="footer-logo">
            <span>AI</span>
            <strong>Model Index</strong>
          </Link>
          <p>
            An independent reference for frontier AI models, their makers,
            verified benchmarks and practical API access.
          </p>
          <div className="footer-status">
            <span className="status-dot" />
            Registry checked Sep 25, 2026
          </div>
        </div>

        <div className="footer-links">
          <div>
            <span>Explore</span>
            {explore.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div>
            <span>Tools</span>
            {tools.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
          <div>
            <span>Reference</span>
            {reference.map((item) => (
              <Link key={item.href} href={item.href}>{item.label}</Link>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>© 2026 AI Model Index. Community-maintained.</span>
        <div>
          <span>Primary sources</span>
          <ExternalLink href="https://artificialanalysis.ai/">Artificial Analysis</ExternalLink>
          <ExternalLink href="https://lmarena.ai/">LMArena</ExternalLink>
          <ExternalLink href="https://openrouter.ai/models">OpenRouter</ExternalLink>
        </div>
      </div>
    </footer>
  );
}
