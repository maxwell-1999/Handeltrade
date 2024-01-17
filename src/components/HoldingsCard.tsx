import { useAccount } from 'wagmi';
import { RewardCard } from '../pages/RewardCard';
import { MarketCard } from './MarketCard';
import { areAdsEqual } from '@/Helpers/web3utils';
const rew = {
  minFeesClaimThreshold: BigInt(2e12),
  dividends: BigInt(1e14),
  rewards: BigInt(1e13),
  balanceOf: BigInt(3e18),
};
const HoldingsCard: React.FC<{
  market: Market;
  preview?: boolean;
  className?: string;
  idx?: number;
}> = (props) => {
  const account = useAccount();
  return (
    <MarketCard
      {...props}
      bottom={
        areAdsEqual(account.address, props.market.creator_addr) ? (
          <RewardCard rewards={rew} market={props.market} compact />
        ) : null
      }
    />
  );
};

export { HoldingsCard };
