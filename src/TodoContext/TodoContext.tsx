import { createContext, RefObject, useEffect, useRef, useState } from 'react';
import { Todo } from '../types';
import React from 'react';

type TodoContextType = {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  filteredTodos: Todo[];
  filter: string;
  setFilter: React.Dispatch<React.SetStateAction<Filter>>;
  inputFocus: RefObject<HTMLInputElement> | null;
};

export enum Filter {
  All = 'All',
  Active = 'Active',
  Completed = 'Completed',
}

export const TodoContext = createContext<TodoContextType>({
  todos: [],
  setTodos: () => {},
  filteredTodos: [],
  filter: Filter.All,
  setFilter: () => {},
  inputFocus: null,
});

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [filter, setFilter] = useState(Filter.All);
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');

    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const inputFocus = useRef<HTMLInputElement>(null);

  const getFilteredTodos = () => {
    switch (filter) {
      case Filter.Active:
        return todos.filter(todo => !todo.completed);

      case Filter.Completed:
        return todos.filter(todo => todo.completed);

      default:
        return todos;
    }
  };

  const filteredTodos = getFilteredTodos();

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const currentFilter = window.location.hash.replace('#/', '');

    if (Object.values(Filter).includes(currentFilter as Filter)) {
      setFilter(currentFilter as Filter);
    }
  }, []);

  return (
    <TodoContext.Provider
      value={{
        todos,
        setTodos,
        filteredTodos,
        filter,
        setFilter,
        inputFocus,
      }}
    >
      {children}
    </TodoContext.Provider>
  );
};

export const useTodoContext = () => React.useContext(TodoContext);
