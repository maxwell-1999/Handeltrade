import { useEffect, useRef, useState } from 'react';
import MemoSearchIcon from '../SVG/SearchIcon';
import useSearchMarket from '../atoms/marketSearch';
import MemoSearchIconCompressed from '@/SVG/SearchIconCompressed';

const MarketSearchBar: React.FC<any> = ({}) => {
  const [isDivVisible, setIsVisible] = useState(true); // Initial visibility
  // useEffect(() => {
  //   console.log(`isDivVisible-c${isDivVisible}`);
  // }, [isDivVisible]);
  console.log(`MarketSearchBar-isDivVisible: `, isDivVisible);
  const prevPositions = useRef(0);
  // useEffect(() => {
  //   let prev = 0;
  //   const handleScroll = (e) => {
  //     const scrollPos = e.target.scrollTop;
  //     console.log(`MarketSearchBar-e.target: `, e.target);
  //     console.log(`MarketSearchBar-scrollPosd: `, scrollPos - prev);
  //     console.log(`MarketSearchBar-scrollPosd: `, scrollPos, prev);

  //     if (prev <= scrollPos) {
  //       setIsVisible(false);
  //     } else {
  //       setIsVisible(true);
  //     }
  //     // e.stopPropagation();
  //     prev = scrollPos;
  //   };

  //   window.addEventListener('scroll', handleScroll, true);

  //   // return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
  const searchManager = useSearchMarket();
  return (
    <div
      className={`bg-white px-[10px]  transition-all w-full h-[50px] rounded-[10px] flex items-center relative overflow-hidden justify-between pr-6 ${
        isDivVisible ? ' height-pop-up ' : 'height-pop-down'
      }`}
    >
      <div className=" z-[100]">
        <MemoSearchIcon className="z-10 ml-3" />
      </div>
      <input
        value={searchManager.keyword}
        placeholder="Search by Channel Name"
        onChange={(e) => searchManager.onSearch(e.target.value)}
        className="bg-white  z-[10] placeholder:font-[500] placeholder:text-2 text-f14 font-[500]  rounded-[10px]  outline-blue-600 absolute w-full h-full px-[50px] top-0 left-0"
      />
      {searchManager.keyword ? (
        <div
          className=" text-f14 z-[100] cursor-pointer"
          onClick={() => {
            searchManager.cancelSearch();
          }}
        >
          X
        </div>
      ) : null}
    </div>
  );
};

export { MarketSearchBar };
