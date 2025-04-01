import React, { createContext, useState } from 'react';
import { TodoType } from '../types/TodoType';

export const TodoContext = createContext({
  todos: [] as TodoType[],
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  setTodos: (_todos: TodoType[]) => {},
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useState<TodoType[]>([]);

  return (
    <TodoContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodoContext.Provider>
  );
};
