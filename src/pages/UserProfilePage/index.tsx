import React, { useState } from 'react';
import PrimeText from '../../components/PrimeText';
import PrimeFadeText from '../../components/PrimeFadeText';
import useSearchMarket from '../../atoms/marketSearch';
import { SearchTab, Tablist } from '../../components/Tablist';

import {
  SearchList,
  Markets,
  Holdings,
  Watchlist,
  tabs,
} from './userProfileTabs';
import { UserCard } from './UserCard';

export default function UserProfilePage() {
  const user_data = {
    message: 'User found',
    data: {
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
    },
  };

  const [activeTab, setActiveTab] = useState('Holdings');
  const searchManager = useSearchMarket();

  const user = user_data.data;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      {/* creating a 1/3 height section for user details and 2/3 page section for user specific details  */}

      <UserCard user={user} />

      <div className="flex flex-col w-full h-2/3 px-horizontalSm ">
        <div className="flex">
          <Tablist
            tablist={tabs}
            activeTab={searchManager.keyword ? '-1' : activeTab}
            onTabSelect={setActiveTab}
          />
          {searchManager.keyword ? (
            <SearchTab
              keyword={searchManager.keyword}
              onClose={searchManager.cancelSearch}
            />
          ) : null}
        </div>

        <div className="mt-4 min-h-10 w-[95%] gradient-container z-10"></div>
        <div className=" w-full overflow-x-hidden over mt-[-25px] ">
          <div className=" mt-10 pv-10 flex flex-col gap-[10px]">
            {searchManager.keyword ? (
              <SearchList />
            ) : activeTab == 'Holdings' ? (
              <Holdings user_addr={user.public_address} />
            ) : activeTab == 'Markets' ? (
              <Markets user_addr={user.public_address} />
            ) : activeTab == 'Watchlist' ? (
              <Watchlist user_addr={user.public_address} />
            ) : (
              <div className="flex flex-col items-center justify-center w-full min-h-[100px]">
                <PrimeFadeText classname=" text-[20px] ">
                  Coming Soon..
                </PrimeFadeText>
              </div>
            )}
          </div>
        </div>
        <div className="mt-[-25px] min-h-10 w-[95%] gradient-container-rev z-10"></div>
      </div>
    </div>
  );
}
