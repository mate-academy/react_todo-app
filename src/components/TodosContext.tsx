import React, { useState } from 'react';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Todo, filterValues } from '../types';

type ContextProps = {
  todos: Todo[],
  setTodos: (items: Todo[]) => void,
  visibleTodos: Todo[],
  setVisibleTodos: (items: Todo[]) => void,
  filterBy: string,
  setFilterBy: (value: string) => void,
}

export const TodosContext = React.createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
  visibleTodos: [],
  setVisibleTodos: () => {},
  filterBy: filterValues.All,
  setFilterBy: () => {},
});

export const TodosProvider: React.FC = ({ children }) => {
  const [todos, setTodos] = useLocalStorage([], 'todos');
  const [visibleTodos, setVisibleTodos] = useState<Todo[]>([]);
  const [filterBy, setFilterBy] = useState('All');

  const contextValue = {
    todos,
    setTodos,
    visibleTodos,
    setVisibleTodos,
    filterBy,
    setFilterBy,
  };

  return (
    <TodosContext.Provider value={contextValue}>
      {children}
    </TodosContext.Provider>
  );
};
