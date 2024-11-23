import { Curve } from './Curve';

export const defaultPolynomial = new Curve(
  'Polynomial',
  'y = aleft(kx-d\right)^{b}+c',
  {
    value: 1,
    max: 100,
    min: -100,
    step: 1,
  },
  {
    value: 1,
    max: 5,
    min: 0,
    step: 1,
  },
  {
    value: 0,
    max: 100,
    min: -100,
    step: 1,
  },
  {
    value: 0,
    max: 20,
    min: 20,
    step: 1,
  },
  {
    value: 1,
    max: 100,
    min: -100,
    step: 1,
  },
  (curve: Curve) => (x: number) =>
    curve.a.value * Math.pow(curve.k.value * x - curve.d.value, curve.b.value) + curve.c.value
);
