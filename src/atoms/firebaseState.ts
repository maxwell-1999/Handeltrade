import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
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


// Helper function to persist data to localStorage
const saveToLocalStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// Helper function to retrieve data from localStorage;
const loadFromLocalStorage = (key: string) => {
  const storedValue = localStorage.getItem(key);
  return storedValue ? JSON.parse(storedValue) : null;
};

// good for writing to localStorage
export const firebaseNotificationForMarketAtom = atom<Set<string>>({
  key: 'firebaseNotificationForMarketAtom',
  default: new Set(loadFromLocalStorage('firebaseNotificationForMarketAtom')),
  effects_UNSTABLE: [
    ({ onSet }) => {
      // Subscribe to changes and save to localStorage
      onSet((newValue) => {
        saveToLocalStorage('firebaseNotificationForMarketAtom', Array.from(newValue));
      });
    },
  ],
});

export const useFirebaseNotificationForMarket = () => {
  const val = useRecoilState(firebaseNotificationForMarketAtom);
  return val;
};