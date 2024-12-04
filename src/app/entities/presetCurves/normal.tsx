import { MAX_CHROMA, MAX_HUE, MAX_LUMINESCENCE } from '../../config';
import { MixerTab } from '../../types';
import { Curve } from '../Curve';
import { Palette } from '../Palette';
import { Parameter } from '../Parameter';

export function getNormalCurve(palette: Palette, mode: MixerTab) {
  return new Curve(
    'Normal',
    `y = ae^{-(kx-d)^{2}}+c`,
    palette,
    mode,
    function (palette: Palette, mode: MixerTab) {
      const xrange = palette.numberOfShades;
      const minA = mode == 'LUMA' ? -MAX_LUMINESCENCE : mode == 'CHROMA' ? -MAX_CHROMA : mode == 'HUE' && -MAX_HUE;
      const maxA = mode == 'LUMA' ? MAX_LUMINESCENCE : mode == 'CHROMA' ? MAX_CHROMA : mode == 'HUE' && MAX_HUE;
      const minK = 0;
      const maxK = 4;
      const minD = -1;
      const maxD = xrange / 2 + 1;
      const minC = mode == 'LUMA' ? -MAX_LUMINESCENCE : mode == 'CHROMA' ? -MAX_CHROMA : mode == 'HUE' && -MAX_HUE;
      const maxC = mode == 'LUMA' ? MAX_LUMINESCENCE : mode == 'CHROMA' ? MAX_CHROMA : mode == 'HUE' && MAX_HUE;
      this.parameters = {
        a: new Parameter(
          'a',
          minA,
          maxA,
          (maxA - minA) / 100,
          0.5,
          'Y-multiplier. Controls the amplitude of the Curve.'
        ),
        k: new Parameter('k', minK, maxK, (maxK - minK) / 100, 0.5, 'X-mulltiplier. Controls the width of the Curve.'),
        d: new Parameter('d', minD, maxD, (maxD - minD) / 100, 0.5, 'Shift the curve to left or right.'),
        c: new Parameter('c', minC, maxC, (maxC - minC) / 100, 0.5, 'Lift or drop the Curve.'),
      };
    },
    function (x: number) {
      const a = this.parameters['a'].value;
      const k = this.parameters['k'].value;
      const d = this.parameters['d'].value;
      const c = this.parameters['c'].value;
      return a * Math.exp(-Math.pow(k * x - d, 2)) + c;
    }
  );
}
