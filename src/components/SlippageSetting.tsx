import { useState } from 'react';
export const MAX_SLIPPAGE = 5;
export const inputRegex = RegExp(`^\\d*(?:\\\\[.])?\\d*$`);
export function escapeRegExp(string: string): string {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}
const defaultSlippage = 0.75;
const SlippageSetting: React.FC<any> = ({}) => {
  const defaults = [0.5, 1, 1.5];
  const [currentSlippage, setcurrentSlippage] = useState('');
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
            className={`relative  bg-[#F6F7FC]   px-5 py-3 rounded-[5px] outline-none focus:border-brand w-[150px] text-f10 ${
              defaults.includes(currentSlippage) ? 'text-2' : 'text-1'
            }`}
            onChange={(e) => {
              console.log(`SlippageSetting-e: `, e.target.value);
              if (
                e.target.value.includes('.') &&
                e.target.value.split('.')[1].length > 4
              )
                return;
              // if (inputRegex.test(escapeRegExp(e.target.value))) {
              setcurrentSlippage(e.target.value);
              // }
            }}
            placeholder="Enter value"
          />{' '}
          {currentSlippage != '' ? null : (
            <div className="flex items-center mt-1">
              <svg
                width={13}
                height={13}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                // {...props}
              >
                <circle cx={6.901} cy={6.36} r={6} fill="#c0c1ca" />
                <path
                  d="M6.352 9.595V4.968h1.09v4.627h-1.09ZM6.9 4.311a.636.636 0 0 1-.446-.172.554.554 0 0 1-.186-.418c0-.165.062-.305.186-.42a.63.63 0 0 1 .446-.174c.175 0 .324.058.446.175a.547.547 0 0 1 .187.419.554.554 0 0 1-.187.418.63.63 0 0 1-.446.172Z"
                  fill="white"
                />
              </svg>
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
