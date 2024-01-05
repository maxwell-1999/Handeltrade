import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import useDrawerState from '../atoms/drawerState';
import { MarketCard } from '../components/MarketCard';
import { useState } from 'react';
import { Tablist } from '../components/Tablist';
import { PrimaryBtn, SecondaryBtn } from '../components/Buttons';
import { ListLoader } from '../components/ListLoader';
import { marketsRefreshInterval } from './MarketListing';
import { useProtection } from '../Helpers/useProtection';
import { UserCardList } from '../components/UserCardList';
import { useAccount } from 'wagmi';
import useUserState from '../atoms/userState';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark as solidBookmark } from "@fortawesome/free-solid-svg-icons";
import { faBookmark as emptyBookmark } from "@fortawesome/free-regular-svg-icons";
import toast from 'react-hot-toast';
import MarketActivityList from './MarketActivityList';

const tabs = ['Holders', 'Watchlisted By', "Activity"];
const MarketInfo: React.FC<any> = ({ }) => {
  const account = useAccount();
  const [userState,] = useUserState();
  const params = useParams();
  const [protect] = useProtection();

  const [activeTab, seActiveTab] = useState(tabs[0]);
  const { data, error, isLoading } = useSWR(params.marketid, {
    fetcher: async (marketid) => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/market/market_id/${marketid}`,
        { headers: { "session-id": userState?.session_id ?? "" } }
      );
      return res.data.data;
    },
    refreshInterval: 2000,
  });
  const drawerManager = useDrawerState();
  if (isLoading) return <ListLoader />;

  console.log(`MarketInfo-data: `, data);

  const handleAddToWatchlist = async () => {
    console.log("Add to watchlist");
    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/watchlist/add`,
      { ids: [data.id] },
      {
        headers: { "session-id": userState?.session_id ?? "" },
      }
    );
    if (res.data.status == "success") {
      data.watchlisted = true;
      toast("Market added to watchlist");
      console.log("Added to watchlist");
    }
  };
  const handleRemoveFromWatchlist = async () => {
    console.log("Remove from watchlist");
    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/watchlist/remove`,
      { ids: [data.id] },
      {
        headers: { "session-id": userState?.session_id ?? "" },
      }
    );
    if (res.data.status == "success") {
      data.watchlisted = false;
      toast("Removed from watchlist");
      console.log("Removed from watchlist");
    }
  };

  return (
    <div className="flex flex-col gap-4 px-4 ">
      <div>
        {data && <MarketCard market={data} preview />}
        {data?.on_chain || data?.shares ? (
          <div className="flex justify-between">
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
            <div className="flex mb-4">
              {data && ("watchlisted" in data) ? (data?.watchlisted ?
                <FontAwesomeIcon
                  height={30}
                  className="h-8 mr-4 text-brand cursor-pointer"
                  icon={solidBookmark}
                  onClick={() => handleRemoveFromWatchlist()}
                  data-tooltip-id="tooltip"
                  data-tooltip-content={"Remove from watchlist"}
                />
                : <FontAwesomeIcon
                  height={30}
                  className="h-8 mr-4 text-brand cursor-pointer"
                  icon={emptyBookmark}
                  onClick={() => handleAddToWatchlist()}
                  data-tooltip-id="tooltip"
                  data-tooltip-content={"Add to watchlist"}

                />) : null
              }
            </div>
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
      ) : activeTab == 'Watchlisted By' ? (
        <WatchListedByTab market={data} />
      ) : <MarketActivityTab market={data} />}
    </div>
  );
};

export { MarketInfo };

const HoldersTab: React.FC<{ market: Market; }> = ({ market }) => {
  const { data, isLoading } = useSWR<User[]>('holders' + market.id, {
    fetcher: async () => {
      const results = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/market/market_holders_by_market_id/${market.market_id}/400/0`
      );
      return results.data.data as User[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketInfo-data: `, data);

  return (
    <div>
      <UserCardList users={data ?? []} />
    </div>
  );
};

const WatchListedByTab: React.FC<{ market: Market; }> = ({ market }) => {
  const { data, isLoading } = useSWR<User[]>('watchlistedBy' + market.id, {
    fetcher: async () => {
      const results = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/market/market_watchlisted_by_market_id/${market.market_id}/400/0`
      );
      return results.data.data as User[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketWatchlistedBy-data: `, data);

  return (
    <div>
      <UserCardList users={data ?? []} />
    </div>
  );
};


const MarketActivityTab: React.FC<{ market: Market; }> = ({ market }) => {
  const { data, isLoading } = useSWR<any>('MarketActivity' + market.id, {
    fetcher: async () => {
      const results = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/market/market_activities_by_market_id/${market.market_id}/400/0`
      );
      return results.data;
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketActivity-data: `, data);
  const userAddrMap = data.refData;

  return (
    <div>
      <MarketActivityList userAddrMap={userAddrMap} data={data.data} />
    </div>
  );
};


