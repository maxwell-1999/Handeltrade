import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { view, viewDec } from '../Helpers/bigintUtils';
import { SecondaryBtn } from '../components/Buttons';
import MemoTImerIcon from '../SVG/TImerIcon';
import TimeAgo from 'react-timeago';
import { toJSEpoch } from '../components/MarketCard';
import { useNetwork } from 'wagmi';
import { formatAddress } from '../Helpers/web3utils';
import toast from 'react-hot-toast';

const MarketActivityList: React.FC<{ userAddrMap: UserAddrMap, data: BuySellActivityForMarket[]; }> = ({ userAddrMap, data }) => {
  return (
    <div className='flex flex-col gap-[10px] py-[20px] '>
      {data.map((activity: BuySellActivityForMarket, i) => {
        if (activity.type == "buy") {
          return <UserActivityCard user={userAddrMap[activity.buyer]} activityData={activity} />;
        }
        if (activity.type == "sell") {
          return <UserActivityCard user={userAddrMap[activity.seller]} activityData={activity} />;
        }
        if (activity.type == "claimedRewards") {
          return <></>;
        }
      })}
    </div>
  );
};

export default MarketActivityList;


const UserActivityCard: React.FC<{ user: User, activityData: BuySellActivityForMarket; }> = ({ user, activityData }) => {
  const navigate = useNavigate();
  const network = useNetwork();

  return (
    <div
      onClick={() => user.id && navigate('/profile/' + user.public_address)}
      className="flex flex-col bg-white rounded-[10px] p-4 justify-between w-full h-full items-center cursor-pointer ">
      <div className="flex w-full">
        {/* profile img section */}
        <span className="flex flex-grow">
          {user?.img_url ? <img
            className="w-[45px] h-[45px] rounded-[5px] mr-[10px]"
            // height={30}
            // width={30}
            src={user.img_url}
            alt="user profile"
          /> :
            <FontAwesomeIcon
              height={27}
              width={27}
              className="w-[45px] h-[45px] mr-[7px] p-1 text-2 cursor-pointer"
              icon={faCircleQuestion}
              onClick={() => { }}
            />
          }
          {/* demographics */}
          <span className="flex flex-col w-full">
            <span className='flex justify-between w-full '>

              <span className="font-semibold text-f14">
                <span className=" text-f14 font-[500] px-2 py-1 rounded-[5px] text-slate bg-lightBrand">
                  #{user?.id ? user.id : "-"}
                </span>{' '}
                {user?.first_name ? user.first_name : <span
                  className="text-[grey]"
                  data-tooltip-id='tooltip'
                  data-tooltip-content='User not registered!'
                >{user?.public_address ? formatAddress(user.public_address) : "No Name"}</span>}
              </span>

              <span className="mt-1 font-semibold text-2">
                {activityData?.qty ? view(activityData.qty) + " Shares" : ""}
              </span>
            </span>
            {/* <PrimeText>{user.last_name}</PrimeText> */}
            <span className="flex justify-between w-full text-2 ">
              {/* <span className="mt-1 font-semibold text-f12">
                  {user?.email ? user.email : "No details"}
                </span> */}
              <div className="flex font-[500] items-center justify-between">
                <div className="flex items-center gap-2 text-f10">
                  <MemoTImerIcon />
                  <TimeAgo date={toJSEpoch(activityData?.blockTimestamp)} />
                  <div>
                    {activityData?.pricePaid ? "Bought for " + viewDec(BigInt(activityData.pricePaid))
                      : activityData?.priceReceived ? "Sold for " + viewDec(BigInt(activityData.priceReceived)) : ""}
                    {" " + network.chain?.nativeCurrency.symbol}
                  </div>
                </div>
              </div>
              <SecondaryBtn
                className="p-1 text-[10px] font-semibold rounded-[4px] px-2 "
                onClick={() => console.log}
              >
                {activityData?.type.toUpperCase()}
              </SecondaryBtn>
            </span>
          </span>
        </span>
        {/* finance */}
        <span className="flex flex-col min-w-4">
          {user?.country && (
            <span className="mt-1 font-semibold text-2 text-f12">
              {user.country}
            </span>
          )}
        </span>
      </div>
    </div>
  );
};