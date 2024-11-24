import { MixerTab } from '../../types';
import { Curve } from '../Curve';
import { getProportionalValue, getYRange, NumberOfSteps } from './util';

export function linear(numberOfShades: number, tab: MixerTab, previousCurve: Curve = null): Curve {
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
}
