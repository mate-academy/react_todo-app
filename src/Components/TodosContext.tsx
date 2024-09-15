/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useMemo, useState } from 'react';
import { Todo } from '../Types/Todo';
import { Filter } from '../Types/Filter';
import { useLocaleStorage } from '../hooks/useLocalStorage';

type ContextType = {
  todos: Todo[];
  filteredTodos: Todo[];
  setTodos: (newTodos: Todo[]) => void;
  filter: Filter;
  setFilter: (newFilter: Filter) => void;
};

export const TodosContext = React.createContext<ContextType>({
  todos: [],
  filteredTodos: [],
  setTodos: () => {},
  filter: Filter.All,
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocaleStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filter>(Filter.All);

  const filteredTodos: Todo[] = useMemo(() => {
    return todos.filter(todo => {
      switch (filter) {
        case Filter.Active:
          return !todo.completed;

        case Filter.Completed:
          return todo.completed;

        default:
          return true;
      }
    });
  }, [todos, filter]);

  const value: ContextType = useMemo(
    () => ({
      todos,
      filteredTodos,
      setTodos,
      filter,
      setFilter,
    }),
    [todos, filteredTodos, setTodos, filter],
  );

  return (
    <TodosContext.Provider value={value}>{children}</TodosContext.Provider>
  );
};
