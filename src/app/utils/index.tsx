import { RGBColor } from 'colland';

const MAX_SHADES = 16;
const MIN_SHADES = 3;

export class Palette {
  private _numberOfShades: number = 10;
  private _baseColorHex: string = '#000000';
  public lightnessChannel: number[];
  public chromaChannel: number[];
  public hueChannel: number[];

  constructor(baseColorHex: string = '#000000', numberOfShades: number = 10) {
    if (numberOfShades > MAX_SHADES) {
      this._numberOfShades = MAX_SHADES;
    } else if (numberOfShades < MIN_SHADES) {
      this._numberOfShades = MIN_SHADES;
    } else {
      this._numberOfShades = numberOfShades;
    }
    this._baseColorHex = baseColorHex;
    this.generateChannels();
  }

  private generateChannels() {
    const hexString = this._baseColorHex.slice(1);
    const baseColorOKLCH = new RGBColor(
      parseInt(hexString.slice(0, 2), 16),
      parseInt(hexString.slice(2, 4), 16),
      parseInt(hexString.slice(4), 16)
    ).toOKLCH();

    this.lightnessChannel = Array.from({ length: this._numberOfShades }).map(
      (_, i) => (96 / (this._numberOfShades - 1)) * i + 2
    );
    this.chromaChannel = Array.from({ length: this._numberOfShades }).map(() => baseColorOKLCH._c);
    this.hueChannel = Array.from({ length: this._numberOfShades }).map(() => baseColorOKLCH._h);
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
