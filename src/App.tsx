import { useState, useCallback } from 'react';
import { User } from './types/User';
import { UserWarning } from './UserWarning';
import { Registration } from './components/Registration/Registration';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoApp } from './components/TodoApp/TodoApp';

const USER_ID = 10326;

export const App: React.FC = () => {
  const [
    currentUser,
    setCurrentUser,
  ] = useLocalStorage<User | null>('user', null);

  const [errorType, setErrorType] = useState<string | null>(null);
  const setError = useCallback((typeOfError: string | null) => {
    setErrorType(typeOfError);
    setTimeout(() => setErrorType(null), 3000);
  }, [errorType]);

  if (!USER_ID) {
    return <UserWarning />;
  }

  return (
    <>
      {currentUser
        ? (
          <TodoApp
            currentUser={currentUser}
            setErrorType={setErrorType}
            errorType={errorType}
            setError={setError}
          />
        )
        : (
          <Registration
            setCurrentUser={setCurrentUser}
            setErrorType={setErrorType}
            errorType={errorType}
            setError={setError}
          />
        )}
    </>
  );
};
