// WAGMI Libraries
import {
  WagmiConfig,
  createConfig,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { arbitrumGoerli } from 'wagmi/chains';
import {
  HashRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { publicProvider } from 'wagmi/providers/public';
import { SendTransaction } from './sendTransaction';
import { NetworkSwitcher } from './switchNetwork';
import Web3AuthConnectorInstance from './Web3AuthConnectorInstance';
import { Balance } from './balance';
import { WriteContract } from './writeContract';
import { ErrorPage } from '../../components/ErrorPage';
import { SWRConfig } from 'swr';
import { PrimaryBtn } from '../../components/Buttons';
import { useEffect, useState } from 'react';
import { registerUser, getUserData } from '../../Helpers/register';
import { Onboarding } from '../Onboarding/Onboarding';
import useUserState from '../../atoms/userState';
import { Layout } from '../../components/Layout';
import { MarketCreation } from '../MarketCreation';
import { MarketInfo } from '../MarketInfo';
import useDrawerState from '../../atoms/drawerState';
import { formatAddress } from '../../Helpers/web3utils';

// Configure chains & providers with the Public provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrumGoerli],
  [publicProvider()]
);

// Set up client
const config = createConfig({
  autoConnect: true,
  connectors: [Web3AuthConnectorInstance(chains) as any],
  publicClient,
  webSocketPublicClient,
});

function LoginPage() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors } = useConnect();
  const [loginLoading, setLoginLoading] = useState<null | string>('');
  const [userState, setUserState] = useUserState();
  const drawerManagement = useDrawerState();
  console.log(`Web3AuthWithWagmi-userState: `, userState);
  useEffect(() => {
    if (loginLoading == 'registering' && isConnected && connector && address) {
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

  return (
    <div className="flex flex-col items-center justify-center w-full h-full py-3">
      <div className="font-bold text-1 text-[20px]">HANDEL.NETWORK</div>
      <div className="font-semibold text-2 text-f14">
        {userState ? (
          <>
            We recomment atleast 0.01 ETH in your Account :{' '}
            <a
              href={`https://goerli.arbiscan.io/address/${userState.public_address}`}
              className="underline text-brand"
              target="_blank"
            >
              {formatAddress(userState.public_address)}
            </a>
          </>
        ) : (
          'Buy and sell social profiles on chain'
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
          className="mt-[20px] active:translate-y-2 transition-transform"
          onClick={login}
        >
          Login
        </PrimaryBtn>
      )}
    </div>
  );
}

// Pass client to React Context Provider

export { LoginPage };
