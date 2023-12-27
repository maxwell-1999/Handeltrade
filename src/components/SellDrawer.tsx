import { useEffect, useState } from 'react';
import { PrimaryBtn } from './Buttons';
import { MarketCard } from './MarketCard';
import { useContractWrite, usePublicClient } from 'wagmi';
import { appConfig } from '../config';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import toast from 'react-hot-toast';
import MemoButtonLoader from './ButtonLoader';
import { toe18, view } from '../Helpers/bigintUtils';
import { E18 } from '../Helpers/constants';

const SellDrawer: React.FC<{
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
    toast('Shares transfered to Account');
  };
  useEffect(() => {
    console.log('cdm callded', data.maxSell);
    if (data?.maxSell) {
      setValue((data.maxSell / E18).toString());
    }
  }, []);
  const [errors, setErrors] = useState({});
  console.log(`SellDrawer-view(data.userBalance): `, view(data.userBalance));

  return (
    <>
      <MarketCard market={selectedMarket} preview />
      <div className="flex flex-col p-3 rounded-[5px] bg-1b gap-2">
        <span className="text-2 text-f14 font-[500]">Balance</span>
        <span className="text-lg font-bold text-1">
          {view(data.userBalance)} Shares
        </span>
      </div>
      <div className="flex flex-col rounded-[5px] bg-1b gap-2 py-3">
        <span className="text-2 text-f14 font-[500]">Sell </span>
        <input
          value={value}
          max={(data.maxSell / E18).toString()}
          type="number"
          name="sell-input"
          onChange={(e) => {
            const ip = e.target;
            if (e.target.validationMessage)
              setErrors((e) => ({ ...e, [ip.name]: ip.validationMessage }));
            else {
              setErrors((e) => ({ ...e, [ip.name]: null }));
            }
            setValue(e.target.value);
          }}
          className="px-3 text-lg font-bold text-1"
        />
        <div>
          {Object.entries(errors).filter(([k]) => k == 'sell-input')?.[0]?.[1]}
        </div>
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
        <MemoButtonLoader className="scale-110 " loading={loading} /> Sell
      </PrimaryBtn>
    </>
  );
};

export { SellDrawer };
