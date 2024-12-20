import React from 'react';
import Button from './ui/Button';

const ReadMe = () => {
  return (
    <div className="p-5 flex flex-col gap-3 w-full pt-16 text-neutral-300 bg-neutral-900">
      <h2 className="text-xl font-semibold">Your Support Means the World!</h2>
      <p className="text-neutral-400">
        This plugin is completely free and crafted with care. If it has added value to your work, please consider
        donating. Your support helps me dedicate time to improving and maintaining this tool, ensuring it stays free and
        accessible for everyone. Thank you for being a part of this journey!
      </p>
      <a href="https://shop.abyi.xyz" target="_blank">
        <Button className="bg-emerald-900/50 hover:bg-emerald-800/50 text-emerald-500 hover:text-emerald-400">
          Donate 💖
        </Button>
      </a>
      <hr className="border-neutral-600 my-5" />
      <h1 className="text-2xl font-semibold">OKLCH Color Variations</h1>
      <p className="font-normal text-neutral-400">
        Use this Plugin to generate Color Palettes with Variations. The shades can vary across{' '}
        <strong>Lightness</strong> (How Bright the color is. 0-1), <strong>Chroma</strong> (How colorful the color is.
        0-0.37), and <strong>Hue</strong> (The kind of color. 0deg-360deg). The ability to control these individual
        parameters makes it perfect for building palettes to be used in interface design, because you can use these
        parameters to establish heirarchy, contrast, attention, etc.
      </p>
      <h2 className="text-xl font-semibold">Why OKLCH over HSL?</h2>
      <p className="font-normal text-neutral-400">
        Even HSL allows you to think of colors as these individual parameters, but HSL is not perfect. Different Hues
        with same luminescence, and saturation values can produce colors with different contrast levels (for example,
        yellow and blue). OKLCH color space solves this because it's modelled to be close to human perception of color.
      </p>
      <h2 className="text-xl font-semibold">Use Mathematical Relations to build your perfect Palette.</h2>
      <p className="font-normal text-neutral-400">
        You can use mathematical relations to build your perfect palette. For each of the 3 parameters, you can use a
        Mathematical to relation to decide how each shade of the palette vary from each other or relate to each other.
      </p>
      <p className="font-normal text-neutral-400">
        An common example of how the equations can be used is: Using a Linear or Arctan function for Lightness, and
        using a Normal Distribution for Chroma, and using a Flat Linear Curve for Hue. You could also use a subtle
        Arctan function for Hue to create interesting Palettes. The possibilities are endless. Keep experimenting!
      </p>
    </div>
  );
};

export default ReadMe;
