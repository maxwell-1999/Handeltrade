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
import {
  mainnet,
  goerli,
  polygonMumbai,
  arbitrum,
  arbitrumGoerli,
  base,
  baseGoerli,
  polygon,
} from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import { SendTransaction } from './sendTransaction';
import { NetworkSwitcher } from './switchNetwork';
import Web3AuthConnectorInstance from './Web3AuthConnectorInstance';
import { Balance } from './balance';
import { WriteContract } from './writeContract';

// Configure chains & providers with the Public provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [polygon],
  [publicProvider()]
);

// Set up client
const config = createConfig({
  autoConnect: true,
  connectors: [
    new WalletConnectConnector({
      chains,
      options: {
        projectId: '3314f39613059cb687432d249f1658d2',
        showQrModal: true,
      },
    }),

    Web3AuthConnectorInstance(chains) as any,
  ],
  publicClient,
  webSocketPublicClient,
});

function Profile() {
  const { address, connector, isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();

  if (isConnected) {
    return (
      <div className="main">
        <div className="title">Connected to {connector?.name}</div>
        <div>{address}</div>
        <button className="card" onClick={disconnect as any}>
          Disconnect
        </button>
        <SendTransaction />
        <Balance />
        <WriteContract />
        <NetworkSwitcher />
      </div>
    );
  } else {
    return (
      <div className="main">
        {connectors.map((connector) => {
          return (
            <button
              className="card"
              key={connector.id}
              onClick={() => connect({ connector })}
            >
              {connector.name}
            </button>
          );
        })}
        {error && <div>{error.message}</div>}
      </div>
    );
  }
}

// Pass client to React Context Provider
function Web3AuthWithWagmi() {
  return (
    <WagmiConfig config={config}>
      <div className="container">
        <Profile />
      </div>
    </WagmiConfig>
  );
}

export { Web3AuthWithWagmi };
