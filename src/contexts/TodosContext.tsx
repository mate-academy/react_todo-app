import React, { createContext, useState } from 'react';
import { Todo } from '../types/Todo';
import { Filter } from '../types/Filter';

type TodosSetter = {
  setTodos: (value: Todo[] | ((prevState: Todo[]) => Todo[])) => void;
  setFilter: (value: Filter) => void;
} | null;

type TodosState = {
  todos: Todo[];
  filter: Filter;
} | null;

export const TodosSetterContext = createContext<TodosSetter>(null);
export const TodosStateContext = createContext<TodosState>(null);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider = ({ children }: Props) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

  return (
    <TodosSetterContext.Provider value={{ setTodos, setFilter }}>
      <TodosStateContext.Provider value={{ todos, filter }}>
        {children}
      </TodosStateContext.Provider>
    </TodosSetterContext.Provider>
  );
};
