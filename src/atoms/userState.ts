import { atom, useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

export type UserState =
  | {
    first_name: string;
    last_name: string;
    email: string;
    img_url: string;
    id: number;
    is_active: boolean;
    public_address: string;
    updated_at: string;
    session_id?: string;
    topics?: Array<string>;
  }
  | undefined
  | null;

export const UserStateAtom = atom<UserState>({ default: null, key: 'UserState3' });
const OtherUserStateAtom = atom<UserState>({
  default: null,
  key: 'UserState2',
});

const useUserState = () => {
  const setUserState = useRecoilState(UserStateAtom);
  return setUserState;
  // const userState = useRecoilValue(UserStateAtom);
  // return [userState, setUserState] as [UserState, typeof setUserState];
};

export const useOtherUserState = () => {
  const setUserState = useRecoilState(OtherUserStateAtom);
  return setUserState;
  // const userState = useRecoilValue(OtherUserStateAtom);
  // return [userState, setUserState] as [UserState, typeof setUserState];
};

export default useUserState;
