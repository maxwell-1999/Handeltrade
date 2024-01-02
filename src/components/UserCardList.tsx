import { UserCardSm } from '../pages/UserProfilePage/UserCardSm';

const UserCardList: React.FC<{ users: User[] }> = ({ users }) => {
  return (
    <div>
      {users.map((user) => (
        <UserCardSm user={user} />
      ))}
    </div>
  );
};

export { UserCardList };
