import type { Modality } from "@/data/models";

const labels: Record<Modality, { label: string; icon: string }> = {
  text: { label: "Text", icon: "T" },
  "image-in": { label: "Image in", icon: "IMG→" },
  "image-out": { label: "Image out", icon: "→IMG" },
  "audio-in": { label: "Audio in", icon: "AUD→" },
  "audio-out": { label: "Audio out", icon: "→AUD" },
  "video-in": { label: "Video in", icon: "VID→" },
  "video-out": { label: "Video out", icon: "→VID" },
};

export function ModalityBadges({ modalities }: { modalities: Modality[] }) {
  return (
    <div className="flex flex-wrap gap-1.5">
      {modalities.map((m) => (
        <span
          key={m}
          className="rounded-md border border-border-subtle bg-surface-2 px-2 py-0.5 font-mono text-[11px] text-muted"
        >
          {labels[m].icon}
        </span>
      ))}
    </div>
  );
}
