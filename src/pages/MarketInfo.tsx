import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import useDrawerState from '../atoms/drawerState';
import { MarketCard } from '../components/MarketCard';
import { useState } from 'react';
import { Tablist } from '../components/Tablist';
import { PrimaryBtn, SecondaryBtn } from '../components/Buttons';
const tabs = ['Holders', 'Watchlisted By'];
const MarketInfo: React.FC<any> = ({}) => {
  const params = useParams();
  const [activeTab, seActiveTab] = useState(tabs[0]);
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
    <div className="flex flex-col gap-4 px-4">
      <div>
        {data && <MarketCard market={data} preview />}
        <div className="flex gap-3 mb-4">
          <PrimaryBtn
            onClick={() => drawerManager.openBuyDrwer(data)}
            className="p-1 text-[white] text-[12px]  w-[70px] h-fit min-w-fit font-semibold rounded-[4px] px-2"
          >
            Buy
          </PrimaryBtn>
          <SecondaryBtn
            onClick={() => drawerManager.openSellDrawer(data)}
            className="p-1 text-[12px] w-[70px] font-semibold rounded-[4px] px-2 "
          >
            Sell
          </SecondaryBtn>
        </div>
      </div>
      <Tablist tablist={tabs} onTabSelect={seActiveTab} activeTab={activeTab} />
      {activeTab == 'Holders' ? <HoldersTab /> : <WatchListedByTab />}
    </div>
  );
};

export { MarketInfo };

const HoldersTab = () => {
  return <div>Holders Tab</div>;
};
const WatchListedByTab = () => {
  return <div>WatchListed Tab</div>;
};
