import { MarketList } from '../../components/MarketList';
import useSearchMarket from '../../atoms/marketSearch';
import axios from 'axios';
import useSWR from 'swr';
import { ListLoader } from '../../components/ListLoader';

export const tabs = ['Holdings', 'Markets', 'Watchlist', 'Activities'];

const marketsRefreshInterval = 3000;
export const Holdings = ({ user_addr }: { user_addr: string }) => {
  const { data, isLoading } = useSWR<Market[]>('dd', {
    fetcher: async () => {
      const results = await axios.get(
        `https://api-production-4b67.up.railway.app/user/user_holdings_by_address/${user_addr}/400/0`
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`UserProfileTabs-data: `, data);

  return <MarketList markets={data ?? []} />;
};

export const Markets = ({ user_addr }: { user_addr: string }) => {
  const { data, isLoading } = useSWR<Market[]>('ddd', {
    fetcher: async () => {
      const results = await axios.get(
        `https://api-production-4b67.up.railway.app/user/user_created_markets_by_address/${user_addr}/400/0`
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;

  console.log(`UserProfileTabs-data:dd `, data);

  return <MarketList markets={data ?? []} />;
};

export const Watchlist = ({ user_addr }: { user_addr: string }) => {
  const { data, isLoading } = useSWR<Market[]>('dddd', {
    fetcher: async () => {
      const results = await axios.get(
        `https://api-production-4b67.up.railway.app/user/user_watchlist_markets_by_address/${user_addr}/400/0`
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`UserProfileTabs-data: `, data);

  return <MarketList markets={data ?? []} />;
};

export const SearchList = () => {
  const searchManager = useSearchMarket();
  if (searchManager.loading) return <ListLoader />;
  console.log(`UserProfileTabs-searchManager.markets: `, searchManager.markets);

  return <MarketList markets={searchManager.markets} />;
};
