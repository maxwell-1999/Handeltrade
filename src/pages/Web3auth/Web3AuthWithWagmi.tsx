// WAGMI Libraries
import { createConfig, configureChains, useAccount, useConnect } from 'wagmi';
import { arbitrumGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Web3AuthConnectorInstance from './Web3AuthConnectorInstance';
import { ErrorPage } from '../../components/ErrorPage';
import { PrimaryBtn } from '../../components/Buttons';
import { useEffect, useState } from 'react';
import { registerUser, getUserData } from '../../Helpers/register';
import useUserState from '../../atoms/userState';
import useDrawerState from '../../atoms/drawerState';
import { formatAddress } from '../../Helpers/web3utils';
import { useRecoilState } from 'recoil';
import { firebaseNotificationForMarketAtom } from '@/atoms/firebaseState';

// Configure chains & providers with the Public provider.

const LoginPage: React.FC<{ viewOnly?: boolean; }> = ({ viewOnly }) => {
  const { address, connector, isConnected } = useAccount();
  const [, setFirebaseNotification] = useRecoilState(firebaseNotificationForMarketAtom);
  const { connect, connectors } = useConnect();
  const [loginLoading, setLoginLoading] = useState<null | string>('');
  const [userState, setUserState] = useUserState();
  const drawerManagement = useDrawerState();
  console.log(`Web3AuthWithWagmi-userState: `, userState);

  useEffect(() => {
    if (userState == null && loginLoading == 'registering' && isConnected && connector && address) {
      const getUserInfo = async () => {
        try {
          console.log('create-deb flow-deb-settinguser');
          const userInfo = await registerUser(connector, address);
          console.log(`create-deb  res: `, userInfo);
          setUserState(userInfo?.data);
        } catch (e) {
          console.log(`Web3AuthWithWagmi-e: `, e);
        }
      };
      getUserInfo();
    }
  }, [loginLoading, connector, address]);

  useEffect(() => {
    console.log(`create-deb fcreate-deb  low-deb-getting-user-data: `);

    if (address) {
      const getUserInfo = async () => {
        setLoginLoading('fetching');
        console.log(`create-deb fcreate-deb  low-deb-getting-user-data: `);

        const userInfo = await getUserData(address);
        console.log(`create-deb Web3AuthWithWagmi-userInfo: `, userInfo);

        if (typeof userInfo?.message || !userInfo) {
          console.log(`create-deb  flow-deb-getting-no-user-found: `, userInfo);
          setLoginLoading('registering');
        } else {
          console.log(`flow-deb-user-found: `, userInfo);
          setUserState(userInfo.data.data);
          setFirebaseNotification(new Set(userInfo.data.data?.topics));
          setLoginLoading(null);
        }
      };
      getUserInfo();
    }
  }, [address]);


  if (!connectors?.length) {
    return <ErrorPage>No Connectors found</ErrorPage>;
  }

  const login = () => {
    setLoginLoading('oauth');
    connect({ connector: connectors[0] });
  };
  if (viewOnly) return null;

  return (
    <div className="flex flex-col items-center justify-center w-full h-full p-3">
      <img className="w-[200px] h-[150px] mb-5" src="/Logo.svg" />
      <div className="font-bold text-1 text-[20px]">HANDEL.NETWORK</div>
      <div className="font-semibold text-2 text-f14">
        {userState ? (
          <>
            We recomment atleast 0.01 ETH in your Account :{' '}
            <a
              href={`https://goerli.basescan.org/address/${userState.public_address}`}
              className="underline text-brand"
              target="_blank"
            >
              {formatAddress(userState.public_address)}
            </a>
          </>
        ) : (
          'Buy and Sell social profiles on chain'
        )}
      </div>
      {userState ? (
        <PrimaryBtn
          className="mt-[20px] active:translate-y-2 transition-transform"
          onClick={() => drawerManagement.closeLoginDrawer()}
        >
          Understood
        </PrimaryBtn>
      ) : (
        <PrimaryBtn
          className="mt-[20px] active:translate-y-2 min-w-[70%] w-[70%] max-w-[70%] transition-transform"
          onClick={login}
        >
          Login
        </PrimaryBtn>
      )}
    </div>
  );
};

// Pass client to React Context Provider

export { LoginPage };

export const useUserStateSync = () => {
  const { address, connector, isConnected } = useAccount();
  const [loginLoading, setLoginLoading] = useState<null | string>('');
  const [, setFirebaseNotification] = useRecoilState(firebaseNotificationForMarketAtom);
  const [userState, setUserState] = useUserState();

  useEffect(() => {
    if (userState == null && loginLoading == 'registering' && isConnected && connector && address) {
      // alert("State sync");
      const getUserInfo = async () => {
        try {
          console.log('user-state-deb flow-deb-settinguser');
          const userInfo = await registerUser(connector, address);
          console.log(`user-state-deb  res: `, userInfo);
          setUserState(userInfo?.data);
          setFirebaseNotification(new Set(userInfo.data?.topics));
        } catch (e) {
          console.log(`Web3AuthWithWagmi-e: `, e);
        }
      };
      getUserInfo();
    }
  }, [loginLoading, connector, address, isConnected]);

  useEffect(() => {
    console.log(`user-state-deb  low-deb-getting-user-data: `);

    if (address && !userState) {
      setLoginLoading('registering');
    }
  }, [address]);
};
