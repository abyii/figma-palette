import React, { Dispatch } from 'react';
import { State } from '../types';
import Button from './ui/Button';

const PaletteDisplay: React.FC<{
  state: State;
  setState: Dispatch<State>;
}> = ({ state, setState }: { state: State; setState: Dispatch<State>; index: number }) => {
  const palette = state.palettes[state.selectedIndex];
  console.log(palette, setState);
  return (
    <div className={`h-full bg-zinc-50 flex flex-col rounded-md border-[1.5px] border-zinc-200 `}>
      <div className="flex-1 w-full flex flex-col rounded-md justify-end hover:bg-zinc-200 cursor-pointer">
        <div className="flex flex-col shadow-md h-[500px] mx-2 border-zinc-500">
          {Array.from({ length: palette.numberOfShades }).map((_, i) => (
            <div
              key={i}
              id={`palette${state.selectedIndex}-shade${i}`}
              style={{
                backgroundColor: `oklch(${palette.lightnessChannel[i]} ${palette.chromaChannel[i]} ${palette.hueChannel[i]})`,
              }}
              className="flex-1 w-24 text-xs"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PaletteDisplay;
