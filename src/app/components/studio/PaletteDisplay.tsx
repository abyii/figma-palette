import React from 'react';
import { Palette } from '../../utils';

const PaletteDisplay: React.FC<{ palette: Palette }> = ({ palette }) => {
  return (
    <div className="w-full flex flex-col p-3 pt-12 bg-white">
      <div className="flex shadow-md h-20 shadow-neutral-500">
        {Array.from({ length: palette.numberOfShades }).map((_, i) => (
          <div
            key={i}
            style={{
              backgroundColor: `oklch(${palette.lightnessChannel[i]} ${palette.chromaChannel[i]} ${palette.hueChannel[i]})`,
            }}
            className="flex-1 w-24 text-xs"
          ></div>
        ))}
      </div>
    </div>
  );
};

export default PaletteDisplay;
