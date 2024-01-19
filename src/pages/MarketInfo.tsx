import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import useDrawerState from '../atoms/drawerState';
import { useEffect, useMemo, useState } from 'react';
import { Tablist } from '../components/Tablist';
import { PrimaryBtn, SecondaryBtn } from '../components/Buttons';
import { ListLoader } from '../components/ListLoader';
import { marketsRefreshInterval } from './MarketListing';
import { useProtection } from '../Helpers/useProtection';
import { UserCardList } from '../components/UserCardList';
import {
  useAccount,
  useContractReads,
  useContractWrite,
  useNetwork,
  usePublicClient,
} from 'wagmi';
import useUserState from '../atoms/userState';
import toast from 'react-hot-toast';
import MarketActivityList from './MarketActivityList';
import PrimeFadeText from '../components/PrimeFadeText';
import { appConfig } from '../config';
import { viewDec } from '../Helpers/bigintUtils';
import MemoButtonLoader from '../components/ButtonLoader';
import { MarketInfoCard } from './MarketInfoCard';
import { RewardCard } from './RewardCard';
const rew = {
  minFeesClaimThreshold: BigInt(2e12),
  dividends: BigInt(1e14),
  rewards: BigInt(1e13),
  balanceOf: BigInt(3e18),
};
const tabs = ['Holders', 'Watchlisted By', 'Activity'];
const offlineData = {
  message: 'Market page found',
  data: {
    id: 62,
    rank: 5,
    market_id:
      '59505095757614236916991811845044959958742645496879701893391445174609797199759',
    social_platform: 'youtube',
    social_handle: 'worldaffairsunacademy',
    creator_addr: '0x241023ebbcb2eb945e467b38506ea41450cdc7b7',
    img_url:
      'https://yt3.ggpht.com/k5Lj-iJQyPZDtqO1yJJCgTWP8V8O6Rd3ktM5OkFEz7fDm0aTgsy7PJs7AUUSPMflxlTz9G92=s88-c-k-c0x00ffffff-no-rj',
    name: 'World Affairs by Unacademy',
    description:
      '2.4 Billion+ Views with 142M+ watch hours in just 3 years!\n\nWelcome to the World Affairs YouTube channel from Unacademy.\nThis platform is the one-stop solution that gives you the best insight on how to prepare various topics on Current Affairs for competitive exams.\n\nEvery day we provide insightful knowledge on International Affairs to keep our learners transcending traditional boundaries of education through critical thinking to prepare for Civil Service Examinations.\n\nUnacademy platform has the best educators from all over the country, who take live classes daily.\nSubscribe to our channel to push your limits!\n\n',
    on_chain: true,
    claimed: false,
    created_at: '1704293552',
    updated_at: '1704463802',
    buyPrice: '618750000000000',
    lastUpdated: '1704472004',
    sellPrice: '225000000000000',
    shares: '3000000000000000000',
    statistics: {
      viewCount: '2420990721',
      subscriberCount: '3760000',
      hiddenSubscriberCount: false,
      videoCount: '3945',
    },
  },
};
const MarketInfo: React.FC<any> = ({}) => {
  const account = useAccount();
  const [userState] = useUserState();
  console.log(`MarketInfo-userState: `, userState);
  const params = useParams();
  const [protect] = useProtection();

  const [activeTab, seActiveTab] = useState(tabs[0]);
  const { data, error, isLoading } = useSWR(params.marketid, {
    fetcher: async (marketid) => {
      const res = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT}/market/market_id/${marketid}`,
        { headers: { 'session-id': userState?.session_id ?? '' } }
      );
      return res.data.data;
    },
    refreshInterval: 1000,
  });

  const drawerManager = useDrawerState();
  if (isLoading) return <ListLoader className="mt-7 px-7" />;

  console.log(`MarketInfo-data: `, data);

  console.log(`MarketInfo-userState?.session_id: `, userState?.session_id);

  return (
    <div className="relative flex flex-col items-center w-full h-full overflow-auto ">
      {/* <div className="absolute top-0 left-0 w-full h-full bg-2b" /> */}
      <div className="sticky top-0 flex flex-col items-start w-full gap-1 px-horizontalSm bg-2b ">
        {/* Market Card Goes here */}
        {data && <MarketInfoCard market={data} preview />}
        {data && data?.buyPrice && <RewardCard rewards={rew} market={data} />}
        <Tablist
          className="mb-3"
          tablist={tabs}
          onTabSelect={seActiveTab}
          activeTab={activeTab}
        />
      </div>

      {data.id ? (
        <div className="flex flex-col w-full ">
          <div className="w-full min-h-full pb-3 bg-brandGrey">
            <div className="flex flex-col gap-[10px]">
              {/* all tabs data goes here   */}
              {activeTab == 'Holders' ? (
                <HoldersTab market={data} />
              ) : activeTab == 'Watchlisted By' ? (
                <WatchListedByTab market={data} />
              ) : activeTab == 'Activity' ? (
                <MarketActivityTab market={data} />
              ) : (
                <ClaimMarketRewards market={data} />
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export { MarketInfo };

const HoldersTab: React.FC<{ market: Market }> = ({ market }) => {
  const { data, isLoading } = useSWR<User[]>('holders' + market.id, {
    fetcher: async () => {
      const results = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/market/market_holders_by_market_id/${market.market_id}/400/0`
      );
      return results.data.data as User[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader className="px-7" />;
  console.log(`MarketInfo-data: `, data);

  return (
    <div>
      <UserCardList users={data ?? []} />
    </div>
  );
};

const WatchListedByTab: React.FC<{ market: Market }> = ({ market }) => {
  const { data, isLoading } = useSWR<User[]>('watchlistedBy' + market.id, {
    fetcher: async () => {
      const results = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/market/market_watchlisted_by_market_id/${market.market_id}/400/0`
      );
      return results.data.data as User[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader className="px-7" />;
  console.log(`MarketWatchlistedBy-data: `, data);

  return (
    <div>
      <UserCardList users={data ?? []} />
    </div>
  );
};

const MarketActivityTab: React.FC<{ market: Market }> = ({ market }) => {
  const { data, isLoading } = useSWR<any>('MarketActivity' + market.id, {
    fetcher: async () => {
      const results = await axios.get(
        `${
          import.meta.env.VITE_API_ENDPOINT
        }/market/market_activities_by_market_id/${market.market_id}/400/0`
      );
      return results.data;
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader className="px-7" />;
  console.log(`MarketActivity-data: `, data);
  const userAddrMap = data.refData;

  return (
    <div>
      <MarketActivityList userAddrMap={userAddrMap} data={data.data} />
    </div>
  );
};

const ClaimMarketRewards: React.FC<{ market: Market }> = ({ market }) => {
  const account = useAccount();
  const network = useNetwork();
  const symbol = network.chain?.nativeCurrency.symbol ?? '';
  const [loadingRewards, setLoadingRewards] = useState(false);
  const [loadingReflection, setLoadingReflection] = useState(false);

  const { data } = useContractReads({
    contracts: [
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'checkEarnedRewards',
        args: [market?.market_id, account?.address],
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'dividendsOf',
        args: [market?.market_id, account?.address],
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'minFeesClaimThreshold',
        args: [],
      },
    ],
  });

  const claimable = (earned: BigInt): boolean => {
    if (data && data.length && data[2]?.result) {
      const minFeesClaimThreshold = data[2]?.result;
      if (earned > minFeesClaimThreshold) {
        return true;
      }
    }
    return false;
  };

  const { waitForTransactionReceipt } = usePublicClient();
  const { writeAsync: claimRewardAsync } = useContractWrite({
    address: appConfig.handelTradeAddress,
    abi: HandleTradeAbi,
    functionName: 'claimRewards',
  });
  const { writeAsync: claimReflectionAsync } = useContractWrite({
    address: appConfig.handelTradeAddress,
    abi: HandleTradeAbi,
    functionName: 'claimReflectionFees',
  });

  const claimWeeklyRewards = async () => {
    if (!market?.market_id || !account?.address) return;
    setLoadingRewards(true);

    const argPack = {
      args: [market?.market_id, account?.address],
    };
    const { hash } = await claimRewardAsync(argPack);
    const { status: completionStatus } = await waitForTransactionReceipt({
      hash,
    });

    data[0].result = BigInt(0);
    setLoadingRewards(false);
    console.log(`handel-ClaimReward:completionStatus: `, completionStatus);
    toast.success('Rewards claimed');
  };

  const claimReflection = async () => {
    if (!market?.market_id || !account?.address) return;
    setLoadingReflection(true);
    const argPack = {
      args: [market?.market_id, account?.address],
    };
    const { hash } = await claimReflectionAsync(argPack);
    const { status: completionStatus } = await waitForTransactionReceipt({
      hash,
    });

    data[1].result = BigInt(0);
    setLoadingReflection(false);
    console.log(`handel-ClaimReflection:completionStatus: `, completionStatus);
    toast.success('Reflection claimed');
  };

  if (!data || data.length == 0) return <ClaimableLoading />;
  console.log({ data });

  return (
    <div>
      <div className="flex flex-col gap-[10px]  pr-6 pl-6">
        <div className="flex flex-col bg-white p-4 rounded-[10px] ">
          <span className="font-semibold text-f14">
            Collected Weekly Rewards
          </span>
          <span className="flex justify-between">
            <PrimeFadeText classname=" text-[12px] text-2  ">
              {data[0]?.result
                ? viewDec(data[0].result, 18) + ' ' + symbol
                : '0.00 ' + symbol}
            </PrimeFadeText>
            <PrimaryBtn
              className={`p-1 text-[white] text-[12px] mr-2 w-[50px] h-fit min-w-fit font-semibold rounded-[4px] ${
                claimable(data[0]?.result) ? '' : 'bg-2 cursor-not-allowed'
              }`}
              onClick={() => claimWeeklyRewards()}
            >
              <MemoButtonLoader
                className="scale-110 "
                loading={loadingRewards}
              />{' '}
              {loadingRewards ? '' : 'Claim'}
            </PrimaryBtn>
          </span>
        </div>

        {/* Claim Reflection Card */}
        <div className="flex flex-col bg-white p-4 rounded-[10px] ">
          <span className="font-semibold text-f14">Collected Reflection</span>
          <span className="flex justify-between">
            <PrimeFadeText classname=" text-[12px] text-2 ">
              {data[1]?.result
                ? viewDec(data[1].result, 18) + ' ' + symbol
                : '0.00 ' + symbol}
            </PrimeFadeText>
            <PrimaryBtn
              className={`p-1 text-[white] text-[12px] mr-2 w-[50px] h-fit min-w-fit font-semibold rounded-[4px] ${
                claimable(data[1]?.result) ? '' : 'bg-2 cursor-not-allowed'
              }`}
              onClick={() => claimReflection()}
            >
              <MemoButtonLoader
                className="scale-110 "
                loading={loadingReflection}
              />{' '}
              {loadingReflection ? '' : 'Claim'}
            </PrimaryBtn>
          </span>
        </div>

        <div className="flex flex-row-reverse text-1">
          Minimum claimable {viewDec(data[2]?.result, 18)}*
        </div>
      </div>
    </div>
  );
};

const ClaimableLoading: React.FC = () => {
  return <div className="p-2">Loading...</div>;
};
