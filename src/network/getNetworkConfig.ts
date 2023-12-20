import { supportedChains } from "./supportedChains";

const getNetworkConfig = () => {
  const params = new URLSearchParams(window.location.search);

  const chainId = Number(
    params.get("chainId") ||
      params.get("chainid") ||
      import.meta.env.VITE_CHAIN_ID ||
      31337
  );

  const chainIndex = supportedChains.findIndex((c) => c.id === chainId);
  const chain = supportedChains[chainIndex];
  if (!chain) {
    throw new Error(`Chain ${chainId} not found`);
  }

  const getIndexerUrl = (chainId: number): string | undefined => {
    if (chainId === 4242) {
      return "https://indexer.dev.linfra.xyz";
    } else if (chainId === 84531) {
      return "https://indexer.base-goerli-mud-services.linfra.xyz";
    } else if (chainId === 8453) {
      return "https://indexer.base-mainnet-mud-services.linfra.xyz";
    }
    return undefined;
  };

  return {
    indexerUrl: getIndexerUrl(chainId),
    chainId,
    chain,
  };
};

export default getNetworkConfig;
