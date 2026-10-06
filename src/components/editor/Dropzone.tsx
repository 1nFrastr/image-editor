"use client";

import { useRef, useState } from "react";
import { Image as ImageIcon, Sparkles, Loader2 } from "lucide-react";

export function Dropzone({ onImage }: { onImage: (file: File) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [over, setOver] = useState(false);
  const [loading, setLoading] = useState(false);

  async function loadSample() {
    setLoading(true);
    try {
      const res = await fetch("https://picsum.photos/seed/darkroom/1200/800");
      const blob = await res.blob();
      onImage(new File([blob], "sample.jpg", { type: blob.type || "image/jpeg" }));
    } catch {
      setLoading(false);
    }
  }

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
      <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full border border-ink/15 text-accent">
        <ImageIcon size={22} />
      </div>
      <p className="text-sm font-medium text-ink/80">点击上传图片,或直接拖拽到这里</p>
      <p className="mt-1 text-xs text-mut">支持 PNG · JPEG · WebP — 全部在本地处理,不会上传到服务器</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          loadSample();
        }}
        className="mt-4 flex items-center gap-1.5 rounded-md border border-ink/15 px-3 py-1.5 text-xs text-mut transition-colors hover:border-accent hover:text-accent"
      >
        {loading ? <Loader2 size={14} className="animate-spin" /> : <Sparkles size={14} />}
        {loading ? "加载示例图…" : "没有图片?用一张示例图试试"}
      </button>
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