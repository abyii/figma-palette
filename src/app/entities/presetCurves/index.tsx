import { getLinearCurve } from './linear';
import { getNormalCurve } from './normal';

export const presetCurves = {
  Linear: getLinearCurve,
  Normal: getNormalCurve,
};

export type PresetCurveKey = keyof typeof presetCurves;
