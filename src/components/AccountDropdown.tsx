import { useAccount, useDisconnect } from 'wagmi';
import useUserState from '../atoms/userState';
import { formatAddress } from '../Helpers/web3utils';
import useDrawerState from '../atoms/drawerState';

const AccountDropdown: React.FC<any> = ({}) => {
  const account = useAccount();
  const [userState, setUserState] = useUserState();
  const drawerManager = useDrawerState();
  const { disconnect } = useDisconnect();
  if (!account.address)
    return (
      <button className="" onClick={() => drawerManager.openLoginDrawer()}>
        Login
      </button>
    );
  return (
    <button
      onClick={() => {
        disconnect();
        setUserState(null);
      }}
    >
      {formatAddress(account.address)}
    </button>
  );
};

export { AccountDropdown };
