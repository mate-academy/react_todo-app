import React, { FC, useState } from 'react';
import { ErrorType } from '../types/ErrorType';

type ContextProps = {
  errorType: null | ErrorType,
  setErrorType: (value: null | ErrorType) => void,
  clearError: () => void,

};

export const ErrorContext = React.createContext<ContextProps>({
  errorType: null,
  setErrorType: () => { },
  clearError: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ErrorProvider: FC<Props> = ({ children }) => {
  const [errorType, setErrorType] = useState<ErrorType | null>(null);

  const clearError = () => setErrorType(null);

  const contextValue = {
    errorType,
    setErrorType,
    clearError,
  };

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};
