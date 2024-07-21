import { Palette } from '../utils';

export type State = {
  palettes: Palette[];
  selectedIndex: number | 'README' | 'CMP'; // readme tab or any palette or compare tab.
};

export type Action = { newState: State };
