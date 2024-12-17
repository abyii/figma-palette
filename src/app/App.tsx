import './index.css';
import React, { useReducer } from 'react';
import { State, DispatchAction } from './types';
import { MAX_PALETTES } from './config';
import { Palette } from './entities/Palette';
import Tabs from './components/Tabs';
import ReadMe from './components/ReadMe';
import { paletteAlphas } from './entities/paletteAlphas';
import PaletteStudio from './components/studio';
import BottomBar from './components/studio/BottomBar';

const initialState: State = {
  palettes: [new Palette(paletteAlphas[0])],
  selectedIndex: 0,
};

function reducer(state: State, action: DispatchAction): State {
  switch (action.type) {
    case 'CREATE_PALETTE':
      if (state.palettes.length >= MAX_PALETTES) return state;
      const newPalette = new Palette(paletteAlphas[state.palettes.length]);
      return {
        palettes: [...state.palettes, newPalette],
        selectedIndex: state.palettes.length,
      };
    case 'SELECT_INDEX':
      return {
        ...state,
        selectedIndex: action.payload,
      };
    case 'UPDATE_CURRENT_PALETTE':
      const newState: State = { selectedIndex: state.selectedIndex, palettes: state.palettes };
      newState.palettes[newState.selectedIndex] = action.payload.palette;
      return newState;
    case 'DELETE_CURRENT_PALETTE':
      if (state.palettes.length == 1) return state;
      const newPalettes = state.palettes.filter((_, i) => i != state.selectedIndex);
      return {
        selectedIndex:
          state?.selectedIndex == 'CMP'
            ? 'CMP'
            : state?.selectedIndex == 'README'
            ? 'README'
            : Math.max(state?.selectedIndex - 1, 0),
        palettes: newPalettes,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="w-full h-full flex flex-col bg-black overflow-x-hidden text-sm">
      <Tabs state={state} dispatch={dispatch} />
      {state.selectedIndex == 'README' ? (
        <ReadMe />
      ) : state.selectedIndex == 'CMP' ? (
        <div></div>
      ) : (
        <>
          <PaletteStudio state={state} dispatch={dispatch} />
          <BottomBar state={state} dispatch={dispatch} />
        </>
      )}
    </main>
  );
}

export default App;
