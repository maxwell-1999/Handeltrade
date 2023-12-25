import { atom, useRecoilValue, useSetRecoilState } from 'recoil';

type UserState =
  | {
      first_name: string;
      last_name: string;
      email: string;
      img_url: string;
      id: number;
      is_active: boolean;
      public_address: string;
      updated_at: string;
    }
  | undefined
  | null;

const UserStateAtom = atom<UserState>({ default: null, key: 'UserState' });

const useUserState = () => {
  const setUserState = useSetRecoilState(UserStateAtom);

  const userState = useRecoilValue(UserStateAtom);
  return [userState, setUserState];
};

export default useUserState;
