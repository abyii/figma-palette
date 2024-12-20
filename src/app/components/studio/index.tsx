import React, { Dispatch } from 'react';
import { DispatchAction, MixerTab, State } from '../../types';
import PaletteDisplay from './PaletteDisplay';
import PaletteMixer from './PaletteMixer';
import NofShades from './MidStrip';
import CurveEditor from './CurveEditor';

const PaletteStudio: React.FC<{
  state: State;
  dispatch: Dispatch<DispatchAction>;
}> = ({ state, dispatch }) => {
  const palette = state.palettes[state.selectedIndex];
  const [currentMixerTab, setCurrentMixerTab] = React.useState<MixerTab>('LUMA');

  return (
    <div className={`h-full flex flex-col bg-neutral-700`}>
      <PaletteDisplay palette={palette} offsetTop={true} />
      <PaletteMixer
        dispatch={dispatch}
        palette={palette}
        currentMixerTab={currentMixerTab}
        setCurrentMixerTab={setCurrentMixerTab}
      />
      <NofShades dispatch={dispatch} palette={palette} />
      <CurveEditor palette={palette} currentMixerTab={currentMixerTab} dispatch={dispatch} />
    </div>
  );
};

export default PaletteStudio;
