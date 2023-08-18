import React, { Dispatch } from 'react';
import { State } from '../types';
import Button from './ui/Button';

const PaletteDisplay = ({ state, setState, index }: { state: State; setState: Dispatch<State>; index: number }) => {
  const palette = state.palettes[index];
  const isSelected = index == state.selectedIndex;
  return (
    <div
      style={{
        ...(isSelected && { borderTopRightRadius: '0px', borderBottomRightRadius: '0px' }),
      }}
      className={`h-full bg-zinc-50 flex flex-col rounded-md border-[1.5px] border-zinc-200 `}
    >
      <input
        className="mx-2 w-24 my-5 border border-zinc-200 px-2 py-1 rounded-md font-semibold text-zinc-600"
        placeholder="Name"
        maxLength={10}
        minLength={1}
        value={palette.name}
        onChange={(e) => {
          palette.name = e.target.value;
          state.palettes[index] = palette;
          setState({ ...state });
        }}
      />
      <div
        className="flex-1 w-full flex flex-col rounded-md justify-end hover:bg-zinc-200 cursor-pointer"
        onClick={() => setState({ ...state, selectedIndex: index == state.selectedIndex ? -1 : index })}
      >
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
      <div className="h-12 flex justify-center items-center">
        <Button
          className="text-red-500"
          onClick={() => {
            state.palettes = state.palettes.filter((_, i) => i !== index);
            setState({ ...state });
          }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
};

export default PaletteDisplay;
