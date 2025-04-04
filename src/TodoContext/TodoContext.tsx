import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { FilterStatus, Todo } from '../types/Todo';
import { useLocalStorage } from '../Hooks/useLocalStorage';

interface Props {
  todos: Todo[];
  setTodos: (t: Todo[]) => void;
  filterStatus: FilterStatus;
  setFilterStatus: (f: FilterStatus) => void;
  filteredTodos: Todo[];
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodoContext = React.createContext<Props>({
  todos: [],
  setTodos: () => {},
  filterStatus: FilterStatus.ALL,
  setFilterStatus: () => {},
  filteredTodos: [],
  inputRef: { current: null },
});

export const useTodoContext = () => useContext(TodoContext);

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>(
    FilterStatus.ALL,
  );

  const filteredTodos = useMemo(() => {
    return todos.filter(todo => {
      switch (filterStatus) {
        case FilterStatus.ACTIVE:
          return !todo.completed;
        case FilterStatus.COMPLETED:
          return todo.completed;
        default:
          return true;
      }
    });
  }, [filterStatus, todos]);

  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      filteredTodos,
      filterStatus,
      setFilterStatus,
      inputRef,
    }),
    [todos, setTodos, filteredTodos, filterStatus],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
