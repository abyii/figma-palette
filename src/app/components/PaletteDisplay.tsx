import React from 'react';
import { Palette } from '../utils';

const PaletteDisplay = ({ palette }: { palette: Palette }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {Array.from({ length: palette.numberOfShades }).map((_, i) => (
        <div
          key={i}
          style={{
            flex: 1,
            backgroundColor: `oklch(${palette.lightnessChannel[i]}% ${palette.chromaChannel[i]} ${palette.hueChannel[i]})`,
            color: `oklch(${palette.lightnessChannel[palette.numberOfShades - i]}% ${palette.chromaChannel[i]} ${
              palette.hueChannel[i]
            })`,
          }}
        >
          {palette.lightnessChannel[i]?.toFixed(1)} {palette.chromaChannel[i]?.toFixed(1)}{' '}
          {palette.hueChannel[i]?.toFixed(1)}
        </div>
      ))}
    </div>
  );
};

export default PaletteDisplay;
