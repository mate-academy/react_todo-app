import React, { createContext, useEffect, useState } from 'react';
import { Todo } from './types/Todo';

interface TodosContextProps {
  children: React.ReactNode;
}

export const TodosContext = createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}>({
  todos: [],
  setTodos: () => {},
});

export const TodosProvider: React.FC<TodosContextProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');

    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};
