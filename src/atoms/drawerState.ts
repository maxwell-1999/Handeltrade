import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type DrawerStates =
  | null
  | { screen: 'market-details'; market: Market }
  | { screen: 'handel-market'; market: Market; buy: boolean };

const DrawerStateAtom = atom<DrawerStates>({
  key: 'DrawerState',
  default: null,
});

const useDrawerState = () => {
  const setDrawerState = useSetRecoilState(DrawerStateAtom);

  const drawerState = useRecoilValue(DrawerStateAtom);

  const openMarketDetails = (market: Market) => {
    setDrawerState({ screen: 'market-details', market });
  };
  const openHandelMarket = (market: Market, buy: boolean) => {
    setDrawerState({ screen: 'market-details', market, buy });
  };
  const closeDrawer = () => {
    setDrawerState(null);
  };
  return { openMarketDetails, drawerState, closeDrawer, openHandelMarket };
};

export default useDrawerState;
