import { MemoCrossIcon } from '@/SVG/CrossIcon';
import { getIDBVal, setIDBVal } from '@/utils/indexDB';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ChildProps {
  name: string;
  state: boolean;
  setState: (newState: boolean) => void;
}

const ToggleSwitch: React.FC<ChildProps> = ({ name, state, setState }) => {
  const toggleClass = state ? 'translate-x-5 bg-brandAltBlue' : 'translate-x-0 bg-2';

  // navigator.serviceWorker.getRegistrations()
  // .then(async (registration) => {
  //   console.log({ registration, val: await getIDBVal("buy") });
  //   // await storeConfigDataFirebase({ id: "buy", value: true });
  // }).catch((err) => {
  //   console.log("Error in registering service worker", err);
  // });

  return (
    <span
      className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer bg-[#e3e4e8] `}
      onClick={() => {
        const newVal = !state;
        setState(newVal);
        setIDBVal(name.trim(), newVal);
      }}
    >
      <div className={`w-5 h-5  rounded-full transform duration-300 ease-in-out ${toggleClass}`}></div>
    </span>
  );
};

export default function Settings() {
  const [isBuyOn, setIsBuyOn] = useState(false);
  const [isNewOn, setIsNewOn] = useState(false);
  const [isSellOn, setIsSellOn] = useState(false);
  const [isOwnerFeesClaimed, setIsOwnerFeesClaimed] = useState(false);
  const [isReflectionFeesClaimed, setIsReflectionFeesClaimed] = useState(false);
  const [isRewardsClaimed, setIsRewardsClaimed] = useState(false);
  const [isMarketVerified, setIsMarketVerified] = useState(false);
  const [isOfferedRewards, setIsOfferedRewards] = useState(false);
  const [isMarketTransferred, setIsMarketTransferred] = useState(false);


  const loadState = async () => {
    setIsBuyOn(await getIDBVal("buy") ?? false);
    setIsSellOn(await getIDBVal("sell") ?? false);
    setIsNewOn(await getIDBVal("new") ?? false);
    setIsOwnerFeesClaimed(await getIDBVal("claimed_owner_fees") ?? false);
    setIsReflectionFeesClaimed(await getIDBVal("claimed_reflection_fees") ?? false);
    setIsRewardsClaimed(await getIDBVal("claimed_rewards") ?? false);
    setIsMarketVerified(await getIDBVal("market_verified") ?? false);
    setIsOfferedRewards(await getIDBVal("offered_rewards") ?? false);
    setIsMarketTransferred(await getIDBVal("market_transferred") ?? false);
  };

  useEffect(() => {
    loadState();
    if (navigator.storage && navigator.storage.persist)
      navigator.storage.persist().then(persistent => {
        if (persistent)
          console.log("Storage will not be cleared except by explicit user action");
        else
          console.log("Storage may be cleared by the UA under storage pressure.");
      });
  }, []);

  const navigate = useNavigate();
  return (
    <div className="text-2 px-[15px] flex flex-col gap-[10px] justify-center">
      <div className=' text-[18px] my-4 poppins-500 flex justify-between ' style={{}}>
        Advanced Settings <MemoCrossIcon
          onClick={() => {
            navigate(-1);
          }}
          className=' scale-[1.5] cursor-pointer' />
      </div>

      <div className='ml-2 flex flex-col leading-10'>
        <span className="poppins-500 text-f14">Shares</span>
        <span className="poppins-500 text-f12 flex justify-between" onClick={() => {
        }}>Buy Shares <ToggleSwitch name='buy' state={isBuyOn} setState={setIsBuyOn} /></span>
        <span className="poppins-500 text-f12 flex justify-between" >Sell Shares <ToggleSwitch name="sell" state={isSellOn} setState={setIsSellOn} /></span>
        <span className="poppins-500 text-f12 flex justify-between" >New Markets <ToggleSwitch name="new" state={isNewOn} setState={setIsNewOn} /></span>
      </div>

      <div className='ml-2 flex flex-col leading-10'>
        <span className="poppins-500 text-f14">Claimable</span>
        <span className="poppins-500 text-f12 flex justify-between">Owner fees claimed <ToggleSwitch name='claimed_owner_fees' state={isOwnerFeesClaimed} setState={setIsOwnerFeesClaimed} /></span>
        <span className="poppins-500 text-f12 flex justify-between">Reflection fees claimed <ToggleSwitch name='claimed_reflection_fees' state={isReflectionFeesClaimed} setState={setIsReflectionFeesClaimed} /></span>
        <span className="poppins-500 text-f12 flex justify-between">Weekly rewards claimed <ToggleSwitch name='claimed_rewards' state={isRewardsClaimed} setState={setIsRewardsClaimed} /></span>
        <span className="poppins-500 text-f12 flex justify-between">Market claimed <ToggleSwitch name='market_verified' state={isMarketVerified} setState={setIsMarketVerified} /></span>
      </div>

      <div className=' ml-2 flex flex-col leading-10'>
        <span className="poppins-500 text-f14 justify-between">Rewards</span>

        <span className="poppins-500 text-f12 flex justify-between">Weekly rewards<ToggleSwitch name='offered_rewards' state={isOfferedRewards} setState={setIsOfferedRewards} /></span>

        <span className="poppins-500 text-f12 flex justify-between">Market ownership transferred<ToggleSwitch name='market_transferred' state={isMarketTransferred} setState={setIsMarketTransferred} /></span>

      </div>

    </div>
  );
}
