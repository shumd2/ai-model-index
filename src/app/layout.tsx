import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CompareTray } from "@/components/compare-tray";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ai-model-index.vercel.app"),
  title: {
    default: "AI Model Index — The community guide to frontier AI models",
    template: "%s · AI Model Index",
  },
  description:
    "Independent, community-driven reference for the newest AI models: specs, benchmark scores, arena rankings and insights you won't find on official pages.",
  keywords: [
    "AI models",
    "LLM benchmarks",
    "model comparison",
    "LLM leaderboard",
    "GPT-6",
    "Claude",
    "Gemini",
    "open weights",
  ],
  openGraph: {
    type: "website",
    siteName: "AI Model Index",
    title: "AI Model Index — The community guide to frontier AI models",
    description:
      "Specs, benchmark scores and community insights for every frontier AI model — GPT-6, Claude Fable, Gemini 3.8, Kimi K3, GLM-5.3 and more.",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Model Index",
    description:
      "The community guide to frontier AI models — benchmarks, specs and insights.",
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <Providers>
      <html
        lang="en"
        suppressHydrationWarning
        className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="flex min-h-full flex-col">
          <SiteHeader />
          <main className="flex-1">{children}</main>
          <SiteFooter />
          <CompareTray />
        </body>
      </html>
    </Providers>
  );
}
