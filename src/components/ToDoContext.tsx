import { Todo } from '../types/Todo';
import { FilterButtons } from '../types/FilterType';
import { createContext, useEffect, useState } from 'react';
import React from 'react';

export type ContextType = {
  todos: Todo[];
  toDoTitle: string;
  setTodos: (currentTodos: Todo[]) => void;
  setToDoTitle: (title: string) => void;
  filterButton: FilterButtons;
  setFilterButton: (filterButton: FilterButtons) => void;
};

type Props = {
  children: React.ReactNode;
};

const ProvideContext: ContextType = {
  todos: [],
  toDoTitle: '',
  setTodos: () => {},
  setToDoTitle: () => {},
  filterButton: FilterButtons.All,
  setFilterButton: () => {},
};

export const CreatedContext = createContext<ContextType>(ProvideContext);

export const ToDoProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [toDoTitle, setToDoTitle] = useState<string>('');
  const [filterButton, setFilterButton] = useState<FilterButtons>(
    FilterButtons.All,
  );

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const storedItems = localStorage.getItem('todos');

    if (storedItems) {
      setTodos(JSON.parse(storedItems));
    }
  }, []);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos') as string);

    localStorage.setItem('todos', JSON.stringify(storedTodos));
  }, [todos]);

  return (
    <CreatedContext.Provider
      value={{
        todos,
        toDoTitle,
        setTodos,
        setToDoTitle,
        filterButton,
        setFilterButton,
      }}
    >
      {children}
    </CreatedContext.Provider>
  );
};
