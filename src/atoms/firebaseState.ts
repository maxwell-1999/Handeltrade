import { atom, selector, useRecoilState, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';
import useUserState, { UserState, UserStateAtom } from './userState';
import axios from 'axios';
import toast from 'react-hot-toast';
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
export const firebaseNotificationForMarketAtom = atom<Set<string> | null>({
  key: 'firebaseNotificationForMarketAtom',
  default: null,
});

export const useFirebaseNotificationForMarket = () => {
  const val = useRecoilState(firebaseNotificationForMarketAtom);
  return val;
};