import useDrawerState from '../atoms/drawerState';

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
      {' '}
      <div>Hello</div>
    </Drawer>
  );
};
