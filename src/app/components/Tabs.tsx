import React, { useEffect } from 'react';
import { DispatchAction, State } from '../types';
import { MAX_PALETTES } from '../config';
import { CompareIcon, PlusIcon, ReadmeIcon } from './icons';

const TabButton: React.FC<{
  label: any;
  onClick: () => void;
  highlighted: boolean;
  className?: string;
  disabled?: boolean;
  dispatch: React.Dispatch<DispatchAction>;
}> = ({ label, onClick, highlighted, className = '', disabled = false, dispatch }) => {
  const spanRef = React.useRef<HTMLSpanElement>(null);
  const [inputWidth, setInputWidth] = React.useState<number>(spanRef?.current?.offsetWidth || 35);
  useEffect(() => {
    setInputWidth(spanRef?.current?.offsetWidth);
  }, [label]);
  return (
    <button
      disabled={disabled}
      onClick={() => onClick()}
      className={
        className +
        ` flex justify-center relative items-center px-4 py-2 transition-all duration-200 text-sm font-semibold ${
          highlighted
            ? 'bg-neutral-700 text-neutral-100'
            : 'text-neutral-400 shadow-inner hover:bg-neutral-800 hover:text-neutral-300'
        } disabled:opacity-50 disabled:cursor-not-allowed`
      }
    >
      <span ref={spanRef} className="invisible absolute text-sm font-semibold -z-50">
        {label}
      </span>
      {highlighted && typeof label == 'string' && spanRef?.current?.offsetWidth ? (
        <input
          maxLength={20}
          minLength={1}
          inputMode="text"
          style={{ width: inputWidth }}
          className={`bg-transparent text-neutral-100 text-sm font-semibold focus:outline-none active:outline-none`}
          value={label}
          onChange={(e) => {
            e?.target?.value && dispatch({ type: 'RENAME_CURRENT_PALETTE', payload: e.target.value });
          }}
        />
      ) : (
        label
      )}
    </button>
  );
};

const Tabs: React.FC<{
  state: State;
  dispatch: React.Dispatch<DispatchAction>;
}> = ({ state, dispatch }) => {
  return (
    <div className="fixed top-0 w-full flex bg-neutral-900 overflow-x-auto">
      {/* First tab: readme */}
      <TabButton
        onClick={() => dispatch({ type: 'SELECT_INDEX', payload: 'README' })}
        label={<ReadmeIcon />}
        highlighted={state.selectedIndex == 'README'}
        dispatch={dispatch}
        className="absolute left-0"
      />
      {state.palettes.map((palette, index) => {
        return (
          <TabButton
            key={index}
            onClick={() => dispatch({ type: 'SELECT_INDEX', payload: index })}
            label={palette?.name}
            highlighted={state.selectedIndex == index}
            dispatch={dispatch}
          />
        );
      })}
      <TabButton
        className="text-base text-orange-500 hover:text-orange-400"
        disabled={state.palettes.length >= MAX_PALETTES}
        onClick={() => dispatch({ type: 'CREATE_PALETTE' })}
        label={<PlusIcon />}
        highlighted={false}
        dispatch={dispatch}
      />
      <div className="flex-1 flex"></div>
      {/* Last tab: compare */}
      <TabButton
        className="absolute right-0"
        onClick={() => dispatch({ type: 'SELECT_INDEX', payload: 'CMP' })}
        label={<CompareIcon />}
        highlighted={state.selectedIndex == 'CMP'}
        dispatch={dispatch}
      />
    </div>
  );
};

export default Tabs;
