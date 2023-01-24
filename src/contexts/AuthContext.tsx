import { createContext, FC, useState } from 'react';
import { User } from '../types/User';

type ContextProps = {
  user: null | User,
  setUser: (value: null | User) => void,
  createSlug: (value: string | undefined) => string
};

export const AuthContext = createContext<ContextProps>({
  user: null,
  setUser: () => { },
  createSlug: (name = '') => name,
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const createSlug = (name: string | undefined = '') => (
    name.split(' ').join('-')
  );

  const contextValue = {
    user,
    setUser,
    createSlug,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
