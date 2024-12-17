import { MAX_CHROMA, MAX_HUE, MAX_LUMINESCENCE } from '../../config';
import { MixerTab } from '../../types';
import { Curve } from '../Curve';
import { Palette } from '../Palette';
import { Parameter } from '../Parameter';

export function getExpoCurve(palette: Palette, mode: MixerTab) {
  return new Curve(
    'Expo',
    'y=ae^{(kx-d)}+c',
    'text-lg',
    palette,
    mode,
    function (palette: Palette, mode: MixerTab) {
      const xrange = palette.numberOfShades;
      const minA = mode == 'LUMA' ? -MAX_LUMINESCENCE : mode == 'CHROMA' ? -MAX_CHROMA : mode == 'HUE' && -MAX_HUE;
      const maxA = -minA;
      const minK = -0.5;
      const maxK = 0.5;
      const minD = -xrange / 2;
      const maxD = xrange / 2;
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
        k: new Parameter('k', minK, maxK, (maxK - minK) / 100, 0.85, 'X-mulltiplier. Controls the width of the Curve.'),
        d: new Parameter('d', minD, maxD, (maxD - minD) / 100, 0.75, 'Shift the curve to left or right.'),
        c: new Parameter('c', minC, maxC, (maxC - minC) / 100, 0.5, 'Lift or drop the Curve.'),
      };
    },
    function (x: number) {
      const a = this.parameters['a'].value;
      const k = this.parameters['k'].value;
      const d = this.parameters['d'].value;
      const c = this.parameters['c'].value;
      return a * Math.exp(k * x - d) + c;
    }
  );
}
