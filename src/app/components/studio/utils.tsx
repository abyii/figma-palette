import { MixerTab } from '../../types';

export const getCurveKey = (currentMixerTab: MixerTab) => {
  switch (currentMixerTab) {
    case 'CHROMA':
      return 'chromaCurve';
    case 'HUE':
      return 'hueCurve';
    case 'LUMA':
      return 'lightnessCurve';
    default:
      return null;
  }
};
