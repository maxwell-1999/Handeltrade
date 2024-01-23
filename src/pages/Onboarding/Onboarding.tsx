import { useEffect, useState } from 'react';
import {
  Outlet,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom';
import { useAccount, useDisconnect, usePublicClient } from 'wagmi';
import { MarketListing } from '../MarketListing';
import { ShareManagementDrawer } from '../../components/ShareManagementDrawer';
import useUserState from '../../atoms/userState';
import useDrawerState from '../../atoms/drawerState';
import { Layout } from '../../components/Layout';

const Onboarding: React.FC<any> = ({}) => {
  const [userState] = useUserState();
  const navigate = useNavigate();

  // http://localhost:8080/?state=59329030020115325665465706775973340674651873217347183542172884748497542201816&code=4/0AfJohXlU20FoSZPRh_IsfC-zQaxwgGWO4eXJy2n-8xMYzTbONHNqdMAEZ4y_vBg9-tcM5Q&scope=https://www.googleapis.com/auth/youtube.readonly
  const [searchParam] = useSearchParams();
  const authorization = searchParam?.get('code');
  const marketId = searchParam?.get('state');
  const params = useParams();

  useEffect(() => {
    console.log('deb-claiming1:', marketId, authorization);
    if (marketId) {
      navigate(`/markets/${marketId}?code=${authorization}`);
    }
  }, [authorization, marketId, navigate]);
  if (params.marketid) {
    return <Outlet />;
  }
  return (
    <Layout>
      <div className="w-full h-full bg-2b">
        <MarketListing />
      </div>
    </Layout>
  );
};

export { Onboarding };
