import React, { Dispatch } from 'react';
import { MAX_SHADES, MIN_SHADES } from '../../config';
import { Palette } from '../../entities/Palette';
import { DispatchAction } from '../../types';

const NofShades: React.FC<{ palette: Palette; dispatch: Dispatch<DispatchAction> }> = ({ palette, dispatch }) => {
  return (
    <div className="w-full flex items-center py-3 px-9 shadow-inner gap-5 bg-gradient-to-b from-neutral-950 to-neutral-900">
      <h6 className="flex items-center text-neutral-400">{'Number of Shades'}</h6>
      <input
        id="noOfShades"
        className="flex-1 cursor-pointer"
        type="range"
        value={palette.numberOfShades}
        min={MIN_SHADES}
        max={MAX_SHADES}
        step={1}
        aria-label="Number of Shades"
        onChange={(e) => {
          const newPalette = palette;
          newPalette.numberOfShades = Number(e.target.value);
          dispatch({ type: 'UPDATE_CURRENT_PALETTE', payload: { palette: newPalette } });
        }}
      />
      <h6 className="flex items-center text-neutral-500">
        <span className="text-lg font-mono text-orange-400">{palette?.numberOfShades}</span>
      </h6>
      {/* Divider */}
      <div className="h-full border-r border-neutral-700" />
      {/* Base Color */}
      <h6 className="flex items-center text-neutral-400">{'Base Color'}</h6>
      <input
        id="baseColor"
        className="cursor-pointer h-5 w-5 border border-neutral-600 outline-none p-0 appearance-none"
        type="color"
        value={palette.baseColorHex}
        onChange={(e) => {
          const newPalette = palette;
          newPalette.baseColorHex = e.target.value;
          dispatch({ type: 'UPDATE_CURRENT_PALETTE', payload: { palette: newPalette } });
        }}
      />
    </div>
  );
};

export default NofShades;
