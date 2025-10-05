import React, { useEffect, useState, useCallback } from 'react';

import { TodoContext } from './TodoContext';
import { storageClient } from '../services/storageClient';
import { STORAGE_KEYS } from '../constants/constants';
import { type Todo, type TodoFilters } from '../types/types';

export const TodoContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    try {
      return JSON.parse(storageClient.getItem(STORAGE_KEYS.TODOS) || '[]');
    } catch {
      return [];
    }
  });

  const [filter, setFilter] = useState<TodoFilters>('all');

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') {
      return !todo.completed;
    }

    if (filter === 'completed') {
      return todo.completed;
    }

    return true;
  });

  const addTodo = useCallback((title: string) => {
    setTodos(prev => [
      ...prev,
      { id: Date.now().toString(), title, completed: false },
    ]);
  }, []);

  const updateTodo = useCallback((id: string, title: string) => {
    setTodos(prev =>
      prev.map(todo => (todo.id === id ? { ...todo, title } : todo)),
    );
  }, []);

  const deleteTodo = useCallback((id: string) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  const toggleTodo = useCallback((id: string) => {
    setTodos(prev =>
      prev.map(todo =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  }, []);

  const toggleAll = useCallback((completed: boolean) => {
    setTodos(prev => prev.map(todo => ({ ...todo, completed })));
  }, []);

  const clearCompleted = useCallback(() => {
    setTodos(prev => prev.filter(todo => !todo.completed));
  }, []);

  useEffect(() => {
    storageClient.setItem(STORAGE_KEYS.TODOS, JSON.stringify(todos));
  }, [todos]);

  return (
    <TodoContext.Provider
      value={{
        todos,
        filteredTodos,
        filter,
        setFilter,
        addTodo,
        deleteTodo,
        updateTodo,
        toggleTodo,
        toggleAll,
        clearCompleted,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};
