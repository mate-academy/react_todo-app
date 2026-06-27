//.. TodoContext.tsx
import React, { useState } from 'react';
import type { Todo } from '../types/Todo';

export interface TodoContextType {
  todos: Todo[];
  filter: 'all' | 'active' | 'completed';
  setFilter: (filter: 'all' | 'active' | 'completed') => void;
  addTodo: (title: string) => void;
  toggleTodo: (id: number) => void;
  deleteTodo: (id: number) => void;
  updateTodo: (id: number, title: string) => void;
  clearCompleted: () => void;
  toggleAll: () => void;
}

export const TodoContext = React.createContext<TodoContextType | undefined>(
  undefined,
);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('todos');

      if (saved) {
        try {
          return JSON.parse(saved);
        } catch {
          return [];
        }
      } else {
        localStorage.setItem('todos', '[]');
      }
    }

    return [];
  });

  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  const saveTodos = (newTodos: Todo[] | ((prev: Todo[]) => Todo[])) => {
    setTodos(prev => {
      const resolvedTodos =
        typeof newTodos === 'function' ? newTodos(prev) : newTodos;

      localStorage.setItem('todos', JSON.stringify(resolvedTodos));

      return resolvedTodos;
    });
  };

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: +new Date(),
      title: trimmedTitle,
      completed: false,
    };

    saveTodos(prevTodos => [...prevTodos, newTodo]);
  };

  const deleteTodo = (id: number) => {
    saveTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
  };

  const toggleTodo = (id: number) => {
    saveTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const updateTodo = (id: number, title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      deleteTodo(id);

      return;
    }

    saveTodos(prevTodos =>
      prevTodos.map(todo =>
        todo.id === id ? { ...todo, title: trimmedTitle } : todo,
      ),
    );
  };

  const clearCompleted = () => {
    saveTodos(prevTodos => prevTodos.filter(todo => !todo.completed));
  };

  const toggleAll = () => {
    const areAllCompleted = todos.every(todo => todo.completed);

    saveTodos(prevTodos =>
      prevTodos.map(todo => ({
        ...todo,
        completed: !areAllCompleted, // Якщо всі завершені -> робимо всі активними (false)
      })),
    );
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        filter,
        setFilter,
        addTodo,
        toggleTodo,
        deleteTodo,
        updateTodo,
        clearCompleted,
        toggleAll,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
