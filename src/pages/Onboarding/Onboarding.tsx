import { useEffect, useState } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';
import { useAccount, useDisconnect, usePublicClient } from 'wagmi';
import { MarketListing } from '../MarketListing';
import { ShareManagementDrawer } from '../../components/ShareManagementDrawer';
import useUserState from '../../atoms/userState';
import useDrawerState from '../../atoms/drawerState';
import { Layout } from '../../components/Layout';

const Onboarding: React.FC<any> = ({}) => {
  const { disconnect } = useDisconnect();
  const { address } = useAccount();
  const { waitForTransactionReceipt } = usePublicClient();
  const [userState] = useUserState();
  const [item, setItem] = useState();
  const navigate = useNavigate();
  const drawerManager = useDrawerState();
  useEffect(() => {
    console.log(`Onboarding-userState: `, userState);
  }, [userState]);
  const params = useParams();
  console.log(`Onboarding-params: `, params);
  if (params?.marketid) {
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
