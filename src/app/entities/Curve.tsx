import { MixerTab } from '../types';
import { Palette } from './Palette';
import { Parameter } from './Parameter';
import { PresetCurveKey } from './presetCurves';

export class Curve {
  public name: PresetCurveKey;
  public equationLatex: string;
  public className: string;
  public parameters: Record<string, Parameter>;
  public generateY: (x: number) => number;
  public generateAndSetParams: (palette: Palette, mode: MixerTab) => void;

  /**
   * Creates a Curve with static parameter keys and an output function.
   * @param name - The name of the curve.
   * @param equationLatex - The LaTeX equation for the curve.
   * @param className - The class name for the curve. Use it to control the font size.
   * @param palette - The palette object.
   * @param mode - The mode of the mixer tab.
   * @param generateAndSetParams - A function to generate and set parameters.
   * @param generateY - A function to generate the y value for a given x value.
   */
  constructor(
    name: PresetCurveKey,
    equationLatex: string,
    className: string,
    palette: Palette,
    mode: MixerTab,
    generateAndSetParams: (palette: Palette, mode: MixerTab) => void,
    generateY: (x: number) => number
  ) {
    this.name = name;
    this.equationLatex = equationLatex;
    this.className = className;
    this.generateAndSetParams = generateAndSetParams.bind(this);
    this.generateAndSetParams(palette, mode);
    this.generateY = generateY.bind(this);
  }
}
