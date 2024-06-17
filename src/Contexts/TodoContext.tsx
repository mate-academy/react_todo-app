import React, { useMemo } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../types/Todo';

type TodoContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
};

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);

  const value = useMemo(() => ({ todos, setTodos }), [todos, setTodos]);

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
