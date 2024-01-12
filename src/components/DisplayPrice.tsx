import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { view } from '../Helpers/bigintUtils';
import { E18 } from '../Helpers/constants';
import EthIcon from '../SVG/EthIcon';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';
import { twJoin } from 'tailwind-merge';

const DisplayPrice: React.FC<{
  price: bigint;
  active?: boolean;
  compact?: boolean;
  className?: string;
}> = ({ price, active, compact, className }) => {
  const dollarValue = 2596n;
  console.log(`deb-dollar value: `, dollarValue);
  console.log(`deb-dollar value: `, price);

  return (
    <div className={twJoin('flex items-center text-f10 ', className)}>
      {compact ? null : <span>Price&nbsp;:&nbsp;</span>}
      <span
        className={
          `text-${compact ? 'f12' : 'f10'} ` + (active ? 'text-brand' : '')
        }
      >
        {view(price)}
      </span>
      &nbsp;
      <FontAwesomeIcon
        height={8}
        width={8}
        className={`h-[8px] mb-[2px] rounded-full p-1  bg-${
          active ? 'brand' : '2'
        } text-white cursor-pointer`}
        icon={faEthereum}
        onClick={() => {}}
      />
      &nbsp;|&nbsp;<span>${view(price * dollarValue)}</span>
    </div>
  );
};

export { DisplayPrice };
