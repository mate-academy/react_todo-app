import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

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

export const TodoProvider: React.FC<TodosContextProps> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storageTodo = localStorage.getItem('todos');

    if (storageTodo) {
      setTodos(JSON.parse(storageTodo));
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
