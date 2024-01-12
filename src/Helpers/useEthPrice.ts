import useSWR from 'swr';

const useEthPrice = () => {
  const { data } = useSWR(
    'https://api.coinmarketcap.com/v2/cryptocurrency/eth/prices?sparkline=false',
    {
      fetcher: async (url) => {
        const response = await fetch(url);
        const data = await response.json();
        return data.data.price_usd;
      },
      refreshInterval: 10000,
    }
  );

  return data;
};

export default useEthPrice;
