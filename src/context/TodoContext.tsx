import React, { useState } from 'react';

import { Todo } from '../types/Todo';
import { TodoContextType } from '../types/TodoContextType';

import { useLocalStore } from '../hooks/useLocalStore';

export const TodoContext = React.createContext<TodoContextType | undefined>(
  undefined,
);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStore<Todo[]>('todos', []);
  const [loadingTodoIds, setLoadingTodoIds] = useState<number[]>([]);
  const [selectedTodoId, setSelectedTodoId] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState('');

  const addTodo = (title: string) => {
    const trimmedTitle = title.trim();

    if (!trimmedTitle) return;

    const newTodo: Todo = {
      id: +new Date(),
      userId: 1,
      title: trimmedTitle,
      completed: false,
    };

    setTodos((current: Todo[]) => [...current, newTodo]);
  };

  const deleteTodo = (id: number) => {
    setTodos((current: Todo[]) => current.filter(todo => todo.id !== id));
  };

  const updateTodo = (id: number, data: Partial<Todo>) => {
    setTodos((current: Todo[]) =>
      current.map(todo => (todo.id === id ? { ...todo, ...data } : todo)),
    );
  };

  const toggleAll = () => {
    const allCompleted = todos.every(todo => todo.completed);
    setTodos((current: Todo[]) =>
      current.map(todo => ({ ...todo, completed: !allCompleted })),
    );
  };

  const clearCompleted = () => {
    setTodos((current: Todo[]) => current.filter(todo => !todo.completed));
  };

  const value: TodoContextType = {
    todos,
    addTodo,
    deleteTodo,
    updateTodo,
    toggleAll,
    clearCompleted,
    loadingTodoIds,
    setLoadingTodoIds,
    selectedTodoId,
    setSelectedTodoId,
    errorMessage,
    setErrorMessage,
  };

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
