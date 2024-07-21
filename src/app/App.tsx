import React, { useState } from 'react';
import { State } from './types';
import { MAX_PALETTES, Palette } from './utils';
// import Editor from './components/Editor';
// import PaletteDisplay from './components/PaletteDisplay';
import './index.css';
// import Button from './components/ui/Button';
import Tabs from './components/Tabs';
import ReadMe from './components/ReadMe';
import { greekAlphabets } from './utils/greekAlphas';
import PaletteDisplay from './components/PaletteDisplay';

function App() {
  const [state, setState] = useState<State>({ palettes: [new Palette('Alpha')], selectedIndex: 'README' });

  const changeSelectedIndex = (t: State['selectedIndex']) => {
    setState({ ...state, selectedIndex: t });
  };
  const createNewPalette = () => {
    if (state.palettes.length >= MAX_PALETTES) return;
    const newPalette = new Palette(greekAlphabets[state.palettes.length]);
    setState({
      ...state,
      palettes: [...state.palettes, newPalette],
      selectedIndex: state.palettes.length,
    });
  };

  return (
    <main className="w-full h-full flex flex-col bg-neutral-700 overflow-x-hidden">
      <Tabs state={state} onChangeTab={changeSelectedIndex} onNewTab={createNewPalette} />
      {state.selectedIndex == 'README' ? (
        <ReadMe />
      ) : state.selectedIndex == 'CMP' ? (
        <div></div>
      ) : (
        <PaletteDisplay setState={setState} state={state} />
      )}
    </main>
  );
}

export default App;
