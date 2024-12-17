import { getArcTanCurve } from './arctan';
import { getExpoCurve } from './expo';
import { getLinearCurve } from './linear';
import { getNormalCurve } from './normal';
import { getQuadCurve } from './quad';
import { getSineCurve } from './sine';

export const presetCurves = {
  Linear: getLinearCurve,
  Normal: getNormalCurve,
  Quad: getQuadCurve,
  Arctan: getArcTanCurve,
  Sine: getSineCurve,
  Expo: getExpoCurve,
};

export type PresetCurveKey = keyof typeof presetCurves;
