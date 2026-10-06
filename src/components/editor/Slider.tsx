"use client";

import { RotateCcw } from "lucide-react";

export function Slider({
  label,
  value,
  min,
  max,
  unit = "",
  onChange,
  onReset,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  unit?: string;
  onChange: (v: number) => void;
  onReset?: () => void;
}) {
  return (
    <div>
      <div className="mb-1 flex items-baseline justify-between">
        <span className="text-xs text-ink/80">{label}</span>
        <span className="flex items-center gap-2">
          <span className="text-xs tabular-nums text-mut">
            {value}
            {unit}
          </span>
          {onReset && (
            <button
              onClick={onReset}
              className="text-mut hover:text-accent transition-colors"
              title="Reset"
            >
              <RotateCcw size={11} />
            </button>
          )}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="w-full"
      />
    </div>
  );
}