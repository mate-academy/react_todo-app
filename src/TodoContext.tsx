import React, { useMemo } from 'react';
import { Todo } from './types/Todo';
import { useLocalStorage } from './hooks/useLocalStorage';
import { TodoContextType } from './types/TodoContexType';

export const TodoContext = React.createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
});

const initialTodos: Todo[] = [];

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', initialTodos);

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
