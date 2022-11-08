import React, {
  createContext,
  ReactNode,
  useState,
} from 'react';
import { User } from '../../../types/User';
import { AuthForm } from '../AuthForm';

export const AuthContext = createContext<User | null>(null);

type Props = {
  children: ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <AuthForm onLogin={setUser} />;
  }

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};
