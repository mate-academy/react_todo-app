import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodoFilter } from '../types/TodoFilter';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  removeTodo: (id: number) => void;
  clearCompleted: () => void;
  filter: TodoFilter;
  setFilter: (filter: TodoFilter) => void;
};

const defaultContextValue: TodoContextType = {
  todos: [],
  setTodos: () => {},
  removeTodo: () => {},
  clearCompleted: () => {},
  filter: 'all',
  setFilter: () => {},
};

export const TodoContext = createContext<TodoContextType>(defaultContextValue);

export const TodoProvider = ({ children }: { children: ReactNode }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      const storedTodos = localStorage.getItem('todos');

      return storedTodos ? JSON.parse(storedTodos) : [];
    } catch (e) {
      return [];
    }
  });
  const [filter, setFilter] = useState<TodoFilter>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const removeTodo = (id: number) => {
    setTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  return (
    <TodoContext.Provider
      value={{ todos, setTodos, filter, setFilter, removeTodo, clearCompleted }}
    >
      {children}
    </TodoContext.Provider>
  );
};
