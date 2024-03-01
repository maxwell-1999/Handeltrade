import { useIsFirebaseOn } from '@/atoms/firebaseState';
import useUserState from '@/atoms/userState';
import { getFirebaseDeviceToken, subNotificationTopic, unsubNotificationTopic } from '@/lib/firebaseMessaging';
import { getIDBVal, setIDBVal } from '@/utils/indexDB';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

interface ChildProps {
  name: string;
  state: boolean;
  setState: (newState: boolean) => void;
  sessionId?: string;
}

const ToggleSwitch: React.FC<ChildProps> = ({ name, state, setState, sessionId }) => {
  const toggleClass = state ? 'translate-x-6 bg-brandAltBlue' : 'translate-x-1 bg-2';
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
      onClick={async () => {
        const newVal = !state;
        let done = false;
        if (newVal) {
          done = await subNotificationTopic(name, sessionId ?? "");
        } else {
          done = await unsubNotificationTopic(name, sessionId ?? "");
        }
        if (!done) {
          toast.error("Failed to update settings");
        } else {
          setState(newVal);
          setIDBVal(name.trim(), newVal);
        }
      }}
    >
      <div className={`w-5 h-5  rounded-full transform duration-300 ease-in-out ${toggleClass}`}></div>
    </span>
  );
};


export default function Settings() {
  const [user, setUser] = useUserState();
  const [isBuyOn, setIsBuyOn] = useState(false);
  const [isNewOn, setIsNewOn] = useState(false);
  const [isSellOn, setIsSellOn] = useState(false);
  const [isOwnerFeesClaimed, setIsOwnerFeesClaimed] = useState(false);
  const [isReflectionFeesClaimed, setIsReflectionFeesClaimed] = useState(false);
  const [isRewardsClaimed, setIsRewardsClaimed] = useState(false);
  const [isMarketVerified, setIsMarketVerified] = useState(false);
  const [isOfferedRewards, setIsOfferedRewards] = useState(false);
  const [isMarketTransferred, setIsMarketTransferred] = useState(false);

  const navigate = useNavigate();
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

  useEffect(() => { if (!user) navigate("/"); }, [user]);

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


  const [isFirebaseOn, setIsFirebaseOn] = useIsFirebaseOn();

  useEffect(() => {
    getIDBVal("is_popup_on").then(async (is_on) => {
      if (!is_on) {
        getFirebaseDeviceToken(user?.session_id ?? "").then(async (res) => {
          if (isFirebaseOn) {
            setIsFirebaseOn(res);
            navigator.serviceWorker.getRegistrations()
              .then(async (registration) => {
                // console.log({ registration });
                // used for deleting the service worker - please don't delete it
                // registration.forEach((reg) => {
                //   reg.active?.scriptURL.includes("firebase-messaging-sw.js") && reg.unregister().then((res) => {
                //     setIsFirebaseOn(false);
                //   });
                // });
                // await storeConfigDataFirebase({ id: "is_popup_on", value: res });
                await setIDBVal("is_popup_on", !!res);
              }).catch((err) => {
                console.log("Error in registering service worker", err);
              });
          } else {
            setIsFirebaseOn(!!res);
            // await storeConfigDataFirebase({ id: "is_popup_on", value: res });
            await setIDBVal("is_popup_on", !!res);
          }
        });
      }
    });
  }, []);

  return (
    <div className="text-2 px-[15px] flex flex-col gap-[10px] justify-center">

      <div className=' text-[18px] mt-10 mb-0 poppins-500 flex justify-between ' style={{}}>
        Advanced Settings
      </div>

      <div className='ml-2 flex flex-col leading-10'>
        <span className="poppins-500 text-f14">Shares</span>
        <span className="poppins-500 text-f12 flex justify-between" onClick={() => {
        }}>Buy Shares <ToggleSwitch sessionId={user?.session_id} name='buy' state={isBuyOn} setState={setIsBuyOn} /></span>
        <span className="poppins-500 text-f12 flex justify-between" >Sell Shares <ToggleSwitch sessionId={user?.session_id} name="sell" state={isSellOn} setState={setIsSellOn} /></span>
        <span className="poppins-500 text-f12 flex justify-between" >New Markets <ToggleSwitch sessionId={user?.session_id} name="new" state={isNewOn} setState={setIsNewOn} /></span>
      </div>

      <div className='ml-2 flex flex-col mt-6 leading-10'>
        <span className="poppins-500 text-f14">Claimable</span>
        <span className="poppins-500 text-f12 flex justify-between">Owner fees claimed <ToggleSwitch sessionId={user?.session_id} name='claimed_owner_fees' state={isOwnerFeesClaimed} setState={setIsOwnerFeesClaimed} /></span>
        <span className="poppins-500 text-f12 flex justify-between">Reflection fees claimed <ToggleSwitch sessionId={user?.session_id} name='claimed_reflection_fees' state={isReflectionFeesClaimed} setState={setIsReflectionFeesClaimed} /></span>
        <span className="poppins-500 text-f12 flex justify-between">Weekly rewards claimed <ToggleSwitch sessionId={user?.session_id} name='claimed_rewards' state={isRewardsClaimed} setState={setIsRewardsClaimed} /></span>
        <span className="poppins-500 text-f12 flex justify-between">Market claimed <ToggleSwitch sessionId={user?.session_id} name='market_verified' state={isMarketVerified} setState={setIsMarketVerified} /></span>
      </div>

      <div className=' ml-2 flex flex-col mt-6 leading-10'>
        <span className="poppins-500 text-f14 justify-between">Rewards</span>

        <span className="poppins-500 text-f12 flex justify-between">Weekly rewards<ToggleSwitch sessionId={user?.session_id} name='offered_rewards' state={isOfferedRewards} setState={setIsOfferedRewards} /></span>

        <span className="poppins-500 text-f12 flex justify-between">Market ownership transferred<ToggleSwitch sessionId={user?.session_id} name='market_transferred' state={isMarketTransferred} setState={setIsMarketTransferred} /></span>
      </div>
    </div>
  );
}
