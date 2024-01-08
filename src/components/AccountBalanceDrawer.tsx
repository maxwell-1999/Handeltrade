import React from 'react';
import { PrimaryBtn } from './Buttons';
import MemoButtonLoader from './ButtonLoader';
import { useAccount, useBalance, useNetwork } from 'wagmi';


export default function AccountBalanceDrawer() {
  const account = useAccount();
  const network = useNetwork();
  const { data, isError, isLoading } = useBalance({
    address: account.address,
  });

  return (
    <div className='flex align-middle items-center justify-center'>
      <div className="flex flex-col responsive-layout gap-4 pb-4">
        <div className="flex flex-col rounded-[5px] bg-1b gap-2 p-3">
          <span className="text-2 text-f14 font-[500]">
            Your Account balance is:
          </span>
          <textarea
            value={isLoading ? '...' : (data?.value)+""}
            style={{ resize: 'none' }}
            className="px-3 text-lg font-bold text-1"
          />
        </div>
      </div>
    </div>
  );
}
