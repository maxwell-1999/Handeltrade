import { useState } from 'react';
import MemoAddMarkets from '../SVG/AddMarkets';
import MemoMarketListIcon from '../SVG/MarketListIcon';
import { NavLink, useNavigate } from 'react-router-dom';
import { ShareManagementDrawer } from './ShareManagementDrawer';
import useDrawerState from '../atoms/drawerState';
import { MobileDrawer } from './MobileDrawer';
import MemoProfileIcon from '../SVG/ProfileIcon';
import { AccountDropdown } from './AccountDropdown';
const Icons = [
  {
    page: 'markets',
    name: 'MarketList',
    icon: <MemoMarketListIcon />,
  },
  {
    page: 'add',
    name: 'AddMarkets',
    icon: <MemoAddMarkets />,
  },
  {
    page: 'profile',
    name: 'profile',
    icon: <MemoProfileIcon />,
  },
];
const isNestedRouteActive = (page: string) => {
  console.log(`Layout-window.location.href: `, window.location.href, page);
  if (window.location.href.toLowerCase().includes(page.toLowerCase()))
    return true;
  return false;
};
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(Icons[0].name);
  const navigate = useNavigate();
  const drawerManager = useDrawerState();
  return (
    <div className="flex flex-col  w-[100vw] h-[100vh]">
      <div className="w-full bg-[#eaebf0] h-[40px] items-center justify-between flex px-[10px]">
        <img className="w-[35px] h-[25px] " src="Logo.svg" />
        <AccountDropdown />
      </div>
      <div className="flex-1 w-full container-height-fr">{children}</div>
      {drawerManager.drawerState?.screen ? <MobileDrawer /> : null}

      <div className="h-[50px] w-full flex justify-center gap-[40px] items-center  fixed bottom-0 left-0 text-2 ">
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
                  {icon.icon}
                </button>
              )}
            </NavLink>
          );
        })}
      </div>
    </div>
  );
};

export { Layout };
