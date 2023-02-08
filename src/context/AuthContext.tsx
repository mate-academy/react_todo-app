import {
  createContext,
  FC,
  useState,
} from 'react';

import { User } from '../types/User';

type ContextProps = {
  user: User | null,
  setUser: (value: User | null) => void,
};

export const AuthContext = createContext<ContextProps>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  const contextValue = {
    user,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};
