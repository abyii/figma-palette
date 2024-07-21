import React from 'react';
import { State } from '../types';
import { MAX_PALETTES } from '../utils';
import { CompareIcon, PlusIcon, ReadmeIcon } from './icons';

const TabButton: React.FC<{
  label: any;
  onClick: () => void;
  highlighted: boolean;
  className?: string;
  disabled?: boolean;
}> = ({ label, onClick, highlighted, className = '', disabled = false }) => {
  return (
    <button
      disabled={disabled}
      onClick={() => onClick()}
      className={
        className +
        ` flex justify-center items-center px-4 py-2 transition-all duration-200 text-sm font-semibold ${
          highlighted
            ? 'bg-neutral-700 text-neutral-100'
            : 'text-neutral-400 shadow-inner hover:bg-neutral-800 hover:text-neutral-300'
        } disabled:opacity-50 disabled:cursor-not-allowed`
      }
    >
      {label}
    </button>
  );
};

const Tabs: React.FC<{
  state: State;
  onChangeTab: (index: State['selectedIndex'] | number) => void;
  onNewTab: () => void;
}> = ({ state, onChangeTab, onNewTab }) => {
  return (
    <div className="fixed top-0 w-full flex bg-neutral-900 shadow-inner">
      {/* First tab: readme */}
      <TabButton
        onClick={() => onChangeTab('README')}
        label={<ReadmeIcon />}
        highlighted={state.selectedIndex == 'README'}
      />
      {state.palettes.map((palette, index) => {
        return (
          <TabButton
            key={index}
            onClick={() => onChangeTab(index)}
            label={palette?.name}
            highlighted={state.selectedIndex == index}
          />
        );
      })}
      <TabButton
        className="text-base text-orange-500 hover:text-orange-400"
        disabled={state.palettes.length >= MAX_PALETTES}
        onClick={() => onNewTab()}
        label={<PlusIcon />}
        highlighted={false}
      />
      <div className="flex-1 flex "></div>
      {/* Last tab: compare */}
      <TabButton
        onClick={() => onChangeTab('CMP')}
        label={<CompareIcon />}
        highlighted={state.selectedIndex == 'CMP'}
      />
    </div>
  );
};

export default Tabs;
