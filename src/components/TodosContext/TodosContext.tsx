import { useState, createContext, useContext, useMemo } from 'react';
import { Todo } from '../types/Todo';

type TodosContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

export const TodosContext = createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});

export const useTodos = () => useContext(TodosContext);

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
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
