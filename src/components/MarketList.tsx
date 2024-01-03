import { MarketCard } from './MarketCard';

const MarketList: React.FC<{ markets: Market[] }> = ({ markets }) => {
  console.log(`MarketList-markets: `, markets);
  if (!markets.length) return <span className="text-2">No markets found!</span>;
  return (
    <div className="flex flex-col gap-[10px]">
      {markets.map((market, idx) => (
        <MarketCard key={market.market_id} market={market} idx={idx + 1} />
      ))}
    </div>
  );
};

export { MarketList };
