import { MixerTab } from '../types';
import { Curve } from './Curve';
import { MAX_CHROMA, MAX_HUE, MAX_LUMINESCENCE } from '../config';

export const NumberOfSteps = 50;

function getProportionalValue(
  oldValue: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
): number {
  return ((oldValue - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
}

function getYRange(tab: MixerTab) {
  if (tab == 'HUE') return MAX_HUE;
  else if (tab == 'CHROMA') return MAX_CHROMA;
  else if (tab == 'LUMA') return MAX_LUMINESCENCE;
  else return 1;
}

export const presetCurves = {
  Linear: (numberOfShades: number, tab: MixerTab, previousCurve: Curve = null): Curve => {
    return new Curve(
      'y=mx+c',
      {
        m: {
          value: previousCurve
            ? getProportionalValue(
                previousCurve.getParameter('m').value,
                2 * previousCurve.getParameter('m').min,
                2 * previousCurve.getParameter('m').max,
                2 * Math.floor(numberOfShades / 3),
                -Math.floor(numberOfShades / 3)
              )
            : getYRange(tab) / numberOfShades,
          min: -Math.floor(numberOfShades / 3),
          max: Math.floor(numberOfShades / 3),
          step: Math.floor((2 * Math.floor(numberOfShades / 3)) / NumberOfSteps),
          description: 'Slope of the line.',
        },
        c: {
          value: 0,
          min: -Math.floor(numberOfShades / 3),
          max: Math.floor(numberOfShades / 3),
          step: Math.floor((2 * Math.floor(numberOfShades / 3)) / NumberOfSteps),
          description: 'Lift or drop the line.',
        },
      },
      (curve) => (x) => {
        const params = curve.getAllParameters();
        return params.m.value * x + params.c.value;
      }
    );
  },
  //   Normal: 'y =mx^2+c',
  //   Exponential: 'y =mx^2+c',
  //   Logarithmic: 'y =mx^2+c',
  //   Logistic: 'y =mx^2+c',
  //   Polynomial: 'y =mx^2+c',
  //   Power: 'y =mx^2+c',
  //   Sine: 'y =mx^2+c',
  //   Cosine: 'y =mx^2+c',
  //   Tangent: 'y =mx^2+c',
  //   ArcTan: 'y =mx^2+c',
  //   Rational: 'y =mx^2+c',
  //   Sigmoid: 'y =mx^2+c',
  //   Gaussian: 'y =mx^2+c',
  //   Bessel: 'y =mx^2+c',
  //   Legendre: 'y =mx^2+c',
  //   Laguerre: 'y =mx^2+c',
  //   Chebyshev: 'y =mx^2+c',
  //   Hermite: 'y =mx^2+c',
};

export type SelectedCurveKey = keyof typeof presetCurves;
