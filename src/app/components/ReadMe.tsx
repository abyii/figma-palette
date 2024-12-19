import React from 'react';

const ReadMe = () => {
  return (
    <div className="p-5 flex flex-col gap-3 w-full h-full pt-16 text-neutral-100 bg-neutral-900">
      <h1 className="text-2xl font-semibold">OKLCH Color Variations</h1>
      <p className="font-normal">
        Use this Plugin to generate Color Palettes with Variations. The shades can vary across{' '}
        <strong>Lightness</strong> (How Bright the color is. 0-1), <strong>Chroma</strong> (How colorful the color is.
        0-0.37), and <strong>Hue</strong> (The kind of color. 0deg-360deg). The ability to control these individual
        parameters makes it perfect for building palettes to be used in interface design, because you can use these
        parameters to establish heirarchy, contrast, attention, etc.
      </p>
      <h2 className="text-xl font-semibold">Why OKLCH over HSL?</h2>
      <p className="font-normal">
        Even HSL allows you to think of colors as these individual parameters, but HSL is not perfect. Different Hues
        with same luminescence, and saturation values can produce colors with different contrast levels (for example,
        yellow and blue). OKLCH color space solves this because it's modelled to be close to human perception of color.
      </p>
    </div>
  );
};

export default ReadMe;
