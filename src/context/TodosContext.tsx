import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  PropsWithChildren,
} from 'react';

import {
  addTodoHandler,
  toggleTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
  toggleAllHandler,
  clearCompletedHandler,
} from '../handlers/todosHandlers';

import { Todo, TodoId } from '../types/ Todo';
import { Filter } from '../types/Filter';
import { TodosContextValue } from '../types/context';

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

export const TodosProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<TodoId | null>(null);
  const [filter, setFilter] = useState<Filter>('all');
  const [loadingIds, setLoadingIds] = useState<TodoId[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('todos');

      if (saved) {
        setTodos(JSON.parse(saved));
      }
    } catch {
      throw new Error('Failed to load todos from localStorage');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (title: string) =>
    setTodos(prev => addTodoHandler(prev, title));

  const toggleTodo = (id: TodoId) =>
    setTodos(prev => toggleTodoHandler(prev, id));

  const deleteTodo = (id: TodoId) =>
    setTodos(prev => deleteTodoHandler(prev, id));

  const updateTodo = (id: TodoId, title: string) =>
    setTodos(prev => updateTodoHandler(prev, id, title));

  const toggleAll = () => setTodos(prev => toggleAllHandler(prev));

  const clearCompleted = () => setTodos(prev => clearCompletedHandler(prev));

  const value: TodosContextValue = {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    updateTodo,
    toggleAll,
    clearCompleted,
    editingId,
    setEditingId,
    filter,
    setFilter,
    loadingIds,
    setLoadingIds,
  };

  return (
    <TodosContext.Provider value={value}> {children} </TodosContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodosContext);

  if (!ctx) {
    throw new Error('useTodos must be used inside TodosProvider');
  }

  return ctx;
};
