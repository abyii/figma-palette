export interface Parameter {
  name: string; // Name of the parameter
  value: number; // Current value of the parameter
  min: number; // Minimum allowed value
  max: number; // Maximum allowed value
  description: string; // Description of the parameter
}

export class Curve {
  public name: string;
  public equationLatex: string;
  private _parameters: Record<string, Parameter>;
  public generateY: (x: number) => number;

  /**
   * Creates a Curve with static parameter keys and an output function.
   * @param name The name of the curve.
   * @param equationLatex The LaTeX text of the curve's equation.
   * @param initialParameters A Record containing parameter definitions.
   * @param generateY The output function that computes Y for a given X.
   */
  constructor(
    name: string,
    equationLatex: string,
    initialParameters: Record<string, Parameter>,
    generateY: (x: number) => number
  ) {
    this.name = name;
    this.equationLatex = equationLatex;
    this._parameters = initialParameters;
    this.generateY = generateY;
  }

  /**
   * Get a parameter by its name.
   * @param name The name of the parameter.
   * @returns The parameter object, or undefined if it doesn't exist.
   */
  getParameter(name: string): Parameter | undefined {
    return this._parameters[name];
  }

  /**
   * Update an existing parameter.
   * @param name The name of the parameter.
   * @param value The new value for the parameter.
   */
  setParameterValue(name: string, value: number): void {
    const parameter = this._parameters[name];
    if (!parameter) {
      throw new Error(`Parameter "${name}" does not exist.`);
    }

    if (value < parameter.min || value > parameter.max) {
      throw new Error(`Value for "${name}" is out of bounds. Must be between ${parameter.min} and ${parameter.max}.`);
    }

    this._parameters[name].value = value;
  }

  /**
   * Get all parameters as an object.
   * @returns The current state of all parameters.
   */
  getAllParameters(): Record<string, Parameter> {
    return this._parameters;
  }
}
