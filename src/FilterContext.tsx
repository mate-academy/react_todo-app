import React, { useContext, useState } from 'react';
import { Status } from './types/Status';
import { TodosContext } from './TodosContext';
import { Todo } from './types/Todo';

type FilterContextType = {
  visibleTodos: Todo[],
  filter: Status,
  setFilter: React.Dispatch<React.SetStateAction<Status>>,
};

export const FilterContext = React.createContext<FilterContextType>({
  visibleTodos: [],
  filter: Status.ALL,
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FilterProvider: React.FC<Props> = ({ children }) => {
  const todos = useContext(TodosContext);
  const [filter, setFilter] = useState(Status.ALL);

  const visibleTodos = todos.filter(todo => {
    switch (filter) {
      case 'Active':
        return todo.completed === false;

      case 'Completed':
        return todo.completed === true;

      case 'All':
      default:
        return todos;
    }
  });

  const value = {
    visibleTodos,
    filter,
    setFilter,
  };

  return (
    <FilterContext.Provider value={value}>
      {children}
    </FilterContext.Provider>
  );
};
