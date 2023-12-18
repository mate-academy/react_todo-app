import React, { createContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';
import { useLocalStorage } from '../hooks/useLocalStorage';

type PropsTodosContext = {
  todos: Todo[];
  setTodos: (todos: Todo[]) => void;
  filter: Status;
  setFilter: (value: Status) => void;
};

type Props = {
  children: React.ReactNode;
};

export const TodosContext = createContext<PropsTodosContext>({
  todos: [],
  setTodos: () => { },
  filter: Status.All,
  setFilter: () => {},
});

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filter, setFilter] = useState<Status>(Status.All);

  return (
    <TodosContext.Provider value={{
      todos,
      setTodos,
      filter,
      setFilter,
    }}
    >
      {children}
    </TodosContext.Provider>
  );
};
