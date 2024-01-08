import React, { useEffect, useRef, useState } from 'react';
import { PrimaryBtn } from './Buttons';
import MemoButtonLoader from './ButtonLoader';
import toast from 'react-hot-toast';
import { config } from '../App';

export default function ExportWalletDrawer() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState('');
  const [pk, setPk] = useState('');

  const ref = useRef();
  useEffect(() => {
    ref.current.focus();
    console.log(`BuyDrawer-ref.current: `, ref.current);
  }, []);

  const getPk = async () => {
    const provider = await config.connectors[0].getProvider();
    const p = await provider?.request({
      method: "private_key"
    });
    setLoading(false);
    setPk(p);
  };

  return (
    <>
      <div className='flex align-middle items-center justify-center'>
        <div className="flex flex-col responsive-layout gap-4 pb-4">

          {pk ? <div className="flex flex-col rounded-[5px] bg-1b gap-2 p-3">
            <span className="text-2 text-f14 font-[500]">
              Your private key
            </span>
            <textarea
              ref={ref}
              value={pk}
              rows={2}
              style={{ resize: 'none' }}
              type="text"
              className="px-3 text-lg font-bold text-1"
            />
          </div>
            :
            <div className="flex flex-col rounded-[5px] bg-1b gap-2 p-3">
              <span className="text-2 text-f14 font-[500]">
                Write 'export' to see your private key
              </span>
              <input
                ref={ref}
                value={value}
                type="text"
                onChange={(e) => setValue(e.target.value)}
                className="px-3 text-lg font-bold text-1"
              />
            </div>}

          <PrimaryBtn
            onClick={() => {
              if (value === 'export') {
                setLoading(true);
                getPk();
              } else {
                toast.error('Wrong input');
              }
            }}
            className="flex items-center justify-center gap-5 h-[40px] text-white"
          >
            <MemoButtonLoader className="scale-110 " loading={loading} /> Show Private Key
          </PrimaryBtn>
        </div>
      </div >


    </>
  );
}
