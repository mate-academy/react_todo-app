import React, { useState } from 'react';
import { User } from '../../types/User';
import { AuthUserForm } from './AuthUserForm';

export const AuthUserContext = React.createContext<User | null>(null);

type Props = {
  children: React.ReactNode;
};

export const AuthUserProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  if (!user) {
    return <AuthUserForm onLogin={setUser} />;
  }

  return (
    <AuthUserContext.Provider value={user}>
      {children}
    </AuthUserContext.Provider>
  );
};
