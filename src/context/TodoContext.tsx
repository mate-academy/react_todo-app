import React, { useState, ReactNode, useMemo } from 'react';
import { Todo } from '../types/Todo';

const getTodos = JSON.parse(localStorage.getItem('todos') || '[]') as Todo[];

export const TodoContext = React.createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}>({
  todos: getTodos,
  setTodos: () => {},
});

interface TodoProviderProps {
  children: ReactNode;
}

export const TodoProvider: React.FC<TodoProviderProps> = ({ children }) => {
  const [todos, setTodos] = useState(getTodos);
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
