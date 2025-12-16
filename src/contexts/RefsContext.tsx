import React, { useMemo, useRef } from 'react';

export const RefsContext = React.createContext({
  newTodoRef: null as React.RefObject<HTMLInputElement> | null,
  selectedTodoRef: null as React.RefObject<HTMLInputElement> | null,
});

type Props = {
  children: React.ReactNode;
};

export const RefsProvider: React.FC<Props> = ({ children }) => {
  const newTodoRef = useRef<HTMLInputElement>(null);
  const selectedTodoRef = useRef<HTMLInputElement>(null);

  const value = useMemo(
    () => ({
      newTodoRef,
      selectedTodoRef,
    }),
    [],
  );

  return <RefsContext.Provider value={value}>{children}</RefsContext.Provider>;
};
