"use client";

import { useRef, useState } from "react";

export function ExportPanel({
  getImage,
  hasImage,
}: {
  getImage: () => HTMLCanvasElement | null;
  hasImage: boolean;
}) {
  const [quality, setQuality] = useState(0.92);
  const [format, setFormat] = useState<"image/png" | "image/jpeg">("image/png");
  const [scale, setScale] = useState(100);
  const [status, setStatus] = useState<string | null>(null);
  const anchorRef = useRef<HTMLAnchorElement>(null);

  async function download() {
    const src = getImage();
    if (!src) return;
    setStatus("Rendering…");
    const out = document.createElement("canvas");
    const w = (src.width * scale) / 100;
    const h = (src.height * scale) / 100;
    // Render at natural size (offscreen), then scale
    const natural = document.createElement("canvas");
    natural.width = src.width;
    natural.height = src.height;
    natural.getContext("2d")!.drawImage(src, 0, 0);
    out.width = Math.max(1, Math.round(w));
    out.height = Math.max(1, Math.round(h));
    const ctx = out.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(natural, 0, 0, out.width, out.height);
    await new Promise((r) => setTimeout(r, 30));
    const url = out.toDataURL(format, quality);
    const a = anchorRef.current!;
    a.href = url;
    a.download = `edited.${format === "image/png" ? "png" : "jpg"}`;
    a.click();
    setStatus(null);
  }

  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-mut">Format</p>
        <div className="flex gap-2">
          {(["image/png", "image/jpeg"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`flex-1 rounded-md border px-3 py-2 text-xs transition-colors ${
                format === f ? "border-accent text-accent" : "border-ink/15 text-mut hover:text-ink"
              }`}
            >
              {f === "image/png" ? "PNG" : "JPEG"}
            </button>
          ))}
        </div>
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-ink/80">Quality</span>
          <span className="tabular-nums text-mut">{Math.round(quality * 100)}%</span>
        </div>
        <input
          type="range"
          min={30}
          max={100}
          value={Math.round(quality * 100)}
          disabled={format === "image/png"}
          onChange={(e) => setQuality(Number(e.target.value) / 100)}
          className="w-full disabled:opacity-30"
        />
      </div>
      <div>
        <div className="mb-1 flex justify-between text-xs">
          <span className="text-ink/80">Scale</span>
          <span className="tabular-nums text-mut">{scale}%</span>
        </div>
        <input
          type="range"
          min={10}
          max={200}
          value={scale}
          onChange={(e) => setScale(Number(e.target.value))}
          className="w-full"
        />
      </div>
      <button
        onClick={download}
        disabled={!hasImage}
        className="w-full rounded-md bg-accent px-4 py-2.5 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {status ?? "Download image"}
      </button>
      <a ref={anchorRef} className="hidden" />
    </div>
  );
}