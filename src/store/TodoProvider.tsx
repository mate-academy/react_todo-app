/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useMemo, useState } from 'react';
import { Todo } from '../types/todo';
import { useLocalStorage } from '../hooks/hooks';
import { FilterStatus } from '../enums/enums';

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
      setTodos,
      filterStatus,
      setFilterStatus,
    }),
    [todos, filteredTodos, setTodos, filterStatus, setFilterStatus],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
