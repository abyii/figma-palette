import React from 'react';
import { Palette } from '../../../entities/Palette';
import { DispatchAction, MixerTab } from '../../../types';
import { PresetCurveKey, presetCurves } from '../../../entities/presetCurves';
import { Curve } from '../../../entities/Curve';

const getCurveKey = (currentMixerTab: MixerTab) => {
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
  const curveKey = getCurveKey(currentMixerTab);
  return (
    <div className="h-full flex flex-col aspect-square p-3 bg-gradient-to-t from-neutral-900 to-neutral-800">
      <span className={`font-serif italic text-xl ${palette[curveKey] ? '' : ''}`}>fx</span>
    </div>
  );
};

const CurveSelector: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
  dispatch: React.Dispatch<DispatchAction>;
}> = ({ palette, currentMixerTab, dispatch }) => {
  const curveKey = getCurveKey(currentMixerTab);
  const selectedCurveName = palette[curveKey]?.name;

  function onCurveSelect(newCurve: Curve) {
    palette[curveKey] = newCurve;
    dispatch({ type: 'UPDATE_CURRENT_PALETTE', payload: { palette } });
  }

  return (
    <div className="flex flex-col">
      {Object.keys(presetCurves).map((k: PresetCurveKey) => (
        <button
          key={k}
          onClick={() => onCurveSelect(presetCurves?.[k](palette, currentMixerTab))}
          className={`flex flex-1 items-center px-3 w-full ${
            k == selectedCurveName
              ? 'text-orange-300 bg-gradient-to-t from-orange-950/70 to-orange-900 shadow-2xl'
              : 'text-neutral-400 bg-gradient-to-t from-neutral-800 to-neutral-700 shadow-inner'
          }`}
        >
          {k}
        </button>
      ))}
    </div>
  );
};

const CurveEditor: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
  dispatch: React.Dispatch<DispatchAction>;
}> = ({ palette, currentMixerTab, dispatch }) => {
  return (
    <div className="w-full flex flex-1 bg-neutral-950">
      <CurveSelector palette={palette} currentMixerTab={currentMixerTab} dispatch={dispatch} />
      <FxBox palette={palette} currentMixerTab={currentMixerTab} />
    </div>
  );
};

export default CurveEditor;
