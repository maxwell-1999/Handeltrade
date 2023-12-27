import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import useDrawerState from '../atoms/drawerState';
import { MarketCard } from '../components/MarketCard';

const MarketInfo: React.FC<any> = ({}) => {
  const params = useParams();
  const { data, error } = useSWR(params.marketid, {
    fetcher: async (marketid) => {
      const res = await axios.get(
        `https://api-production-4b67.up.railway.app/market/market_id/${marketid}`
      );
      return res.data.data;
    },
    refreshInterval: 2000,
  });
  const drawerManager = useDrawerState();
  return (
    <div className="flex flex-col">
      {data && <MarketCard market={data} preview />}I am the market info
      <button
        onClick={() => {
          drawerManager.openBuyDrwer(data);
        }}
      >
        Buy
      </button>
      <button
        onClick={() => {
          drawerManager.openSellDrawer(data);
        }}
      >
        Sell
      </button>
    </div>
  );
};

export { MarketInfo };
