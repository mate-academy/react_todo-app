import React, { useState } from 'react';
import { Todo } from './interfaces/Todo';

interface Props {
  children: React.ReactNode;
}

export const TodosContext = React.createContext<{
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}>({
  todos: [],
  setTodos: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const value = { todos, setTodos };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
