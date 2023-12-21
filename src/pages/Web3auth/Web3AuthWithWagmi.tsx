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
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  console.log(`Web3AuthWithWagmi-address: `, address, userInfo);
  // useEffect(() => {
  //   if (isConnected && connector && address) {
  //     const getUserInfo = async () => {
  //       try {
  //         const userInfo = await registerUser(connector, address);
  //         console.log(`Web3AuthWithWagmi-userInfo: `, userInfo);
  //       } catch (e) {
  //         console.log(`Web3AuthWithWagmi-e: `, e);
  //       }
  //     };
  //     getUserInfo();
  //   }
  // }, [isConnected, connector]);

  useEffect(() => {
    if (address) {
      const getUserInfo = async () => {
        setLoginLoading('fetching');
        const userInfo = await getUserData(address);
        console.log(`Web3AuthWithWagmi-userInfo: `, userInfo);
        if (userInfo?.error) {
          setLoginLoading('registering');
        } else {
          setUserInfo(userInfo);
          localStorage.setItem('user', JSON.stringify(userInfo));
          console.log(`Web3AuthWithWagmi-userInfo: `, userInfo);
          navigate('onboarding');
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
              <Route path="/" element={<LoginPage />} />
              <Route path="/onboarding" element={<Onboarding />} />
            </Routes>
          </SWRConfig>
        </HashRouter>
      </RecoilRoot>
    </WagmiConfig>
  );
}

export { Web3AuthWithWagmi };
