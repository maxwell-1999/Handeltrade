import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { view } from '../Helpers/bigintUtils';
import { E18 } from '../Helpers/constants';
import EthIcon from '../SVG/EthIcon';
import { faEthereum } from '@fortawesome/free-brands-svg-icons';

const DisplayPrice: React.FC<{ price: bigint }> = ({ price }) => {
  const dollarValue = 2596n;
  console.log(`deb-dollar value: `, dollarValue);
  console.log(`deb-dollar value: `, price);

  return (
    <div className="flex items-center text-f10 ">
      <span>Price&nbsp;:&nbsp;</span>
      <span className="text-f12">{view(price)}</span>&nbsp;
      <FontAwesomeIcon
        height={8}
        width={8}
        className="h-[8px] mb-1 rounded-full p-1  bg-2 text-[white] cursor-pointer"
        icon={faEthereum}
        onClick={() => {}}
      />
      &nbsp;|&nbsp;<span>${view(price * dollarValue)}</span>
    </div>
  );
};

export { DisplayPrice };
