import { User } from './types/User';
import { UserWarning } from './UserWarning';
import { Registration } from './components/Registration/Registration';
import { useLocalStorage } from './app/hooks/useLocalStorage';
import { TodoApp } from './components/TodoApp/TodoApp';

const USER_ID = 10326;

export const App: React.FC = () => {
  const [
    currentUser,
    setCurrentUser,
  ] = useLocalStorage<User | null>('user', null);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <>
      {currentUser
        ? <TodoApp currentUser={currentUser} />
        : <Registration setCurrentUser={setCurrentUser} />}
    </>
  );
};
