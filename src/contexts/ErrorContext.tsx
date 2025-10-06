import React, { useContext, useEffect, useMemo, useState } from 'react';

interface ErrorContextType {
  errorMessage: string;
  setErrorMessage: React.Dispatch<React.SetStateAction<string>>;
  isHiddenErrorMessage: boolean;
  setIsHiddenErrorMessage: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ErrorContext = React.createContext<ErrorContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const ErrorProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState('');
  const [isHiddenErrorMessage, setIsHiddenErrorMessage] = useState(true);

  useEffect(() => {
    if (!isHiddenErrorMessage) {
      const timer = setTimeout(() => setIsHiddenErrorMessage(true), 3000);

      return () => clearTimeout(timer);
    }

    return undefined;
  }, [isHiddenErrorMessage]);

  const value = useMemo(
    () => ({
      errorMessage,
      setErrorMessage,
      isHiddenErrorMessage,
      setIsHiddenErrorMessage,
    }),
    [errorMessage, isHiddenErrorMessage],
  );

  return (
    <ErrorContext.Provider value={value}>{children}</ErrorContext.Provider>
  );
};

export function useErrorContext() {
  const ctx = useContext(ErrorContext);

  if (!ctx) {
    throw new Error('useErrorContext must be used within an ErrorProvider');
  }

  return ctx;
}
