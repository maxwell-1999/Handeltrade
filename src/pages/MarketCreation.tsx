import { useEffect, useState } from 'react';
import MemoTwitterLogo from '../SVG/TwitterLogo';
import axios from 'axios';
import { ListLoader } from '../components/ListLoader';
import { MarketList } from '../components/MarketList';
import MemoSearchIcon from '../SVG/SearchIcon';
import { useProtection } from '../Helpers/useProtection';
import MemoYoutubeLogo from '../SVG/YoutubeLogo';
import MemoSearchIconCompressed from '../SVG/SearchIconCompressed';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { Layout } from '../components/Layout';
import toast from 'react-hot-toast';
export const Platform = {
  Youtube: 'youtube',
};

const MarketCreation: React.FC<any> = ({}) => {
  const [value, setValue] = useState('');
  const [protect] = useProtection();
  const [markets, setMarkets] = useState<Market[] | 'err'>([]);
  const [loading, setLoading] = useState(false);
  console.log(`MarketCreation-loading: `, loading);
  const fetchMarketStatus = async () => {
    protect(async () => {
      setLoading(true);
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_ENDPOINT}/market/create`,
          {
            social_platform: Platform.Youtube,
            social_handle: value,
          }
        );
        console.log(`MarketCreation-result.data.data: `, result.data.data);
        setMarkets(result.data.data ?? []);
        if (!result.data.data.length) {
          setMarkets('err');
          toast.error(`No channel or market named "${value}"`);
        }
      } catch (e) {
        setMarkets('err');
      }
      setLoading(false);
    });
  };
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    if (keyword) {
      setValue(keyword);
    }
  }, [searchParams]);
  const handleDeleteParam = (paramName: string) => {
    searchParams.delete(paramName);
    setSearchParams(searchParams);

    // Use navigate to replace the current URL with the updated one
    navigate({ search: searchParams.toString() }, { replace: true });
  };
  useEffect(() => {
    const keyword = searchParams.get('keyword');
    setMarkets([]);

    if (value && keyword) {
      fetchMarketStatus();
      handleDeleteParam('keyword');
      // window.location.href = window.location.origin + window.location.pathname;
    }
  }, [value, searchParams]);

  return (
    <Layout>
      <div className="relative flex flex-col items-center justify-end h-full">
        <div className="absolute top-0 left-0 w-full h-full custom-bg-image bg-lightBrand" />
        <div className="flex flex-col items-center h-[70%] gap-[20px] bg-white w-full rounded-t-[20px] p-[30px]">
          <div className="text-lg font-bold">Create new Market</div>
          <div className="w-full text-center text-f12 text-2 ">
            Add a new YouTube channel and receive the 1st share at 0 price.
            Being the 1st shareholder you get to earn reflections on every
            buy/sell and earn yield if the youtube channel is among top
            performers.
          </div>
          <div className="flex items-center w-full bg-3b  h-[50px] rounded-[10px] px-6 pr-4">
            <div className="w-[29px] h-[24px]">
              <MemoYoutubeLogo />
            </div>
            <div className="ml-3 mr-2 text-lg font-bold">@</div>
            <form
              className="w-full"
              onSubmit={(e) => {
                e.preventDefault();
                fetchMarketStatus();
              }}
            >
              <input
                value={value}
                onSubmit={fetchMarketStatus}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Channel Name"
                className="bg-transparent px-3 z-[10]   outline-[transperent] outline-[0px] border-[0px] text-md border-[transperent]  placeholder:text-2 font-[500]  rounded-[10px]   w-full h-full"
              ></input>
            </form>
            {value ? (
              <div
                className=" text-f14 z-[10] bg-brand w-fit h-fit px-3 py-3 rounded-[12px]"
                onClick={() => {
                  fetchMarketStatus();
                }}
              >
                <MemoSearchIconCompressed />
              </div>
            ) : null}
          </div>
          <div className="flex flex-col w-full">
            {loading ? (
              <ListLoader />
            ) : markets == 'err' ? (
              `No markets named "${value}"`
            ) : markets.length ? (
              <MarketList markets={markets} />
            ) : null}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export { MarketCreation };
