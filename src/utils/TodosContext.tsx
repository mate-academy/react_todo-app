import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from './UseLocalStorage';

type Props = {
  children: React.ReactNode;
};

type ContextType = {
  todos: Todo[],
  setTodos: ((v: Todo[]) => void),
};

const initialValue: ContextType = {
  todos: [],
  setTodos: () => {},
};

export const TodosContext = React.createContext(initialValue);

export const TodosProvider: React.FC<Props> = ({ children }) => {
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
