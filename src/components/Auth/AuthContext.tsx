import React, { useState } from 'react';
import { User } from '../../types/User';

export const AuthContext = React.createContext<User | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AuthProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    setUser({
      id: 1788,
      name: 'Tania',
      email: 'uasmiyka@gmail.com',
    });
  }

  return (
    <AuthContext.Provider value={user}>
      {children}
    </AuthContext.Provider>
  );
};
