import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import useDrawerState from '../atoms/drawerState';
import { MarketCard } from '../components/MarketCard';
import { useState } from 'react';
import { Tablist } from '../components/Tablist';
import { PrimaryBtn, SecondaryBtn } from '../components/Buttons';
import { ListLoader } from '../components/ListLoader';
import { UserCard, UserCardSm } from './UserProfilePage/UserCardSm';
import { marketsRefreshInterval } from './MarketListing';
import { useProtection } from '../Helpers/useProtection';
import { UserCardList } from '../components/UserCardList';
const tabs = ['Holders', 'Watchlisted By'];
const MarketInfo: React.FC<any> = ({}) => {
  const params = useParams();
  const [protect] = useProtection();
  const [activeTab, seActiveTab] = useState(tabs[0]);
  const { data, error, isLoading } = useSWR(params.marketid, {
    fetcher: async (marketid) => {
      const res = await axios.get(
        `https://api-production-4b67.up.railway.app/market/market_id/${marketid}`
      );
      return res.data.data;
    },
    refreshInterval: 2000,
  });
  const drawerManager = useDrawerState();
  if (isLoading) return <ListLoader />;
  return (
    <div className="flex flex-col gap-4 px-4">
      <div>
        {data && <MarketCard market={data} preview />}
        {data.on_chain ? (
          <div className="flex gap-3 mb-4">
            <PrimaryBtn
              onClick={() => protect(() => drawerManager.openBuyDrwer(data))}
              className="p-1 text-[white] text-[12px]  w-[70px] h-fit min-w-fit font-semibold rounded-[4px] px-2"
            >
              Buy
            </PrimaryBtn>
            <SecondaryBtn
              onClick={() => protect(() => drawerManager.openSellDrawer(data))}
              className="p-1 text-[12px] w-[70px] font-semibold rounded-[4px] px-2 "
            >
              Sell
            </SecondaryBtn>
          </div>
        ) : (
          <PrimaryBtn
            onClick={() => protect(() => drawerManager.openBuyDrwer(data))}
            className="p-1 text-[white] text-[12px]  w-[70px] h-fit min-w-fit font-semibold rounded-[4px] px-2"
          >
            Buy 1st Share
          </PrimaryBtn>
        )}
      </div>
      <Tablist tablist={tabs} onTabSelect={seActiveTab} activeTab={activeTab} />
      {activeTab == 'Holders' ? (
        <HoldersTab market={data} />
      ) : (
        <WatchListedByTab />
      )}
    </div>
  );
};

export { MarketInfo };

const HoldersTab: React.FC<{ market: Market }> = ({ market }) => {
  const { data, isLoading } = useSWR<Market[]>('holders' + market.id, {
    fetcher: async () => {
      const results = await axios.get(
        // `https://api-production-4b67.up.railway.app/market/market_holders_by_market_id/32332527693209771455157481647383810793610908799066291214333259842602494667764/400/0`
        `https://api-production-4b67.up.railway.app/market/market_holders_by_market_id/${market.market_id}/400/0`
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketInfo-data: `, data);

  return (
    <div>
      <UserCardList users={data} />
      {/* <UserCardSm user={user} /> */}
    </div>
  );
};
const WatchListedByTab = () => {
  return <div className="text-2">No one watchlisted this market yet!</div>;
};
