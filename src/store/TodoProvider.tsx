/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/todo';
import { FilterStatus } from '../enums/filter-status';
import { useLocalStorage } from '../hooks/useLocalStorage.hook';

export const TodoContext = createContext<{
  todos: Todo[];
  filteredTodos: Todo[];
  filterStatus: FilterStatus;
  setTodos: (value: Todo[]) => void;
  setFilterStatus: (status: FilterStatus) => void;
}>({
  todos: [],
  filteredTodos: [],
  filterStatus: FilterStatus.All,
  setTodos: () => {},
  setFilterStatus: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterStatus, setFilterStatus] = useState(FilterStatus.All);

  useEffect(() => {
    const rawTodosFromStorage = localStorage.getItem('todos');

    if (todos.length === 0 && rawTodosFromStorage !== JSON.stringify([])) {
      setTodos([]);
    }
  }, [todos, setTodos]);

  const filteredTodos = useMemo(() => {
    switch (filterStatus) {
      case FilterStatus.Active:
        return todos.filter(todo => !todo.completed);
      case FilterStatus.Completed:
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [filterStatus, todos]);

  const value = useMemo(
    () => ({
      todos,
      filteredTodos,
      filterStatus,
      setTodos,
      setFilterStatus,
    }),
    [todos, filteredTodos, filterStatus, setTodos, setFilterStatus],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
