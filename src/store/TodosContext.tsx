import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type Props = {
  children: React.ReactNode,
};

type TodoContextType = {
  todos: Todo[],
  setTodos: (v:Todo[]) => void,
};

export const TodosContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo>('todos', []);

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
