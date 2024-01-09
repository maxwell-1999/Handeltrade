import React from 'react';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useNetwork } from 'wagmi';
import { view, viewDec } from '../../Helpers/bigintUtils';
import MemoTImerIcon from '../../SVG/TImerIcon';
import { SecondaryBtn } from '../../components/Buttons';
import { toJSEpoch } from '../../components/MarketCard';

const UserActivityList: React.FC<{ marketMap: MarketIdMap, data: any[]; }> = ({ marketMap, data }) => {
  return (
    <div className='flex flex-col gap-[10px]'>
      {data.map((activity: BuySellActivity, i) => {
        if (activity.type == "buy" || activity.type == "sell") {
          return <MarketActivityCard activityData={activity} market={marketMap[activity.marketId]} />;
        }
        if (activity.type == "claimedRewards") {
          return <></>;
        }
      })}
    </div>
  );
};

export default UserActivityList;


const MarketActivityCard: React.FC<{
  market: Market;
  activityData: BuySellActivity;
  className?: string;
}> = ({ market, className, activityData }) => {

  console.log(`ActivityData: `, market);
  const nonPrice = activityData?.pricePaid ? !activityData.pricePaid : activityData?.priceReceived ? !activityData.priceReceived : true;
  const network = useNetwork();
  const navigate = useNavigate();

  return (
    <div
      role={'button'}
      className={twMerge(
        'p-[10px] bg-white rounded-[10px] justify-between flex gap-[15px]  w-full',
        className
      )}
      onClick={() => navigate('/markets/' + market.market_id)}
    >
      <div className="flex flex-col gap-[3px] items-center justify-center ">
        <img src={market.img_url} className="w-[40px] h-[40px] rounded-[5px]" />
        {nonPrice ? null : (
          <span className="font-semibold text-f14">#{market?.rank || "New"}</span>
        )}
      </div>
      <div className="flex flex-col items-center w-full ">
        <div
          className={`flex justify-between w-full mb-[2px] mt-${nonPrice ? '1' : '2'
            } `}
        >
          <span className="font-semibold text-f14">{market.name}</span>
          {nonPrice ? null : (
            <span
              data-tooltip-id="tooltip"
              data-tooltip-content={"Total shares supply of the market"}
              className="font-[500] text-f10 text-2 cursor-pointer">
              {view(activityData.qty)} Shares
            </span>
          )}{' '}
        </div>
        {/* <div className={'mb-1 text-overflow-2-lines w-full font-semibold text-2 text-f9 '}>
            @{market?.social_handle}
          </div> */}
        <div
          className={
            'w-full font-semibold text-2 text-f9 ' +
            (!nonPrice ? 'flex justify-between items-center' : '')
          }
        >
          {nonPrice ? null : (
            <div className="flex font-[500] items-center justify-between">
              <div className="flex items-center gap-2 text-f10">
                <MemoTImerIcon />
                <TimeAgo date={toJSEpoch(activityData.blockTimestamp)} />
                <div>
                  {activityData?.pricePaid ? "Bought for " + viewDec(BigInt(activityData.pricePaid))
                    : activityData?.priceReceived ? "Sold for " + viewDec(BigInt(activityData.priceReceived)) : ""}
                  {" " + network.chain?.nativeCurrency.symbol}
                </div>
              </div>
            </div>
          )}

          <SecondaryBtn
            className="p-1 text-[10px] font-semibold rounded-[4px] px-2 "
            onClick={() => console.log}
          >
            {activityData.type.toUpperCase()}
          </SecondaryBtn>

        </div>
      </div>
    </div>
  );
};