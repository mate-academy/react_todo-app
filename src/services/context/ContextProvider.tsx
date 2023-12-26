import React, { useEffect, useState, ReactNode } from 'react';

import { Todo } from '../../types/Todo';

interface ContextProps {
  todos: Todo[];
  addTodo: (newItem: Todo) => void;
  removeTodo: (id: number) => void;
}

interface Props {
  children: ReactNode;
}

export const Context = React.createContext<ContextProps>({
  todos: [],
  addTodo: () => {},
  removeTodo: () => {},
});

export const ContextProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    setTodos(() => {
      const data = localStorage.getItem('todos');

      if (data === null) {
        return [];
      }

      try {
        return JSON.parse(data);
      } catch {
        return [];
      }
    });
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  function addTodo(newItem: Todo) {
    setTodos(prevTodos => [...prevTodos, newItem]);
  }

  function removeTodo(id: number) {
    setTodos(prevTodos => prevTodos.filter(item => item.id !== id));
  }

  return (
    <Context.Provider value={{
      todos,
      addTodo,
      removeTodo,
    }}
    >
      {children}
    </Context.Provider>
  );
};
