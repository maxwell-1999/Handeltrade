import { useAccount } from 'wagmi';
import useDrawerState from '../atoms/drawerState';

const useProtection = () => {
  const { address } = useAccount();
  const drawerManager = useDrawerState();
  const protect = (cb: () => void) => {
    if (!address) {
      drawerManager.openLoginDrawer(cb);
    } else {
      cb();
    }
  };
  return [protect];
};

export { useProtection };
