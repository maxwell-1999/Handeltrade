// WAGMI Libraries
import {
  createConfig,
  configureChains,
  useAccount,
  useConnect,
  useDisconnect,
} from 'wagmi';
import { arbitrumGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Web3AuthConnectorInstance from '../../Hooks/Web3AuthConnectorInstance';
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

// Pass client to React Context Provider
function LoginPage() {
  const { isConnected } = useAccount();
  const { connect, connectors, error } = useConnect();
  const { disconnect } = useDisconnect();
  if (isConnected) {
    return (
      <button className="card" onClick={disconnect as any}>
        Disconnect
      </button>
    );
  }
  return (
    <div>
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
    </div>
  );
}

export { LoginPage };
