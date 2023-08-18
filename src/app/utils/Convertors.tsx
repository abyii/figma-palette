import Color from 'colorjs.io';

export function oklchToRgb(l: number, c: number, h: number): { r: number; g: number; b: number } {
  const oklchString = `oklch(${l} ${c} ${h})`;
  const srgbColor = new Color(oklchString).to('srgb', { inGamut: true });
  return { r: srgbColor['r'], g: srgbColor['g'], b: srgbColor['b'] };
}
