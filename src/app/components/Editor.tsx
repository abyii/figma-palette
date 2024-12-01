import React, { Dispatch, useState } from 'react';
import { State } from '../types';
import Button from './ui/Button';
import { MIN_SHADES, MAX_SHADES } from '../config';

type TabName = 'lightness' | 'chroma' | 'hue';

const Editor = ({ state, setState }: { state: State; setState: Dispatch<State> }) => {
  const [selectedTab, setSelectedTab] = useState<TabName>('lightness');
  const [createVars, setCreateVars] = useState<boolean>(false);
  const palette = state.palettes[state.selectedIndex];
  const channelName =
    selectedTab == 'lightness'
      ? 'lightnessChannel'
      : selectedTab == 'chroma'
      ? 'chromaChannel'
      : selectedTab == 'hue' && 'hueChannel';
  const roofValue = selectedTab == 'hue' ? 359 : 100;
  const floorValue = 0;
  return (
    <div className="bg-zinc-100 rounded-r-md max-w-xs w-full flex flex-col h-full">
      <div className="w-full flex gap-3 items-center px-2 pt-2">
        <label className="text-sm whitespace-nowrap font-semibold text-zinc-600 cursor-pointer" htmlFor="noOfShades">
          Steps{' '}
          <code className="font-mono">
            {palette.numberOfShades < 10 ? '0' + palette.numberOfShades : palette.numberOfShades}
          </code>
        </label>
        <input
          id="noOfShades"
          className="flex-1 cursor-pointer"
          type="range"
          value={palette.numberOfShades}
          min={MIN_SHADES}
          max={MAX_SHADES}
          onChange={(e) => {
            const newPalette = palette;
            newPalette.numberOfShades = Number(e.target.value);
            state.palettes[state.selectedIndex] = newPalette;
            setState({ ...state });
          }}
        />
      </div>

      <div className="w-full flex gap-3 items-center p-2 border-b border-zinc-200">
        <label className="text-sm whitespace-nowrap font-semibold text-zinc-600 cursor-pointer" htmlFor="baseColor">
          Base Color
        </label>
        <input
          id="baseColor"
          className="flex-1 cursor-pointer"
          type="color"
          value={palette.baseColorHex}
          onChange={(e) => {
            const newPalette = palette;
            newPalette.baseColorHex = e.target.value;
            state.palettes[state.selectedIndex] = newPalette;
            setState({ ...state });
          }}
        />
      </div>

      <div className="w-full flex gap-5 p-2 border-b border-zinc-200">
        {['lightness', 'chroma', 'hue'].map((id, i) => (
          <div key={i} className="flex items-center gap-2">
            <input
              type="radio"
              value={id}
              id={id}
              checked={selectedTab == id}
              onChange={(e) => setSelectedTab(e.target.value as TabName)}
            />
            <label htmlFor={id} className="font-semibold text-sm text-zinc-600 cursor-pointer">
              {id[0].toLocaleUpperCase() + id.slice(1)}
            </label>
          </div>
        ))}
      </div>

      <div className="flex flex-col h-[500px] w-full justify-self-end self-end">
        {Array.from({ length: palette.numberOfShades }).map((_, i) => {
          const id = `sliderFor-palette${state.selectedIndex}-shade${i}`;
          const value =
            selectedTab == 'chroma'
              ? palette[channelName][i] * 250
              : selectedTab == 'lightness'
              ? palette[channelName][i] * 100
              : palette[channelName][i];
          const valueDisplay = '0'.repeat(3 - String(Math.round(value)).length) + Math.round(value);
          return (
            <div key={i} className="flex items-center gap-2 px-2 flex-1 w-full border-b border-zinc-200">
              <label htmlFor={id} className="text-xs font-semibold text-zinc-600 font-mono">
                {valueDisplay}
              </label>
              <input
                type="range"
                max={roofValue}
                min={floorValue}
                className="w-full cursor-pointer"
                key={i}
                id={id}
                // normalizing 0 to 0.4 => 0 to 100 by multiplying by 250
                value={value}
                onChange={(e) => {
                  palette[channelName][i] =
                    selectedTab == 'chroma'
                      ? Number(e.target.value) / 250
                      : selectedTab == 'lightness'
                      ? Number(e.target.value) / 100
                      : Number(e.target.value);
                  state.palettes[state.selectedIndex] = palette;
                  setState({ ...state });
                }}
              />
            </div>
          );
        })}
      </div>

      <div className="flex p-2 items-center justify-between">
        <div className="flex items-center gap-1">
          <input type="checkbox" checked={createVars} id="createVars" onChange={() => setCreateVars((p) => !p)} />
          <label htmlFor="createVars" className="text-sm font-semibold text-zinc-500">
            Create Variables
          </label>
        </div>
        <Button
          onClick={() => {
            const rgbColors = [];
            const count = palette.lightnessChannel.length;
            for (let i = 0; i < count; i++) {
              rgbColors.push((palette.lightnessChannel[i], palette.chromaChannel[i], palette.hueChannel[i]));
            }
            parent.postMessage(
              {
                pluginMessage: {
                  type: 'add-to-figma',
                  createVars: createVars,
                  colors: rgbColors,
                  name: palette.name,
                },
              },
              '*'
            );
          }}
        >
          Add to my File
        </Button>
      </div>
    </div>
  );
};

export default Editor;
