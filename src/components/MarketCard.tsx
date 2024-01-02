import TimeAgo from 'react-timeago';
import MemoTImerIcon from '../SVG/TImerIcon';
import { E18, E8 } from '../Helpers/constants';
import { useNetwork } from 'wagmi';
import useDrawerState from '../atoms/drawerState';
import MemoMoreIcon from '../SVG/MoreIcon';
import { useNavigate } from 'react-router-dom';
import { SecondaryBtn } from './Buttons';
import { view, viewDec } from '../Helpers/bigintUtils';
import { twMerge } from 'tailwind-merge';

const toJSEpoch = (e: string | number) => +e * 1000;

const MarketCard: React.FC<{
  market: Market;
  preview?: boolean;
  className?: string;
  idx?: number;
}> = ({ market, preview, idx, className }) => {
  console.log(`MarketCard-market: `, market);
  const nonPrice = !market?.buyPrice;
  const network = useNetwork();
  const navigate = useNavigate();
  return (
    <div
      role={preview ? 'cell' : 'button'}
      className={twMerge(
        'p-[10px] bg-white rounded-[10px] justify-between flex gap-[15px] w-full',
        className
      )}
      onClick={() => !preview && navigate('/markets/' + market.market_id)}
    >
      <div className="flex flex-col gap-[3px] items-center justify-center ">
        <img src={market.img_url} className="w-[40px] h-[40px] rounded-[5px]" />
        {nonPrice ? null : (
          <span className="font-semibold text-f14">#{idx || market.id}</span>
        )}
      </div>
      <div className="flex flex-col items-center w-full ">
        <div
          className={`flex justify-between w-full mb-[2px] mt-${
            nonPrice ? '1' : '2'
          } `}
        >
          <span className="font-semibold text-f14">{market.name}</span>
          {nonPrice ? null : (
            <span className="font-[500] text-f10 text-2">
              {view(market.shares)} Shares
            </span>
          )}{' '}
        </div>
        <div
          className={
            'w-full font-semibold text-2 text-f9 ' +
            (nonPrice ? 'flex justify-between items-center' : '')
          }
        >
          <div className={'mb-1 ' + (!preview ? 'text-overflow-2-lines' : '')}>
            {market.description}
          </div>
          {nonPrice ? null : (
            <div className="flex font-[500] items-center justify-between">
              <div className="flex items-center gap-2 text-f10">
                <MemoTImerIcon />
                <TimeAgo date={toJSEpoch(market.updated_at)} />
                <div>
                  Price{' '}
                  {market.buyPrice ? viewDec(market.buyPrice) : 'No Price'}{' '}
                  {network.chain?.nativeCurrency.symbol}
                </div>
              </div>
              {preview ? null : (
                <div className="flex gap-2">
                  <MemoMoreIcon />
                </div>
              )}
            </div>
          )}
          {nonPrice ? (
            preview ? null : (
              <SecondaryBtn
                className="p-1 text-[10px] font-semibold rounded-[4px] px-2 "
                onClick={() => console.log}
              >
                Visit
              </SecondaryBtn>
            )
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { MarketCard };
