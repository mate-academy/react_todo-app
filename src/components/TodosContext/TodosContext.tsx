import React, { useState, useMemo } from 'react';
import { Todo } from '../../types/Todo';
import { Filters } from '../../types/Filters';
import { useLocalStorage } from '../../services/useLocalStorage';

type TodosContextTypes = {
  todos: Todo[],
  setTodos: (newValue: Todo[]) => void,
  filter: Filters,
  setFilter: React.Dispatch<React.SetStateAction<Filters>>,
};

export const TodosContext = React.createContext<TodosContextTypes>({
  todos: [],
  setTodos: () => {},
  filter: Filters.ALL,
  setFilter: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useLocalStorage<Todo[]>('todos', []);
  const [filter, setFilter] = useState<Filters>(Filters.ALL);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filter,
    setFilter,
  }), [todos, filter, setTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
