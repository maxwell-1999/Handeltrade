import { useRef } from 'react';
import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type DrawerStates =
  | null
  | { screen: 'handel-buy'; market: Market }
  | { screen: 'login'; cb: () => void }
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
  const openLoginDrawer = (cb: () => void) => {
    setDrawerState({ screen: 'login', cb });
  };
  const closeLoginDrawer = () => {
    if (drawerState?.screen == 'login') {
      setDrawerState(null);
      drawerState.cb();
    }
  };
  return {
    drawerState,
    closeDrawer,
    openBuyDrwer,
    openSellDrawer,
    openLoginDrawer,
    closeLoginDrawer,
  };
};

export default useDrawerState;
