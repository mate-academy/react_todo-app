import React, { useState } from 'react';
import { User } from '../types/User';
import { useLocalStorage } from './useLocalStorage';
import { GlobalContent } from '../types/GlobalContent';

interface Props {
  children: React.ReactNode,
}

export const GlobalContext = React.createContext<GlobalContent>({
  user: null,
  setUser: () => {},
  inProcessing: [],
  setProcessingIDs: () => {},
});

export const GlobalProvider: React.FC<Props> = ({ children }) => {
  const [user, setUser] = useLocalStorage<User>('user', null);
  const [inProcessing, setProcessingIDs] = useState([0]);

  const contextValue = {
    user,
    setUser,
    inProcessing,
    setProcessingIDs,
  };

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  );
};
