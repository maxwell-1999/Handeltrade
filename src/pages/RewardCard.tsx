import React, { useMemo, useState } from 'react';
import { view } from '../Helpers/bigintUtils';
import { E18 } from '../Helpers/constants';
import { PrimaryBtn, PrimaryButton } from '../components/Buttons';
import { DisplayPrice } from '../components/DisplayPrice';
import { appConfig } from '../config';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import {
  useAccount,
  useContractReads,
  useContractWrite,
  usePublicClient,
} from 'wagmi';
import MemoButtonLoader from '../components/ButtonLoader';
import toast from 'react-hot-toast';
import { formatError } from '../Helpers/web3utils';
const RewardCard: React.FC<{
  rewards: {
    dividends: bigint;
    minFeesClaimThreshold: bigint;
    rewards: bigint;
    balanceOf: bigint;
  };
  market: Market;
  compact?: boolean;
}> = ({ market, compact }) => {
  const account = useAccount();

  const { data: rewards } = useContractReads({
    contracts: [
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'checkEarnedRewards',
        args: [market?.market_id, account?.address],
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'dividendsOf',
        args: [market?.market_id, account?.address],
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'minFeesClaimThreshold',
        args: [],
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'sharesBalance',
        args: [market?.market_id, account?.address],
      },
    ],
    watch: true,
    select: (data) => {
      console.log(`MarketInfo-data[2]: `, data[3].result);
      return {
        minFeesClaimThreshold: data[2].result,
        dividends: data[1].result,
        rewards: data[0].result,
        balanceOf: data[3].result,
      };
    },
  });

  const cards = useMemo(() => {
    let REWARD: { type: rewardType; reward: bigint }[] = [];
    let DIVIDEND: { type: rewardType; reward: bigint }[] = [];
    console.log(
      `RewardCard-rewards.rewards: `,
      rewards.minFeesClaimThreshold,
      rewards.dividends,
      rewards.rewards
    );

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
          reward: rewards.dividends,
          type: 'DIVIDEND',
        },
      ];
    }
    const arr = [...REWARD, ...DIVIDEND];
    return arr;
  }, [market, rewards]);
  if (!cards.length) return null;
  console.log(
    `RewardCard-market.buyPrice: `
    // typeof rewards.balanceOf,
    // typeof market.buyPrice
  );

  return (
    <div
      className={
        'bg-white text-2 text-f12  rounded-[8px] w-full py-[12px]   mr-auto  ' +
        (compact ? '!py-[6px]' : 'px-[16px]')
      }
    >
      {compact ? null : (
        <div className="flex items-center mb-3">
          You own {view(rewards.balanceOf)} shares worth&nbsp;
          <DisplayPrice
            compact
            price={BigInt((rewards.balanceOf * BigInt(market.buyPrice)) / E18)}
          />
        </div>
      )}
      {/* {rewards.rewards ? null : (
        <div className="w-full mt-3">
          <div>Rewards:</div>
          <div className="flex justify-between w-full">
            <DisplayPrice compact price={BigInt(1e18)} />{' '}
            <PrimaryButton className="text-f10">Claim</PrimaryButton>
          </div>
        </div>
      )} */}
      {cards.map((r, idx) => {
        return (
          <>
            {' '}
            <RewardRow key={r.reward} data={r} marketId={market.market_id} />
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
const RewardRow: React.FC<{
  data: { type: rewardType; reward: bigint };
  marketId: string;
}> = ({ data, marketId }) => {
  const { waitForTransactionReceipt } = usePublicClient();

  const account = useAccount();
  const { writeAsync: claimRewardAsync } = useContractWrite({
    address: appConfig.handelTradeAddress,
    abi: HandleTradeAbi,
    functionName: 'claimRewards',
  });
  const { writeAsync: claimReflectionAsync } = useContractWrite({
    address: appConfig.handelTradeAddress,
    abi: HandleTradeAbi,
    functionName: 'claimReflectionFees',
  });
  const [loading, setLoading] = useState<rewardType | null>(null);
  const claimHandler = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    const argPack = {
      args: [marketId, account?.address],
    };
    console.log(`RewardCard-argPack: `, argPack);
    console.log(`RewardCard-data.type: `, data.type);
    let hash;
    setLoading(data.type);
    try {
      if (data.type == 'DIVIDEND') {
        const res = await claimReflectionAsync(argPack);
        hash = res.hash;
      } else {
        const res = await claimRewardAsync(argPack);
        hash = res.hash;
      }
      const { status: completionStatus } = await waitForTransactionReceipt({
        hash,
      });

      toast.success('Rewards claimed successfully!');
    } catch (e) {
      console.log(`RewardCard-formatError(e): `, formatError(e));
      toast.error(formatError(e));
    }
    setLoading(null);
  };
  return (
    <div className="flex items-end justify-between w-full mt-">
      <div>
        {data.type == 'DIVIDEND' ? 'Dividends Earned' : 'Weekly Rewards Earned'}
        :
        <DisplayPrice compact price={data.reward} />{' '}
      </div>
      <PrimaryButton
        onClick={claimHandler}
        className="flex  gap-2 mb-2 text-f10 w-[40px] h-[20px] items-center justify-center"
      >
        {loading == data.type ? (
          <MemoButtonLoader className="scale-[0.8] ml-1" loading />
        ) : (
          'Claim'
        )}
      </PrimaryButton>
    </div>
  );
};
export { RewardCard };
