import React, { useState, useMemo, useEffect } from 'react';
import { Todo } from '../types/Todo';
import { FilterOption } from '../types/FilterOption';

const initiatTodos: Todo[] = [];

interface TodosContextType {
  todos: Todo[],
  setTodos: (todos: Todo[]) => void,
  filterOption: FilterOption,
  setFilterOption: (filterOption: FilterOption) => void,
}

export const TodosContext = React.createContext<TodosContextType>({
  todos: initiatTodos,
  setTodos: () => { },
  filterOption: FilterOption.Active,
  setFilterOption: () => { },
});

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState(initiatTodos);
  const [filterOption, setFilterOption]
    = useState<FilterOption>(FilterOption.All);

  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');

    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterOption,
    setFilterOption,
  }), [todos, filterOption]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
