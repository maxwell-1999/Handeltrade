import { useState } from 'react';
import MemoSearchIcon from '../SVG/SearchIcon';
import useSearchMarket from '../atoms/marketSearch';

const MarketSearchBar: React.FC<any> = ({}) => {
  const [value, setValue] = useState('');
  const searchManager = useSearchMarket();
  return (
    <div className="bg-3b w-full h-[50px] rounded-[10px] flex items-center relative overflow-hidden justify-between pr-6">
      <MemoSearchIcon />
      <input
        value={searchManager.keyword}
        placeholder="Search by Channel Name"
        onChange={(e) => searchManager.onSearch(e.target.value)}
        className="bg-transparent  placeholder:text-2 text-f14 font-[500]  rounded-[10px]  outline-blue-600 absolute w-full h-full px-[50px] top-0 left-0"
      />
      {searchManager.keyword ? (
        <div
          className="bg-[red] h-[50px] w-[50px]"
          onClick={() => searchManager.cancelSearch()}
        >
          X
        </div>
      ) : null}
    </div>
  );
};

export { MarketSearchBar };
