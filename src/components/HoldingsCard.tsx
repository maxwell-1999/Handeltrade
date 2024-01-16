import { RewardCard } from '../pages/RewardCard';
import { MarketCard } from './MarketCard';
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
  return (
    <MarketCard
      {...props}
      bottom={<RewardCard rewards={rew} market={props.market} compact />}
    />
  );
};

export { HoldingsCard };
