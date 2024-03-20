import React, { useMemo, useState } from 'react';
import { Filter } from '../types/Filter';
import { State } from '../types/State';
import { Todo } from '../types/Todo';

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext<State>({
  todos: [],
  filterBy: Filter.all,
  addTodo: () => {},
  setTodos: () => {},
});

export const TodoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const addTodo = (newTodo: Todo) =>
    setTodos(prevTodos => [newTodo, ...prevTodos]);

  const value = useMemo(
    () => ({
      todos,
      filterBy: Filter.all,
      addTodo,
      setTodos,
    }),
    [todos],
  );

  return (
    <StateContext.Provider value={value}>{children}</StateContext.Provider>
  );
};
