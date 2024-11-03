import { Palette } from '../utils';

export type State = {
  palettes: Palette[];
  selectedIndex: number | 'README' | 'CMP'; // readme tab or any palette or compare tab.
};

export type DispatchAction =
  | { type: 'CREATE_PALETTE' }
  | { type: 'SELECT_INDEX'; payload: State['selectedIndex'] }
  | {
      type: 'UPDATE_CURRENT_PALETTE';
      payload: { palette: Palette };
    };

export type PresetCurve =
  | { type: 'linear'; slope: number; yIntercept: number }
  | { type: 'exponential'; base: number; exponent: number }
  | { type: 'logarithmic'; base: number; coefficient: number };
