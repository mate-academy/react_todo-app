import React, { useState } from 'react';
import { Errors } from '../../types/Errors';

interface ErrorContextType {
  error: Errors,
  setError: (error: Errors) => void,
}

export const ErrorContext = React.createContext<ErrorContextType>({
  error: Errors.NONE,
  setError: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ErrorProvider = ({ children }: Props) => {
  const [error, setError] = useState(Errors.NONE);
  const values = {
    error,
    setError,
  };

  return (
    <ErrorContext.Provider value={values}>
      {children}
    </ErrorContext.Provider>
  );
};
