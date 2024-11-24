import { oklch } from 'culori/css';
import { Curve } from './Curve';
export const MAX_SHADES = 15;
export const MIN_SHADES = 3;

// true to css values. different from slider values.
export const MAX_HUE = 360;
export const MIN_HUE = 0;
export const MAX_CHROMA = 0.37;
export const MIN_CHROMA = 0;
export const MAX_LUMINESCENCE = 1;
export const MIN_LUMINESCENCE = 0;

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
    baseColorHex: string = '#000000',
    numberOfShades: number = 10,
    lightnessCurve: Curve = null,
    chromaCurve: Curve = null,
    hueCurve: Curve = null
  ) {
    this.name = name;
    this._numberOfShades = clamp(numberOfShades, MIN_SHADES, MAX_SHADES);
    this._baseColorHex = baseColorHex;
    this._lightnessCurve = lightnessCurve;
    this._chromaCurve = chromaCurve;
    this._hueCurve = hueCurve;
    this._generateLightnessChannel();
    this._generateChromaChannel();
    this._generateHueChannel();
  }

  public get baseColorHex(): string {
    return this._baseColorHex;
  }

  public get numberOfShades(): number {
    return this._numberOfShades;
  }

  set baseColorHex(newHex: string) {
    this._baseColorHex = newHex;
    this._generateLightnessChannel();
    this._generateChromaChannel();
    this._generateHueChannel();
  }

  set numberOfShades(newNumberOfShades: number) {
    this._numberOfShades = clamp(newNumberOfShades, MIN_SHADES, MAX_SHADES);
    this._generateLightnessChannel();
    this._generateChromaChannel();
    this._generateHueChannel();
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

  private _generateLightnessChannel() {
    if (this._lightnessCurve) {
      this.lightnessChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
        clamp(this._lightnessCurve.generateY(i), MIN_LUMINESCENCE, MAX_LUMINESCENCE)
      );
    } else {
      this.lightnessChannel = Array.from({ length: this._numberOfShades }).map(
        (_, i) => (0.9 / (this._numberOfShades - 1)) * i + 0.08
      );
    }
  }

  private _generateChromaChannel() {
    if (this._chromaCurve) {
      this.chromaChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
        clamp(this._chromaCurve.generateY(i), MIN_CHROMA, MAX_CHROMA)
      );
    } else {
      // generating normal distribution
      this.chromaChannel = Array.from({ length: this._numberOfShades }).map((_, i) => {
        const center = Math.floor(this._numberOfShades / 2);
        const x = i - center;
        const exponent = (-Math.pow(x, 2) / Math.pow(center, 2)) * 2;
        return oklch(this._baseColorHex)?.c * Math.exp(exponent);
      });
    }
  }

  private _generateHueChannel() {
    if (this._hueCurve) {
      this.hueChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
        clamp(this._hueCurve.generateY(i), MIN_HUE, MAX_HUE)
      );
    } else {
      this.hueChannel = Array.from({ length: this._numberOfShades }).map(() => oklch(this._baseColorHex).h || 0);
    }
  }
}
