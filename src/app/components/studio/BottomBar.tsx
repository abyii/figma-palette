import React from 'react';
import Button from '../ui/Button';
import { DispatchAction, State } from '../../types';

const BottomBar: React.FC<{
  state: State;
  dispatch: React.Dispatch<DispatchAction>;
}> = ({ state, dispatch }) => {
  return (
    <div className="px-3 py-2 flex w-full items-center bg-neutral-950 justify-between">
      <Button
        disabled={state?.palettes?.length == 1}
        onClick={() => {
          dispatch({ type: 'DELETE_CURRENT_PALETTE' });
        }}
        className={`${
          state?.palettes?.length == 1
            ? 'bg-neutral-700/50 text-neutral-400 pointer-events-none hover:bg-neutral-700/50 opacity-50'
            : 'bg-red-950/50 hover:bg-red-900/50 text-red-200 hover:text-red-400 '
        } `}
      >
        Delete
      </Button>
    </div>
  );
};

export default BottomBar;
