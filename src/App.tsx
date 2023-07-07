import { LoginForm } from './components/LoginForm';
import { TodoApp } from './components/TodoApp';
import { User } from './types/User';
import { useLocalStorage } from './utils/useLocalStorage';

export const App: React.FC = () => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);

  return (
    <>
      {user ? (
        <TodoApp
          user={user}
          setUser={setUser}
        />
      ) : (
        <LoginForm setUser={setUser} />
      )}
    </>
  );
};
