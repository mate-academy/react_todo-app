import React, { useMemo, useState } from 'react';
import { TodosContext } from './TodosContext';
import { Todo } from '../types/Todo';

interface Props {
  children: React.ReactNode;
}

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todos, setTodos] = useState<Todo[]>([]);

  const value = useMemo(() => ({
    todos,
    setTodos,
  }), [todos]);

  return (
    <TodosContext.Provider value={value}>
      {children}
    </TodosContext.Provider>
  );
};
