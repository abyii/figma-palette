import './index.css';
import React, { useReducer } from 'react';
import { State, DispatchAction } from './types';
import { MAX_PALETTES, Palette } from './utils';
import Tabs from './components/Tabs';
import ReadMe from './components/ReadMe';
import { dravidianAlphas } from './utils/IndoAryanAlphas';
import PaletteStudio from './components/studio';

const initialState: State = {
  palettes: [new Palette(dravidianAlphas[0])],
  selectedIndex: 0,
};

function reducer(state: State, action: DispatchAction): State {
  switch (action.type) {
    case 'CREATE_PALETTE':
      if (state.palettes.length >= MAX_PALETTES) return state;
      const newPalette = new Palette(dravidianAlphas[state.palettes.length]);
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
      const newState = structuredClone(state);
      newState.palettes[newState.selectedIndex] = action.payload.palette;
      return newState;
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <main className="w-full h-full flex flex-col bg-neutral-700 overflow-x-hidden text-sm">
      <Tabs state={state} dispatch={dispatch} />
      {state.selectedIndex == 'README' ? (
        <ReadMe />
      ) : state.selectedIndex == 'CMP' ? (
        <div></div>
      ) : (
        <PaletteStudio state={state} dispatch={dispatch} />
      )}
    </main>
  );
}

export default App;
