import { atom, useRecoilState } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();
export const persistAtomEffect = persistAtom;

export const Platform = {
  Youtube: 'youtube',
  Instagram: 'instagram',
  Twitter: 'twitter',
  Github: 'github',
};

export const platformAtom = atom<string>({
  default: Platform.Youtube,
  key: 'platformAtom',
  effects: [persistAtom],
});

export const usePlatform = () => {
  const value = useRecoilState(platformAtom);
  return value;
};
