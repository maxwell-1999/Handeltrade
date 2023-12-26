import { useState } from 'react';
import { MarketSearchBar } from '../components/MarketSearchBar';
import { SearchTab, Tablist } from '../components/Tablist';
import { MarketList } from '../components/MarketList';
import useSearchMarket from '../atoms/marketSearch';
import axios from 'axios';
import useSWR from 'swr';
import { ListLoader } from '../components/ListLoader';
const tabs = ['New', 'Top', 'Mine'];
const mockData = [
  {
    id: 18,
    market_id:
      '103814191707675566059061859297779448474680070491377500811164050688264588161637',
    social_platform: 'youtube',
    social_handle: 'StudyGlows',
    creator_addr: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    img_url:
      'https://yt3.ggpht.com/sZ7ML82fcVAyW7FlaFcbBiRQSDeY-rjfwWB7khgGXRXBYnyk6teEzUqIYxx-2YZduT2b4uOP=s88-c-k-c0xffffffff-no-rj-mo',
    name: 'Study Glows',
    description:
      'Study Glows Education is a knowledge platform trusted by millions of people across the globe. Study Glows provides quality ...',
    on_chain: true,
    created_at: '1702907410',
    updated_at: '1702907429',
    buyPrice: '275000000000000',
    lastUpdated: '1702980946',
    sellPrice: '56250000000000',
    shares: '2000000000000000000',
  },
  {
    id: 17,
    market_id:
      '59505095757614236916991811845044959958742645496879701893391445174609797199759',
    social_platform: 'youtube',
    social_handle: 'WorldAffairsUnacademy',
    creator_addr: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    img_url:
      'https://yt3.ggpht.com/k5Lj-iJQyPZDtqO1yJJCgTWP8V8O6Rd3ktM5OkFEz7fDm0aTgsy7PJs7AUUSPMflxlTz9G92=s88-c-k-c0xffffffff-no-rj-mo',
    name: 'World Affairs by Unacademy',
    description:
      '2.2 Billion+ Views with 136M+ watch hours in just 3 years! Welcome to the World Affairs YouTube channel from Unacademy.',
    on_chain: true,
    created_at: '1702904959',
    updated_at: '1702906581',
    buyPrice: '68750000000000',
    lastUpdated: '1702905282',
    sellPrice: '0',
    shares: '1000000000000000000',
  },
  {
    id: 19,
    market_id:
      '95601233336418901654533434234596324890746108155604417990381616834191314903420',
    social_platform: 'youtube',
    social_handle: 'ThinkSchool',
    creator_addr: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    img_url:
      'https://yt3.ggpht.com/nTK6AFZrpjDHKNIHq0zqjkWCs3jm9ttQBAGOfIui0zlz_gQzeqAIOtQKfzbSUIA0Mu15HBDfCg=s88-c-k-c0xffffffff-no-rj-mo',
    name: 'Think School',
    description:
      'The Indian education system is messed up and everyone knows about it. But very few are doing something to fix it.Think School is ...',
    on_chain: true,
    created_at: '1702977240',
    updated_at: '1702984725',
    buyPrice: '275000000000000',
    lastUpdated: '1702987207',
    sellPrice: '56250000000000',
    shares: '2000000000000000000',
  },
  {
    id: 20,
    market_id:
      '69303003455985748943941412638780202731250964504169953424255387542801626870936',
    social_platform: 'youtube',
    social_handle: 'ABPNEWS',
    creator_addr: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    img_url:
      'https://yt3.ggpht.com/ytc/AIf8zZQaUYzZVtZ9_l_g6bnCbIaDt1YQobarbMIXUHZ9RE0=s88-c-k-c0xffffffff-no-rj-mo',
    name: 'ABP NEWS',
    description:
      'ABP News is a news hub that provides you with comprehensive up-to-date Hindi news coverage from all over India and World.',
    on_chain: true,
    created_at: '1702977240',
    updated_at: '1702984734',
    buyPrice: '68750000000000',
    lastUpdated: '1702984731',
    sellPrice: '0',
    shares: '1000000000000000000',
  },
  {
    id: 21,
    market_id:
      '84299821779304640580306569843196866897592860261689098021274536129923439436774',
    social_platform: 'youtube',
    social_handle: 'PujyaRajanJee,,',
    creator_addr: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    img_url:
      'https://yt3.ggpht.com/ytc/AIf8zZSmupU1GSkAgm88ARa4_DnMNFfpGomtKgEt_iyz-v8=s88-c-k-c0xffffffff-no-rj-mo',
    name: 'Pujya Rajan Jee',
    description:
      "Welcome to Pujya Rajan Jee's Official Youtube Channel. The purpose of this Channel is to Deliver Shri Ram Katha, Sunderkand ...",
    on_chain: true,
    created_at: '1702977240',
    updated_at: '1702984820',
    buyPrice: '68750000000000',
    lastUpdated: '1702984816',
    sellPrice: '0',
    shares: '1000000000000000000',
  },
  {
    id: 23,
    market_id:
      '37673711086290232199422293871407079026279979313649223395818686683757684294168',
    social_platform: 'youtube',
    social_handle: 'GoogleDevelopers',
    creator_addr: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    img_url:
      'https://yt3.ggpht.com/vY3uYs71A_JwVcigyd2tVRHwuj05_cYktQSuzRCxta-9VFxHFtKjGrwG9WFi8ijXITBL3CwPQQ=s88-c-k-c0xffffffff-no-rj-mo',
    name: 'Google for Developers',
    description:
      'Subscribe to join a community of creative developers and learn the latest in Google technology — from AI and cloud, to mobile ...',
    on_chain: true,
    created_at: '1702977240',
    updated_at: '1702988521',
    buyPrice: '68750000000000',
    lastUpdated: '1702987195',
    sellPrice: '0',
    shares: '1000000000000000000',
  },
  {
    id: 24,
    market_id:
      '69594197611644279905328692062253867967553000746314955244751437196822746630185',
    social_platform: 'youtube',
    social_handle: 'KLBROBijuRithvik1',
    creator_addr: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    img_url:
      'https://yt3.ggpht.com/vE91xsp1AvG_f7i0NFvv2U_mVT1_rz6o0l8GwuPPgPjujXd3Cs5VCyTMHE0hiQrXBZu4-m8E360=s88-c-k-c0xffffffff-no-rj-mo',
    name: 'KL BRO Biju Rithvik',
    description: 'കണ്ണൂർക്കാരനും കന്നടക്കാരിയും അമ്മയും അനുമോളും അങ്കിയും ...',
    on_chain: true,
    created_at: '1702977240',
    updated_at: '1702988531',
    buyPrice: '68750000000000',
    lastUpdated: '1702988527',
    sellPrice: '0',
    shares: '1000000000000000000',
  },
  {
    id: 25,
    market_id:
      '1731068518433594129307446933270445365671399841491085632026927446422210204116',
    social_platform: 'youtube',
    social_handle: 'CineDesi',
    creator_addr: '0x8c6b7cc652343e6a4b6caf7f474a27d6cf8f19ef',
    img_url:
      'https://yt3.ggpht.com/USESEN-1OiiM23iGSG6F-qNnYI4i6FjArpBO_Oshf-qKhl1yURwnBzTot1A4eJ4XWmV6aXAx=s88-c-k-c0xffffffff-no-rj-mo',
    name: 'CineDesi',
    description:
      'Trailer reaction-discussions, movie reaction-discussions, movie reviews, live streams and vlogs. Please email our brand manager ...',
    on_chain: true,
    created_at: '1702977240',
    updated_at: '1703143145',
    buyPrice: '68750000000000',
    lastUpdated: '1702990349',
    sellPrice: '0',
    shares: '1000000000000000000',
  },
];
const MarketListing: React.FC<any> = ({}) => {
  const [activeTab, setActiveTab] = useState('Top');
  const searchManager = useSearchMarket();
  return (
    <div className="px-[20px] flex flex-col gap-[10px]">
      <MarketSearchBar />
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
      {searchManager.keyword ? (
        <SearchList />
      ) : activeTab == 'New' ? (
        <New />
      ) : activeTab == 'Top' ? (
        <Top />
      ) : (
        <Mine />
      )}
    </div>
  );
};

