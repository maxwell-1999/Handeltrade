import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type DrawerStates =
  | null
  | { screen: 'handel-buy'; market: Market }
  | { screen: 'handel-sell'; market: Market };

const DrawerStateAtom = atom<DrawerStates>({
  key: 'DrawerState',
  default: null,
});

const useDrawerState = () => {
  const setDrawerState = useSetRecoilState(DrawerStateAtom);

  const drawerState = useRecoilValue(DrawerStateAtom);

  const openBuyDrwer = (market: Market) => {
    setDrawerState({ screen: 'handel-buy', market });
  };
  const openSellDrawer = (market: Market) => {
    setDrawerState({ screen: 'handel-sell', market });
  };
  const closeDrawer = () => {
    setDrawerState(null);
  };
  return {
    drawerState,
    closeDrawer,
    openBuyDrwer,
    openSellDrawer,
  };
};

export default useDrawerState;
