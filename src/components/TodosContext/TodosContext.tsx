import React, { createContext, useMemo, useState } from 'react';

import { FilterTodos } from '../../types/FilterTodos';

import { Todo } from '../../types/Todo';
import { useLocalStorage } from '../hooks/useLocalStorage';

type DefaultCotextValue = {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  filterTodos: FilterTodos,
  setFilterTodos: (filter: FilterTodos) => void,
  visibleTodos: Todo[]
};

export const TodosContext = createContext<DefaultCotextValue>({
  todos: [],
  setTodos: () => {},
  filterTodos: FilterTodos.All,
  setFilterTodos: () => {},
  visibleTodos: [],
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage('todos', []);
  const [filterTodos, setFilterTodos] = useState<FilterTodos>(FilterTodos.All);

  const visibleTodos = todos.filter(todo => {
    switch (filterTodos) {
      case FilterTodos.All:
        return todo;

      case FilterTodos.Active:
        return !todo.completed;

      case FilterTodos.Completed:
        return todo.completed;

      default:
        return todo;
    }
  });

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterTodos,
    setFilterTodos,
    visibleTodos,
  }), [todos, filterTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
