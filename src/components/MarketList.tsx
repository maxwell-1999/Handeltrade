import { useCallback } from 'react';
import { MarketCard } from './MarketCard';
import { NoDataFound } from './NoDataFound';

const MarketList: React.FC<{ markets: Market[] }> = ({ markets }) => {
  console.log(`MarketList-markets: `, markets);
  if (!markets.length) return <NoDataFound>No markets found!</NoDataFound>;

  return (
    <div className="flex flex-col gap-[10px] ">
      {markets.map((market, idx) => (
        <MarketCard key={market.market_id} market={market} idx={idx + 1} />
      ))}
    </div>
  );
};

export { MarketList };
