import { ReactNode, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { PrimaryBtn } from './Buttons';
import { MarketCard } from './MarketCard';
import {
  useAccount,
  useBalance,
  useContractWrite,
  usePublicClient,
} from 'wagmi';
import { appConfig } from '../config';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import toast from 'react-hot-toast';
import MemoButtonLoader from './ButtonLoader';
import { renderShares, toe18, viewDec } from '../Helpers/bigintUtils';
import { Popover } from 'react-tiny-popover';
import { formatError } from '../Helpers/web3utils';
import { twJoin } from 'tailwind-merge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { DisplayPrice } from './DisplayPrice';
import { E18 } from '../Helpers/constants';
import MemoSettings from '../SVG/Settings';
import { SlippageSetting } from './SlippageSetting';
import { getSharesFromPrice } from '@/lib/PriceToQuantity';
import { getSanitizedInput } from '@/utils/getSanitizeInput';
import { showShares } from '@/pages/UserProfilePage/UserCardSm';
import { useSlippage } from '@/atoms/SlipageState';
import { Skeleton } from './ui/skeleton';
let defaultQty = 1;
const addSlippageBigint = (amount: bigint, slippage: number) => {
  slippage = slippage / 100;
  slippage = +slippage.toFixed(4);
  const num = BigInt(slippage * 1e4);
  return amount + (num * amount) / 10000n;
};
const addSlippageInt = (amount: number, slippage: number) => {
  slippage = slippage / 100;
  return amount + amount * slippage;
};

const EXPO = BigInt(1e18);
function getPrice(supply: bigint, qty: bigint) {
  console.log('Supply: ', supply, 'Qty: ', qty);
  const sum1 =
    supply === BigInt(0)
      ? BigInt(0)
      : ((supply - EXPO) * supply * (BigInt(2) * (supply - EXPO) + EXPO)) /
        (BigInt(6) * EXPO);
  const sum2 =
    supply === BigInt(0) && qty === EXPO
      ? BigInt(0)
      : ((supply - EXPO + qty) *
          (supply + qty) *
          (BigInt(2) * (supply - EXPO + qty) + EXPO)) /
        (BigInt(6) * EXPO);
  const summation = (sum2 - sum1) / EXPO;
  return summation / BigInt(1600);
}

const BuyDrawer: React.FC<{
  data: UserMarketHoldings;
  value: string;
  setValue: (a: string) => void;
  selectedMarket: Market;
}> = ({ data, selectedMarket, value, setValue }) => {
  const { waitForTransactionReceipt } = usePublicClient();
  const [loading, setLoading] = useState(false);
  const account = useAccount();
  const slipage = useSlippage();
  console.log(`BuyDrawer-slipage: `, slipage);
  const { writeAsync } = useContractWrite({
    address: appConfig.handelTradeAddress,
    abi: HandleTradeAbi,
    functionName: 'buyShares',
  });
  const userBalance = useBalance({
    address: account.address,
    watch: true,
  });
  const [trade, setTrade] = useState({
    shares: +value,
    price: -1n,
  });
  const [errors, setErrors] = useState({});
  useEffect(() => {
    setErrors({});
  }, [data?.userBalance]);
  const error = errors?.['Quantity'];

  const handelTrade = async () => {
    if (!data.nextBuyPrice) {
      throw new Error('Pre-fetching failed!');
    }
    if (error) throw new Error(error);
    const argPack = {
      args: [selectedMarket.market_id, BigInt(trade.shares * 1e18)],
      value: trade.price,
    };
    console.log(`handel-deb:argPack: `, argPack);

    const { hash } = await writeAsync(argPack);
    const { status: completionStatus } = await waitForTransactionReceipt({
      hash,
    });

    toast.success('Shares transferred to your Account');
  };
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    if (!data.nextBuyPrice) return;

    console.log('deb-buydrawer-r', viewDec(data.nextBuyPrice));
    const increasedPrice = addSlippageBigint(data.nextBuyPrice, slipage);
    console.log(
      `BuyDrawer-userBalance.data: `,
      userBalance.data?.value,
      userBalance.data
    );
    if (!userBalance.isLoading)
      if (increasedPrice > userBalance.data?.value) {
        setErrors((e) => ({ Quantity: 'Shares cost exceeds balance!' }));
      }
    setTrade((s) => {
      console.log(`BuyDrawer-s: `, s);
      return { ...s, price: increasedPrice };
    });
  }, [data.nextBuyPrice, userBalance.data?.value, slipage]);
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
  // useEffect(()=>{

  // },[])
  console.log(`BuyDrawer-errors: `, errors);
  return (
    <>
      <MarketCard market={selectedMarket} preview className="bg-transparent " />
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
          name="Quantity"
          placeholder="Enter quantity of shares to buy"
          value={value}
          type="number"
          max={'200'}
          min={'0.001'}
          step={'0.001'}
          // pattern="[0-9]"
          title="Numbers only"
          onChange={handleChange}
          className={
            'p-4 border-[2px] rounded-md py-3 h-16  pr-12 font-bold text-f14 text-1  ' +
            (error ? ' error-border ' : 'outline-brand')
          }
        />
      </div>
      <div className="flex flex-col justify-between ">
        {error ? (
          <div className="text-red-500 text-f10">{error}</div>
        ) : trade.price && trade.price !== -1n ? (
          <DisplayPrice price={trade.price} className="text-2" />
        ) : (
          <Skeleton className="block w-[40px] h-4 rounded-md" />
        )}
        {/* <div className="text-2">Makret Supply: {showShares(data.supply)}</div> */}
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
        className="flex items-center mt-2 justify-center gap-5 h-[40px] text-white"
      >
        <MemoButtonLoader className="scale-110 " loading={loading} /> Buy
      </PrimaryBtn>
    </>
  );
};

export { BuyDrawer };

export const IpLabel: React.FC<{
  children: ReactNode;
  className?: string;
  htmlFor: string;
}> = ({ children, htmlFor, className }) => {
  return (
    <label
      htmlFor={htmlFor}
      className={twJoin('text-2 text-f12 font-[500]  mt-3', className)}
    >
      {children}
    </label>
  );
};
