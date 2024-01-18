import { UserCardSm } from '../pages/UserProfilePage/UserCardSm';
import { NoDataFound } from './NoDataFound';

const UserCardList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div className="flex flex-col gap-[10px] px-6">
      {users?.length ? (
        users.map((user) => <UserCardSm key={user.id} user={user} />)
      ) : (
        <NoDataFound>No data found</NoDataFound>
      )}
    </div>
  );
};

export { UserCardList };
