import React, { Dispatch } from 'react';
import { DispatchAction, State } from '../../types';
import PaletteDisplay from './PaletteDisplay';
import PaletteMixer from './PaletteMixer';
import NofShades from './NofShades';

const PaletteStudio: React.FC<{
  state: State;
  dispatch: Dispatch<DispatchAction>;
}> = ({ state, dispatch }) => {
  const palette = state.palettes[state.selectedIndex];
  return (
    <div className={`h-full flex flex-col bg-neutral-700`}>
      <PaletteDisplay palette={palette} />
      <PaletteMixer dispatch={dispatch} palette={palette} />
      <NofShades dispatch={dispatch} palette={palette} />
      {/* <CurveEditor /> */}
    </div>
  );
};

export default PaletteStudio;
