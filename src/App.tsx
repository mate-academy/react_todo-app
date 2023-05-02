import { FC, useState } from 'react';
import { AuthorizationPage } from './pages/AuthorizationPage';
import { TodosPage } from './pages/TodosPage';
import { User } from './types/User';

const getLocalUser = () => {
  const stringUser = localStorage.getItem('user');

  if (stringUser) {
    return JSON.parse(stringUser);
  }

  return null;
};

export const App: FC = () => {
  const [user, setUser] = useState<User | null>(getLocalUser());

  return (
    <>
      {user
        ? <TodosPage user={user} />
        : <AuthorizationPage setUser={setUser} />}
    </>
  );
};
