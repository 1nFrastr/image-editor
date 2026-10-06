"use client";

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
          <button className={btn} onClick={() => onChange({ ...transform, rotate: (transform.rotate + 270) % 360 })}>
            ⟲ 90°
          </button>
          <button className={btn} onClick={() => onChange({ ...transform, rotate: (transform.rotate + 90) % 360 })}>
            ⟳ 90°
          </button>
        </div>
      </div>
      <div>
        <p className="mb-2 text-[11px] uppercase tracking-[0.18em] text-mut">Flip</p>
        <div className="flex gap-2">
          <button
            className={`${btn} ${transform.flipH ? "border-accent text-accent" : ""}`}
            onClick={() => onChange({ ...transform, flipH: !transform.flipH })}
          >
            Horizontal
          </button>
          <button
            className={`${btn} ${transform.flipV ? "border-accent text-accent" : ""}`}
            onClick={() => onChange({ ...transform, flipV: !transform.flipV })}
          >
            Vertical
          </button>
        </div>
      </div>
      <p className="text-[11px] text-mut">
        Current rotation: {transform.rotate}°
      </p>
    </div>
  );
}