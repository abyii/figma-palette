export class Parameter {
  public symbol: string;
  private _relativeValue: number;
  public min: number;
  public max: number;
  public step: number;
  public description: string;

  /**
   * Creates a new Parameter.
   * @param symbol - Symbol of the parameter.
   * @param min - Minimum allowed value.
   * @param max - Maximum allowed value.
   * @param step - increment or decrement step units.
   * @param relativeValue - Current value of the parameter. 0 to 1. relative to min and max.
   * @param description - Description of the parameter.
   */
  constructor(
    symbol: string,
    min: number,
    max: number,
    step: number,
    relativeValue: number = 0.5,
    description: string
  ) {
    this.symbol = symbol;
    this.min = min;
    this.max = max;
    this.step = step;
    this.description = description;
    this._relativeValue = relativeValue; // Default value.
  }

  public get value(): number {
    return this._relativeValue * (this.max - this.min) + this.min;
  }

  public set value(newValue: number) {
    if (newValue < this.min || newValue > this.max) {
      throw new Error(`Value is out of bounds. Must be between ${this.min} and ${this.max}.`);
    }
    this._relativeValue = (newValue - this.min) / (this.max - this.min);
  }
}
