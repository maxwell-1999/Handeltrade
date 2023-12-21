// WAGMI Libraries
import { createConfig, configureChains } from 'wagmi';
import { arbitrumGoerli } from 'wagmi/chains';
import { publicProvider } from 'wagmi/providers/public';
import Web3AuthConnectorInstance from './Web3AuthConnectorInstance';

// Configure chains & providers with the Public provider.
const { chains, publicClient, webSocketPublicClient } = configureChains(
  [arbitrumGoerli],
  [publicProvider()]
);

// Set up client
export const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [Web3AuthConnectorInstance(chains) as any],
  publicClient,
  webSocketPublicClient,
});
