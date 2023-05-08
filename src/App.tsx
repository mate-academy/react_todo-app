import { FC, useState } from 'react';
import { HashRouter } from 'react-router-dom';
import { AuthorizationPage } from './pages/AuthorizationPage';
import { TodosPage } from './pages/TodosPage';
import { User } from './types/User';

const getLocalUser = (): User | null => {
  const stringUser: string | null = localStorage.getItem('user');

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
        ? (
          <HashRouter>
            <TodosPage user={user} />
          </HashRouter>
        )
        : <AuthorizationPage setUser={setUser} />}
    </>
  );
};
