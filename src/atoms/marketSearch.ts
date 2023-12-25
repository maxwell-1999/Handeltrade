import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

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

const useSearchMarket = () => {
  const setSearchMarket = useSetRecoilState(SearchMarketAtom);
  const searchState = useRecoilValue(SearchMarketAtom);
  const onSearch = (keyword: string) => {
    setSearchMarket({ keyword, loading: true, markets: [] });
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
