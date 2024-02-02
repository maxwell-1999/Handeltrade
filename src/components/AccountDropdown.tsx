import { useAccount, useDisconnect, useBalance, useNetwork } from 'wagmi';
import useUserState from '../atoms/userState';
import { formatAddress } from '../Helpers/web3utils';
import useDrawerState from '../atoms/drawerState';
import toast from 'react-hot-toast';
import { useState } from 'react';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { view, viewDec } from '../Helpers/bigintUtils';
import { useProtection } from '../Helpers/useProtection';
import CopyIcon from '../SVG/CopyIcon';
import DisconnectIcon from '../SVG/DisconnectIcon';
import ExportIcon from '../SVG/ExportIcon';
import ClickAwayListener from 'react-click-away-listener';
import { useIsFirebaseOn } from '@/atoms/firebaseState';
import { faBell as solidBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as emptyBell } from '@fortawesome/free-regular-svg-icons';
import { getFirebaseDeviceToken } from '@/lib/firebaseMessaging';

const AccountDropdown: React.FC<any> = ({ }) => {
  const account = useAccount();
  const [userState, setUserState] = useUserState();
  const [protect] = useProtection();
  const { data, isError, isLoading } = useBalance({
    address: account.address,
    watch: true,
  });
  const drawerManager = useDrawerState();
  const { disconnect } = useDisconnect();
  const [show, setShow] = useState(false);
  const [isFirebaseOn, setIsFirebaseOn] = useIsFirebaseOn();

  if (!account.address)
    return (
      <button
        className="relative text-[#8F95A4] text-f14 bg-[white] flex items-center gap-3 rounded-[6px]  p-[5px] pr-4"
        onClick={() => drawerManager.openLoginDrawer()}
      >
        <WalletIcon /> Login
      </button>
    );

  return (
    <ClickAwayListener onClickAway={() => setShow(false)}>
      <div
        className="relative  text-[#8F95A4] text-f12 bg-[white] rounded-lg  p-[4px] pl-[6px]"
        role="button"
        onClick={() => {
          setShow((s) => !s);
        }}
      >
        <div className="flex items-center gap-2">
          <WalletIcon />
          {isLoading ? '...' : view(data?.value as bigint)}
          <FontAwesomeIcon
            height={15}
            width={15}
            className="h-6 p-1 rounded-full bg-2 text-[white] cursor-pointer"
            icon={faEthereum}
            onClick={() => { }}
          />
          <span className="p-2 py-[4px]  bg-[#EAEBF0] rounded-lg flex items-center">
            {formatAddress(account.address)}{' '}
            <svg
              width="7"
              height="5"
              viewBox="0 0 7 5"
              fill="none"
              className="ml-1"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M6.04069 0.297363L3.62163 2.90334L1.20258 0.297363L0.459473 1.09964L3.62163 4.51358L5.20272 2.80661L6.7838 1.09964L6.04069 0.297363Z"
                fill="#8F95A4"
              />
            </svg>
          </span>
        </div>
        {show ? (
          <div className="absolute z-50 flex flex-col bg-[#EAEBF0] py-6 top-[110%] w-full gap-2 left-0 rounded-[4px]">
            <div
              className="flex p-1 px-8"
              onClick={(e) => {
                navigator.clipboard.writeText(account.address as string);
                toast('Account copied to clipboard Successfully!');
              }}
            >
              <CopyIcon style={{ marginRight: '5px' }} /> Copy
            </div>
            <div
              className="flex p-1 px-8"
              onClick={() => {
                disconnect();
                setUserState(null);
              }}
            >
              <DisconnectIcon style={{ marginRight: '5px' }} /> Disconnect
            </div>
            <div
              className="flex p-1 px-8"
              onClick={() => {
                protect(() => drawerManager.openWalletDrawer());
              }}
            >
              <ExportIcon style={{ marginRight: '5px' }} /> Export Wallet
            </div>
            <div
              className="flex p-1 px-8"
              onClick={() => {
                getFirebaseDeviceToken(userState?.session_id ?? "").then((res) => {
                  if (isFirebaseOn) {
                    setIsFirebaseOn(res);
                    navigator.serviceWorker.getRegistrations()
                      .then((registration) => {
                        console.log({ registration });
                        registration.forEach((reg) => {
                          reg.active?.scriptURL.includes("firebase-messaging-sw.js") && reg.unregister().then((res) => {
                            setIsFirebaseOn(false);
                          });
                        });
                      }).catch((err) => {
                        console.log("Error in registering service worker", err);
                      });
                  } else {
                    setIsFirebaseOn(res);
                  }
                });
              }}
            >
              <FontAwesomeIcon
                className="h-6 rounded-full cursor-pointer mr-[5px]"
                icon={isFirebaseOn ? solidBell : emptyBell}
                onClick={() => { }}
              /> Notifications are {isFirebaseOn ? "On" : "Off"}
            </div>
          </div>
        ) : null}
      </div>
    </ClickAwayListener>
  );
};
export { AccountDropdown };
const WalletIcon = () => {
  return (
    <svg
      width="20"
      height="17"
      viewBox="0 0 14 13"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clip-path="url(#clip0_273_713)">
        <path
          d="M5.20658 9.38835V3.61214C5.20646 3.42226 5.24355 3.23421 5.31573 3.05875C5.38791 2.8833 5.49377 2.72387 5.62724 2.5896C5.76072 2.45533 5.9192 2.34885 6.09362 2.27624C6.26805 2.20363 6.45498 2.16632 6.64375 2.16644H13.2735V1.44595C13.275 1.06435 13.1258 0.697753 12.8588 0.426685C12.5918 0.155617 12.2287 0.00224212 11.8494 0.000248465H1.48117C1.09781 -0.00685391 0.727162 0.138556 0.4498 0.404865C0.172439 0.671175 0.0107913 1.03685 0 1.4224V11.5781C0.0115169 11.9631 0.173482 12.3281 0.450765 12.5938C0.728047 12.8595 1.09829 13.0045 1.48117 12.9974H11.8466C12.0344 12.9967 12.2203 12.9587 12.3936 12.8856C12.5668 12.8125 12.724 12.7058 12.8562 12.5715C12.9884 12.4372 13.093 12.278 13.1639 12.103C13.2349 11.928 13.2708 11.7407 13.2697 11.5517V10.8312H6.64001C6.25983 10.8307 5.89538 10.6785 5.62664 10.408C5.3579 10.1375 5.20683 9.77079 5.20658 9.38835Z"
          fill="currentColor"
        />
        <path
          d="M6.63013 4.12968V8.86894C6.63062 9.01242 6.6875 9.14987 6.78835 9.25133C6.88921 9.35278 7.02585 9.41 7.16848 9.41049H13.4621C13.6047 9.41 13.7413 9.35278 13.8422 9.25133C13.943 9.14987 13.9999 9.01242 14.0004 8.86894V4.12968C13.9999 3.98621 13.943 3.84875 13.8422 3.7473C13.7413 3.64585 13.6047 3.58863 13.4621 3.58813H7.16661C7.0243 3.58913 6.88814 3.64656 6.78769 3.74796C6.68724 3.84936 6.63062 3.98653 6.63013 4.12968ZM9.2264 7.57959C9.00783 7.59368 8.79018 7.54045 8.60244 7.42698C8.4147 7.31351 8.26579 7.1452 8.17554 6.94445C8.0853 6.74371 8.058 6.52007 8.09728 6.30333C8.13657 6.08658 8.24057 5.88702 8.39544 5.73124C8.55031 5.57545 8.74869 5.47083 8.96415 5.43131C9.17962 5.39179 9.40194 5.41925 9.6015 5.51004C9.80106 5.60082 9.96838 5.75061 10.0812 5.93947C10.194 6.12832 10.2469 6.34726 10.2329 6.56712C10.2161 6.83011 10.1047 7.07796 9.91946 7.2643C9.73421 7.45064 9.48783 7.56273 9.2264 7.57959Z"
          fill="currentColor"
        />
      </g>
      <defs>
        <clipPath id="clip0_273_713">
          <rect width="14" height="13" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};
