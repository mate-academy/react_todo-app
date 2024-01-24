import React, { useMemo, useState } from 'react';
import { TodosContext } from './TodosContext';
import { Todo } from '../types/Todo';
import { Status } from '../types/Status';

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filterTodos, setFilterTodos] = useState<Status>(Status.all);

  const value = useMemo(() => ({
    todos,
    setTodos,
    filterTodos,
    setFilterTodos,
  }), [todos, filterTodos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
