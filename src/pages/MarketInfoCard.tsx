import { useNetwork } from 'wagmi';
import MemoMoreIcon from '../SVG/MoreIcon';
import { useNavigate } from 'react-router-dom';
import { SecondaryBtn } from '../components/Buttons';
import { twMerge } from 'tailwind-merge';
import { MemoYoutubeLogoSm } from '../SVG/YoutubeLogo';
import { DisplayPrice } from '../components/DisplayPrice';
import { useEffect, useRef, useState } from 'react';
import ShowMoreText from 'react-show-more-text';

export const toJSEpoch = (e: string | number) => +e * 1000;

const MarketInfoCard: React.FC<{
  market: Market;
  preview?: boolean;
  className?: string;
  idx?: number;
}> = ({ market, preview, idx, className }) => {
  console.log(`MarketCard-market: `, market);
  const nonPrice = !market?.buyPrice;
  const network = useNetwork();
  const navigate = useNavigate();
  const descDivRef = useRef<HTMLDivElement | null>(null);
  const [expanded, setExpanded] = useState(false);
  useEffect(() => {
    console.log(`expanded-c${expanded}`);
  }, [expanded]);
  return (
    <div
      role={preview ? 'cell' : 'button'}
      className={twMerge(
        `p-[10px] rounded-[10px] justify-between flex gap-[15px] w-full ${
          preview ?? 'bg-white'
        } `,
        className
      )}
      onClick={() => !preview && navigate('/markets/' + market.market_id)}
    >
      <div className="flex flex-col gap-[3px] items-center justify-center ">
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
          className={`flex justify-between w-full mb-[2px] mt-${
            nonPrice ? '1' : '2'
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
        <div
          className={
            'w-full  text-2 text-f10 ' +
            (nonPrice ? 'flex justify-between items-center' : '')
          }
        >
          <div
            ref={descDivRef}
            className={
              'mb-1 !font-[400] max-h-[220px]   relative overflow-auto'
            }
          >
            <ShowMoreText
              /* Default options */
              lines={5}
              more={
                <span className=" text-transparent before:block before:w-full before:h-[40px] before:absolute transparent-gradient before:bottom-0  before:-z-1  z-[1000] ">
                  Show more
                </span>
              }
              less="Show less"
              className="content-css"
              anchorClass="show-more-less-clickable"
              onClick={(ex) => {
                setExpanded(ex);
              }}
              expanded={expanded}
              // width={280}
              truncatedEndingComponent={'... '}
            >
              {/* safasdfadssdfsadf sdafasdfasd fasd fasd fas dfsd */}
              {market.description}
            </ShowMoreText>
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
  );
};

export { MarketInfoCard };
