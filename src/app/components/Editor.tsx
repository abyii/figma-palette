import React, { Dispatch } from 'react';
import { State } from '../types';

const MAX_SHADES = 16;
const MIN_SHADES = 3;

const Editor = ({ state, dispatch }: { state: State; dispatch: Dispatch<State> }) => {
  return (
    <div className="left-window">
      <label htmlFor="noOfShades">Number of Steps: {state.palettes[state.selectedIndex].numberOfShades}</label>
      <input
        id="noOfShades"
        style={{ width: '100%' }}
        type="range"
        value={state.palettes[state.selectedIndex].numberOfShades}
        min={MIN_SHADES}
        max={MAX_SHADES}
        onChange={(e) => {
          const newPalette = state.palettes[state.selectedIndex];
          newPalette.numberOfShades = Number(e.target.value);
          const newState = structuredClone(state);
          newState.palettes[state.selectedIndex] = newPalette;
          dispatch(newState);
        }}
      />

      <label htmlFor="baseColor">Select Base Color: {state.palettes[state.selectedIndex].baseColorHex}</label>
      <input
        id="baseColor"
        style={{ width: '100%' }}
        type="color"
        value={state.palettes[state.selectedIndex].baseColorHex}
        onChange={(e) => {
          const newPalette = state.palettes[state.selectedIndex];
          newPalette.baseColorHex = e.target.value;
          const newState = structuredClone(state);
          newState.palettes[state.selectedIndex] = newPalette;
          dispatch(newState);
        }}
      />
    </div>
  );
};

export default Editor;
