import React, { useEffect, useState } from 'react';
import { Todo } from '../types/Todo';

type ContextProps = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    const storage = localStorage.getItem('todos');

    if (storage) {
      setTodos(JSON.parse(storage));
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
