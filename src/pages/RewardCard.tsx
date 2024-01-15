import { useMemo } from 'react';
import { view } from '../Helpers/bigintUtils';
import { E18 } from '../Helpers/constants';
import { PrimaryBtn, PrimaryButton } from '../components/Buttons';
import { DisplayPrice } from '../components/DisplayPrice';

const RewardCard: React.FC<{
  rewards: {
    dividends: bigint;
    minFeesClaimThreshold: bigint;
    rewards: bigint;
    balanceOf: bigint;
  };
  market: Market;
}> = ({ rewards, market }) => {
  /*
  
  550 balance

  
  
  */

  const cards = useMemo(() => {
    let REWARD: { type: rewardType; reward: bigint }[] = [];
    let DIVIDEND: { type: rewardType; reward: bigint }[] = [];
    if (rewards.rewards >= rewards.minFeesClaimThreshold) {
      REWARD = [
        {
          reward: rewards.rewards,
          type: 'REWARD',
        },
      ];
    }
    if (rewards.dividends >= rewards.minFeesClaimThreshold) {
      DIVIDEND = [
        {
          reward: rewards.rewards,
          type: 'DIVIDEND',
        },
      ];
    }
    const arr = [...REWARD, ...DIVIDEND];
    return arr;
  }, [market, rewards]);
  console.log(
    `RewardCard-props.dividends: `,
    (BigInt(rewards.balanceOf) / E18) * BigInt(market.buyPrice)
  );
  return (
    <div className="bg-white text-2 text-f12 p-[16px] rounded-[8px] w-full  mr-auto ml-horizontalSm ">
      <div className="flex items-center">
        You own {view(rewards.balanceOf)} shares worth&nbsp;
        <DisplayPrice
          compact
          price={(BigInt(rewards.balanceOf) / E18) * BigInt(market.buyPrice)}
        />
      </div>
      {rewards.rewards ? null : (
        <div className="w-full mt-3">
          <div>Rewards:</div>
          <div className="flex justify-between w-full">
            <DisplayPrice compact price={BigInt(1e18)} />{' '}
            <PrimaryButton className="text-f10">Claim</PrimaryButton>
          </div>
        </div>
      )}
      {cards.map((r, idx) => {
        return (
          <>
            {' '}
            <RewardRow key={r.reward} data={r} />
            {idx < cards.length - 1 ? (
              <div className="bg-[#a5aab64c]  my-3 w-full h-[1px] rounded-full"></div>
            ) : null}
          </>
        );
      })}
    </div>
  );
};
type rewardType = 'REWARD' | 'DIVIDEND';
const RewardRow: React.FC<{ data: { type: rewardType; reward: bigint } }> = ({
  data,
}) => {
  const claimHandler = () => {
    if (data.type == 'DIVIDEND') {
      console.log('dividend-earned');
    } else {
      console.log('else-earned');
    }
  };
  return (
    <div className="w-full mt-3">
      <div>
        {data.type == 'DIVIDEND' ? 'Dividends Earned' : 'Reflection Fee Earned'}
        :
      </div>
      <div className="flex justify-between w-full">
        <DisplayPrice compact price={data.reward} />{' '}
        <PrimaryButton onClick={claimHandler} className="text-f10">
          Claim
        </PrimaryButton>
      </div>
    </div>
  );
};
export { RewardCard };
