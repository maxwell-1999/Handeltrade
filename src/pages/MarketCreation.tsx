import { useEffect, useState } from 'react';
import MemoTwitterLogo from '../SVG/TwitterLogo';

const MarketCreation: React.FC<any> = ({}) => {
  const [value, setValue] = useState('');
  const fetchMarketStatus = async () => {};
  return (
    <div className="flex flex-col items-center justify-end h-full bg-brand">
      <div className="flex flex-col items-center h-[70%] gap-[40px] bg-white w-full rounded-t-[20px] p-[30px]">
        <div className="text-lg font-bold">Create new Market</div>
        <div className="w-full text-center text-f12 text-2 ">
          Use your Twitter, Email, or Phone as your personal crypto wallet
          without the complexity. Let anyone send you tokens via your social
          handle.
        </div>
        <div className="flex items-center w-full bg-3b  h-[50px] rounded-[10px] px-6">
          <div className="w-[24px] h-[24px]">
            <MemoTwitterLogo />
          </div>
          <div className="ml-3 mr-2 text-lg font-bold">@</div>
          <input
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Channel Name"
            className="bg-transparent px-3 z-[10]   outline-[transperent] outline-[0px] border-[0px] text-md border-[transperent]  placeholder:text-2 font-[500]  rounded-[10px]   w-full h-full"
          ></input>
          {value ? (
            <div
              className=" text-f14 z-[100]"
              onClick={() => {
                fetchMarketStatus;
              }}
            >
              X
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { MarketCreation };
