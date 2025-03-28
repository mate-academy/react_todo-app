import React, { createContext, useContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { TodosContext } from './TodosContext';

type Props = {
  children: React.ReactNode;
};

type TodosContextType = {
  filteredTodos: Todo[];
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  filter: string;
};

export enum Filter {
  ALL = 'All',
  ACTIVE = 'Active',
  COMPLETED = 'Completed',
}

export const FilteredTodosContext = createContext<TodosContextType | undefined>(
  undefined,
);

export const FilteredTodosProvider: React.FC<Props> = ({ children }) => {
  const context = useContext(TodosContext);

  if (!context) {
    throw new Error('TodoList must be used within a TodosProvider');
  }

  const { todos } = context;
  const [filter, setFilter] = useState(Filter.ALL);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  useEffect(() => {
    const todosFromServer = [...todos];

    switch (filter) {
      case Filter.ALL:
        setFilteredTodos(todosFromServer);
        break;
      case Filter.COMPLETED:
        setFilteredTodos(todosFromServer.filter(todo => todo.completed));
        break;
      case Filter.ACTIVE:
        setFilteredTodos(todosFromServer.filter(todo => !todo.completed));
        break;
    }
  }, [filter, todos]);

  return (
    <FilteredTodosContext.Provider value={{ filteredTodos, setFilter, filter }}>
      {children}
    </FilteredTodosContext.Provider>
  );
};
