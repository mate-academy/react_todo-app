import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from './useLocalStorage';

type TodosContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const value = useMemo(() => ({ todos, setTodos }), [todos, setTodos]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
