/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TodosContext = createContext({
  todos: [] as Todo[],
  setTodos: (todos: Todo[]) => {},
});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todo', []);

  return (
    <TodosContext.Provider value={{ todos, setTodos }}>
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);

export const useAddTodo = () => {
  const { todos, setTodos } = useTodos();

  return (todo: Todo) => setTodos([...todos, todo]);
};

export const useUpdateTodos = () => {
  const { todos, setTodos } = useTodos();

  return (todo: Todo[]) => setTodos(todo);
};

export const useDeleteTodos = () => {
  const { todos, setTodos } = useTodos();

  return (todoId: number[]) =>
    setTodos([...todos].filter(todo => !todoId.includes(todo.id)));
};
