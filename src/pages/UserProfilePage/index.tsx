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
  UserActivityTab,
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
    <div className="flex flex-col ">
      <LoginPage viewOnly />
      {/* creating a 1/3 height section for user details and 2/3 page section for user specific details  */}
      <div className="sticky top-0 flex flex-col items-center justify-center w-full px-horizontalSm bg-[#f6f7fc]">
        <UserCard />
        <div className="flex w-full pb-4">
          <Tablist
            tablist={tabs}
            activeTab={searchManager.keyword ? '-1' : activeTab}
            onTabSelect={setActiveTab}
          />
        </div>
      </div>

      <div className=" flex flex-col gap-[10px] px-horizontalSm">
        {activeTab == 'Holdings' ? (
          <Holdings user_addr={account.address} />
        ) : activeTab == 'Markets' ? (
          <Markets user_addr={account.address} />
        ) : activeTab == 'Watchlist' ? (
          <Watchlist user_addr={account.address} />
        ) : activeTab == 'Activities' ? (
          <UserActivityTab user_addr={account.address} />
        ) : null}
      </div>
    </div>
  );
}
