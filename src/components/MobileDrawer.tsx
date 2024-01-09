import useDrawerState from '../atoms/drawerState';
import Drawer from 'react-bottom-drawer';
import { LoginPage } from '../pages/Web3auth/Web3AuthWithWagmi';
import { ShareManagementDrawer } from './ShareManagementDrawer';
import WalletDrawer from './WalletDrawer';
import AccountBalanceDrawer from './AccountBalanceDrawer';
import ExportWalletDrawer from './ExportWalletDrawer';

const MobileDrawer: React.FC<any> = ({}) => {
  const drawerManager = useDrawerState();

  return (
    <Drawer
      duration={250}
      hideScrollbars={drawerManager.drawerState?.screen ? true : false}
      onClose={drawerManager.closeDrawer}
      isVisible={drawerManager.drawerState?.screen ? true : false}
      className={'drawer'}
    >
      <div className="m-auto root-w">
        {drawerManager.drawerState?.screen == 'login' ? (
          <LoginPage />
        ) : drawerManager.drawerState?.screen == 'wallet' ? (
          <ExportWalletDrawer />
        ) : drawerManager.drawerState?.screen == 'balance' ? (
          <AccountBalanceDrawer />
        ) : (
          <ShareManagementDrawer />
        )}
      </div>
    </Drawer>
  );
};

export { MobileDrawer };
