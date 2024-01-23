import './App.css';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout';
import { Skeleton } from '@/components/ui/skeleton';

// WAGMI Libraries
import {
  WagmiConfig,
  createConfig,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi';
import { arbitrumGoerli, baseGoerli } from 'wagmi/chains';
import {
  BrowserRouter,
  Outlet,
  Route,
  Routes,
  useNavigate,
} from 'react-router-dom';
import { RecoilRoot } from 'recoil';
import { publicProvider } from 'wagmi/providers/public';
import { SWRConfig } from 'swr';
import { MarketCreation } from './pages/MarketCreation';
import { MarketInfo } from './pages/MarketInfo';
import { Onboarding } from './pages/Onboarding/Onboarding';
import Web3AuthConnectorInstance from './pages/Web3auth/Web3AuthConnectorInstance';
import { LoginPage } from './pages/Web3auth/Web3AuthWithWagmi';
import UserProfilePage from './pages/UserProfilePage';
import { TestComponent } from './pages/TestComponent';
import 'react-tooltip/dist/react-tooltip.css';
import { getSharesFromPrice } from './lib/PriceToQuantity';
import Firebase from './components/firebase/Firebase';

// Configure chains & providers with the Public provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [baseGoerli],
  [publicProvider()]
);
// Set up client
export const config = createConfig({
  autoConnect: true,
  connectors: [Web3AuthConnectorInstance(chains) as any],
  publicClient,
  webSocketPublicClient,
});

// Pass client to React Context Provider
function Web3AuthWithWagmi() {
  return (
    <WagmiConfig config={config}>
      <RecoilRoot>
        <SWRConfig>
          <BrowserRouter>
            <Routes>
              <Route path="/markets" element={<Onboarding />}>
                <Route
                  path=":marketid"
                  element={
                    <Layout>
                      <MarketInfo />
                    </Layout>
                  }
                ></Route>
              </Route>
              <Route path="/" element={<Onboarding />} />

              <Route path="/add" element={<MarketCreation />}></Route>
              <Route
                path="/test"
                element={
                  <Layout>
                    <TestComponent />
                  </Layout>
                }
              />
              <Route
                path="/firebase"
                element={
                  <Layout>
                    <Firebase />
                  </Layout>
                }
              />
              <Route
                path="/profile"
                element={
                  <Layout>
                    <UserProfilePage />
                  </Layout>
                }
              >
                <Route
                  path=":user_addr"
                  element={
                    <Layout>
                      <UserProfilePage />
                    </Layout>
                  }
                ></Route>
              </Route>
            </Routes>
          </BrowserRouter>
        </SWRConfig>
      </RecoilRoot>
    </WagmiConfig>
  );
}

export { Web3AuthWithWagmi };
// solveForQ(1 * M, 0.000625 * M, M);
const M = 1e18;
function App() {
  console.log('qty', getSharesFromPrice(M, 0.0006 * M, M));
  return (
    <>
      <Web3AuthWithWagmi />
      <Toaster />
    </>
  );
}

export default App;
