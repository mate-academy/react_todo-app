import { User } from '../types/User';

type Props = {
  user: User | null,
};

export const UserStatus: React.FC<Props> = ({ user }) => (
  <div className="todoapp__user">
    {user ? `Logged in as: ${user.name}` : 'You need to login'}
  </div>
);
