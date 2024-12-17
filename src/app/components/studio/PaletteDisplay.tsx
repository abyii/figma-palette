import React, { useState } from 'react';
import { Palette } from '../../entities/Palette';

const PaletteDisplay: React.FC<{ palette: Palette }> = ({ palette }) => {
  const [bgColor, setBgColor] = useState<'bg-white' | 'bg-black'>('bg-white');
  return (
    <div
      className={`w-full flex flex-col p-3 pt-12 ${bgColor}`}
      onClick={() => setBgColor(bgColor == 'bg-white' ? 'bg-black' : 'bg-white')}
    >
      <div className={`flex shadow-md h-20 ${bgColor == 'bg-white' ? 'shadow-neutral-500' : 'shadow-black'}`}>
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
