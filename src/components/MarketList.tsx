import { MarketCard } from './MarketCard';

const MarketList: React.FC<{ markets: Market[] }> = ({ markets }) => {
  console.log(`MarketList-markets: `, markets);
  return (
    <div className="flex flex-col gap-[10px]">
      {markets.map((market) => (
        <MarketCard key={market.market_id} market={market} />
      ))}
    </div>
  );
};

export { MarketList };
