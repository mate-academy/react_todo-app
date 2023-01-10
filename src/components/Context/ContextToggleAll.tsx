import React, { createContext, useMemo, useState } from 'react';

type ToggleAll = {
  isToggleAllCompleted: boolean;
  setIsToggleAllCompleted: (isToggleAllClicked: boolean) => void;
  isToggleAllUnCompleted: boolean;
  setIsToggleAllUnCompleted: (isToggleAllClicked: boolean) => void;
};

export const ContextToggleAll = createContext<ToggleAll>({
  isToggleAllCompleted: false,
  setIsToggleAllCompleted: () => {},
  isToggleAllUnCompleted: false,
  setIsToggleAllUnCompleted: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const ContextToggleAllProvider: React.FC<Props> = ({ children }) => {
  const [isToggleAllCompleted, setIsToggleAllCompleted] = useState(false);
  const [isToggleAllUnCompleted, setIsToggleAllUnCompleted] = useState(false);

  const contextObj = useMemo(() => ({
    isToggleAllCompleted,
    setIsToggleAllCompleted,
    isToggleAllUnCompleted,
    setIsToggleAllUnCompleted,
  }), [
    isToggleAllCompleted,
    setIsToggleAllCompleted,
    isToggleAllUnCompleted,
    setIsToggleAllUnCompleted,
  ]);

  return (
    <ContextToggleAll.Provider
      value={contextObj}
    >
      {children}
    </ContextToggleAll.Provider>
  );
};
