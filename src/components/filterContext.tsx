import React, { useMemo, useState } from 'react';

export const CompletedContext = React.createContext({
  isCompletedSelected: false,
  setIsCompletedSelected: (isCompletedSelected: boolean) => {
    // eslint-disable-next-line no-console
    console.log(isCompletedSelected);
  },
});

type PropsCompleted = {
  children: React.ReactNode;
};

export const CompletedProvider: React.FC<PropsCompleted> = ({ children }) => {
  const [isCompletedSelected, setIsCompletedSelected] = useState(false);

  const value = useMemo(
    () => ({
      isCompletedSelected,
      setIsCompletedSelected,
    }),
    [isCompletedSelected],
  );

  return (
    <CompletedContext.Provider value={value}>
      {children}
    </CompletedContext.Provider>
  );
};

export const ActiveContext = React.createContext({
  isActiveSelected: false,
  setIsActiveSelected: (isActiveSelected: boolean) => {
    // eslint-disable-next-line no-console
    console.log(isActiveSelected);
  },
});

type PropsActive = {
  children: React.ReactNode;
};

export const ActiveProvider: React.FC<PropsActive> = ({ children }) => {
  const [isActiveSelected, setIsActiveSelected] = useState(false);

  const value = useMemo(
    () => ({
      isActiveSelected,
      setIsActiveSelected,
    }),
    [isActiveSelected],
  );

  return (
    <ActiveContext.Provider value={value}>{children}</ActiveContext.Provider>
  );
};

export const AllContext = React.createContext({
  isAllSelected: true,
  setIsAllSelected: (isAllSelected: boolean) => {
    // eslint-disable-next-line no-console
    console.log(isAllSelected);
  },
});

type PropsAll = {
  children: React.ReactNode;
};

export const AllProvider: React.FC<PropsAll> = ({ children }) => {
  const [isAllSelected, setIsAllSelected] = useState(true);

  const value = useMemo(
    () => ({
      isAllSelected,
      setIsAllSelected,
    }),
    [isAllSelected],
  );

  return <AllContext.Provider value={value}>{children}</AllContext.Provider>;
};
