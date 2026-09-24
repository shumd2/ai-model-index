import type { Metadata } from "next";
import { SpeedRace } from "@/components/speed-race";
import { models } from "@/data/models";

export const metadata: Metadata = {
  title: "Speed race",
  description:
    "AI models racing at their real measured output speeds — from Celeris-1's 1,492 t/s down the board. Watch the gaps, then feel them.",
};

export default function SpeedRacePage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Speed race</h1>
        <p className="mt-2 max-w-2xl text-muted">
          Latency is a feature. These are real measured output speeds — run the
          race to see how far Celeris-1 (1,492 t/s) is ahead of Mercury 2 (750),
          and how far both are ahead of almost everything else.
        </p>
      </div>
      <SpeedRace allModels={models} />
    </div>
  );
}
