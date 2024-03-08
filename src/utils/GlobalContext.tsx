import React, { useMemo, useState } from 'react';
import {
  ContextPropsFilteredTodos,
  ContextPropsMyTodos,
  Todo,
  useLocalStorage,
} from './helpers';

export const MyTodos = React.createContext<ContextPropsMyTodos>({
  todos: [],
  setTodos: () => {},
});

export const FilteredTodos = React.createContext<ContextPropsFilteredTodos>({
  filteredTodos: [],
  setFilteredTodos: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const GlobalContext: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filteredTodos, setFilteredTodos] = useState(todos);

  const myTodos = useMemo(
    () => ({
      todos,
      setTodos,
    }),
    [todos, setTodos],
  );

  const myFilteredTodos = useMemo(
    () => ({
      filteredTodos,
      setFilteredTodos,
    }),
    [filteredTodos, setFilteredTodos],
  );

  return (
    <MyTodos.Provider value={myTodos as ContextPropsMyTodos}>
      <FilteredTodos.Provider
        value={myFilteredTodos as ContextPropsFilteredTodos}
      >
        {children}
      </FilteredTodos.Provider>
    </MyTodos.Provider>
  );
};
