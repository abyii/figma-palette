import Color from 'colorjs.io';
import { Curve } from './Curve';

export const MAX_SHADES = 16;
export const MIN_SHADES = 3;

// true to css values. different from slider values.
export const MAX_HUE = 360;
export const MIN_HUE = 0;
export const MAX_CHROMA = 0.37;
export const MIN_CHROMA = 0;
export const MAX_LUMINESCENCE = 1;
export const MIN_LUMINESCENCE = 0;

function generateBellCurve(maxValue: number, count: number, shift: number): number[] {
  const values: number[] = [];
  const center = Math.floor(count / 2);

  for (let i = 0; i < count; i++) {
    const x = i - center + shift;
    const exponent = (-Math.pow(x, 2) / Math.pow(center, 2)) * 2;
    const value = maxValue * Math.exp(exponent);
    values.push(value);
  }

  return values;
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

export class Palette {
  private _numberOfShades: number;
  private _baseColorHex: string;
  public name: string;
  // true to css values.
  public lightnessChannel: number[];
  public chromaChannel: number[];
  public hueChannel: number[];
  private _lightnessCurve: Curve;
  private _chromaCurve: Curve;
  private _hueCurve: Curve;

  constructor(
    name: string,
    baseColorHex: string,
    numberOfShades: number = 10,
    lightnessCurve: Curve,
    chromaCurve: Curve,
    hueCurve: Curve
  ) {
    this._numberOfShades = clamp(numberOfShades, MIN_SHADES, MAX_SHADES);
    this._baseColorHex = baseColorHex;
    this.name = name;
    this._lightnessCurve = lightnessCurve;
    this._chromaCurve = chromaCurve;
    this._hueCurve = hueCurve;
    this.generateChannels();
  }

  public get baseColorHex(): string {
    return this._baseColorHex;
  }

  public get numberOfShades(): number {
    return this._numberOfShades;
  }

  set baseColorHex(newHex: string) {
    this._baseColorHex = newHex;
    this.generateChannels();
  }

  set numberOfShades(newNumberOfShades: number) {
    this.numberOfShades = clamp(newNumberOfShades, MIN_SHADES, MAX_SHADES);
    this.generateChannels();
  }

  set lightnessCurve(newCurve: Curve) {
    this._lightnessCurve = newCurve;
    this._generateLightnessChannel();
  }

  set chromaCurve(newCurve: Curve) {
    this._chromaCurve = newCurve;
    this._generateChromaChannel();
  }

  set hueCurve(newCurve: Curve) {
    this._hueCurve = newCurve;
    this._generateHueChannel();
  }

  private generateChannels() {
    // @ts-ignore
    const baseColorOKLCH = new Color(this.baseColorHex).oklch;
    this.lightnessChannel = Array.from({ length: this._numberOfShades }).map(
      (_, i) => (0.9 / (this._numberOfShades - 1)) * i + 0.08
    );
    this.chromaChannel = generateBellCurve(baseColorOKLCH[1], this.numberOfShades, 0);
    this.hueChannel = Array.from({ length: this._numberOfShades }).map(() =>
      isNaN(baseColorOKLCH[2]) ? 0 : baseColorOKLCH[2]
    );
  }

  private _generateLightnessChannel() {
    this.lightnessChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
      clamp(this._lightnessCurve.generateY(i), MIN_LUMINESCENCE, MAX_LUMINESCENCE)
    );
  }

  private _generateChromaChannel() {
    this.chromaChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
      clamp(this._chromaCurve.generateY(i), MIN_CHROMA, MAX_CHROMA)
    );
  }

  private _generateHueChannel() {
    this.hueChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
      clamp(this._hueCurve.generateY(i), MIN_HUE, MAX_HUE)
    );
  }
}
