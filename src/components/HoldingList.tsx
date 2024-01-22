import { useCallback } from 'react';
import { MarketCard } from './MarketCard';
import { HoldingsCard } from './HoldingsCard';
import { NoDataFound } from './NoDataFound';

const HoldingsList: React.FC<{ markets: Market[] }> = ({ markets }) => {
  if (!markets.length) return <NoDataFound>No holdings yet!</NoDataFound>;

  return (
    <div className="flex flex-col gap-[10px] ">
      {markets.map((market, idx) => (
        <HoldingsCard key={market.market_id} market={market} idx={idx + 1} />
      ))}
    </div>
  );
};

export { HoldingsList };
