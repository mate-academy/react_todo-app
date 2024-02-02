import React, { useMemo } from 'react';
import { useLocaleStorage } from '../hooks/useLocaleStorage';

export enum Status {
  All = '#/',
  Active = '#/active',
  Completed = '#/completed',
}

type StatusContextType = {
  selectedStatus: Status;
  setSelectedStatus: React.Dispatch<React.SetStateAction<Status>>;
};

export const StatusContext = React.createContext<StatusContextType>({
  selectedStatus: Status.All,
  setSelectedStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const StatusProvider: React.FC<Props> = ({ children }) => {
  const [selectedStatus, setSelectedStatus] = useLocaleStorage<Status>(
    'status',
    Status.All,
  );

  const value = useMemo(() => (
    {
      selectedStatus,
      setSelectedStatus,
    }
  ), [selectedStatus, setSelectedStatus]);

  return (
    <StatusContext.Provider value={value}>
      {children}
    </StatusContext.Provider>
  );
};
