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
  const user = {
    id: 6,
    first_name: 'Gaurav',
    last_name: 'Vishwakarma',
    email: 'gv211432@gmail.com',
    img_url:
      'https://lh3.googleusercontent.com/a/ACg8ocKm_yTahe4QWyulXfktA6Nfp-RBctF4Ws_ehQeYB0B1Beg=s96-c',
    gender: 4,
    country: 'India',
    timezone: 'Kolkata',
    public_address: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    third_party_verifier: 'torus',
    is_active: true,
    created_at: '1703160856',
    updated_at: '1703160856',
  };
  const { data, isLoading } = useSWR<Market[]>('ddd', {
    fetcher: async () => {
      const results = await axios.get(
        `https://api-production-4b67.up.railway.app/market/market_holders_by_market_id/${market.market_id}/0/400`
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketInfo-data: `, data);

  console.log(`MarketListing-data:dd `, data);

  return (
    <div>
      {/* <UserCardSm user={user} /> */}
      No Holders Yet!
    </div>
  );
};
const WatchListedByTab = () => {
  return <div>No one watchlisted this market yet!</div>;
};
