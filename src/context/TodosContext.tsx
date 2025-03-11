import React, { useEffect, useMemo, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../utils/Enums';

type InitialContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  todosFilter: Filter;
  setTodosFilter: React.Dispatch<React.SetStateAction<Filter>>;
};

const InitialContext: InitialContextType = {
  todos: [],
  setTodos: () => {},
  todosFilter: Filter.All,
  setTodosFilter: () => {},
};

export const TodosContext = React.createContext(InitialContext);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [todosFilter, setTodosFilter] = useState(Filter.All);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      todosFilter,
      setTodosFilter,
    }),
    [todos, todosFilter],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
