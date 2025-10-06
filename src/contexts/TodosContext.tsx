import React, { useContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';

interface TodosContextType {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export function useTodosContext() {
  const ctx = useContext(TodosContext);

  if (!ctx) {
    throw new Error('useTodosContext must be used within an TodosProvider');
  }

  return ctx;
}
