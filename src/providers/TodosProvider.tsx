import React, { useMemo } from 'react';
import { Todo } from '../types/Todo';
import { useLocaleStorage } from '../hooks/useLocaleStorage';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodosContext = React.createContext<TodosContextType>({
  todos: [] as Todo[],
  setTodos: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);

  const value = useMemo(() => (
    {
      todos,
      setTodos,
    }
  ), [todos, setTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
