import React, { Dispatch } from 'react';
import { MAX_CHROMA, MAX_HUE, MAX_LUMINESCENCE } from '../../config';
import { Palette } from '../../entities/Palette';
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

const PaletteMixer: React.FC<{
  palette: Palette;
  dispatch: Dispatch<DispatchAction>;
  currentMixerTab: MixerTab;
  setCurrentMixerTab: React.Dispatch<React.SetStateAction<MixerTab>>;
}> = ({ palette, dispatch, currentMixerTab, setCurrentMixerTab }) => {
  const channelName =
    currentMixerTab == 'LUMA'
      ? 'lightnessChannel'
      : currentMixerTab == 'CHROMA'
      ? 'chromaChannel'
      : currentMixerTab == 'HUE' && 'hueChannel';
  const roofValue = currentMixerTab == 'HUE' ? MAX_HUE : currentMixerTab == 'CHROMA' ? MAX_CHROMA : MAX_LUMINESCENCE;
  const floorValue = 0;
  return (
    <div className="flex flex-col w-full">
      <MixerTabs tab={currentMixerTab} setTab={setCurrentMixerTab} />

      <div className="flex w-full p-3 bg-gradient-to-b from-neutral-600 to bg-neutral-700">
        {Array.from({ length: palette.numberOfShades }).map((_, i) => {
          const id = `shade${i}`;
          const value =
            currentMixerTab == 'CHROMA'
              ? palette[channelName][i]
              : currentMixerTab == 'LUMA'
              ? palette[channelName][i]
              : palette[channelName][i];
          const valueDisplay = currentMixerTab == 'HUE' ? Number(value).toFixed(0) : Number(value).toFixed(2);
          return (
            <div
              key={i}
              className={`flex flex-col items-center gap-2 px-2 flex-1 border-neutral-700 border-r-2 last-of-type:border-none`}
            >
              <input
                type="range"
                max={roofValue}
                min={floorValue}
                step={currentMixerTab == 'HUE' ? 1 : 0.01}
                className="w-full cursor-pointer "
                style={{
                  writingMode: 'vertical-lr',
                  direction: 'rtl',
                }}
                key={i}
                id={id}
                value={value}
                onChange={(e) => {
                  //   dispacth palette update
                  palette[channelName][i] =
                    currentMixerTab == 'CHROMA'
                      ? Number(e.target.value)
                      : currentMixerTab == 'LUMA'
                      ? Number(e.target.value)
                      : Number(e.target.value);
                  dispatch({
                    type: 'UPDATE_CURRENT_PALETTE',
                    payload: { palette },
                  });
                }}
              />
              <label htmlFor={id} className="text-xs text-neutral-300 font-mono">
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
