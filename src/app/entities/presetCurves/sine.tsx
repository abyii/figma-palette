import { MAX_CHROMA, MAX_HUE, MAX_LUMINESCENCE } from '../../config';
import { MixerTab } from '../../types';
import { Curve } from '../Curve';
import { Palette } from '../Palette';
import { Parameter } from '../Parameter';

export function getSineCurve(palette: Palette, mode: MixerTab) {
  return new Curve(
    'Sine',
    'y=asin(kx-d)+c',
    'text-base',
    palette,
    mode,
    function (palette: Palette, mode: MixerTab) {
      const xrange = palette.numberOfShades;
      const minA = mode == 'LUMA' ? -MAX_LUMINESCENCE : mode == 'CHROMA' ? -MAX_CHROMA : mode == 'HUE' && -MAX_HUE;
      const maxA = mode == 'LUMA' ? MAX_LUMINESCENCE : mode == 'CHROMA' ? MAX_CHROMA : mode == 'HUE' && MAX_HUE;
      const minK = 0;
      const maxK = 3;
      const minD = -xrange / 2;
      const maxD = -minD;
      const minC = mode == 'LUMA' ? -MAX_LUMINESCENCE : mode == 'CHROMA' ? -MAX_CHROMA : mode == 'HUE' && -MAX_HUE;
      const maxC = mode == 'LUMA' ? MAX_LUMINESCENCE : mode == 'CHROMA' ? MAX_CHROMA : mode == 'HUE' && MAX_HUE;
      this.parameters = {
        a: new Parameter(
          'a',
          minA,
          maxA,
          (maxA - minA) / 100,
          0.75,
          'Y-multiplier. Controls the amplitude of the Curve.'
        ),
        k: new Parameter(
          'k',
          minK,
          maxK,
          (maxK - minK) / 100,
          0.2,
          'X-mulltiplier. Shrink or Expand the curve horizontally.'
        ),
        d: new Parameter('d', minD, maxD, (maxD - minD) / 100, 0.5, 'Shift the curve to left or right.'),
        c: new Parameter('c', minC, maxC, (maxC - minC) / 100, 0.75, 'Lift or drop the Curve.'),
      };
    },
    function (x: number) {
      const a = this.parameters['a'].value;
      const k = this.parameters['k'].value;
      const d = this.parameters['d'].value;
      const c = this.parameters['c'].value;
      return a * Math.sin(k * x - d) + c;
    }
  );
}
