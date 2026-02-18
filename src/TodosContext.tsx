import React, { useContext, useMemo } from 'react';
import type { Todo } from './types/Todo';
import { useLocaleStorage } from './types/useLocaleStorage';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodosContext = React.createContext<TodosContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodosContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos, setTodos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodosContext = () => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodosContext must be used inside TodosContextProvider');
  }

  return context;
};

// | ----------------------- | ---------------------- |
// | `TodosContext`          | context object         |
// | `TodosContextProvider`  | your wrapper component |
// | `TodosContext.Provider` | provider               |
// | ----------------------- | ---------------------- |
