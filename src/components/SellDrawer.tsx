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
import { Popover } from 'react-tiny-popover';
import { IpLabel } from './BuyDrawer';
import MemoSettings from '../SVG/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DisplayPrice } from './DisplayPrice';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { SlippageSetting } from './SlippageSetting';
import { getSanitizedInput } from '@/utils/getSanitizeInput';

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
  const [trade, setTrade] = useState({
    shares: +value,
    price: -1n,
  });
  const handelTrade = async () => {
    if (!data.nextBuyPrice) {
      throw new Error('Pre-fetching failed!');
    }
    const argPack = {
      args: [
        selectedMarket.market_id,
        BigInt(trade.shares * 1e18),
        trade.price,
      ],
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
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return setValue('');
    const value = getSanitizedInput(e.target.value);
    if (!value) return;
    const ip = e.target;
    // const value = parseFloat(e.target.value).toFixed(2);
    setValue(value);
    if (ip.validationMessage)
      return setErrors((e) => ({ ...e, [ip.name]: ip.validationMessage }));
    else setErrors({});
    setTrade({ shares: +value, price: -1n });
  };
  return (
    <>
      <MarketCard market={selectedMarket} preview className="bg-transperent" />

      <div className="flex items-end justify-between">
        <IpLabel htmlFor="Shares ip">Number of shares</IpLabel>
        <Popover
          onClickOutside={() => setIsPopoverOpen(false)}
          isOpen={isPopoverOpen}
          positions={['left']} // preferred positions by priority
          containerStyle={{ zIndex: '1000', marginRight: '5px' }}
          content={<SlippageSetting />}
          padding={10}
        >
          <button
            className="text-2"
            onClick={() => setIsPopoverOpen(!isPopoverOpen)}
          >
            <MemoSettings />
          </button>
        </Popover>
      </div>
      <div className=" flex flex-col rounded-[5px] bg-1b gap-2 ">
        <input
          id="Shares ip"
          name="Shares ip"
          placeholder="Enter quantity of shares to buy"
          value={value}
          max={(data.maxSell / E18).toString()}
          type="number"
          min={'0.001'}
          step={'0.001'}
          title="Numbers only"
          onChange={(e) => {
            const ip = e.target;
            if (e.target.validationMessage)
              setErrors((e) => ({ ...e, [ip.name]: ip.validationMessage }));
            else {
              setErrors((e) => ({ ...e, [ip.name]: null }));
            }
            setValue(e.target.value.replace(/[^0-9]/g, ''));
          }}
          className="p-4 py-3 pr-12 font-bold text-f14 text-1 outline-brand"
        />
        <div className="text-red-500 ">
          {Object.entries(errors).filter(([k]) => k == 'sell-input')?.[0]?.[1]}
        </div>
        <div className="text-2">Balance: {renderShares(data.userBalance)}</div>
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
