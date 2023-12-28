import { useEffect, useState } from 'react';
import MemoTwitterLogo from '../SVG/TwitterLogo';
import axios from 'axios';
import { ListLoader } from '../components/ListLoader';
import { MarketList } from '../components/MarketList';
import MemoSearchIcon from '../SVG/SearchIcon';
import { useProtection } from '../Helpers/useProtection';
import MemoYoutubeLogo from '../SVG/YoutubeLogo';
import MemoSearchIconCompressed from '../SVG/SearchIconCompressed';
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
          'https://api-production-4b67.up.railway.app/market/create',
          {
            social_platform: Platform.Youtube,
            social_handle: value,
          }
        );
        console.log(`MarketCreation-result.data.data: `, result.data.data);
        setMarkets(result.data.data);
      } catch (e) {
        setMarkets('err');
      }
      setLoading(false);
    });
  };
  console.log(`MarketCreation-markets: `, markets);
  return (
    <div className="flex flex-col items-center justify-end h-full bg-brand">
      <div className="flex flex-col items-center h-[70%] gap-[20px] bg-white w-full rounded-t-[20px] p-[30px]">
        <div className="text-lg font-bold">Create new Market</div>
        <div className="w-full text-center text-f12 text-2 ">
          Use your Twitter, Email, or Phone as your personal crypto wallet
          without the complexity. Let anyone send you tokens via your social
          handle.
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
              className=" text-f14 z-[100] bg-brand w-fit h-fit px-3 py-3 rounded-[12px]"
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
            'No markets Found'
          ) : markets.length ? (
            <MarketList markets={markets} />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export { MarketCreation };
