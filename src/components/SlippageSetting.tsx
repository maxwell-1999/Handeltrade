import { useEffect, useState } from 'react';
import InfoIcon from '../SVG/InfoIcon';
import { useRecoilState, useRecoilValue } from 'recoil';
import { defaultSlippage, slippageAtom } from '@/atoms/SlipageState';
import { getSanitizedInput } from '@/utils/getSanitizeInput';
export const MAX_SLIPPAGE = 5;
export const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

const SlippageSetting: React.FC<any> = ({}) => {
  const defaults = [0.5, 1, 1.5];
  const [slipage, setSlippage] = useRecoilState(slippageAtom);
  console.log(`SlippageSetting-slipage: `, slipage);
  const [currentSlippage, setcurrentSlippage] = useState(slipage + '');
  useEffect(() => {
    if (currentSlippage) {
      setSlippage(+currentSlippage);
    } else {
      setSlippage(defaultSlippage);
    }
  }, [currentSlippage]);
  return (
    <div className="relative p-3 py-5 bg-white rounded-md shadow-lg">
      <div className="absolute bg-transperent shadow-lg triangle-right -right-[8px] top-1/2 -translate-y-1/2">
        {' '}
      </div>
      <div className="mb-5 text-2 text-f12">Max Slippage</div>
      <div className="flex items-start gap-3">
        {defaults.map((s) => (
          <div
            key={s}
            className={
              (+currentSlippage == s
                ? 'border border-brand text-1'
                : '  text-2') +
              '  bg-[#F6F7FC]  rounded-[5px] hover:border-brand cursor-pointer px-5 py-3'
            }
            role="button"
            onClick={() => setcurrentSlippage(s)}
          >
            {s}%
          </div>
        ))}
        <div className="relative">
          <input
            value={currentSlippage}
            type="number"
            max={MAX_SLIPPAGE}
            min={'0.01'}
            step={'0.01'}
            className={`  bg-[#F6F7FC]   px-5 py-3 rounded-[5px] outline-none focus:border-brand w-[150px] text-f10 ${
              defaults.includes(currentSlippage) ? 'text-2' : 'text-1'
            }`}
            onChange={(e) => {
              const value = getSanitizedInput(e.target.value, 2);
              if (+value > 5) {
                return;
              }
              setcurrentSlippage(value);
            }}
            placeholder="Enter value"
          />{' '}
          <div className="absolute -translate-y-1/2 right-2 top-1/2">%</div>
          {currentSlippage ? null : (
            <div className="flex items-center mt-1">
              <InfoIcon />
              <div className="ml-1 text-2">
                Default slippage is {defaultSlippage}%
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export { SlippageSetting };
