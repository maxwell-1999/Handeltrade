import React from 'react';
import TimeAgo from 'react-timeago';
import { useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { useNetwork } from 'wagmi';
import { view, viewDec } from '../../Helpers/bigintUtils';
import MemoTImerIcon from '../../SVG/TImerIcon';
import { SecondaryBtn } from '../../components/Buttons';
import { toJSEpoch } from '../../components/MarketCard';
import { showShares } from './UserCardSm';

const UserActivityList: React.FC<{ marketMap: MarketIdMap; data: any[] }> = ({
  marketMap,
  data,
}) => {
  console.log({ UserActivitys: data });
  return (
    <div className="flex flex-col gap-[10px]">
      {data.map((activity: BuySellActivity, i) => {
        if (activity.type == 'buy' || activity.type == 'sell') {
          return (
            <MarketActivityCard
              key={i}
              activityData={activity}
              market={marketMap[activity.marketId]}
            />
          );
        }
        if (activity.type == 'claimedRewards') {
          activity.type2 = 'Claimed Rewards';
          return (
            <ClaimRewardActivityCard
              key={i}
              activityData={activity}
              market={marketMap[activity.marketId]}
            />
          );
        }
        if (activity.type == 'claimedReflectionFees') {
          activity.type2 = 'Claimed Reflection';
          return (
            <ClaimReflectionActivityCard
              key={i}
              activityData={activity}
              market={marketMap[activity.marketIds]}
            />
          );
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
  const nonPrice = activityData?.pricePaid
    ? !activityData.pricePaid
    : activityData?.priceReceived
    ? !activityData.priceReceived
    : true;
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
        <img
          src={market.img_url}
          className="w-[30px] h-[30px] rounded-[5px]  img-loading"
        />
        {nonPrice ? null : (
          <span className="font-semibold text-f14">
            #{market?.rank || 'New'}
          </span>
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
            <span
              data-tooltip-id="tooltip"
              data-tooltip-content={'Total shares supply of the market'}
              className="font-[500] text-f10 text-2 cursor-pointer"
            >
              {/* {view()} Shares */}
              {showShares(activityData.qty)}
            </span>
          )}{' '}
        </div>
        {/* <div className={'mb-1 text-overflow-2-lines w-full font-semibold text-2 text-f10 '}>
            @{market?.social_handle}
          </div> */}
        <div
          className={
            'w-full font-semibold text-2 text-f10  ' +
            (!nonPrice ? 'flex justify-between items-center' : '')
          }
        >
          {nonPrice ? null : (
            <div className="flex font-[500] items-center justify-between mt-3">
              <div className="flex items-center gap-2 text-f10 !whitespace-nowrap">
                <MemoTImerIcon />
                <TimeAgo date={toJSEpoch(activityData.blockTimestamp)} />
                <SecondaryBtn
                  className="p-1 text-[10px] font-semibold rounded-[4px] px-2 "
                  onClick={() => console.log}
                >
                  {activityData.type.toUpperCase()}
                </SecondaryBtn>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ClaimRewardActivityCard: React.FC<{
  market: Market;
  activityData: BuySellActivity;
  className?: string;
}> = ({ market, className, activityData }) => {
  console.log(`ActivityData: `, market);
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
        <img src={market.img_url} className="w-[28px] h-[28px] rounded-[5px]" />
        <span className="font-semibold text-f14">#{market?.rank || 'New'}</span>
      </div>
      <div className="flex flex-col items-center w-full ">
        <div className={`flex justify-between w-full mb-[2px] mt-1`}>
          <span className="font-semibold text-f14">{market.name}</span>
        </div>
        {/* <div className={'mb-1 text-overflow-2-lines w-full font-semibold text-2 text-f10 '}>
          @{market?.social_handle}
        </div> */}
        {/* <div
          className={
            'mb-1 text-overflow-2-lines w-full font-semibold text-2 text-f10 '
          }
        >
          Claimed Amount {viewDec(activityData?.claimedRewards)}{' '}
          {network.chain?.nativeCurrency.symbol ?? ''}
        </div> */}

        <div
          className={
            'w-full font-semibold text-2 text-f10 flex justify-between items-center'
          }
        >
          <div className="flex font-[500] items-center justify-between">
            <div className="flex items-center gap-2 text-f10">
              <MemoTImerIcon />
              <TimeAgo date={toJSEpoch(activityData.blockTimestamp)} />
              <SecondaryBtn
                className="p-1 text-[10px] font-semibold rounded-[4px] px-2 "
                onClick={() => console.log}
              >
                {activityData.type2.toUpperCase()}
              </SecondaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const ClaimReflectionActivityCard: React.FC<{
  market: Market;
  activityData: BuySellActivity;
  className?: string;
}> = ({ market, className, activityData }) => {
  console.log(`ActivityData: `, market);
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
      <div className="flex flex-col gap-[3px] items-center justify-around ">
        <img src={market.img_url} className="w-[28px] h-[28px] rounded-[5px]" />
        <span className="font-semibold text-f14">#{market?.rank || 'New'}</span>
      </div>
      <div className="flex flex-col items-center w-full ">
        <div className={`flex justify-between w-full mb-[2px] mt-1`}>
          <span className="font-semibold text-f14">{market.name}</span>
        </div>
        {/* <div className={'mb-1 text-overflow-2-lines w-full font-semibold text-2 text-f10 '}>
          @{market?.social_handle}
        </div> */}
        {/* <div
          className={
            'mb-1 text-overflow-2-lines w-full font-semibold text-2 text-f10 '
          }
        >
          Claimed Amount {viewDec(activityData?.claimedFees)}{' '}
          {network.chain?.nativeCurrency.symbol ?? ''}
        </div> */}

        <div
          className={
            'w-full font-semibold text-2 text-f10 flex justify-between items-center'
          }
        >
          <div className="flex font-[500] items-center justify-between">
            <div className="flex items-center gap-2 text-f10">
              <MemoTImerIcon />
              <TimeAgo date={toJSEpoch(activityData.blockTimestamp)} />

              <SecondaryBtn
                className="p-1 text-[10px] font-semibold rounded-[4px] px-2 "
                onClick={() => console.log}
              >
                {activityData.type2.toUpperCase()}
              </SecondaryBtn>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
