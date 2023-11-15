import React, { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/todo';

type ProviderProps = {
  children: React.ReactNode,
};

type ContextType = {
  todos: Todo[],
  setTodos: ((v: Todo[]) => void),
};

const initialValue: ContextType = {
  todos: [],
  setTodos: () => {},
};

export const TodosContext = React.createContext<ContextType>(initialValue);

export const TodosProvider: React.FC<ProviderProps> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const value = useMemo(() => ({
    todos,
    setTodos,
  }), [todos, setTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
