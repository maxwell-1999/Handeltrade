import { useAccount, useBalance } from 'wagmi';
import PrimeFadeText from '../../components/PrimeFadeText';
import PrimeText from '../../components/PrimeText';
import { view } from '../../Helpers/bigintUtils';
import useUserState, { useOtherUserState } from '../../atoms/userState';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { formatAddress } from '../../Helpers/web3utils';

const UserCard: React.FC<any> = () => {
  const params = useParams();
  const account = useAccount();
  const { address } = params?.user_addr
    ? { address: params.user_addr }
    : account;
  const [userState, setUserState] = params?.user_addr
    ? useOtherUserState()
    : useUserState();

  const { data, isError, isLoading } = useBalance({
    address: address,
    watch: true,
  });

  if (params?.user_addr) {
    axios
      .get(
        `${import.meta.env.VITE_API_ENDPOINT}/user/address/${params.user_addr}`
      )
      .then((res) => {
        setUserState(res.data.data);
      });
  }

  return (
    <div className="flex flex-col items-center justify-center w-full h-1/5 px-horizontalSm">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex w-full">
          {/* profile img section */}
          <span className="flex flex-grow">
            <img
              className=" rounded-[10px] mr-4  w-[60px] h-[60px] img-loading"
              // height={20}
              src={userState?.img_url}
              alt="user profile"
            />
            {/* demographics */}
            <span className="flex flex-col">
              <PrimeText>{userState?.first_name}</PrimeText>
              <PrimeText>{userState?.last_name}</PrimeText>
              <PrimeFadeText>{userState?.email}</PrimeFadeText>
              {params.user_addr && (
                <span className=" max-w-[70px] bg-gray-200 rounded-lg p-2">
                  {formatAddress(userState?.public_address)}{' '}
                </span>
              )}
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
