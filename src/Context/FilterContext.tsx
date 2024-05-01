import { FC, createContext, useContext, useMemo, useState } from 'react';
import { TodoContext } from './TodoContext';

export interface IFilterContext {
  filterType: string;
  filteredTodos: [];
  showAllTodos: () => void;
  showCompletedTodos: () => void;
  showActiveTodos: () => void;
}

const initialState: IFilterContext = {
  filterType: 'All',
  filteredTodos: [],
  showAllTodos: () => {},
  showCompletedTodos: () => {},
  showActiveTodos: () => {},
};

export const FilterContext = createContext(initialState);

type TProps = {
  children: React.ReactNode;
};

export const FilterProvider: FC<TProps> = ({ children }) => {
  const { todos } = useContext(TodoContext);

  const [filterType, setFilterType] = useState<string>('All');

  const filteredTodos = useMemo(() => {
    if (filterType === 'Completed') {
      return todos.filter(todo => todo.completed);
    } else if (filterType === 'Active') {
      return todos.filter(todo => !todo.completed);
    } else {
      return todos;
    }
  }, [filterType, todos]);

  const value = useMemo(
    () => ({
      filterType,
      filteredTodos,
      showAllTodos: () => setFilterType('All'),
      showCompletedTodos: () => setFilterType('Completed'),
      showActiveTodos: () => setFilterType('Active'),
    }),
    [filterType, filteredTodos],
  );

  return (
    <FilterContext.Provider value={value}>{children}</FilterContext.Provider>
  );
};
