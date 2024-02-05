import React, { useMemo } from 'react';
import { Todos } from '../types/todos';
import { useLocalStorage } from '../hooks/useLocalStorage';

interface TodosContextType {
  todos: Todos[];
  setTodos: (todos: Todos[]) => void;
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});
type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todos[]>('todos', []);
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
