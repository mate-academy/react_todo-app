import React, { createContext, useContext, useEffect, useState } from 'react';

import { Todo } from '../types/Todo';

type Filter = 'all' | 'active' | 'completed';

type TodoContextType = {
  todos: Todo[];
  filter: Filter;

  addTodo: (title: string) => void;
  deleteTodo: (id: number) => void;
  toggleTodo: (id: number) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
  updateTodo: (id: number, title: string) => void;

  setFilter: (value: Filter) => void;
  focusNewTodo: () => void;
};

const TodoContext = createContext<TodoContextType | null>(null);

const storedTodos = localStorage.getItem('todos');

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(
    storedTodos ? JSON.parse(storedTodos) : [],
  );

  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmed,
      completed: false,
    };

    setTodos(current => [...current, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos(current => current.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    setTodos(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    setTodos(current => current.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);

    setTodos(current =>
      current.map(todo => ({
        ...todo,
        completed: !allCompleted,
      })),
    );
  };

  const updateTodo = (id: number, title: string) => {
    const trimmed = title.trim();

    if (!trimmed) {
      deleteTodo(id);

      return;
    }

    setTodos(current =>
      current.map(todo =>
        todo.id === id ? { ...todo, title: trimmed } : todo,
      ),
    );
  };

  const focusNewTodo = () => {
    const field = document.querySelector(
      '[data-cy="NewTodoField"]',
    ) as HTMLInputElement | null;

    field?.focus();
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        addTodo,
        deleteTodo,
        toggleTodo,
        clearCompleted,
        toggleAll,
        updateTodo,
        setFilter,
        focusNewTodo,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodo = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw new Error('No TodoProvider');
  }

  return context;
};
