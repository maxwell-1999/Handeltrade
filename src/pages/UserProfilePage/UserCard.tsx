import PrimeFadeText from '../../components/PrimeFadeText';
import PrimeText from '../../components/PrimeText';

const UserCard: React.FC<any> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full h-1/3 px-horizontalSm">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex w-full">
          {/* profile img section */}
          <span className="flex flex-grow">
            <img
              className=" rounded-[10px] mr-4 "
              height={30}
              // width={30}
              src={user.img_url}
              alt="user profile"
            />
            {/* demographics */}
            <span className="flex flex-col">
              <PrimeText>{user.first_name}</PrimeText>
              <PrimeText>{user.last_name}</PrimeText>
              <PrimeFadeText>{user.email}</PrimeFadeText>

              <span className="flex gap-4 mt-2 ">
                <span className=" text-f14 font-[500] px-2 py-1 rounded-[5px] text-slate-900 bg-lightBrand">
                  #{user.id}
                </span>
              </span>
            </span>
          </span>
          {/* finance */}
          <span className="flex flex-col min-w-4">
            <PrimeText style={{ 'align-self': 'flex-end' }}>
              {'0.02 ETH'}
            </PrimeText>
            <PrimeFadeText
              classname=" text-[15px]"
              style={{ alignSelf: 'flex-end', fontWeight: 100 }}
            >
              Wallet Balance
            </PrimeFadeText>
            {user.country && (
              <PrimeFadeText classname="" style={{ 'align-self': 'flex-end' }}>
                {user.country}
              </PrimeFadeText>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export { UserCard };
