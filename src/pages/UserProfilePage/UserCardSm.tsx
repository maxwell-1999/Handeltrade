import { useNavigate } from "react-router-dom";
import { faCircleQuestion } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { view } from "../../Helpers/bigintUtils";


const UserCardSm: React.FC<any> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => user.id && navigate('/profile/' + user.public_address)}
      className="flex flex-col items-center justify-center w-full cursor-pointer my-2 ">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex w-full">
          {/* profile img section */}
          <span className="flex flex-grow">
            {user.img_url ? <img
              className="w-[45px] h-[45px] rounded-[5px] mr-[10px]"
              // height={30}
              // width={30}
              src={user.img_url}
              alt="user profile"
            /> :
              <FontAwesomeIcon
                height={27}
                width={27}
                className="w-[45px] h-[45px] mr-[7px] p-1 text-2 cursor-pointer"
                icon={faCircleQuestion}
                onClick={() => { }}
              />
            }
            {/* demographics */}
            <span className="flex flex-col w-full">
              <span className="font-semibold text-f14">
                <span className=" text-f14 font-[500] px-2 py-1 rounded-[5px] text-slate bg-lightBrand">
                  #{user.id ? user.id : "-"}
                </span>{' '}
                {user.first_name ? user.first_name : <span className="text-[grey]">{user.public_address}</span>}
              </span>
              {/* <PrimeText>{user.last_name}</PrimeText> */}
              <span className="flex justify-between w-full text-2 ">
                <span className="mt-1 font-semibold text-f12">
                  {user?.email ? user.email : "No details"}
                </span>
                {user?.shares ? view(user.shares) + " Shares" : ""}
              </span>
            </span>
          </span>
          {/* finance */}
          <span className="flex flex-col min-w-4">
            {user.country && (
              <span className="mt-1 font-semibold text-2 text-f12">
                {user.country}
              </span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export { UserCardSm };
