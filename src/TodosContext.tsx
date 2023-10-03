import React, { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Todo } from './types/Todo';

interface TodosContextValue {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
}

export const TodosContext = React.createContext<TodosContextValue>({
  todos: [],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const value: TodosContextValue = useMemo(() => ({
    todos,
    setTodos,
  }), [todos, setTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
