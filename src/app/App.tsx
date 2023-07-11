import React, { useReducer } from 'react';
import './styles/ui.css';
import { State } from './types';
import { Palette } from './utils';
import Editor from './components/Editor';
import PaletteDisplay from './components/PaletteDisplay';

function handleStateChange(prevState: State, action: State): State {
  if (action) {
    return action;
  }
  return prevState;
}

function App() {
  const [state, dispatch] = useReducer<typeof handleStateChange>(handleStateChange, {
    palettes: [new Palette('#000000', 10)],
    selectedIndex: 0,
  });
  return (
    <div className="window">
      <Editor state={state} dispatch={dispatch} />

      {state.palettes.map((p, i) => (
        <PaletteDisplay key={i} palette={p} />
      ))}
    </div>
  );
}

export default App;
