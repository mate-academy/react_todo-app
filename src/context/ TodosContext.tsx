import React, {
  createContext,
  useContext,
  useState,
  useCallback,
  ReactNode,
  useEffect,
} from 'react';

import { Todo, TodoId } from '../types/ Todo';
import { TodosContextValue } from '../types/context';

import {
  addTodoHandler,
  toggleTodoHandler,
  deleteTodoHandler,
  updateTodoHandler,
  toggleAllHandler,
  clearCompletedHandler,
} from '../handlers/todosHandlers';

import { Filter } from '../types/Filter';

const TodosContext = createContext<TodosContextValue | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [editingId, setEditingId] = useState<TodoId | null>(null);
  const [filter, setFilter] = useState<Filter>('all');

  const addTodo = useCallback(async (title: string) => {
    setTodos(prev => addTodoHandler(prev, title));
  }, []);

  const toggleTodo = useCallback(async (id: TodoId) => {
    setTodos(prev => toggleTodoHandler(prev, id));
  }, []);

  const deleteTodo = useCallback(async (id: TodoId) => {
    setTodos(prev => deleteTodoHandler(prev, id));
  }, []);

  const updateTodo = useCallback(async (id: TodoId, title: string) => {
    setTodos(prev => updateTodoHandler(prev, id, title));
  }, []);

  const toggleAll = useCallback(async () => {
    setTodos(prev => toggleAllHandler(prev));
  }, []);

  const clearCompleted = useCallback(async () => {
    setTodos(prev => clearCompletedHandler(prev));
  }, []);

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
    loadingIds: [],
    filter,
    setFilter,
  };

  useEffect(() => {
    const saved = localStorage.getItem('todos');

    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch {
        throw new Error('Failed to parse todos from localStorage');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => {
  const ctx = useContext(TodosContext);

  if (!ctx) {
    throw new Error('useTodos must be used inside TodosProvider');
  }

  return ctx;
};
