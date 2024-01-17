import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import axios from 'axios';
import useSWR from 'swr';
import { absoluteInt } from '../Helpers/bigintUtils';
import { ResourceUnavailableRpcError } from 'viem';
type SearchMarket = {
  keyword: string;
  loading: boolean;
  markets: Market[];
};
const defaultState = {
  price: undefined,
};
const ETHPriceAtom = atom<{ price: undefined | bigint }>({
  key: 'EHTPrice',
  default: defaultState,
});
const ETHUSD =
  '0xff61491a931112ddf1bd8147cd1b641375f79f5825126d665480874634fd0ace';
const useEthPrice = () => {
  const { data, error } = useSWR('ETH-Price', {
    fetcher: async () => {
      const results = await axios.get(
        `https://xc-mainnet.pyth.network/api/latest_price_feeds?ids[]=${ETHUSD}`
      );

      const price = BigInt(results.data[0].price.price);
      return absoluteInt(price, -results.data[0].price.expo);
    },
    refreshInterval: 10000,
  });

  return data;
};

export default useEthPrice;
