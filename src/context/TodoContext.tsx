import React, {
  useState, ReactNode, useMemo,
} from 'react';
import { Todo } from '../types/Todo';

const TODO_STORAGE_KEY = 'todos';

const getTodos = (): Todo[] => {
  const storedTodos = localStorage.getItem(TODO_STORAGE_KEY);

  return storedTodos
    ? JSON.parse(storedTodos) : [];
};

export const TodoContext = React.createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}>({
  todos: [],
  setTodos: () => {},
});

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(getTodos());

  const value = useMemo(() => ({
    todos,
    setTodos,
  }), [todos]);

  return (
    <TodoContext.Provider value={value}>
      {children}
    </TodoContext.Provider>
  );
};
