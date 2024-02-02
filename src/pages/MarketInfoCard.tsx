import { useAccount } from 'wagmi';
import { useNavigate } from 'react-router-dom';

import { faBookmark as solidBookmark } from '@fortawesome/free-solid-svg-icons';
import { faBookmark as emptyBookmark } from '@fortawesome/free-regular-svg-icons';
import { faBell as solidBell } from '@fortawesome/free-solid-svg-icons';
import { faBell as emptyBell } from '@fortawesome/free-regular-svg-icons';


import {
  PrimaryBtn,
  PrimaryButton,
  SecondaryButton,
  UnderlineButton,
} from '../components/Buttons';
import { twMerge } from 'tailwind-merge';
import { MemoYoutubeLogoSm } from '../SVG/YoutubeLogo';
import { DisplayPrice } from '../components/DisplayPrice';
import { useEffect, useRef, useState } from 'react';
import ShowMoreText from 'react-show-more-text';
import useDrawerState from '../atoms/drawerState';
import { useProtection } from '../Helpers/useProtection';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import toast from 'react-hot-toast';
import useUserState from '../atoms/userState';
import InfoIcon from '../SVG/InfoIcon';
import { Popover, ArrowContainer } from 'react-tiny-popover';
import MemoViewCount from '../SVG/ViewCount';
import MemoSubscribersIcon from '../SVG/SubscribersIcon';
import { compactFormatter } from '../Helpers/bigintUtils';
import MemoVideoCount from '../SVG/VideoCount';
import MemoWebLink from '../SVG/WebLink';
import MemoRedirectIcon from '@/SVG/RedirectIcon';
import { useOwnershipClaimManager } from '@/atoms/OwnershipClaimState';
import { useFirebaseNotificationForMarket, useIsFirebaseOn } from '@/atoms/firebaseState';

export const toJSEpoch = (e: string | number) => +e * 1000;

