import React, { createContext, ReactNode, useState } from 'react';
import { Errors } from '../types/Errors';

type Props = {
  children: ReactNode,
};

type ContextValue = {
  errorMessage: Errors | null,
  setErrorMessage: (message: Errors | null) => void,
  isHiddenNotification: boolean,
  setIsHiddenNotification: (value: boolean) => void,
};

export const NotificationContext = createContext({} as ContextValue);

export const NotificationContextProvider: React.FC<Props> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<Errors | null>(null);
  const [isHiddenNotification, setIsHiddenNotification] = useState(true);

  const contextValue = {
    errorMessage,
    setErrorMessage,
    isHiddenNotification,
    setIsHiddenNotification,
  };

  return (
    <NotificationContext.Provider value={contextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
