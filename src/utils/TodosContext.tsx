import React from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo } from '../type/type';

const initialTodos: Todo[] = [];

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

interface State {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: Filter;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
}

export const TodosContext = React.createContext<State>({
  todos: initialTodos,
  setTodos: () => {},
  filter: Filter.All,
  setFilter: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', initialTodos);
  const [filter, setFilter] = React.useState<Filter>(Filter.All);

  const value = {
    todos,
    setTodos,
    filter,
    setFilter,
  };

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
