import { MAX_CHROMA, MAX_HUE, MAX_LUMINESCENCE } from '../../config';
import { MixerTab } from '../../types';
import { Curve } from '../Curve';
import { Palette } from '../Palette';
import { Parameter } from '../Parameter';

export function getLinearCurve(palette: Palette, mode: MixerTab) {
  return new Curve(
    'Linear',
    'y = mx + c',
    palette,
    mode,
    function (palette: Palette, mode: MixerTab) {
      const xrange = Math.max(palette.numberOfShades - 3, 3);
      const minM =
        mode == 'LUMA'
          ? -MAX_LUMINESCENCE / xrange
          : mode == 'CHROMA'
          ? -MAX_CHROMA / xrange
          : mode == 'HUE' && -MAX_HUE / xrange;
      const maxM =
        mode == 'LUMA'
          ? MAX_LUMINESCENCE / xrange
          : mode == 'CHROMA'
          ? MAX_CHROMA / xrange
          : mode == 'HUE' && MAX_HUE / xrange;
      const minC = mode == 'LUMA' ? -MAX_LUMINESCENCE : mode == 'CHROMA' ? -MAX_CHROMA : mode == 'HUE' && -MAX_HUE;
      const maxC = mode == 'LUMA' ? MAX_LUMINESCENCE : mode == 'CHROMA' ? MAX_CHROMA : mode == 'HUE' && MAX_HUE;
      this.parameters = {
        m: new Parameter('m', minM, maxM, (maxM - minM) / 100, 0.5, 'Slope of the Line.'),
        c: new Parameter('c', minC, maxC, (maxC - minC) / 100, 0.5, 'Lift or drop the Line.'),
      };
    },
    function (x: number) {
      const m = this.parameters['m'].value;
      const c = this.parameters['c'].value;
      return m * x + c;
    }
  );
}
