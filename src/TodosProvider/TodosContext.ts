import React from 'react';

import { TodosContextType } from './types/TodosContextType';

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});
