import { useState } from 'react';
import MemoSearchIcon from '../SVG/SearchIcon';

const MarketSearchBar: React.FC<any> = ({}) => {
  const [value, setValue] = useState('');
  return (
    <div className="bg-3b w-full h-[50px] rounded-[10px] flex items-center">
      <MemoSearchIcon />
      <input
        value={value}
        placeholder="Search by Channel Name"
        className="bg-transparent  placeholder:text-2 text-f14 font-[500]"
      />
    </div>
  );
};

export { MarketSearchBar };
