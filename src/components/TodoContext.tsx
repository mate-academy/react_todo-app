import React, { useState } from 'react';
import { Todo } from '../types/Todo';

interface ITodoContext {
  todos: Todo[],
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  removeTodo: (id: number) => void;
}
export const defaultValue = {
  todos: [],
  setTodos: () => {},
  removeTodo: () => {},
};

export const TodoContext = React.createContext<ITodoContext>(defaultValue);

type Props = {
  children: React.ReactNode
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const removeTodo = (id: number) => {
    const removeTodos = todos.filter((todo) => todo.id !== id);

    setTodos(removeTodos);
  };

  return (
    <TodoContext.Provider value={{ todos, removeTodo, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
