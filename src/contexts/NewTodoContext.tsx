import React, { useMemo, useState } from 'react';

export const NewTodoContext = React.createContext({
  newTodo: '' as string,
  setNewTodo: (newTodo: string) => {},
});

type Props = {
  children: React.ReactNode;
};

export const NewTodoProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState<string>('');

  const value = useMemo(
    () => ({
      newTodo,
      setNewTodo,
    }),
    [newTodo],
  );

  return (
    <NewTodoContext.Provider value={value}>{children}</NewTodoContext.Provider>
  );
};
