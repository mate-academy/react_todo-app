import React, { useMemo } from 'react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { Todo } from '../../types/Todo';

type ContextTodo = {
  todos: Todo[];
  filteredTodo: Todo[];
  setTodos: (value: string | Todo[]) => void;
  setUpdated: (id: number, newTitle: string, tcompleted: boolean) => void;
  setClear: (id?: number) => void;
  setFilter: (value: string) => void;
};

export const defaultContext: ContextTodo = {
  todos: [],
  filteredTodo: [],
  setTodos: () => {},
  setUpdated: () => {},
  setClear: () => {},
  setFilter: () => {},
};

export const TodoContext = React.createContext(defaultContext);

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, filteredTodo, setTodos, setUpdated, setClear, setFilter] =
    useLocalStorage<Todo[]>('todos', []);

  const value = useMemo(
    () => ({ todos, filteredTodo, setTodos, setUpdated, setClear, setFilter }),
    [todos, setTodos, setUpdated, setClear, setFilter, filteredTodo],
  );

  return <TodoContext.Provider value={value}>{children}</TodoContext.Provider>;
};
