export type Parameter = {
  value: number;
  min: number;
  max: number;
  step: number;
};

export class Curve {
  public name: string;
  public equationLatex: string;
  public a: Parameter;
  public b: Parameter;
  public c: Parameter;
  public d: Parameter;
  public k: Parameter;
  public generateY: (x: number) => number;
  /*
  A Curve Object with its parameters, and output function.
  @param name: The name of the curve
  @param equationLatex: The SVG element of the equation
  @param a: The Y-Multiplier parameter. also known as the Amplitude, It stretches or shrinks the curve along Y-axis.
  @param b: The Exponent parameter. 
  @param c: The Y-Shift parameter. also known as the Vertical Shift, It shifts the curve along Y-axis.
  @param d: The X-Shift parameter. also known as the Horizontal Shift, It shifts the curve along X-axis.
  @param k: The X-Multiplier parameter. also known as the Stretch, It stretches the curve along X-axis.
  @param generateY: The function that generates the Y value for a given X value
  @returns: A Curve Object
  @example: new Curve('Linear', "", 1, 1, 0, 0, 1, (x: number) => x)
  */
  constructor(
    name: string,
    equationLatex: string,
    a: Parameter,
    b: Parameter,
    c: Parameter,
    d: Parameter,
    k: Parameter,
    generateYFactory: (curve: Curve) => (x: number) => number
  ) {
    this.name = name;
    this.equationLatex = equationLatex;
    this.a = a;
    this.b = b;
    this.c = c;
    this.d = d;
    this.k = k;
    this.generateY = generateYFactory(this);
  }
}
