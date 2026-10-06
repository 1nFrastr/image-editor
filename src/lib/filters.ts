export type Filters = {
  brightness: number;
  contrast: number;
  saturation: number;
  grayscale: number;
  sepia: number;
  blur: number;
  hue: number;
};

export type Transform = {
  rotate: number; // 0/90/180/270
  flipH: boolean;
  flipV: boolean;
};

export const defaultFilters: Filters = {
  brightness: 100,
  contrast: 100,
  saturation: 100,
  grayscale: 0,
  sepia: 0,
  blur: 0,
  hue: 0,
};

export const defaultTransform: Transform = {
  rotate: 0,
  flipH: false,
  flipV: false,
};

export function cssFilter(f: Filters): string {
  return [
    `brightness(${f.brightness}%)`,
    `contrast(${f.contrast}%)`,
    `saturate(${f.saturation}%)`,
    `grayscale(${f.grayscale}%)`,
    `sepia(${f.sepia}%)`,
    `hue-rotate(${f.hue}deg)`,
    f.blur > 0 ? `blur(${f.blur}px)` : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export function cssTransform(t: Transform): string {
  return [
    `rotate(${t.rotate}deg)`,
    t.flipH ? "scaleX(-1)" : "",
    t.flipV ? "scaleY(-1)" : "",
  ]
    .filter(Boolean)
    .join(" ");
}

export const presets: Record<string, Partial<Filters>> = {
  None: {},
  Noir: { grayscale: 100, contrast: 125, brightness: 95 },
  Vintage: { sepia: 55, saturation: 80, contrast: 110 },
  Vivid: { saturation: 160, contrast: 115 },
  Cold: { hue: 190, saturation: 90, brightness: 105 },
  Fade: { saturation: 60, contrast: 85, brightness: 110 },
  Dream: { blur: 1.5, saturation: 130, brightness: 108 },
};
