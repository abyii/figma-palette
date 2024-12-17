import { Palette } from '../entities/Palette';

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
    }
  | {
      type: 'DELETE_CURRENT_PALETTE';
    };

export type MixerTab = 'LUMA' | 'CHROMA' | 'HUE';
