import Drawer from 'react-bottom-drawer';
import { MarketCard } from './MarketCard';
import { PrimaryBtn } from './Buttons';
import { useMemo, useState } from 'react';
import { useContractRead, useContractWrite, usePublicClient } from 'wagmi';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import { E18 } from '../Helpers/constants';
import toast from 'react-hot-toast';
import useDrawerState from '../atoms/drawerState';

const ShareManagementDrawer: React.FC<any> = ({}) => {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState(2);
  const { waitForTransactionReceipt } = usePublicClient();
  const drawerManager = useDrawerState();
  const selectedMarket = useMemo(() => {
    return drawerManager.drawerState?.market;
  }, [drawerManager.drawerState]);
  const { data, isLoading, isSuccess, writeAsync } = useContractWrite({
    address: '0x6bF80ee0353c9D9B17c1eF1F2540AB297E8e70Ab',
    abi: HandleTradeAbi,
    functionName: 'buyShares',
  });
  const currentArgs = useMemo(
    () => [selectedMarket.market_id, BigInt(value) * E18],
    [value]
  );
  const { data: buyPriceAfterFee } = useContractRead({
    address: '0x6bF80ee0353c9D9B17c1eF1F2540AB297E8e70Ab',
    abi: HandleTradeAbi,
    functionName: 'getBuyPriceAfterFee',
    args: currentArgs,
  });
  const { data: balanceOf, error } = useContractRead({
    address: '0x6bF80ee0353c9D9B17c1eF1F2540AB297E8e70Ab',
    abi: HandleTradeAbi,
    functionName: 'sharesBalance',
    args: [
      selectedMarket.market_id,
      '0x4c966271867cDCA758d90d8b655E79c7B867638E',
    ],
  });
  console.log(`ShareManagementDrawer-balanceOf: `, balanceOf);
  const handelTrade = async () => {
    setLoading(true);
    if (!buyPriceAfterFee) {
      throw new Error('Pre-fetching failed!');
    }
    console.log(
      ` write-deb ShareManagementDrawer-contractRead: `,
      buyPriceAfterFee,
      currentArgs
    );

    const { hash } = await writeAsync({
      args: currentArgs,
      value: buyPriceAfterFee,
    });
    console.log(`write-deb hashShareManagementDrawer-hash: `, hash);
    const { status: completionStatus } = await waitForTransactionReceipt({
      hash,
    });
    console.log(
      `write-deb ShareManagementDrawer-completionStatus: `,
      completionStatus
    );
    toast('completed');
  };
  return (
    <Drawer
      duration={250}
      hideScrollbars={drawerManager.drawerState?.screen ? true : false}
      onClose={drawerManager.closeDrawer}
      isVisible={drawerManager.drawerState?.screen ? true : false}
      className={'drawer'}
    >
      <div className="flex flex-col w-full gap-4 pb-4">
        <MarketCard market={selectedMarket} preview />
        <div className="flex flex-col p-3 rounded-[5px] bg-1b gap-2">
          <span className="text-2 text-f14 font-[500]">Available Amount</span>
          <span className="text-lg font-bold text-1">26401</span>
        </div>
        <div className="flex flex-col rounded-[5px] bg-1b gap-2 py-3">
          <span className="text-2 text-f14 font-[500]">Enter Amount</span>
          <input
            value={value}
            onChange={(e) => setValue(+e.target.value)}
            className="px-3 text-lg font-bold text-1"
          />
        </div>
        <PrimaryBtn
          onClick={() => {
            handelTrade().catch((e) => {
              console.log(`ShareManagementDrawer-e: `, e);
              toast(e.message, { icon: '❌' });
            });
          }}
        >
          Buy
        </PrimaryBtn>
      </div>
    </Drawer>
  );
};

export { ShareManagementDrawer };
