import { UserCardSm } from '../pages/UserProfilePage/UserCardSm';

const UserCardList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div>
      {users?.length ? (
        users.map((user) => <UserCardSm user={user} />)
      ) : (
        <div className="text-2">No holders found</div>
      )}
    </div>
  );
};

export { UserCardList };
