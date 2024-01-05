import { useMemo, useState } from 'react';
import { useAccount, useContractReads, useNetwork } from 'wagmi';
import HandleTradeAbi from '../ABI/HandelTrade.json';
import { E18 } from '../Helpers/constants';
import useDrawerState from '../atoms/drawerState';
import { appConfig } from '../config';
import { bigIntMax, bigIntMin } from '../Helpers/bigintUtils';
import { BuyDrawer } from './BuyDrawer';
import { SellDrawer } from './SellDrawer';
import { InitMarketDrawer } from './InitMarketDrawer';
import { DrawerLoader } from './DrawerLoader';
let oldData = undefined;
const ShareManagementDrawer: React.FC<any> = ({ }) => {
  const { address } = useAccount();
  const network = useNetwork();
  const [value, setValue] = useState(2);
  const drawerManager = useDrawerState();
  const selectedMarket = useMemo(() => {
    return drawerManager.drawerState?.market!;
  }, [drawerManager.drawerState]);

  const marketid_value_arg_pack = useMemo(
    () => [selectedMarket.market_id, BigInt(value) * E18],
    [value]
  );
  const marketid_holder_arg_pack = useMemo(
    () => [selectedMarket.market_id, address],
    [selectedMarket, address]
  );

  const { data: mergedData } = useContractReads({
    contracts: [
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'sharesSupply',
        args: [selectedMarket?.market_id],
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'sharesBalance',
        args: marketid_holder_arg_pack,
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'getBuyPriceAfterFee',
        args: marketid_value_arg_pack,
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'getSellPriceAfterFee',
        args: marketid_value_arg_pack,
      },
      {
        address: appConfig.handelTradeAddress,
        abi: HandleTradeAbi,
        functionName: 'dividendsOf',
        args: marketid_holder_arg_pack,
      },
    ],
    select: (data) => {
      return {
        supply: data[0].result,
        userBalance: data[1].result,
        dividends: data[4].result,
        nextBuyPrice: data[2].result,
        nextSellPrice: data[3].result,
        maxSell:
          typeof data[0].result == 'bigint' && typeof data[1].result == 'bigint'
            ? bigIntMax(bigIntMin(data[1].result, data[0].result - E18), 0n)
            : undefined,
      };
    },
    watch: true,
  });
  if (!drawerManager.drawerState) return null;
  const data = useMemo(() => {
    if (mergedData) oldData = mergedData;
    return oldData;
  }, [mergedData]);
  return (
    <div className='flex align-middle items-center justify-center'>
      <div className="flex flex-col responsive-layout gap-4 pb-4">
        {data?.supply == undefined ? (
          <DrawerLoader />
        ) : drawerManager.drawerState.screen == 'handel-buy' ? (
          data.supply > 0 ? (
            <BuyDrawer data={data} {...{ selectedMarket, value, setValue }} />
          ) : (
            <InitMarketDrawer
              data={data}
              {...{ selectedMarket, value, setValue }}
            />
          )
        ) : (
          <SellDrawer data={data} {...{ selectedMarket, value, setValue }} />
        )}
      </div>
    </div>
  );
};

export { ShareManagementDrawer };
