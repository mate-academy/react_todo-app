import React, { useState } from 'react';
import { Todo } from '../types/Todo';
import { Context } from '../types/Context';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

const initialState:Context = {
  todos: [],
  setTodos: () => {},
  filter: Status.All,
  setFilter: () => {},
};

export const TodosContext = React.createContext<Context>(initialState);

type Props = {
  children: React.ReactNode,
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState(Status.All);

  const value = {
    todos,
    setTodos,
    filter,
    setFilter,
  };

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
