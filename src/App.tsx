import { HashRouter } from 'react-router-dom';
import { TodoPage } from './pages/TodoPage';
import { AuthorizationPage } from './pages/AuthorizationPage';
import { useLocalStorage } from './utils/useLocalStorage';
import { User } from './types/User';

export const App: React.FC = () => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);

  return (
    <>
      {user
        ? (
          <HashRouter>
            <TodoPage user={user} />
          </HashRouter>
        )
        : <AuthorizationPage setUser={setUser} />}
    </>
  );
};
