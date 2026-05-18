import React, { createContext, useContext, useEffect, useState } from 'react';

import { Todo } from '../types/Todo';
import { getSavedTodos, saveTodos } from '../utils/localStorage';

interface TodosContextValue {
  todos: Todo[];
  addTodo: (title: string) => void;
  removeTodo: (todoId: number) => void;
  updateTodoTitle: (todoId: number, title: string) => void;
  toggleTodo: (todoId: number) => void;
  toggleAllTodos: () => void;
  clearCompletedTodos: () => void;
}

const TodosContext = createContext<TodosContextValue | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(getSavedTodos);

  useEffect(() => {
    saveTodos(todos);
  }, [todos]);

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      return;
    }

    setTodos(currentTodos => {
      const maxId = Math.max(0, ...currentTodos.map(todo => todo.id));
      const newTodo: Todo = {
        id: Math.max(Date.now(), maxId + 1),
        title: trimmedTitle,
        completed: false,
      };

      return [...currentTodos, newTodo];
    });
  };

  const removeTodo = (todoId: number) => {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== todoId));
  };

  const updateTodoTitle = (todoId: number, title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) {
      removeTodo(todoId);

      return;
    }

    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, title: trimmedTitle } : todo,
      ),
    );
  };

  const toggleTodo = (todoId: number) => {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === todoId ? { ...todo, completed: !todo.completed } : todo,
      ),
    );
  };

  const toggleAllTodos = () => {
    setTodos(currentTodos => {
      const shouldCompleteTodos = currentTodos.some(todo => !todo.completed);

      return currentTodos.map(todo => ({
        ...todo,
        completed: shouldCompleteTodos,
      }));
    });
  };

  const clearCompletedTodos = () => {
    setTodos(currentTodos => currentTodos.filter(todo => !todo.completed));
  };

  const value = {
    todos,
    addTodo,
    removeTodo,
    updateTodoTitle,
    toggleTodo,
    toggleAllTodos,
    clearCompletedTodos,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};

export const useTodos = () => {
  const value = useContext(TodosContext);

  if (!value) {
    throw new Error('useTodos must be used inside TodosProvider');
  }

  return value;
};
