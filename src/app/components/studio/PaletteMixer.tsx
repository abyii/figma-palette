import React, { Dispatch } from 'react';
import { Palette } from '../../utils';
import { DispatchAction } from '../../types';

type MixerTab = 'LUMA' | 'CHROMA' | 'HUE';

const MixerTabButton: React.FC<{ label: string; onClick: () => void; highlighted: boolean }> = ({
  label,
  onClick,
  highlighted,
}) => {
  return (
    <button
      className={`flex-1 py-2 text-sm ${
        highlighted
          ? 'bg-neutral-600 text-white font-medium shadow-sm'
          : 'bg-neutral-800 text-neutral-400 shadow-inner hover:bg-neutral-700'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
};

const MixerTabs: React.FC<{ tab: MixerTab; setTab: React.Dispatch<React.SetStateAction<MixerTab>> }> = ({
  tab,
  setTab,
}) => {
  return (
    <div className="flex w-full">
      <MixerTabButton label="Luminescence" onClick={() => setTab('LUMA')} highlighted={tab === 'LUMA'} />
      <MixerTabButton label="Chroma" onClick={() => setTab('CHROMA')} highlighted={tab === 'CHROMA'} />
      <MixerTabButton label="Hue" onClick={() => setTab('HUE')} highlighted={tab === 'HUE'} />
    </div>
  );
};

const PaletteMixer: React.FC<{ palette: Palette; dispatch: Dispatch<DispatchAction> }> = ({ palette, dispatch }) => {
  const [currentMixerTab, setCurrentMixerTab] = React.useState<'LUMA' | 'CHROMA' | 'HUE'>('LUMA');
  const channelName =
    currentMixerTab == 'LUMA'
      ? 'lightnessChannel'
      : currentMixerTab == 'CHROMA'
      ? 'chromaChannel'
      : currentMixerTab == 'HUE' && 'hueChannel';
  const roofValue = currentMixerTab == 'HUE' ? 359 : 100;
  const floorValue = 0;
  return (
    <div className="flex flex-col w-full">
      <MixerTabs tab={currentMixerTab} setTab={setCurrentMixerTab} />

      <div className="flex w-full p-3 bg-gradient-to-b from-neutral-600 to bg-neutral-700">
        {Array.from({ length: palette.numberOfShades }).map((_, i) => {
          const id = `shade${i}`;
          const value =
            currentMixerTab == 'CHROMA'
              ? palette[channelName][i] * 250
              : currentMixerTab == 'LUMA'
              ? palette[channelName][i] * 100
              : palette[channelName][i];
          const valueDisplay = '0'.repeat(3 - String(Math.round(value)).length) + Math.round(value);
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 px-2 flex-1 border-neutral-700 border-r-2 last-of-type:border-none`}
            >
              <input
                type="range"
                max={roofValue}
                min={floorValue}
                className="w-full cursor-pointer "
                style={{
                  writingMode: 'vertical-lr',
                  direction: 'rtl',
                }}
                key={i}
                id={id}
                // normalizing 0 to 0.4 => 0 to 100 by multiplying by 250
                value={value}
                onChange={(e) => {
                  //   dispacth palette update
                  palette[channelName][i] =
                    currentMixerTab == 'CHROMA'
                      ? Number(e.target.value) / 250
                      : currentMixerTab == 'LUMA'
                      ? Number(e.target.value) / 100
                      : Number(e.target.value);
                  dispatch({
                    type: 'UPDATE_CURRENT_PALETTE',
                    payload: { palette },
                  });
                }}
              />
              <label htmlFor={id} className="text-sm font-semibold text-neutral-100 font-mono">
                {valueDisplay}
              </label>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaletteMixer;
