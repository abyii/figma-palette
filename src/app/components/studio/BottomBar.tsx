import React from 'react';
import Button from '../ui/Button';
import { DispatchAction, State } from '../../types';

const BottomBar: React.FC<{
  state: State;
  dispatch: React.Dispatch<DispatchAction>;
}> = ({ state, dispatch }) => {
  const [createVariablesChecked, setCreateVariablesChecked] = React.useState(false);

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
      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          checked={createVariablesChecked}
          id="createVars"
          onChange={() => setCreateVariablesChecked((p) => !p)}
          className="rounded-full cursor-pointer bg-neutral-500"
        />
        <label htmlFor="createVars" className="text-xs font-semibold text-neutral-400 cursor-pointer">
          Create Variables
        </label>
        <Button
          className="bg-orange-700 hover:bg-orange-600 text-orange-100 hover:text-orange-50"
          onClick={() => {
            parent.postMessage(
              {
                pluginMessage: {
                  type: 'add-to-figma',
                  createVars: createVariablesChecked,
                  palette: state?.palettes[state?.selectedIndex],
                },
              },
              '*'
            );
          }}
        >
          Add to my File
        </Button>
      </div>
    </div>
  );
};

export default BottomBar;
