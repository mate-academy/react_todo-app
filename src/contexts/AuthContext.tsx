import React, { useState } from 'react';

import { AuthForm } from '../components/AuthForm/AuthForm';

import { User } from '../types/User';
import { OnShowErrorFunc } from '../types/OnErrorFunc';

export const AuthContext = React.createContext<User | null>(null);

type Props = {
  children: React.ReactNode;
  hasError: boolean;
  showError: OnShowErrorFunc;
  hideError: () => void;
};

export const AuthProvider: React.FC<Props> = React.memo(
  ({
    children,
    hasError,
    showError,
    hideError,
  }) => {
    const [user, setUser] = useState<User | null>(null);

    return (
      <>
        {user ? (
          <AuthContext.Provider value={user}>
            {children}
          </AuthContext.Provider>
        ) : (
          <AuthForm
            hasError={hasError}
            showError={showError}
            hideError={hideError}
            onLogin={setUser}
          />
        )}
      </>
    );
  },
);
