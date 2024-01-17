import TimeAgo from 'react-timeago';
import MemoTImerIcon from '../SVG/TImerIcon';
import { E18, E8 } from '../Helpers/constants';
import { useNetwork } from 'wagmi';
import useDrawerState from '../atoms/drawerState';
import MemoMoreIcon from '../SVG/MoreIcon';
import { useNavigate } from 'react-router-dom';
import { SecondaryBtn } from './Buttons';
import { view, viewDec } from '../Helpers/bigintUtils';
import { twMerge } from 'tailwind-merge';
import { showShares } from '../pages/UserProfilePage/UserCardSm';
import MemoYoutubeLogo, { MemoYoutubeLogoSm } from '../SVG/YoutubeLogo';
import { DisplayPrice } from './DisplayPrice';
import ShowMoreText from 'react-show-more-text';
import { ReactNode } from 'react';

export const toJSEpoch = (e: string | number) => +e * 1000;

const MarketCard: React.FC<{
  market: Market;
  bottom?: ReactNode;
  preview?: boolean;
  className?: string;
  idx?: number;
}> = ({ market, preview, idx, className, bottom }) => {
  console.log(`MarketCard-market: `, bottom);
  const nonPrice = !market?.buyPrice;
  const network = useNetwork();
  const navigate = useNavigate();
  return (
    <div
      role={preview ? 'cell' : 'button'}
      className={twMerge(
        `p-[10px] rounded-[10px]  flex flex-col w-full ${
          preview ?? 'bg-white'
        } `,
        className
      )}
      onClick={() => !preview && navigate('/markets/' + market.market_id)}
    >
      <div
        role={preview ? 'cell' : 'button'}
        className={twMerge(
          `justify-between flex gap-[15px] w-full ${preview ?? 'bg-white'} `,
          className
        )}
        onClick={() => !preview && navigate('/markets/' + market.market_id)}
      >
        <div className="flex flex-col gap-[3px] items-center mt-5 justify-start ">
          <img
            src={market?.img_url}
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = '/img_placeholder.svg';
              e.currentTarget.classList.remove('img-loading');
            }}
            loading="lazy"
            className="max-w-[40px] min-w-[40px] min-h-[40px] max-h-[40px] rounded-[5px] img-loading object-cover"
          />
          {nonPrice ? null : (
            <span className="font-semibold text-f14">
              #{market?.rank || 'New'}
            </span>
          )}
        </div>
        <div className="flex flex-col items-center w-full ">
          <div
            className={`flex items-start justify-between w-full mb-[2px] mt-${
              nonPrice ? '1' : '2'
            } `}
          >
            <span className="font-semibold text-f14">
              {market.name}
              <a
                className="inline-flex ml-[4px]"
                href={`https://youtube.com/@${market.social_handle}`}
                target="_blank"
              >
                <MemoYoutubeLogoSm className="mb-[2px]" />
              </a>
            </span>
            {nonPrice ? null : (
              <span className="flex items-center text-center cursor-pointer text-f10 text-2 whitespace-nowrap">
                {showShares(market?.shares)}
              </span>
            )}{' '}
          </div>
          <div
            className={
              'w-full  text-2 text-f10 ' +
              (nonPrice ? 'flex justify-between items-center' : '')
            }
          >
            <div
              className={
                'mb-1 !font-[400] ' + (!preview ? 'text-overflow-2-lines' : '')
              }
            >
              {preview
                ? '@' + market.social_handle
                : market.description || '@' + market.social_handle}
              {/* @{market?.social_handle} */}
            </div>
            {nonPrice ? null : (
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-f10">
                  {/* <MemoTImerIcon /> */}
                  {/* <TimeAgo date={toJSEpoch(market.lastUpdated)} /> */}
                  <DisplayPrice
                    active={Boolean(preview)}
                    price={BigInt(market.buyPrice)}
                  />
                </div>
                {preview ? null : (
                  <div className="flex gap-2">
                    <MemoMoreIcon />
                  </div>
                )}
              </div>
            )}
            {nonPrice ? (
              preview ? null : (
                <SecondaryBtn
                  className="p-1 text-[10px] font-semibold rounded-[4px] px-2 "
                  onClick={() => console.log}
                >
                  Visit
                </SecondaryBtn>
              )
            ) : null}
          </div>
        </div>
      </div>

      {bottom || null}
    </div>
  );
};

export { MarketCard };
