import { useEffect, useState } from 'react';
import { PrimaryBtn } from './Buttons';
import { MarketCard } from './MarketCard';
import { useContractWrite, usePublicClient } from 'wagmi';
import { appConfig } from '../config';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import toast from 'react-hot-toast';
import MemoButtonLoader from './ButtonLoader';
import { toe18, view } from '../Helpers/bigintUtils';

const InitMarketDrawer: React.FC<{
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
  console.log(`InitMarketDrawer-data.nextBuyPrice: `, data.nextBuyPrice);
  const handelTrade = async () => {
    const argPack = {
      args: [selectedMarket.market_id, toe18('1')],
    };
    console.log(`handel-deb:argPack: `, argPack);

    const { hash } = await writeAsync(argPack);
    const { status: completionStatus } = await waitForTransactionReceipt({
      hash,
    });

    console.log(`handel-deb:completionStatus: `, completionStatus);
    toast('Shares transfered to Account');
  };
  useEffect(() => {
    setValue('1');
  }, []);
  return (
    <>
      <MarketCard market={selectedMarket} preview />
      <div className="flex flex-col p-3 rounded-[5px] bg-1b gap-2">
        <span className="text-2 text-f14 font-[500]">
          This market isn't created yet
        </span>
        <span className="text-lg font-bold text-1">Buy 1st Share</span>
      </div>

      <PrimaryBtn
        onClick={() => {
          setLoading(true);
          handelTrade()
            .catch((e) => {
              toast(e.message, { icon: '❌' });
            })
            .finally(() => setLoading(false));
        }}
        className="flex items-center justify-center gap-5 h-[40px] text-white"
      >
        <MemoButtonLoader className="scale-110 " loading={loading} /> Create
        Market
      </PrimaryBtn>
    </>
  );
};

export { InitMarketDrawer };
