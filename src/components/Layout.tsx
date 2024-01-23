import { useCallback, useEffect, useState } from 'react';
import MemoAddMarkets from '../SVG/AddMarkets';
import MemoMarketListIcon from '../SVG/MarketListIcon';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShareManagementDrawer } from './ShareManagementDrawer';
import useDrawerState from '../atoms/drawerState';
import { MobileDrawer } from './MobileDrawer';
import MemoProfileIcon from '../SVG/ProfileIcon';
import { AccountDropdown } from './AccountDropdown';
import { Tooltip } from 'react-tooltip';
import { useUserStateSync } from '../pages/Web3auth/Web3AuthWithWagmi';
import useEthPrice from '../atoms/ETHPrice';

const Icons = [
  {
    page: 'markets',
    name: 'MarketList',
    Icon: MemoMarketListIcon,
  },
  {
    page: 'add',
    name: 'AddMarkets',
    Icon: MemoAddMarkets,
  },
  {
    page: 'profile',
    name: 'profile',
    Icon: MemoProfileIcon,
  },
];
const isNestedRouteActive = (page: string) => {
  if (
    Icons.every(
      (d) => !window.location.href.toLowerCase().includes(d.page.toLowerCase())
    )
  ) {
    return page == Icons[0].page;
  }
  if (window.location.href.toLowerCase().includes(page.toLowerCase()))
    return true;
  return false;
};
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useUserStateSync();
  useEthPrice();
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(true);
  console.log(`Layout-isVisible: `, isVisible);
  const drawerManager = useDrawerState();
  // const ref = useCallback((node) => {
  //   let prev = 0;
  //   const handleScroll = () => {
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

  //   node.addEventListener('scroll', handleScroll);
  //   console.log(`Layout-node: `, node);

  //   return () => {
  //     node.removeEventListener('scroll', handleScroll);
  //   };
  // }, []);
  return (
    <>
      <div className="flex flex-shrink-0 h-[100vh] align-middle items-center justify-center ">
        <div className="flex flex-col responsive-layout  h-[100vh] ">
          <div className="w-full bg-[#eaebf0] h-[40px] items-center justify-between flex px-[10px]">
            <img className="w-[35px] h-[25px] " src="/Logo.svg" />
            <AccountDropdown />
          </div>
          <div className="flex-1 w-full container-height-fr bg-[#f6f7fc] overflow-x-hidden">
            {children}
          </div>
          {drawerManager.drawerState?.screen ? <MobileDrawer /> : null}

          <div className="h-[50px] w-full topborder bg-white flex justify-center tab-gap items-center  fixed bottom-0 left-0 text-2 ">
            {Icons.map((icon) => {
              return (
                <NavLink to={'/' + icon.page} key={icon.name}>
                  {({ isActive }) => (
                    <button
                      key={icon.name}
                      onClick={(e) => {
                        navigate('/' + icon.page);
                      }}
                      className={
                        isActive || isNestedRouteActive(icon.page)
                          ? 'text-brand'
                          : ''
                      }
                    >
                      <icon.Icon
                        active={isActive || isNestedRouteActive(icon.page)}
                      />
                    </button>
                  )}
                </NavLink>
              );
            })}
          </div>
        </div>
      </div>
      <Tooltip
        delayShow={1500}
        style={{
          backgroundColor: '#E5E7EB',
          color: '#8F95A4',
        }}
        id="tooltip"
      />
    </>
  );
};

export { Layout };
