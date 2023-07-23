/* eslint-disable @typescript-eslint/no-unused-vars */
import { createContext, useState, useMemo } from 'react';
import { Todo } from './types/Todo';
import { Context } from './types/TodoContext';

export const TodosContext = createContext<Context>({
  todos: [],
  saveTodo: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[] | []>([]);

  const saveTodo = (todoTitle: string) => {
    const newTodo: Todo = {
      title: todoTitle,
      completed: false,
      id: +new Date(),
    };

    setTodos((prev) => [newTodo, ...prev]);
  };

  const value = useMemo(
    () => ({
      todos,
      saveTodo,
    }),
    [todos],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
