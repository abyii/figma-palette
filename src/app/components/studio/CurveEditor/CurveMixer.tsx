import React from 'react';
import { Palette } from '../../../entities/Palette';
import { Parameter } from '../../../entities/Parameter';
import { DispatchAction, MixerTab } from '../../../types';
import { getCurveKey } from '../utils';

export const CurveMixer: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
  dispatch: React.Dispatch<DispatchAction>;
  selectedParam: Parameter;
  setSelectedParam: React.Dispatch<React.SetStateAction<Parameter>>;
}> = ({ palette, currentMixerTab, dispatch, selectedParam, setSelectedParam }) => {
  const curveKey = getCurveKey(currentMixerTab);
  const curve = palette?.[curveKey];

  function onParameterChange(parameterKey: string, value: number) {
    curve.parameters[parameterKey].value = value;
    palette[curveKey] = curve;
    dispatch({ type: 'UPDATE_CURRENT_PALETTE', payload: { palette } });
  }

  if (!curve) return null;
  return (
    <div className="flex w-full flex-col bg-gradient-to-b from-neutral-600 to-neutral-700">
      {Object.keys(curve.parameters).map((k) => (
        <div
          key={k}
          className="flex flex-1 items-center w-full px-3 gap-2 border-b last:border-0 border-neutral-800/50"
          onMouseEnter={() => setSelectedParam(curve?.parameters?.[k])}
          onMouseLeave={() => setSelectedParam(null)}
        >
          <span
            className={`text-emerald-400 text-lg italic font-serif font-medium transition-colors duration-200 w-4 ${
              selectedParam?.symbol == k
                ? 'text-emerald-300'
                : selectedParam
                ? 'text-neutral-400/80'
                : 'text-emerald-400'
            }`}
          >
            {k}
          </span>
          <input
            type="range"
            className="flex-1 bg-black"
            min={curve.parameters[k].min}
            max={curve.parameters[k].max}
            step={curve.parameters[k].step}
            value={curve.parameters[k].value}
            onChange={(e) => onParameterChange(k, parseFloat(e.target.value))}
          />
          <span className="text-neutral-300 text-xs font-mono not-italic w-10">{` ${curve.parameters[k].value.toFixed(
            2
          )}`}</span>
        </div>
      ))}
    </div>
  );
};
