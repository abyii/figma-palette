import { MixerTab } from '../types';
import { Palette } from './Palette';
import { Parameter } from './Parameter';
import { PresetCurveKey } from './presetCurves';

export class Curve {
  public name: PresetCurveKey;
  public equationLatex: string;
  public parameters: Record<string, Parameter>;
  public generateY: (x: number) => number;
  public generateAndSetParams: (palette: Palette, mode: MixerTab) => void;

  /**
   * Creates a Curve with static parameter keys and an output function.
   * @param name The name of the curve.
   * @param equationLatex The LaTeX equation for the curve.
   * @param generateY The function that generates the y value for a given x.
   * @param generateAndSetParams The function that generates the parameters for the curve.
   * @param palette The palette object to generate parameters from.
   */
  constructor(
    name: PresetCurveKey,
    equationLatex: string,
    palette: Palette,
    mode: MixerTab,
    generateAndSetParams: (palette: Palette, mode: MixerTab) => void,
    generateY: (x: number) => number
  ) {
    this.name = name;
    this.equationLatex = equationLatex;
    this.generateAndSetParams = generateAndSetParams.bind(this);
    this.generateAndSetParams(palette, mode);
    this.generateY = generateY.bind(this);
  }
}
