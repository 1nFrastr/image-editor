"use client";

import { Slider } from "./Slider";
import { Filters, presets } from "@/lib/filters";

const controls: { key: keyof Filters; label: string; min: number; max: number; unit?: string }[] = [
  { key: "brightness", label: "Brightness", min: 20, max: 200 },
  { key: "contrast", label: "Contrast", min: 20, max: 200 },
  { key: "saturation", label: "Saturation", min: 0, max: 200 },
  { key: "grayscale", label: "Grayscale", min: 0, max: 100, unit: "%" },
  { key: "sepia", label: "Sepia", min: 0, max: 100, unit: "%" },
  { key: "hue", label: "Hue shift", min: -180, max: 180, unit: "°" },
  { key: "blur", label: "Blur", min: 0, max: 12, unit: "px" },
];

export function AdjustPanel({
  filters,
  onChange,
  activePreset,
  onPreset,
}: {
  filters: Filters;
  onChange: (f: Filters) => void;
  activePreset: string;
  onPreset: (name: string) => void;
}) {
  return (
    <div className="space-y-5">
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-mut">Presets</p>
        <div className="flex flex-wrap gap-1.5">
          {Object.keys(presets).map((name) => (
            <button
              key={name}
              onClick={() => onPreset(name)}
              className={`rounded-full px-3 py-1 text-xs transition-colors ${
                activePreset === name
                  ? "bg-accent text-bg font-medium"
                  : "border border-ink/15 text-mut hover:text-ink hover:border-ink/30"
              }`}
            >
              {name}
            </button>
          ))}
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-mut">Adjust</p>
        <div className="space-y-3">
          {controls.map((c) => (
            <Slider
              key={c.key}
              label={c.label}
              value={filters[c.key]}
              min={c.min}
              max={c.max}
              unit={c.unit}
              onChange={(v) => onChange({ ...filters, [c.key]: v })}
              onReset={() => onChange({ ...filters, [c.key]: c.key === "brightness" || c.key === "contrast" || c.key === "saturation" ? 100 : 0 })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}