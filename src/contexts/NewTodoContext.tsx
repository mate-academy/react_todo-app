import React, { useMemo, useState } from 'react';

interface NewTodoContextType {
  newTodo: string;
  setNewTodo: (newTodo: string) => void;
}

export const NewTodoContext = React.createContext<NewTodoContextType>({
  newTodo: '',
  setNewTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const NewTodoProvider: React.FC<Props> = ({ children }) => {
  const [newTodo, setNewTodo] = useState('');

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
