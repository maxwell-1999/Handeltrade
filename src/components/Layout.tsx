import { useState } from 'react';
import MemoAddMarkets from '../SVG/AddMarkets';
import MemoMarketListIcon from '../SVG/MarketListIcon';
import { useNavigate } from 'react-router-dom';
const Icons = [
  {
    page: 'app',
    name: 'MarketList',
    icon: <MemoMarketListIcon />,
  },
  {
    page: 'add',

    name: 'AddMarkets',
    icon: <MemoAddMarkets />,
  },
];
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeTab, setActiveTab] = useState(Icons[0].name);
  const navigate = useNavigate();
  return (
    <div className="flex flex-col  w-[100vw] h-[100vh]">
      <div className="flex-1 w-full container-height-fr">{children}</div>
      <div className="h-[50px] w-full flex justify-center gap-6 items-center  fixed bottom-0 left-0 text-2">
        {Icons.map((icon) => {
          return (
            <button
              key={icon.name}
              onClick={(e) => {
                navigate('/' + icon.page);
              }}
              className={activeTab == icon.name ? 'text-brand' : ''}
            >
              {icon.icon}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export { Layout };
