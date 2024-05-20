import React from 'react';

import { Props } from './types/Props';
import { TodosContext } from './TodosContext';
import { useTodosReducer } from './hooks/useTodoReducer';

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const todos = useTodosReducer();

  return (
    <TodosContext.Provider value={todos}>{children}</TodosContext.Provider>
  );
};
