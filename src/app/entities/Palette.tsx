import { oklch } from 'culori/css';
import { Curve } from './Curve';
import { SelectedCurveKey } from './presetCurves';
import {
  MAX_CHROMA,
  MAX_HUE,
  MAX_LUMINESCENCE,
  MAX_SHADES,
  MIN_CHROMA,
  MIN_HUE,
  MIN_LUMINESCENCE,
  MIN_SHADES,
} from '../config';

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
  private _lightnessCurves: Record<SelectedCurveKey, Curve>;
  private _chromaCurves: Record<SelectedCurveKey, Curve>;
  private _hueCurves: Record<SelectedCurveKey, Curve>;
  private _selectedLightnessCurve: SelectedCurveKey;
  private _selectedChromaCurve: SelectedCurveKey;
  private _selectedHueCurve: SelectedCurveKey;

  constructor(
    name: string,
    baseColorHex: string = '#000000',
    numberOfShades: number = 10,
    lightnessCurve: SelectedCurveKey = null,
    chromaCurve: SelectedCurveKey = null,
    hueCurve: SelectedCurveKey = null
  ) {
    this.name = name;
    this._numberOfShades = clamp(numberOfShades, MIN_SHADES, MAX_SHADES);
    this._baseColorHex = baseColorHex;
    this._selectedLightnessCurve = lightnessCurve;
    this._selectedChromaCurve = chromaCurve;
    this._selectedHueCurve = hueCurve;
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

  public get lightnessCurves(): Record<SelectedCurveKey, Curve> {
    return this._lightnessCurves;
  }

  public get chromaCurves(): Record<SelectedCurveKey, Curve> {
    return this._chromaCurves;
  }

  public get hueCurves(): Record<SelectedCurveKey, Curve> {
    return this._hueCurves;
  }

  public get selectedLightnessCurve(): SelectedCurveKey {
    return this._selectedLightnessCurve;
  }

  public get selectedChromaCurve(): SelectedCurveKey {
    return this._selectedChromaCurve;
  }

  public get selectedHueCurve(): SelectedCurveKey {
    return this._selectedHueCurve;
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

  set selectedLightnessCurve(newCurve: SelectedCurveKey) {
    this._selectedLightnessCurve = newCurve;
    this._generateLightnessChannel();
  }

  set selectedChromaCurve(newCurve: SelectedCurveKey) {
    this._selectedChromaCurve = newCurve;
    this._generateChromaChannel();
  }

  set selectedHueCurve(newCurve: SelectedCurveKey) {
    this._selectedHueCurve = newCurve;
    this._generateHueChannel();
  }

  private _generateLightnessChannel() {
    if (this._lightnessCurves) {
      this.lightnessChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
        clamp(this._lightnessCurves[this._selectedLightnessCurve].generateY(i), MIN_LUMINESCENCE, MAX_LUMINESCENCE)
      );
    } else {
      this.lightnessChannel = Array.from({ length: this._numberOfShades }).map(
        (_, i) => (0.9 / (this._numberOfShades - 1)) * i + 0.08
      );
    }
  }

  private _generateChromaChannel() {
    if (this._chromaCurves) {
      this.chromaChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
        clamp(this._chromaCurves[this._selectedChromaCurve].generateY(i), MIN_CHROMA, MAX_CHROMA)
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
    if (this._hueCurves) {
      this.hueChannel = Array.from({ length: this._numberOfShades }).map((_, i) =>
        clamp(this._hueCurves[this._selectedHueCurve].generateY(i), MIN_HUE, MAX_HUE)
      );
    } else {
      this.hueChannel = Array.from({ length: this._numberOfShades }).map(() => oklch(this._baseColorHex).h || 0);
    }
  }
}
