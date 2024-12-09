import React, { useEffect, useMemo } from 'react';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { Palette } from '../../../entities/Palette';
import { Parameter } from '../../../entities/Parameter';
import { MixerTab } from '../../../types';
import { getCurveKey } from '../utils';

export const FxBox: React.FC<{
  palette: Palette;
  currentMixerTab: MixerTab;
  selectedParam: Parameter;
}> = ({ palette, currentMixerTab, selectedParam }) => {
  const curveKey = getCurveKey(currentMixerTab);
  const LatexComponent = useMemo(() => {
    if (!palette?.[curveKey]?.equationLatex) return null;
    return (
      <MathJaxContext>
        <MathJax className="text-lg text-neutral-300">{`$$${palette?.[curveKey]?.equationLatex}$$`}</MathJax>
      </MathJaxContext>
    );
  }, [palette?.[curveKey]?.equationLatex]);

  useEffect(() => {
    const symbol = selectedParam ? selectedParam?.symbol : 'null';
    const highlightClass = 'text-emerald-400';
    const equationLetters = document.getElementsByTagName('mjx-c');
    Array.from(equationLetters).forEach((letter) => {
      const computedStyle = window.getComputedStyle(letter, '::before');
      if (computedStyle.content == `"${symbol}"`) {
        letter.classList.add(highlightClass);
      } else {
        letter.classList.remove(highlightClass);
      }
    });
  }, [selectedParam, palette?.[curveKey]?.equationLatex]);
  return (
    <div className="w-full h-full flex relative flex-col aspect-square p-4 bg-gradient-to-t from-neutral-900 to-neutral-800 max-w-[30%]">
      <span className={`font-serif  italic text-xl ${palette[curveKey] ? 'text-emerald-400' : 'text-neutral-700'}`}>
        fx
      </span>
      {palette?.[curveKey] ? (
        <div className="w-full flex-col flex-1 flex items-center">
          {LatexComponent}
          <div className="text-neutral-400 absolute bottom-3 left-3 right-3 max-w-full">
            {selectedParam ? selectedParam?.description : 'Vary the Parameters on the right, to modify the Curve.'}
          </div>
        </div>
      ) : (
        <div className="w-full flex-1 flex justify-center items-center">
          <h6 className="text-neutral-600 max-w-full text-lg leading-tight self-end">
            Select one of the curves from the left to start using <span className="font-serif italic">fx.</span>
          </h6>
        </div>
      )}
    </div>
  );
};
