import { MarketList } from '../../components/MarketList';
import useSearchMarket from '../../atoms/marketSearch';
import axios from 'axios';
import useSWR from 'swr';
import { ListLoader } from '../../components/ListLoader';
import UserActivityList from './UserActivityList';
import { HoldingsList } from '../../components/HoldingList';

export const tabs = ['Holdings', 'Markets', 'Watchlist', 'Activities'];

const marketsRefreshInterval = 3000;
export const Holdings = ({ user_addr }: { user_addr: string }) => {
  const { data, isLoading } = useSWR<Market[]>(user_addr + 'holdings', {
    fetcher: async () => {
      const results = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/user/user_holdings_by_address/${user_addr}/400/0`
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`UserProfileTabs-data: `, data);

  return <HoldingsList markets={data ?? []} />;
};

export const Markets = ({ user_addr }: { user_addr: string }) => {
  const { data, isLoading } = useSWR<Market[]>(user_addr + 'markets', {
    fetcher: async () => {
      const results = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/user/user_created_markets_by_address/${user_addr}/400/0`
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
  const { data, isLoading } = useSWR<Market[]>(user_addr + 'watchlist', {
    fetcher: async () => {
      const results = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/user/user_watchlist_markets_by_address/${user_addr}/400/0`
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

export const UserActivityTab: React.FC<{ user_addr: string }> = ({
  user_addr,
}) => {
  const { data, isLoading } = useSWR<any>('activity' + user_addr, {
    fetcher: async () => {
      const results = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/user/user_activites_by_address/${user_addr}/400/0`
      );
      return results.data as any;
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;

  const marketIdMap: MarketIdMap = data.refData;

  console.log(`UserActivity-data: `, data);

  return (
    <>
      <UserActivityList marketMap={marketIdMap} data={data.data} />
    </>
  );
};
