import React from 'react';
import { PrimaryBtn } from './Buttons';
import MemoButtonLoader from './ButtonLoader';
import { useAccount, useBalance, useNetwork } from 'wagmi';
import { bigIntToStringWithDecimal, viewDec } from '../Helpers/bigintUtils';
import PrimeText from './PrimeText';

export default function AccountBalanceDrawer() {
  const account = useAccount();
  const network = useNetwork();
  const { data, isError, isLoading } = useBalance({
    address: account.address,
    watch: true,
  });

  return (
    <div className="flex items-center justify-center align-middle">
      <div className="flex flex-col gap-4 pb-4 responsive-layout">
        <div className="flex flex-col rounded-[5px] bg-1b gap-2 p-3">
          <span className="text-2 text-f14 font-[500]">
            Your Account balance is:
          </span>
          <PrimeText
            classname="px-3 text-lg font-bold text-1"
            style={{ resize: 'none' }}
          >
            {isLoading
              ? '...'
              : bigIntToStringWithDecimal(
                data?.value,
                network.chain?.nativeCurrency.decimals
              ) +
              ' ' +
              (network.chain?.nativeCurrency.symbol ?? "")}
          </PrimeText>
        </div>
      </div>
    </div>
  );
}