export { MarketListing };
const marketsRefreshInterval = 3000;
const New = () => {
  const { data, isLoading } = useSWR<Market[]>('dd', {
    fetcher: async () => {
      const results = await axios.get(
        'https://api-production-4b67.up.railway.app/market/list/new/400/0'
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketListing-data: `, data);

  return <MarketList markets={data} />;
};
const Top = () => {
  const { data, isLoading } = useSWR<Market[]>('ddd', {
    fetcher: async () => {
      const results = await axios.get(
        'https://api-production-4b67.up.railway.app/market/list/top/400/0'
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;

  console.log(`MarketListing-data:dd `, data);

  return <MarketList markets={data} />;
};
const Mine = () => {
  const { data, isLoading } = useSWR<Market[]>('dddd', {
    fetcher: async () => {
      const results = await axios.get(
        'https://api-production-4b67.up.railway.app/market/list/my/0x8c6b7Cc652343e6a4B6CaF7F474A27D6cF8F19Ef/400/0'
      );
      return results.data.data as Market[];
    },
    refreshInterval: marketsRefreshInterval,
  });
  if (isLoading) return <ListLoader />;
  console.log(`MarketListing-data: `, data);

  return <MarketList markets={data} />;
};
const SearchList = () => {
  const searchManager = useSearchMarket();
  if (searchManager.loading) return <ListLoader />;
  console.log(`MarketListing-searchManager.markets: `, searchManager.markets);

  return <MarketList markets={searchManager.markets} />;
};
