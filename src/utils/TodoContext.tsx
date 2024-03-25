import React, { createContext, useContext, useState, FC } from 'react';
import { Status, Todo, TodosContextType } from '../types/types';

const initialTodos: Todo[] = [];

const TodosContext = createContext<TodosContextType>({
  todos: initialTodos,
  status: Status.ALL,
  addTodo: () => {},
  removeTodo: () => {},
  setTodos: () => {},
  setStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    return storedTodos ? JSON.parse(storedTodos) : [];
  });
  const [status, setStatus] = useState<Status>(Status.ALL);

  const addTodo = (newTodo: Todo) => {
    setTodos([...todos, newTodo]);
  };

  const removeTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <TodosContext.Provider
      value={{ todos, setTodos, addTodo, removeTodo, setStatus, status }}
    >
      {children}
    </TodosContext.Provider>
  );
};

export const useTodos = () => useContext(TodosContext);
