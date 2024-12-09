import React, { useState } from 'react';
import { Palette } from '../../../entities/Palette';
import { DispatchAction, MixerTab } from '../../../types';
import { Parameter } from '../../../entities/Parameter';
import { CurveSelector } from './CurveSelector';
import { FxBox } from './FxBox';
import { CurveMixer } from './CurveMixer';

const CurveEditor: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
  dispatch: React.Dispatch<DispatchAction>;
}> = ({ palette, currentMixerTab, dispatch }) => {
  const [selectedParam, setSelectedParam] = useState<Parameter>(null);
  return (
    <div className="w-full flex flex-1 bg-neutral-950">
      <CurveSelector palette={palette} currentMixerTab={currentMixerTab} dispatch={dispatch} />
      <FxBox palette={palette} currentMixerTab={currentMixerTab} selectedParam={selectedParam} />
      <CurveMixer
        palette={palette}
        selectedParam={selectedParam}
        setSelectedParam={setSelectedParam}
        currentMixerTab={currentMixerTab}
        dispatch={dispatch}
      />
    </div>
  );
};

export default CurveEditor;
