import useDrawerState from '../atoms/drawerState';
import Drawer from 'react-bottom-drawer';
import { LoginPage } from '../pages/Web3auth/Web3AuthWithWagmi';
import { ShareManagementDrawer } from './ShareManagementDrawer';

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
      {drawerManager.drawerState?.screen == 'login' ? (
        <LoginPage />
      ) : (
        <ShareManagementDrawer />
      )}
    </Drawer>
  );
};

export { MobileDrawer };
