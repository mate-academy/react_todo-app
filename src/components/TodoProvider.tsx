import React, { useState, useEffect, useCallback } from 'react';
import { Todo, TodoContext } from './TodoContext';

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<FilterType>('All');

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      try {
        setTodos(JSON.parse(savedTodos));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Error loading all from localStorage:', error);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = useCallback((title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    const newTodo: Todo = {
      id: Date.now(),
      title: trimmedTitle,
      completed: false,
    };

    setTodos(prev => [...prev, newTodo]);
  }, []);

  const toggleTodo = useCallback((id: number) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const deleteTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const updateTodo = useCallback(
    (id: number, title: string) => {
      const trimmedTitle = title.trim();

      if (!trimmedTitle) {
        deleteTodo(id);

        return;
      }

      setTodos(prev =>
        prev.map(todo =>
          todo.id === id ? { ...todo, title: trimmedTitle } : todo,
        ),
      );
    },
    [deleteTodo],
  );

  const toggleAll = useCallback(() => {
    const allCompleted =
      todos.length > 0 && todos.every(todo => todo.completed);

    setTodos(prev => prev.map(todo => ({ ...todo, completed: !allCompleted })));
  }, [todos]);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  const value: TodoContextType = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    toggleAll,
    clearCompleted,
    filter,
    setFilter,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
