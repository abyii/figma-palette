import React from 'react';
import { State } from '../types';
import PaletteDisplay from './studio/PaletteDisplay';

const SideBySide: React.FC<{ state: State }> = ({ state }) => {
  return (
    <div className="w-full flex flex-col pt-16 h-full">
      <h1 className="text-3xl text-neutral-400 py-5 px-5">Your Palettes. Next to each other.</h1>
      <div className="flex flex-col">
        {state?.palettes?.map((palette, index) => (
          <PaletteDisplay key={index} palette={palette} offsetTop={false} />
        ))}
      </div>
    </div>
  );
};

export default SideBySide;
