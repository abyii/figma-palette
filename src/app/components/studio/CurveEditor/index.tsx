import React from 'react';
import { Palette } from '../../../utils/Palette';
import { MixerTab } from '../../../types';

const getCurveName = (currentMixerTab: MixerTab) => {
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

const FxBox: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
}> = ({ palette, currentMixerTab }) => {
  const curveName = getCurveName(currentMixerTab);
  return (
    <div className="h-full flex flex-col border-2 box-border border-neutral-950 aspect-square p-3 bg-gradient-to-t from-neutral-900 to-neutral-800">
      <span className={`font-serif italic text-xl ${palette[curveName] ? '' : ''}`}>fx</span>
    </div>
  );
};

const CurveEditor: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
}> = ({ palette, currentMixerTab }) => {
  return (
    <div className="w-full flex flex-1 bg-neutral-950">
      <FxBox palette={palette} currentMixerTab={currentMixerTab} />
    </div>
  );
};

export default CurveEditor;
