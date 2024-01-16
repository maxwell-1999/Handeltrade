import { useCallback } from 'react';
import { MarketCard } from './MarketCard';
import { HoldingsCard } from './HoldingsCard';

const HoldingsList: React.FC<{ markets: Market[] }> = ({ markets }) => {
  if (!markets.length) return <span className="text-2">No markets found!</span>;

  return (
    <div className="flex flex-col gap-[10px] ">
      {markets.map((market, idx) => (
        <HoldingsCard key={market.market_id} market={market} idx={idx + 1} />
      ))}
    </div>
  );
};

export { HoldingsList };
