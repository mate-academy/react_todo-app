/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, useContext, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

export const TodosContext = createContext({
  todos: [] as Todo[],
  setTodos: (_todos: Todo[]) => {},
  status: '',
  setStatus: (_status: string) => {},
});

export const TodosProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [status, setStatus] = useState('all');

  return (
    <TodosContext.Provider value={{ todos, setTodos, status, setStatus }}>
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

  return (todo: Todo | Todo[]) => {
    const newTodos = Array.isArray(todo)
      ? todos.map(td => todo.find(t => t.id === td.id) || td)
      : todos.map(td => (td.id === todo.id ? todo : td));

    setTodos(newTodos);
  };
};

export const useDeleteTodos = () => {
  const { todos, setTodos } = useTodos();

  return (todoId: number[]) =>
    setTodos([...todos].filter(todo => !todoId.includes(todo.id)));
};

export const useFilteredTodos = () => {
  const { todos, status } = useTodos();

  return useMemo(() => {
    switch (status) {
      case 'active':
        return todos.filter(td => !td.completed);
      case 'completed':
        return todos.filter(td => td.completed);
      default:
        return todos;
    }
  }, [todos, status]);
};
