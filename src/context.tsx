import { createContext, FC, useState } from 'react';
import { User } from './types/User';
import { Error } from './enums/Error';
import { useLocalStorage } from './hooks/useLocalStorage';

type ContextProps = {
  user: null | User,
  setUser: (value: null | User) => void,
  currentError: Error,
  setCurrentError: (value: Error) => void,
};

export const Context = createContext<ContextProps>({
  user: null,
  setUser: () => {},
  currentError: Error.RESET,
  setCurrentError: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User | null>('user', null);
  const [currentError, setCurrentError] = useState<Error>(Error.RESET);

  const contextValue = {
    user,
    setUser,
    currentError,
    setCurrentError,
  };

  return (
    <Context.Provider value={contextValue}>
      {children}
    </Context.Provider>
  );
};
