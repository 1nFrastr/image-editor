"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  Filters,
  Transform,
  defaultFilters,
  defaultTransform,
  cssFilter,
  cssTransform,
  presets,
} from "@/lib/filters";
import { Dropzone } from "./Dropzone";
import { AdjustPanel } from "./AdjustPanel";
import { TransformPanel } from "./TransformPanel";
import { ExportPanel } from "./ExportPanel";

type Tab = "adjust" | "transform" | "export";

export function Editor() {
  const [img, setImg] = useState<HTMLImageElement | null>(null);
  const [fileName, setFileName] = useState("");
  const [filters, setFilters] = useState<Filters>(defaultFilters);
  const [transform, setTransform] = useState<Transform>(defaultTransform);
  const [preset, setPreset] = useState("None");
  const [tab, setTab] = useState<Tab>("adjust");
  const [theme, setTheme] = useState<"light" | "dark">("light");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
  }, [theme]);

  function loadImage(file: File) {
    const url = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      setImg(image);
      setFileName(file.name);
      setFilters(defaultFilters);
      setTransform(defaultTransform);
      setPreset("None");
    };
    image.src = url;
  }

  const resetAll = () => {
    setFilters(defaultFilters);
    setTransform(defaultTransform);
    setPreset("None");
  };

  const applyPreset = (name: string) => {
    setPreset(name);
    setFilters({ ...defaultFilters, ...presets[name] });
  };

  const getImage = useCallback((): HTMLCanvasElement | null => {
    if (!img) return null;
    const swap = transform.rotate % 180 === 90;
    const canvas = document.createElement("canvas");
    canvas.width = swap ? img.naturalHeight : img.naturalWidth;
    canvas.height = swap ? img.naturalWidth : img.naturalHeight;
    const ctx = canvas.getContext("2d")!;
    ctx.fillStyle = "#fff";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.filter = cssFilter(filters);
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate((transform.rotate * Math.PI) / 180);
    ctx.scale(transform.flipH ? -1 : 1, transform.flipV ? -1 : 1);
    ctx.drawImage(img, -img.naturalWidth / 2, -img.naturalHeight / 2);
    return canvas;
  }, [img, filters, transform]);

  useEffect(() => {
    return () => {
      if (img) URL.revokeObjectURL(img.src);
    };
  }, [img]);

  const filterStyle = useMemo(() => cssFilter(filters), [filters]);

  const tabs: { id: Tab; label: string }[] = [
    { id: "adjust", label: "Adjust" },
    { id: "transform", label: "Transform" },
    { id: "export", label: "Export" },
  ];

  return (
    <div className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_300px]">
      {/* Stage */}
      <main className="flex min-h-[60vh] flex-col p-5">
        <header className="mb-4 flex items-center justify-between gap-4">
          <div className="flex items-baseline gap-3">
            <h1 className="text-lg font-semibold tracking-tight">
              Darkroom<span className="text-accent">.</span>
            </h1>
            {img && (
              <p className="max-w-[40vw] truncate text-xs text-mut" title={fileName}>
                {fileName} · {img.naturalWidth}×{img.naturalHeight}
              </p>
            )}
          </div>
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="rounded-full border border-ink/15 px-3 py-1 text-xs text-mut transition-colors hover:border-accent hover:text-accent"
          >
            {theme === "dark" ? "☀️ 浅色" : "🌙 深色"}
          </button>
        </header>
        <div className="checker flex-1 overflow-hidden rounded-xl border border-ink/15 shadow-sm">
          {img ? (
            <div className="flex h-full min-h-[50vh] items-center justify-center p-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.src}
                alt="Editing preview"
                style={{ filter: filterStyle, transform: cssTransform(transform) }}
                className="max-h-[70vh] max-w-full object-contain shadow-2xl shadow-black/50"
              />
            </div>
          ) : (
            <div className="p-8">
              <Dropzone onImage={loadImage} />
            </div>
          )}
        </div>
        {img && (
          <button
            onClick={resetAll}
            className="mt-3 self-start text-xs text-mut underline-offset-4 hover:text-accent hover:underline"
          >
            Reset all edits
          </button>
        )}
      </main>

      {/* Sidebar */}
      <aside className="border-t border-ink/10 bg-panel p-5 lg:border-l lg:border-t-0">
        <div className="mb-5 flex gap-1 rounded-lg bg-bg p-1">
          {tabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex-1 rounded-md px-2 py-1.5 text-xs transition-colors ${
                tab === t.id ? "bg-ink/10 text-ink" : "text-mut hover:text-ink"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        {tab === "adjust" && (
          <AdjustPanel filters={filters} onChange={setFilters} activePreset={preset} onPreset={applyPreset} />
        )}
        {tab === "transform" && <TransformPanel transform={transform} onChange={setTransform} />}
        {tab === "export" && <ExportPanel getImage={getImage} hasImage={!!img} />}
      </aside>
    </div>
  );
}