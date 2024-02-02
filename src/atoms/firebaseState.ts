import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const isFirebaseOnAtom = atom<boolean>({
  key: 'firebaseOnAtom',
  default: false,
  effects: [persistAtom],
});

export const useIsFirebaseOn = () => {
  const value = useRecoilState(isFirebaseOnAtom);
  return value;
};

// good for writing to localStorage
export const firebaseNotificationForMarketAtom = atom<Set<string> | null>({
  key: 'firebaseNotificationForMarketAtom',
  default: null,
});

export const useFirebaseNotificationForMarket = () => {
  const val = useRecoilState(firebaseNotificationForMarketAtom);
  return val;
};