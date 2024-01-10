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
            {user.img_url ? (
              <img
                onError={(e) => {
                  e.currentTarget.onerror = null;
                  e.currentTarget.src = '/img_placeholder.svg';
                  e.currentTarget.classList.remove('img-loading');
                }}
                className="w-[45px] h-[45px] rounded-[5px] mr-[10px] img-loading"
                src={user?.img_url}
                alt="user profile"
              />
            ) : (
              <FontAwesomeIcon
                height={27}
                width={27}
                className="w-[45px] h-[45px] mr-[7px] p-1 text-2 cursor-pointer"
                icon={faCircleQuestion}
                onClick={() => { }}
              />
            )}
            {/* demographics */}
            <span className="flex flex-col w-full">
              <span className="flex items-center font-semibold text-f14 pt-1">
                {user?.first_name ? (
                  user.first_name
                ) : 'No Name'}
                <div className="ml-auto text-2 text-f10">
                  {showShares(user?.shares)}
                </div>
              </span>
              <span className="flex justify-between w-full text-2 ">
                <span className="mt-1 font-semibold text-f12">
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

export const showShares = (shares) => {
  if (shares == '' || shares == null || shares == undefined) return '';
  console.log(`UserCardSm-shares: `, shares);
  const shareStr = +shares > 1000000000000000000n ? 'Shares' : 'Share';
  console.log(`UserCardSm-+shares: `, +shares);
  return view(shares) + ' ' + shareStr;
  // return view(shareStr) + ' ' + shareStr;
};
