import { useNavigate } from 'react-router-dom';
import { PrimaryBtn } from './Buttons';

const MarketCreateCard: React.FC<{ keyword: string }> = ({ keyword }) => {
  const navigate = useNavigate();
  const redirect = () => {
    navigate(`/add?keyword=${keyword}`);
  };
  return (
    <div className="flex flex-col items-center w-full bg-white p-horizontalSm">
      <div className="mb-4 text-f14 text-2">
        Market "{keyword}" is not found
      </div>
      <PrimaryBtn
        className="w-[fit-content] min-w-[fit-content] text-[14px] py-[5px] px-[7px]"
        onClick={redirect}
      >
        Add Market
      </PrimaryBtn>
    </div>
  );
};

export { MarketCreateCard };
