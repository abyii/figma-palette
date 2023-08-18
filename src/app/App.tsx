import React, { useState } from 'react';
import { State } from './types';
import { Palette } from './utils';
import Editor from './components/Editor';
import PaletteDisplay from './components/PaletteDisplay';
import './index.css';
import Button from './components/ui/Button';
import ReadMe from './components/ReadMe';

function App() {
  const [state, setState] = useState<State>({ palettes: [new Palette('A')], selectedIndex: 0 });
  return (
    <div className="w-full h-full flex bg-zinc-300 overflow-x-auto">
      <ReadMe />
      {state.palettes.map((_, i) => (
        <div key={i} className="flex rounded-md m-5 shadow-md">
          <PaletteDisplay index={i} state={state} setState={setState} />
          {i == state.selectedIndex ? <Editor state={state} setState={setState} /> : null}
        </div>
      ))}
      <Button
        className="my-5 text-lg font-semibold shadow-md"
        onClick={() => {
          setState({
            ...state,
            palettes: [...state.palettes, new Palette(String.fromCharCode(state.palettes.length + 65))],
          });
        }}
      >
        +
      </Button>
    </div>
  );
}

export default App;
