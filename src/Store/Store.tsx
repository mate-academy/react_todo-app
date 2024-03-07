import React, { useEffect, useState } from 'react';
import { Todo } from '../Types/Todo';

type Props = {
  children: React.ReactNode;
};

export const Store = React.createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}>({
  todos: [],
  setTodos: () => {},
});

export const StoreProvider: React.FC<Props> = ({ children }) => {
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
    <Store.Provider value={{ todos, setTodos }}>{children}</Store.Provider>
  );
};
