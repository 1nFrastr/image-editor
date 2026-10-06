"use client";

import { RotateCcwSquare, RotateCwSquare, FlipHorizontal, FlipVertical } from "lucide-react";
import { Transform } from "@/lib/filters";

export function TransformPanel({
  transform,
  onChange,
}: {
  transform: Transform;
  onChange: (t: Transform) => void;
}) {
  const btn =
    "flex-1 rounded-md border border-ink/15 px-3 py-2 text-xs text-ink/80 hover:border-accent hover:text-accent transition-colors";
  return (
    <div className="space-y-4">
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-mut">Rotate</p>
        <div className="flex gap-2">
          <button className={`${btn} flex items-center justify-center gap-1.5`} onClick={() => onChange({ ...transform, rotate: (transform.rotate + 270) % 360 })}>
            <RotateCcwSquare size={14} /> 90°
          </button>
          <button className={`${btn} flex items-center justify-center gap-1.5`} onClick={() => onChange({ ...transform, rotate: (transform.rotate + 90) % 360 })}>
            <RotateCwSquare size={14} /> 90°
          </button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-mut">Flip</p>
        <div className="flex gap-2">
          <button
            className={`${btn} flex items-center justify-center gap-1.5 ${transform.flipH ? "border-accent text-accent" : ""}`}
            onClick={() => onChange({ ...transform, flipH: !transform.flipH })}
          >
            <FlipHorizontal size={14} /> Horizontal
          </button>
          <button
            className={`${btn} flex items-center justify-center gap-1.5 ${transform.flipV ? "border-accent text-accent" : ""}`}
            onClick={() => onChange({ ...transform, flipV: !transform.flipV })}
          >
            <FlipVertical size={14} /> Vertical
          </button>
        </div>
      </div>
      <p className="text-[11px] text-mut">
        Current rotation: {transform.rotate}°
      </p>
    </div>
  );
}