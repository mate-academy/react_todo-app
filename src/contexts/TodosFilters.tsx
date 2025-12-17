import React from 'react';
import { TodosFilters } from '../types/TodosFilters';

interface TodosFiltersContextType {
  todosFilter: TodosFilters;
  setTodosFilter: (filter: TodosFilters) => void;
}

export const TodosFiltersContext = React.createContext<TodosFiltersContextType>(
  {
    todosFilter: TodosFilters.All,
    setTodosFilter: () => {},
  },
);

type Props = {
  children: React.ReactNode;
};

export const TodosFiltersProvider: React.FC<Props> = ({ children }) => {
  const [todosFilter, setTodosFilter] = React.useState<TodosFilters>(
    TodosFilters.All,
  );

  return (
    <TodosFiltersContext.Provider value={{ todosFilter, setTodosFilter }}>
      {children}
    </TodosFiltersContext.Provider>
  );
};
