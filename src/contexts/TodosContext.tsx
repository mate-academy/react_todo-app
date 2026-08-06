import React, { createContext, useEffect, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type TodosSetters = {
  setTodos: (value: Todo[] | ((prevState: Todo[]) => Todo[])) => void;
  setFilter: (value: Filter) => void;
} | null;

type TodosState = {
  todos: Todo[];
  filter: Filter;
} | null;

export const TodosSettersContext = createContext<TodosSetters>(null);
export const TodosStateContext = createContext<TodosState>(null);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem('todos');

    if (!storedTodos) {
      return [];
    }

    try {
      return JSON.parse(storedTodos);
    } catch {
      localStorage.removeItem('todos');

      return [];
    }
  });
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  return (
    <TodosSettersContext.Provider value={{ setTodos, setFilter }}>
      <TodosStateContext.Provider value={{ todos, filter }}>
        {children}
      </TodosStateContext.Provider>
    </TodosSettersContext.Provider>
  );
};
