import { MAX_CHROMA, MAX_HUE, MAX_LUMINESCENCE } from '../../config';
import { MixerTab } from '../../types';

export const NumberOfSteps = 50;

export function getProportionalValue(
  oldValue: number,
  oldMin: number,
  oldMax: number,
  newMin: number,
  newMax: number
): number {
  return ((oldValue - oldMin) / (oldMax - oldMin)) * (newMax - newMin) + newMin;
}

export function getYRange(tab: MixerTab) {
  if (tab == 'HUE') return MAX_HUE;
  else if (tab == 'CHROMA') return MAX_CHROMA;
  else if (tab == 'LUMA') return MAX_LUMINESCENCE;
  else return 1;
}
