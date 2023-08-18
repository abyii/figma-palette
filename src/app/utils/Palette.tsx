import Color from 'colorjs.io';

export const MAX_SHADES = 16;
export const MIN_SHADES = 3;

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

export class Palette {
  private _numberOfShades: number = 10;
  private _baseColorHex: string = '#000000';
  public name: string;
  // true to css
  public lightnessChannel: number[]; // from 0 to 1
  public chromaChannel: number[]; // from 0 to 0.4
  public hueChannel: number[]; // from 0 to 359

  constructor(name: string, baseColorHex: string = '#000000', numberOfShades: number = 10) {
    if (numberOfShades > MAX_SHADES) {
      this._numberOfShades = MAX_SHADES;
    } else if (numberOfShades < MIN_SHADES) {
      this._numberOfShades = MIN_SHADES;
    } else {
      this._numberOfShades = numberOfShades;
    }
    this._baseColorHex = baseColorHex;
    this.name = name;
    this.generateChannels();
  }

  private generateChannels() {
    const baseColorOKLCH = new Color(this.baseColorHex).oklch;
    this.lightnessChannel = Array.from({ length: this._numberOfShades }).map(
      (_, i) => (0.9 / (this._numberOfShades - 1)) * i + 0.08
    );
    this.chromaChannel = generateBellCurve(baseColorOKLCH[1], this.numberOfShades, 0);
    this.hueChannel = Array.from({ length: this._numberOfShades }).map(() =>
      isNaN(baseColorOKLCH[2]) ? 0 : baseColorOKLCH[2]
    );
  }

  set baseColorHex(newHex: string) {
    this._baseColorHex = newHex;
    this.generateChannels();
  }

  set numberOfShades(newNumberOfShades: number) {
    if (newNumberOfShades > MAX_SHADES) {
      this._numberOfShades = MAX_SHADES;
    } else if (newNumberOfShades < MIN_SHADES) {
      this._numberOfShades = MIN_SHADES;
    } else {
      this._numberOfShades = newNumberOfShades;
    }

    this.generateChannels();
  }

  public get baseColorHex(): string {
    return this._baseColorHex;
  }

  public get numberOfShades(): number {
    return this._numberOfShades;
  }
}
