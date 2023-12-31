import { useEffect, useRef, useState } from 'react';
import { PrimaryBtn } from './Buttons';
import { MarketCard } from './MarketCard';
import { useContractWrite, usePublicClient } from 'wagmi';
import { appConfig } from '../config';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import toast from 'react-hot-toast';
import MemoButtonLoader from './ButtonLoader';
import { renderShares, toe18, view } from '../Helpers/bigintUtils';
import { ContractFunctionExecutionError } from 'viem';
import { formatError } from '../Helpers/web3utils';

const BuyDrawer: React.FC<{
  data: UserMarketHoldings;
  value: string;
  setValue: (a: string) => void;
  selectedMarket: Market;
}> = ({ data, selectedMarket, value, setValue }) => {
  const { waitForTransactionReceipt } = usePublicClient();
  const [loading, setLoading] = useState(false);
  const { writeAsync } = useContractWrite({
    address: appConfig.handelTradeAddress,
    abi: HandleTradeAbi,
    functionName: 'buyShares',
  });
  const handelTrade = async () => {
    if (!data.nextBuyPrice) {
      throw new Error('Pre-fetching failed!');
    }
    const argPack = {
      args: [selectedMarket.market_id, toe18(value)],
      value: data.nextBuyPrice,
    };
    console.log(`handel-deb:argPack: `, argPack);

    const { hash } = await writeAsync(argPack);
    const { status: completionStatus } = await waitForTransactionReceipt({
      hash,
    });

    console.log(`handel-deb:completionStatus: `, completionStatus);
    toast('Shares transferred to your Account');
  };
  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
    console.log(`BuyDrawer-ref.current: `, ref.current);
  }, []);
  return (
    <>
      <MarketCard market={selectedMarket} preview className="bg-transparent " />
      <div className="flex flex-col p-3 rounded-[5px] bg-1b gap-2">
        <span className="text-2 text-f14 font-[500]">Market Supply</span>
        <span className="text-lg font-bold text-1">
          {renderShares(data.supply)}
        </span>
      </div>
      <div className="flex flex-col rounded-[5px] bg-1b gap-2 p-3">
        <span className="text-2 text-f14 font-[500]">
          Enter quantity of shares to buy
        </span>
        <input
          ref={ref}
          value={value}
          type="number"
          pattern="[0-9]"
          title="Numbers only"
          onChange={(e) => setValue(e.target.value.replace(/[^0-9]/g, ''))}
          className="px-3 text-lg font-bold text-1"
        />
      </div>
      <PrimaryBtn
        onClick={() => {
          setLoading(true);
          handelTrade()
            .catch((e) => {
              const msg = formatError(e);
              toast(msg, { icon: '❌' });
            })
            .finally(() => setLoading(false));
        }}
        className="flex items-center justify-center gap-5 h-[40px] text-white"
      >
        <MemoButtonLoader className="scale-110 " loading={loading} /> Buy
      </PrimaryBtn>
    </>
  );
};

export { BuyDrawer };
