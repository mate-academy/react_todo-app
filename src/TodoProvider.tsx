import React, { useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Filter } from './types/Filter';
import { Todo } from './types/Todo';

type ContextProps = {
  todos: Todo[],
  setTodos: (newTodos: Todo[]) => void,
  filterType: Filter,
  setFilterType: (newType: Filter) => void,
};

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
  filterType: Filter.ALL,
  setFilterType: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filterType, setFilterType] = useLocalStorage<Filter>(
    'filterType',
    Filter.ALL,
  );

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterType,
    setFilterType,
  }), [todos, filterType]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
