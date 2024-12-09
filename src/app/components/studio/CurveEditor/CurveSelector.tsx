import React from 'react';
import { Curve } from '../../../entities/Curve';
import { Palette } from '../../../entities/Palette';
import { PresetCurveKey, presetCurves } from '../../../entities/presetCurves';
import { DispatchAction, MixerTab } from '../../../types';
import { getCurveKey } from '../utils';

export const CurveSelector: React.FC<{
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
    <div className="flex flex-col bg-gradient-to-b from-neutral-700 to-neutral-800">
      {Object.keys(presetCurves).map((k: PresetCurveKey) => (
        <button
          key={k}
          onClick={() => onCurveSelect(presetCurves?.[k](palette, currentMixerTab))}
          className={`flex flex-1 items-center px-3 w-full border-b last:border-b-0 border-neutral-800 ${
            k == selectedCurveName
              ? 'text-emerald-200 bg-gradient-to-t from-emerald-700/30 to-emerald-600/30 shadow-xl'
              : 'text-neutral-300 shadow-inner'
          }`}
        >
          {k}
        </button>
      ))}
    </div>
  );
};
