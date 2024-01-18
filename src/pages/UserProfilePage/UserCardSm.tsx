import { useNavigate } from 'react-router-dom';
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { view } from '../../Helpers/bigintUtils';
import { formatAddress } from '../../Helpers/web3utils';
import toast from 'react-hot-toast';
import { useState } from 'react';

const UserCardSm: React.FC<any> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => user.id && navigate('/profile/' + user.public_address)}
      className="flex flex-col items-center justify-center w-full cursor-pointer "
    >
      {/*  */}
      <div className="flex flex-col items-center justify-center w-full h-full bg-[white] p-4 rounded-[10px]">
        <div className="flex w-full ">
          {/* profile img section */}
          <span className="flex flex-grow">
            <img
              className="w-[40px] h-[40px] rounded-[5px] mr-[10px] img-loading"
              // height={30}
              // width={30}
              src={user.img_url || '/dplaceholder.png'}
              alt="user profile"
            />
            {/* demographics */}
            <span className="flex flex-col w-full">
              <span className="flex items-center font-semibold text-f14">
                {user?.first_name ? user.first_name : 'Anonymous'}
                <div className="ml-auto text-2 text-f10">
                  {showShares(user?.shares)}
                </div>
              </span>
              <span className="flex justify-between w-full text-2 ">
                <span className="font-semibold text-f12">
                  <span className=" max-w-[70px] rounded-lg ">
                    {formatAddress(user?.public_address)}{' '}
                  </span>
                </span>
              </span>
            </span>
          </span>
          {/* finance */}
          <span className="flex flex-col min-w-4">
            {user.country && (
              <span className="mt-1 font-semibold text-2 text-f12">
                {user.country}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export { UserCardSm };

export const showShares = (shares: string | bigint) => {
  if (shares == '' || shares == null || shares == undefined) return '';
  console.log(`UserCardSm-shares: `, shares);
  const shareStr = BigInt(shares) > 1000000000000000000n ? 'Shares' : 'Share';
  return view(shares) + ' ' + shareStr;
  // return view(shareStr) + ' ' + shareStr;
};
