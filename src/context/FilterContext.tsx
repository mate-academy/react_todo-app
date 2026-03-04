import { createContext, useMemo, useState } from 'react';
import { SortType } from '../types/sortField';
import React from 'react';
import { useTodos } from './GlobalProvider';
import { Todo } from '../types/Todo';

type Props = {
  children: React.ReactNode;
};

type FilterState = {
  filteredTodos: Todo[];
  field: SortType;
  onFilter: (field: SortType) => void;
};

const FilterContext = createContext<FilterState>({
  filteredTodos: [],
  field: SortType.default,
  onFilter: () => {},
});

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const todos = useTodos();
  const [sortField, setSortField] = useState<SortType>(SortType.default);

  const handleFilter = (field: SortType) => {
    setSortField(field);
  };

  const filteredState = useMemo(() => {
    const copyTodos = [...todos];

    switch (sortField) {
      case SortType.active:
        return copyTodos.filter(todo => !todo.completed);
      case SortType.completed:
        return copyTodos.filter(todo => todo.completed);
      case SortType.default:
      default:
        return copyTodos;
    }
  }, [todos, sortField]);

  const value = useMemo(() => {
    return {
      filteredTodos: filteredState,
      field: sortField,
      onFilter: handleFilter,
    };
  }, [filteredState, sortField]);

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};

export const useFilter = () => {
  const context = React.useContext(FilterContext);

  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider');
  }

  return context;
};
