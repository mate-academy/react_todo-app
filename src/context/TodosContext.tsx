import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

const STORAGE_KEY = 'todos';

interface TodosContextType {
  todos: Todo[];
  visibleTodos: Todo[];
  filter: Filter;
  activeCount: number;
  hasCompleted: boolean;
  isAllCompleted: boolean;
  setFilter: (filter: Filter) => void;
  addTodo: (title: string) => void;
  deleteTodo: (todoId: number) => void;
  toggleTodo: (todoId: number) => void;
  updateTodoTitle: (todoId: number, title: string) => void;
  toggleAll: () => void;
  clearCompleted: () => void;
}

const TodosContext = React.createContext<TodosContextType | null>(null);

function loadTodos(): Todo[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    const parsed = stored ? JSON.parse(stored) : [];

    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function getNextId(todos: Todo[]): number {
  const maxId = todos.reduce((max, todo) => Math.max(max, todo.id), 0);

  return Math.max(+new Date(), maxId + 1);
}

export const TodosProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [todos, setTodos] = useState<Todo[]>(loadTodos);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
  }, [todos]);

  const value = useMemo<TodosContextType>(() => {
    const activeCount = todos.filter(todo => !todo.completed).length;
    const isAllCompleted = todos.length > 0 && activeCount === 0;

    const visibleTodos = todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;
        case Filter.Completed:
          return todo.completed;
        default:
          return true;
      }
    });

    return {
      todos,
      visibleTodos,
      filter,
      activeCount,
      hasCompleted: activeCount < todos.length,
      isAllCompleted,
      setFilter,

      addTodo: title =>
        setTodos(current => [
          ...current,
          { id: getNextId(current), title, completed: false },
        ]),

      deleteTodo: todoId =>
        setTodos(current => current.filter(todo => todo.id !== todoId)),

      toggleTodo: todoId =>
        setTodos(current =>
          current.map(todo =>
            todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
          ),
        ),

      updateTodoTitle: (todoId, title) =>
        setTodos(current =>
          current.map(todo => (todo.id === todoId ? { ...todo, title } : todo)),
        ),

      toggleAll: () =>
        setTodos(current => {
          const allCompleted = current.every(todo => todo.completed);

          return current.map(todo => ({ ...todo, completed: !allCompleted }));
        }),

      clearCompleted: () =>
        setTodos(current => current.filter(todo => !todo.completed)),
    };
  }, [todos, filter]);

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export function useTodos(): TodosContextType {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('useTodos must be used within TodosProvider');
  }

  return context;
}
