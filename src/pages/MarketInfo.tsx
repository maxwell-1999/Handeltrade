import axios from 'axios';
import { useParams } from 'react-router-dom';
import useSWR from 'swr';
import useDrawerState from '../atoms/drawerState';
import { MarketCard } from '../components/MarketCard';
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as emptyBookmark } from '@fortawesome/free-regular-svg-icons';
import toast from 'react-hot-toast';
import MarketActivityList from './MarketActivityList';
import PrimeFadeText from '../components/PrimeFadeText';
import PrimeText from '../components/PrimeText';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import { appConfig } from '../config';
import { bigIntToStringWithDecimal, viewDec } from '../Helpers/bigintUtils';
import MemoButtonLoader from '../components/ButtonLoader';

const tabs = ['Holders', 'Watchlisted By', 'Activity', 'Claimable'];

const MarketInfo: React.FC<any> = ({ }) => {
  const account = useAccount();
  const [userState] = useUserState();
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
    refreshInterval: 2000,
  });
  const drawerManager = useDrawerState();
  if (isLoading) return <ListLoader />;

  console.log(`MarketInfo-data: `, data);

  const handleAddToWatchlist = async () => {
    console.log('Add to watchlist');
    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/watchlist/add`,
      { ids: [data.id] },
      {
        headers: { 'session-id': userState?.session_id ?? '' },
      }
    );
    // console.log(`MarketInfo-res: `, res);
    if (!('error' in res.data)) {
      data.watchlisted = true;
      toast('Market added to watchlist');
      console.log('Added to watchlist');
    }
  };
  const handleRemoveFromWatchlist = async () => {
    console.log('Remove from watchlist');
    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/watchlist/remove`,
      { ids: [data.id] },
      {
        headers: { 'session-id': userState?.session_id ?? '' },
      }
    );
    if (!('error' in res.data)) {
      data.watchlisted = false;
      toast('Removed from watchlist');
      console.log('Removed from watchlist');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full overflow-hidden relative ">
      <div className="custom-bg-image absolute top-0 left-0 h-full w-full" />
      <div className="flex flex-col items-center w-full min-h-[75px] h-[12%] z-10 px-horizontalSm">
        {/* Market Card Goes here */}
        {data && <MarketCard market={data} preview />}

      </div>

      <div className="flex flex-col w-full h-[88%] ">
        {data?.on_chain || data?.shares ? (
          <div className="flex justify-between w-full px-4 ">
            <div className="flex gap-3">
              <PrimaryBtn
                onClick={() => protect(() => drawerManager.openBuyDrwer(data))}
                className="p-1 text-[white] text-[12px] w-[70px] h-fit min-w-fit font-semibold rounded-[4px] px-2"
              >
                Buy
              </PrimaryBtn>
              <SecondaryBtn
                onClick={() =>
                  protect(() => drawerManager.openSellDrawer(data))
                }
                className="p-1 text-[12px] w-[70px] font-semibold rounded-[4px] px-2 "
              >
                Sell
              </SecondaryBtn>
            </div>
            <div className="flex">
              {data && 'watchlisted' in data ? (
                data?.watchlisted ? (
                  <FontAwesomeIcon
                    height={30}
                    className="h-8 mr-4 cursor-pointer text-brand"
                    icon={solidBookmark}
                    onClick={() => handleRemoveFromWatchlist()}
                  />
                ) : (
                  <FontAwesomeIcon
                    height={30}
                    className="h-8 mr-4 cursor-pointer text-brand"
                    icon={emptyBookmark}
                    onClick={() => handleAddToWatchlist()}
                  />
                )
              ) : null}
            </div>
          </div>
        ) : (
          <PrimaryBtn
            onClick={() => protect(() => drawerManager.openBuyDrwer(data))}
            className="p-1 text-[white] text-[12px] w-[70px] h-fit min-w-fit font-semibold rounded-[4px] px-2"
          >
            Buy 1st Share
          </PrimaryBtn>
        )}
        <div className="my-2 mt-4 w-full px-4 ">
          <Tablist
            tablist={tabs}
            onTabSelect={seActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className=" w-full overflow-x-hidden  bg-brandGrey min-h-full pb-40 ">
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
    </div>
  );
};

export { MarketInfo };

const HoldersTab: React.FC<{ market: Market; }> = ({ market }) => {
  const { data, isLoading } = useSWR<User[]>('holders' + market.id, {
    fetcher: async () => {
      const results = await axios.get(
        `${import.meta.env.VITE_API_ENDPOINT
        }/market/market_holders_by_market_id/${market.market_id}/400/0`
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
        `${import.meta.env.VITE_API_ENDPOINT
        }/market/market_watchlisted_by_market_id/${market.market_id}/400/0`
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
        `${import.meta.env.VITE_API_ENDPOINT
        }/market/market_activities_by_market_id/${market.market_id}/400/0`
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

const ClaimMarketRewards: React.FC<{ market: Market; }> = ({ market }) => {
  const account = useAccount();
  const network = useNetwork();
  const symbol = network.chain?.nativeCurrency.symbol ?? "";
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
      <div className="flex flex-col gap-[10px] pt-[20px] pr-6 pl-6">

        <div className="flex flex-col bg-white p-4 rounded-[10px] ">
          <span className='font-semibold text-f14'>Collected Weekly Rewards</span>
          <span className='flex justify-between'>
            <PrimeFadeText classname=" text-[12px] text-2  ">
              {data[0]?.result
                ? viewDec(data[0].result, 18) +
                ' ' + symbol
                : '0.00 ' + symbol}
            </PrimeFadeText>
            <PrimaryBtn
              className={`p-1 text-[white] text-[12px] mr-2 w-[50px] h-fit min-w-fit font-semibold rounded-[4px] ${claimable(data[0]?.result) ? "" : "bg-2 cursor-not-allowed"}`}
              onClick={() => claimWeeklyRewards()}
            >
              <MemoButtonLoader className="scale-110 " loading={loadingRewards} />{' '}
              {loadingRewards ? "" : "Claim"}
            </PrimaryBtn>
          </span>
        </div>

        {/* Claim Reflection Card */}
        <div className="flex flex-col bg-white p-4 rounded-[10px] ">
          <span className='font-semibold text-f14'>Collected Reflection</span>
          <span className='flex justify-between'>
            <PrimeFadeText classname=" text-[12px] text-2 ">
              {data[1]?.result
                ? viewDec(data[1].result, 18) +
                ' ' + symbol
                : '0.00 ' + symbol}
            </PrimeFadeText>
            <PrimaryBtn
              className={`p-1 text-[white] text-[12px] mr-2 w-[50px] h-fit min-w-fit font-semibold rounded-[4px] ${claimable(data[1]?.result) ? "" : "bg-2 cursor-not-allowed"}`}
              onClick={() => claimReflection()}
            >
              <MemoButtonLoader className="scale-110 " loading={loadingReflection} />{' '}
              {loadingReflection ? "" : "Claim"}
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
