import React, { useState } from 'react';
import { User } from '../../types/User';
import { AuthForm } from './AuthForm';

type Auth = {
  user: User | null,
  setUser: (user: User | null) => void,
};

export const AuthContext = React.createContext<Auth>({
  user: null,
  setUser: () => {},
});

type Props = {
  children: React.ReactNode,
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <AuthForm setUser={setUser} />;
  }

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};
