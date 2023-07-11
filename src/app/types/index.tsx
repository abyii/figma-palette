import { Palette } from '../utils';

export type State = {
  palettes: Palette[];
  selectedIndex: number;
};

export type Action = { newState: State };