const MarketInfoCard: React.FC<{
  market: Market;
  preview?: boolean;
  className?: string;
  idx?: number;
}> = ({ market, preview, idx, className }) => {
  console.log(`MarketCard-market: `, market);
  const unInitialisedMarket = !market?.buyPrice;
  const ownershipManager = useOwnershipClaimManager();
  const navigate = useNavigate();
  const descDivRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  const drawerManager = useDrawerState();
  const [protect] = useProtection();
  const [userState] = useUserState();
  const account = useAccount();
  const [marketOnFirebase, setMarketOnFirebase] = useFirebaseNotificationForMarket();
  const [isFirebaseOn,] = useIsFirebaseOn();

  const handleAddToWatchlist = async () => {
    console.log('Add to watchlist');
    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/watchlist/add`,
      { ids: [market?.id] },
      {
        headers: { 'session-id': userState?.session_id ?? '' },
      }
    );
    // console.log(`MarketInfo-res: `, res);
    if (!('error' in res.data)) {
      market.watchlisted = true;
      toast('Market added to watchlist');
      console.log('Added to watchlist');
    }
  };
  const handleRemoveFromWatchlist = async () => {
    console.log('Remove from watchlist');
    const res = await axios.post(
      `${import.meta.env.VITE_API_ENDPOINT}/user/watchlist/remove`,
      { ids: [market?.id] },
      {
        headers: { 'session-id': userState?.session_id ?? '' },
      }
    );
    if (!('error' in res.data)) {
      market.watchlisted = false;
      toast('Removed from watchlist');
      console.log('Removed from watchlist');
    }
  };
  const startNotification = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/notification/subscribe_topic`,
        {
          topics: [market?.market_id]
        },
        {
          headers: {
            "session-id": userState?.session_id ?? "",
          },
        }).then(r => {
          if (r.data?.error) {
            toast(r.data?.error);
          } else {
            setMarketOnFirebase(p => new Set([...Array.from(p ?? []), market?.market_id]));
            toast('You turned on notifications for this market');
          }
        });
    } catch (error) {
      toast('Something went wrong!');
    }
  };
  const stopNotification = async () => {
    try {
      await axios.post(`${import.meta.env.VITE_API_ENDPOINT}/notification/unsubscribe_topic`,
        {
          topics: [market?.market_id]
        },
        {
          headers: {
            "session-id": userState?.session_id ?? "",
          },
        }).then(r => {
          if (r.data?.error) {
            toast(r.data?.error);
          } else {
            setMarketOnFirebase(p => {
              const newSet = new Set(p);
              newSet.delete(market?.market_id);
              return newSet;
            });
            toast('You turned off notifications for this market');
          }
        });
    } catch (error) {
      toast('Something went wrong!');
    }
  };

  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  useEffect(() => {
    console.log(`expanded-c${expanded}`);
  }, [expanded]);
  return (
    <div
      role={preview ? 'cell' : 'button'}
      className={twMerge(
        `p-[10px] pb-1 rounded-[10px] justify-between flex gap-[15px] w-full ${preview ?? 'bg-white'
        } `,
        className
      )}
      onClick={() => !preview && navigate('/markets/' + market.market_id)}
    >
      <div className="flex flex-col mt-5 gap-[3px] items-center  justify-start ">
        <img
          src={market?.img_url}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = '/img_placeholder.svg';
            e.currentTarget.classList.remove('img-loading');
          }}
          loading="lazy"
          className="max-w-[60px] min-w-[60px] min-h-[60px] max-h-[60px] rounded-[5px] img-loading object-cover"
        />
        <div className="flex items-center gap-1">
          <span className="font-semibold text-f14">
            #{market?.rank || 'New'}
          </span>
          <Popover
            onClickOutside={() => setIsPopoverOpen(false)}
            isOpen={isPopoverOpen}
            positions={['bottom']} // preferred positions by priority
            containerStyle={{ zIndex: '1000', marginRight: '5px' }}
            content={({ position, childRect, popoverRect }) => (
              <ArrowContainer // if you'd like an arrow, you can import the ArrowContainer!
                position={position}
                childRect={childRect}
                popoverRect={popoverRect}
                arrowColor={'white'}
                arrowSize={10}
                // arrowStyle={{ opacity: 1 }}
                // className=" shadown"
                arrowClassName=" popover-arrow "
              >
                <ChannelDetails market={market} />
              </ArrowContainer>
            )}
            padding={10}
          >
            <button
              className="text-2"
              onClick={() => setIsPopoverOpen(!isPopoverOpen)}
            >
              <InfoIcon />
            </button>
          </Popover>
        </div>
      </div>
      <div className="flex flex-col items-start w-full ">
        <div
          className={`flex justify-between w-full mb-[2px] mt-${unInitialisedMarket ? '1' : '2'
            } `}
        >
          <div className="flex items-center gap-1">
            <span className="font-semibold text-f14">{market.name}</span>
            <a
              href={`https://youtube.com/@${market.social_handle}`}
              target="_blank"
            >
              <MemoYoutubeLogoSm className="mb-[2px]" />
            </a>
          </div>
        </div>
        {unInitialisedMarket ? null : (
          <DisplayPrice
            className="text-2"
            compact
            active
            price={BigInt(market.buyPrice)}
          />
        )}
        {market?.on_chain || market?.shares ? (
          <div className="flex justify-between w-full my-2 mb-3 ">
            <div className="flex gap-2">
              <PrimaryButton
                onClick={() =>
                  protect(() => drawerManager.openBuyDrwer(market))
                }
                className="px-3 text-f12"
              >
                Buy
              </PrimaryButton>
              <SecondaryButton
                onClick={() =>
                  protect(() => drawerManager.openSellDrawer(market))
                }
                className="px-3 text-f12"
              >
                Sell
              </SecondaryButton>
              {account.address ? (
                market.claimed ? (
                  <img
                    alt="Verified"
                    title="Market ownership verified"
                    src={'/ClaimSuccess.png'}
                    className="w-8 h-8 mt-1"
                  />
                ) : (
                  <UnderlineButton
                    onClick={() => ownershipManager.startOwnershipClaim(market)}
                    className="flex items-center gap-1 ml-1 underline "
                  >
                    Claim <MemoRedirectIcon />
                  </UnderlineButton>
                )
              ) : null}
            </div>

            <div className="flex">
              {/* watchlisted key is only present if logged in, here its checking for loggedin status */}
              {market && isFirebaseOn && 'watchlisted' in market ? (
                (marketOnFirebase?.has(market?.market_id)) ? (
                  <FontAwesomeIcon
                    height={30}
                    className="h-8 mr-4 cursor-pointer text-brand"
                    icon={solidBell}
                    onClick={stopNotification}
                  />
                ) : (
                  <FontAwesomeIcon
                    height={30}
                    className="h-8 mr-4 cursor-pointer text-brand"
                    icon={emptyBell}
                    onClick={startNotification}
                  />
                )
              ) : null}

              {market && 'watchlisted' in market ? (
                market?.watchlisted ? (
                  <FontAwesomeIcon
                    height={30}
                    className="h-8 mr-4 cursor-pointer text-brand"
                    icon={solidBookmark}
                    onClick={() => handleRemoveFromWatchlist()}
                  />
                ) : (
                  <FontAwesomeIcon
                    height={30}
                    className="h-8 mr-4 cursor-pointer text-brand"
                    icon={emptyBookmark}
                    onClick={() => handleAddToWatchlist()}
                  />
                )
              ) : null}
            </div>
          </div>
        ) : (
          <PrimaryBtn
            onClick={() => protect(() => drawerManager.openBuyDrwer(market))}
            className="p-1 text-[white] text-[12px] w-[70px] h-fit min-w-fit font-semibold rounded-[4px] px-2 my-2 mb-3"
          >
            Buy 1st Share
          </PrimaryBtn>
        )}
        <div
          className={
            'w-full  text-2 text-f10 ' +
            (unInitialisedMarket ? 'flex justify-between items-center' : '')
          }
        >
          <div
            ref={descDivRef}
            className={
              'mb-1 text-f12 !font-[400] max-h-[212px] pr-3 relative overflow-auto w-full'
            }
          >
            <ShowMoreText
              /* Default options */
              lines={5}
              more={
                <span className="text-transparent before:cursor-pointer before:block before:w-full before:h-[34px] before:absolute transparent-gradient before:bottom-0  before:-z-1  z-[1000] ">
                  S
                </span>
              }
              less={<div className="cursor-pointer text-brand ">Show less</div>}
              className="content-css overflow-anywhere poppins-500"
              anchorClass="show-more-less-clickable"
              onClick={(ex: any) => {
                setExpanded(ex);
              }}
              expanded={expanded}
              width={0}
              truncatedEndingComponent={'...'}
            >
              <div className="Poppins-custom-abc">{market.description}</div>
            </ShowMoreText>
          </div>
        </div>
      </div>
    </div>
  );
};

export { MarketInfoCard };

const ChannelDetails: React.FC<{ market: Market; }> = ({ market }) => {
  return (
    <div className="flex flex-col gap-3 bg-white rounded-md shadow-sm p-7 text-2 text-f12">
      <div className="flex items-center gap-3 ">
        <MemoWebLink />
        <a
          target="_blank"
          href={`https://youtube.com/@${market.social_handle}`}
        >
          www.youtube.com/@{market.social_handle}
        </a>
      </div>
      <div className="flex items-center gap-3 ">
        <MemoSubscribersIcon />
        {compactFormatter.format(123312312312)} subscribers
      </div>
      <div className="flex items-center gap-3 ">
        <MemoVideoCount />
        {(12321).toLocaleString()} videos
      </div>
      <div className="flex items-center gap-3 ">
        <MemoViewCount />
        {(23132131).toLocaleString()} views
      </div>
    </div>
  );
};
