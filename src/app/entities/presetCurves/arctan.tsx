import { MAX_CHROMA, MAX_HUE, MAX_LUMINESCENCE } from '../../config';
import { MixerTab } from '../../types';
import { Curve } from '../Curve';
import { Palette } from '../Palette';
import { Parameter } from '../Parameter';

export function getArcTanCurve(palette: Palette, mode: MixerTab) {
  return new Curve(
    'Arctan',
    'y=b tan^{-1}(kx-d)+c',
    'text-sm',
    palette,
    mode,
    function (palette: Palette, mode: MixerTab) {
      const xrange = palette.numberOfShades;
      const minB = mode == 'LUMA' ? -MAX_LUMINESCENCE : mode == 'CHROMA' ? -MAX_CHROMA : mode == 'HUE' && -MAX_HUE;
      const maxB = mode == 'LUMA' ? MAX_LUMINESCENCE : mode == 'CHROMA' ? MAX_CHROMA : mode == 'HUE' && MAX_HUE;
      const minK = 0;
      const maxK = 1;
      const minD = -xrange / 6;
      const maxD = xrange / 3;
      const minC = 0;
      const maxC = mode == 'LUMA' ? MAX_LUMINESCENCE : mode == 'CHROMA' ? MAX_CHROMA : mode == 'HUE' && MAX_HUE;
      this.parameters = {
        b: new Parameter(
          'b',
          minB,
          maxB,
          (maxB - minB) / 100,
          0.72,
          'Y-multiplier. Controls the amplitude of the Curve.'
        ),
        k: new Parameter(
          'k',
          minK,
          maxK,
          (maxK - minK) / 100,
          0.4,
          'X-mulltiplier. Shrink or Expand the curve horizontally.'
        ),
        d: new Parameter('d', minD, maxD, (maxD - minD) / 100, 0.67, 'Shift the curve to left or right.'),
        c: new Parameter('c', minC, maxC, (maxC - minC) / 100, 0.5, 'Lift or drop the Curve.'),
      };
    },
    function (x: number) {
      const b = this.parameters['b'].value;
      const k = this.parameters['k'].value;
      const d = this.parameters['d'].value;
      const c = this.parameters['c'].value;
      return b * Math.atan(k * x - d) + c;
    }
  );
}
