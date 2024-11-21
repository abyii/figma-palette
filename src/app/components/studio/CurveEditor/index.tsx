import React from 'react';
import { type Palette } from '../../../utils/Palette';
import { MixerTab } from '../../../types';

const FxBox: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
}> = () => {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full h-1/2 border-b border-neutral-700">
        <span className="font-serif italic text-xl">fx</span>
      </div>
      <div className="w-full h-1/2">
        <span className="font-serif italic text-xl">commentary</span>
      </div>
    </div>
  );
};

const CurveEditor: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
}> = ({ palette, currentMixerTab }) => {
  return (
    <div className="w-full flex flex-1 border-t border-t-neutral-950">
      <FxBox palette={palette} currentMixerTab={currentMixerTab} />
    </div>
  );
};

export default CurveEditor;
