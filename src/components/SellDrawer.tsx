import { useEffect, useState } from 'react';
import { PrimaryBtn } from './Buttons';
import { MarketCard } from './MarketCard';
import { useContractWrite, usePublicClient } from 'wagmi';
import { appConfig } from '../config';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import toast from 'react-hot-toast';
import MemoButtonLoader from './ButtonLoader';
import { renderShares, toe18, view, viewDec } from '../Helpers/bigintUtils';
import { E18 } from '../Helpers/constants';
import { Popover } from 'react-tiny-popover';
import { IpLabel } from './BuyDrawer';
import MemoSettings from '../SVG/Settings';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { DisplayPrice } from './DisplayPrice';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { SlippageSetting } from './SlippageSetting';
import { getSanitizedInput } from '@/utils/getSanitizeInput';
import { showShares } from '@/pages/UserProfilePage/UserCardSm';
import { useSlippage } from '@/atoms/SlipageState';
import { formatError } from '@/Helpers/web3utils';
const subtractSlippageBigint = (amount: bigint, slippage: number) => {
  slippage = slippage / 100;
  const num = BigInt(slippage * 1e4);
  return amount - (num * amount) / 10000n;
};
const subtractSlippageInt = (amount: number, slippage: number) => {
  slippage = slippage / 100;
  return amount + amount * slippage;
};
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
  const [errors, setErrors] = useState({});

  const handelTrade = async () => {
    if (!data.nextBuyPrice) {
      throw new Error('Pre-fetching failed!');
    }
    if (error) throw new Error(error);

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
    toast.success('Funds transfered to Account');
  };
  useEffect(() => {
    console.log('cdm callded', data.maxSell);
    if (data?.maxSell) {
      setValue((data.maxSell / E18).toString());
    }
  }, []);
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.value) return setValue('');
    const value = getSanitizedInput(e.target.value, 5);
    if (!value) return;
    const ip = e.target;
    // const value = parseFloat(e.target.value).toFixed(2);
    setValue(value);
    console.log(`BuyDrawer-ip.validationMessage: `, ip.validationMessage);

    if (ip.validationMessage)
      return setErrors((e) => ({ ...e, [ip.name]: ip.validationMessage }));
    else setErrors({});
    setTrade({ shares: +value, price: -1n });
  };
  console.log(`SellDrawer-data.maxSell: `, data.maxSell);
  const error = errors?.['SellQuantity'];
  const slipage = useSlippage();
  useEffect(() => {
    if (!data.nextSellPrice) return;
    setTrade((s) => {
      const decreasedPrice = subtractSlippageBigint(
        data.nextSellPrice,
        slipage
      );
      return {
        ...s,
        price: decreasedPrice,
      };
    });
  }, [data.nextSellPrice]);
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
          name="SellQuantity"
          placeholder="Enter quantity of shares to buy"
          value={value}
          max={view(data.maxSell, 5).toString()}
          type="number"
          min={'0.0001'}
          step={'0.0001'}
          title="Numbers only"
          onChange={handleChange}
          className={
            'p-4 py-3 pr-12 font-bold text-f14 text-1  ' +
            (error ? 'outline-red-500 border-red-500' : 'outline-brand')
          }
        />
        <div className="text-red-500 ">{error}</div>
        <div className="text-2">Balance: {showShares(data.userBalance)}</div>
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
        disable={data.maxSell ? false : `Insufficient funds for selling`}
      >
        <MemoButtonLoader className="scale-110 " loading={loading} /> Sell
      </PrimaryBtn>
    </>
  );
};

export { SellDrawer };
