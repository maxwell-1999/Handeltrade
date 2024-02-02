import { useState } from 'react';
import { MarketSearchBar } from '../components/MarketSearchBar';
import { SearchTab, Tablist } from '../components/Tablist';
import { MarketList } from '../components/MarketList';
import useSearchMarket from '../atoms/marketSearch';
import { tabs } from './UserProfilePage/userProfileTabs';

const MarketListing: React.FC<any> = ({}) => {
  const [activeTab, setActiveTab] = useState('Mine');
  const searchManager = useSearchMarket();
  return (
    <div className="px-[15px] flex flex-col gap-[10px]">
      <MarketSearchBar />
      <div className="flex">
        <Tablist
          tablist={tabs}
          activeTab={searchManager.markets.length ? '-1' : activeTab}
          onTabSelect={console.log}
        />
        {searchManager.markets.length ? (
          <SearchTab keyword={searchManager.keyword} />
        ) : null}
      </div>
      <MarketList markets={[]} />
    </div>
  );
};
