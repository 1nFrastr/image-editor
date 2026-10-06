"use client";

import { useRef, useState } from "react";

export function Dropzone({ onImage }: { onImage: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);

  return (
    <div
      onDragOver={(e) => {
        e.preventDefault();
        setOver(true);
      }}
      onDragLeave={() => setOver(false)}
      onDrop={(e) => {
        e.preventDefault();
        setOver(false);
        const f = e.dataTransfer.files?.[0];
        if (f && f.type.startsWith("image/")) onImage(f);
      }}
      onClick={() => inputRef.current?.click()}
      className={`flex h-full min-h-[320px] cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed transition-colors ${
        over ? "border-accent bg-accent/5" : "border-ink/15 hover:border-ink/30"
      }`}
    >
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-xl">
        🖼
      </div>
      <p className="text-sm text-ink/80">Drop an image here, or click to browse</p>
      <p className="mt-1 text-xs text-mut">PNG · JPEG · WebP — edited locally, nothing uploaded</p>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const f = e.target.files?.[0];
          if (f) onImage(f);
        }}
      />
    </div>
  );
}