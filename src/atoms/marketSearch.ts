import { atom, useRecoilValue, useSetRecoilState } from 'recoil';
import searchMarkets from '../Helpers/searchMarkets';
import { debounce } from 'lodash';
import axios from 'axios';
type SearchMarket = {
  keyword: string;
  loading: boolean;
  markets: Market[];
};
const defaultState = {
  keyword: '',
  loading: false,
  markets: [],
};
const SearchMarketAtom = atom<SearchMarket>({
  key: 'SearchMarket',
  default: defaultState,
});

const debouncedSearchMarkets = debounce(async function (
  queryString: string,
  cb: (markets: Market[], keyword: string) => void
) {
  try {
    const { data } = await axios.get(
      `${import.meta.env.VITE_API_ENDPOINT}/search/market/${queryString}`
    );
    cb(data.data, queryString);
  } catch (e) {
    return null;
  }
},
100);
const useSearchMarket = () => {
  const setSearchMarket = useSetRecoilState(SearchMarketAtom);
  const searchState = useRecoilValue(SearchMarketAtom);
  const onSearch = async (keyword: string) => {
    setSearchMarket({ keyword, loading: true, markets: [] });
    if (!keyword) return setSearchMarket(defaultState);
    debouncedSearchMarkets(keyword, (markets, keywor) => {
      console.log('search-deb', markets);
      setSearchMarket((d) => {
        return { ...d, loading: false, markets };
      });
    });
  };
  const cancelSearch = () => {
    console.log(`defaultState: `, defaultState);
    setSearchMarket(defaultState);
  };

  return {
    ...searchState,
    onSearch,
    cancelSearch,
  };
};

export default useSearchMarket;
