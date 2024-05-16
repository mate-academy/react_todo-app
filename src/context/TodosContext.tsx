import { FilterParams } from '../types/FilterParams';
import { Todo } from '../types/Todo';
import React, { useEffect, useMemo, useState } from 'react';

type ContextType = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  title: string;
  setTitle: (title: string) => void;
  filterButton: FilterParams;
  setFilterButton: (filterButton: FilterParams) => void;
};

const initialTodoContext: ContextType = {
  todos: [],
  setTodos: () => {},
  title: '',
  setTitle: () => {},
  filterButton: FilterParams.ALL,
  setFilterButton: () => {},
};

export const TodosContext = React.createContext(initialTodoContext);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>(
    JSON.parse(localStorage.getItem('todos') || '[]'),
  );
  const [title, setTitle] = useState<string>('');
  const [filterButton, setFilterButton] = useState<FilterParams>(
    FilterParams.ALL,
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(
    () => ({
      todos,
      setTodos,
      title,
      setTitle,
      filterButton,
      setFilterButton,
    }),
    [todos, title, filterButton],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
