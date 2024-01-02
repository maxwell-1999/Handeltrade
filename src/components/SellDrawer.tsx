import { useEffect, useState } from 'react';
import { PrimaryBtn } from './Buttons';
import { MarketCard } from './MarketCard';
import { useContractWrite, usePublicClient } from 'wagmi';
import { appConfig } from '../config';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import toast from 'react-hot-toast';
import MemoButtonLoader from './ButtonLoader';
import { renderShares, toe18, view } from '../Helpers/bigintUtils';
import { E18 } from '../Helpers/constants';
import { formatError } from '../Helpers/web3utils';

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
    functionName: 'sellShares',
  });
  const handelTrade = async () => {
    if (!data.nextBuyPrice) {
      throw new Error('Pre-fetching failed!');
    }
    const argPack = {
      args: [selectedMarket.market_id, toe18(value)],
      // value: data.nextSellPrice,
    };
    console.log(`handel-deb:argPack: `, argPack);

    const { hash } = await writeAsync(argPack);
    const { status: completionStatus } = await waitForTransactionReceipt({
      hash,
    });

    console.log(`handel-deb:completionStatus: `, completionStatus);
    toast('Funds transfered to Account');
  };
  useEffect(() => {
    console.log('cdm callded', data.maxSell);
    if (data?.maxSell) {
      setValue((data.maxSell / E18).toString());
    }
  }, []);
  const [errors, setErrors] = useState({});

  return (
    <>
      <MarketCard market={selectedMarket} preview className="bg-transperent" />
      <div className="flex flex-col p-3 rounded-[5px] bg-1b gap-2">
        <span className="text-2 text-f14 font-[500]">Balance</span>
        <span className="text-lg font-bold text-1">
          {renderShares(data.userBalance)}
        </span>
      </div>
      <div className="flex flex-col rounded-[5px] bg-1b gap-2 p-3">
        <span className="text-2 text-f14 font-[500]">
          {data.maxSell
            ? 'Enter quantity of shares to Sell'
            : 'No shares to sell'}{' '}
        </span>
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
        <div className="text-red-500 ">
          {Object.entries(errors).filter(([k]) => k == 'sell-input')?.[0]?.[1]}
        </div>
      </div>
      <PrimaryBtn
        onClick={() => {
          setLoading(true);
          handelTrade().finally(() => setLoading(false));
        }}
        className="flex items-center justify-center gap-5 h-[40px] text-white"
        disable={data.maxSell ? false : `Insufficient funds for selling`}
      >
        <MemoButtonLoader className="scale-110 " loading={loading} /> Sell
      </PrimaryBtn>
    </>
  );
};

export { SellDrawer };
