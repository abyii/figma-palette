export interface Parameter {
  value: number; // Current value of the parameter
  min: number; // Minimum allowed value
  max: number; // Maximum allowed value
  step: number; // increment or decrement step units
  description: string; // Description of the parameter
}

export class Curve {
  public equationLatex: string;
  private _parameters: Record<string, Parameter>;
  public generateY: (x: number) => number;

  /**
   * Creates a Curve with static parameter keys and an output function.
   * @param equationLatex The LaTeX text of the curve's equation.
   * @param initialParameters A Record containing parameter definitions.
   * @param generateYFactory The output function that computes Y for a given X.
   */
  constructor(
    equationLatex: string,
    initialParameters: Record<string, Parameter>,
    generateYFactory: (curve: Curve) => (x: number) => number
  ) {
    this.equationLatex = equationLatex;
    this._parameters = initialParameters;
    this.generateY = generateYFactory(this);
  }

  /**
   * Get a parameter by its name.
   * @param key The key of the parameter.
   * @returns The parameter object, or undefined if it doesn't exist.
   */
  getParameter(key: string): Parameter | undefined {
    return this._parameters[key];
  }

  /**
   * Update an existing parameter.
   * @param key The key of the parameter.
   * @param value The new value for the parameter.
   */
  setParameterValue(key: string, value: number): void {
    const parameter = this._parameters[key];
    if (!parameter) {
      throw new Error(`Parameter "${key}" does not exist.`);
    }

    if (value < parameter.min || value > parameter.max) {
      throw new Error(`Value for "${key}" is out of bounds. Must be between ${parameter.min} and ${parameter.max}.`);
    }

    this._parameters[key].value = value;
  }

  /**
   * Get all parameters as an object.
   * @returns The current state of all parameters.
   */
  getAllParameters(): Record<string, Parameter> {
    return this._parameters;
  }
}
