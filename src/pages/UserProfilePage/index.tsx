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
import { useAccount, useDisconnect } from 'wagmi';
import useUserState from '../../atoms/userState';
import { LoginPage } from '../Web3auth/Web3AuthWithWagmi';
import { useParams } from 'react-router-dom';

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState('Holdings');
  const searchManager = useSearchMarket();
  const params = useParams();
  const myAccount = useAccount();
  const account = params.user_addr ? { address: params.user_addr } : myAccount;
  console.log({ UserProfilePageAc: account.address });
  if (!account.address) return <LoginPage />;
  return (
    <div className="flex flex-col items-center justify-center w-full h-full ">
      <LoginPage viewOnly />
      {/* creating a 1/3 height section for user details and 2/3 page section for user specific details  */}

      <UserCard />

      <div className="flex flex-col w-full h-2/3 px-horizontalSm ">
        <div className="flex">
          <Tablist
            tablist={tabs}
            activeTab={searchManager.keyword ? '-1' : activeTab}
            onTabSelect={setActiveTab}
          />
          {/* {searchManager.keyword ? (
            <SearchTab
              keyword={searchManager.keyword}
              onClose={searchManager.cancelSearch}
            />
          ) : null} */}
        </div>

        <div className="mt-4 min-h-10 w-[95%] gradient-container z-10"></div>
        <div className=" w-full overflow-x-hidden over mt-[-25px] ">
          <div className=" mt-10 pv-10 flex flex-col gap-[10px]">
            {activeTab == 'Holdings' ? (
              <Holdings user_addr={account.address} />
            ) : activeTab == 'Markets' ? (
              <Markets user_addr={account.address} />
            ) : activeTab == 'Watchlist' ? (
              <Watchlist user_addr={account.address} />
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
