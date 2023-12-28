const UserCardSm: React.FC<any> = ({ user }) => {
  return (
    <div className="flex flex-col items-center justify-center w-full ">
      <div className="flex flex-col items-center justify-center w-full h-full">
        <div className="flex w-full">
          {/* profile img section */}
          <span className="flex flex-grow">
            <img
              className="w-[45px] h-[45px] rounded-[5px] mr-[10px]"
              // height={30}
              // width={30}

              src={user.img_url}
              alt="user profile"
            />
            {/* demographics */}
            <span className="flex flex-col">
              <span className="font-semibold text-f14">
                <span className=" text-f14 font-[500] px-2 py-1 rounded-[5px] text-slate-900 bg-lightBrand">
                  #{user.id}
                </span>{' '}
                {user.first_name + ' ' + user.first_name}
              </span>
              {/* <PrimeText>{user.last_name}</PrimeText> */}
              <span className="mt-1 font-semibold text-2 text-f12">
                {user.email}
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
