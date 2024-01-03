import { useAccount, useBalance } from 'wagmi';
import PrimeFadeText from '../../components/PrimeFadeText';
import PrimeText from '../../components/PrimeText';
import { view } from '../../Helpers/bigintUtils';
import useUserState from '../../atoms/userState';

const UserCard: React.FC<any> = () => {
  const { address } = useAccount();
  const { data, isError, isLoading } = useBalance({
    address: address,
  });
  const [userState] = useUserState();
  return (
    <div className="flex flex-col items-center justify-center w-full h-1/3 px-horizontalSm">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex w-full">
          {/* profile img section */}
          <span className="flex flex-grow">
            <img
              className=" rounded-[10px] mr-4  w-[60px] h-[60px]"
              // height={20}
              src={userState?.img_url}
              alt="user profile"
            />
            {/* demographics */}
            <span className="flex flex-col">
              <PrimeText>{userState?.first_name}</PrimeText>
              <PrimeText>{userState?.last_name}</PrimeText>
              <PrimeFadeText>{userState?.email}</PrimeFadeText>
            </span>
          </span>
          {/* finance */}
          <span className="flex flex-col min-w-4">
            <PrimeText style={{ 'align-self': 'flex-end' }}>
              {isLoading ? 'Fetching..' : view(data?.value)}
              &nbsp;ETH
            </PrimeText>
            <PrimeFadeText
              classname=" text-[12px]"
              style={{ alignSelf: 'flex-end', fontWeight: 100 }}
            >
              Wallet Balance
            </PrimeFadeText>
            {userState?.country && (
              <PrimeFadeText classname="" style={{ 'align-self': 'flex-end' }}>
                {userState?.country}
              </PrimeFadeText>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export { UserCard };
