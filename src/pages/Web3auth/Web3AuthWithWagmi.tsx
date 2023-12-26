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
import { HashRouter, Route, Routes, useNavigate } from 'react-router-dom';
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
  const { connect, connectors, error } = useConnect();
  const [loginLoading, setLoginLoading] = useState<null | string>('');
  const navigate = useNavigate();
  const [userState, setUserState] = useUserState();
  console.log(`Web3AuthWithWagmi-userState: `, userState);
  useEffect(() => {
    if (loginLoading == 'registering' && isConnected && connector && address) {
      const getUserInfo = async () => {
        try {
          console.log('flow-deb-settinguser');
          const userInfo = await registerUser(connector, address);
          console.log(`res: `, userInfo);
          setUserState(userInfo?.data.data);

          // send get user-address api response.
          // setLoginLoading()
          console.log('flow-deb-settinguser', userInfo?.data.data);
        } catch (e) {
          console.log(`Web3AuthWithWagmi-e: `, e);
        }
      };
      getUserInfo();
    }
  }, [loginLoading, connector, address]);

  useEffect(() => {
    if (address) {
      const getUserInfo = async () => {
        setLoginLoading('fetching');
        console.log(`flow-deb-getting-user-data: `);

        const userInfo = await getUserData(address);
        console.log(`Web3AuthWithWagmi-userInfo: `, userInfo);
        if (userInfo?.error || !userInfo) {
          console.log(`flow-deb-getting-no-user-found: `, userInfo);

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
  useEffect(() => {
    if (userState) {
      console.log(`flow-deb-user-changed: `, userState);
      localStorage.setItem('user-v1', JSON.stringify(userState));
      navigate('/app');
    }
  }, [userState]);
  if (!connectors?.length) {
    return <ErrorPage>No Connectors found</ErrorPage>;
  }

  const login = () => {
    setLoginLoading('oauth');
    connect({ connector: connectors[0] });
  };
  return (
    <div className="flex flex-col items-center justify-center w-full h-full px-horizontalSm">
      <div className="font-bold text-1 text-[20px]">HANDEL.NETWORK</div>
      <div className="font-semibold text-2 text-f14">
        Buy and sell social profiles on chain
      </div>
      <PrimaryBtn
        className="mt-[20px] active:translate-y-2 transition-transform"
        onClick={login}
      >
        Login
      </PrimaryBtn>
    </div>
  );
}

// Pass client to React Context Provider
function Web3AuthWithWagmi() {
  return (
    <WagmiConfig config={config}>
      <RecoilRoot>
        <HashRouter>
          <SWRConfig>
            <Routes>
              <Route
                path="/app"
                element={
                  <Layout>
                    <Onboarding />{' '}
                  </Layout>
                }
              />
              <Route
                path="/"
                element={
                  <Layout>
                    <LoginPage />
                  </Layout>
                }
              />
              <Route
                path="/add"
                element={
                  <Layout>
                    <MarketCreation />
                  </Layout>
                }
              />
            </Routes>
          </SWRConfig>
        </HashRouter>
      </RecoilRoot>
    </WagmiConfig>
  );
}

export { Web3AuthWithWagmi };
