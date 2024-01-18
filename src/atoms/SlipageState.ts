import { atom, useRecoilValue } from 'recoil';
import { recoilPersist } from 'recoil-persist';
const { persistAtom } = recoilPersist();

export const defaultSlippage = 0.75;
export const slippageAtom = atom<number>({
  default: defaultSlippage,
  key: 'SlippageAtom',
  effects: [persistAtom],
});
export const useSlippage = () => {
  const value = useRecoilValue(slippageAtom);
  return value;
};
