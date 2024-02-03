import React, { useMemo, useState } from 'react';
import { Todos } from '../types/todos';

export const TodosContext = React.createContext({
  todos: [] as Todos[],
  setTodos: (() => {}) as React.Dispatch<React.SetStateAction<Todos[]>>,
});

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todos[]>([]);
  const value = useMemo(() => ({
    todos,
    setTodos,
  }), [todos, setTodos]);

  return (
    <TodosContext.Provider
      value={value}
    >
      {children}
    </TodosContext.Provider>
  );
};
