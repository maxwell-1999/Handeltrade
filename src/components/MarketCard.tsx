import TimeAgo from 'react-timeago';
import MemoTImerIcon from '../SVG/TImerIcon';
import { E18, E8 } from '../Helpers/constants';
import { PrimaryBtn, SecondaryBtn } from './Buttons';
import { useNetwork } from 'wagmi';
import useDrawerState from '../atoms/drawerState';

const toJSEpoch = (e: string | number) => +e * 1000;

const MarketCard: React.FC<{ market: Market; preview?: boolean }> = ({
  market,
  preview,
}) => {
  const network = useNetwork();
  const drawerManager = useDrawerState();
  return (
    <div className="p-[10px] bg-white rounded-[10px] justify-between flex gap-[15px] w-full">
      <div className="flex flex-col gap-[3px] items-center ">
        <img src={market.img_url} className="w-[40px] h-[40px] rounded-[5px]" />
        {preview ? null : <span className="font-semibold text-f14">#2</span>}
      </div>
      <div className="flex flex-col items-center w-full ">
        <div
          className={`flex justify-between w-full mb-[2px] mt-${
            preview ? '1' : '2'
          } `}
        >
          <span className="font-semibold text-f14">{market.social_handle}</span>
          {preview ? null : (
            <span className="font-[500] text-f10 text-2">45 Shares</span>
          )}{' '}
        </div>
        <div className="w-full font-semibold text-2 text-f9">
          {preview ? null : <div className="mb-1">{market.name}</div>}
          <div className="flex font-[500] items-center justify-between">
            <div className="flex items-center gap-2 text-f10">
              <MemoTImerIcon />
              <TimeAgo date={toJSEpoch(market.updated_at)} />
              <div>
                Price{' '}
                {market.buyPrice
                  ? (BigInt(market.buyPrice) / E8).toString()
                  : 'No Price'}{' '}
                {network.chain?.nativeCurrency.symbol}
              </div>
            </div>
            {preview ? null : (
              <div className="flex gap-2">
                <PrimaryBtn
                  className="p-1 text-[white] text-[10px] w-fit h-fit min-w-fit font-semibold rounded-[4px] px-2"
                  onClick={() => drawerManager.openHandelMarket(market, true)}
                >
                  Buy
                </PrimaryBtn>
                <SecondaryBtn
                  className="p-1 text-[10px] font-semibold rounded-[4px] px-2 "
                  onClick={() => drawerManager.openHandelMarket(market, false)}
                >
                  Sell
                </SecondaryBtn>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { MarketCard };
