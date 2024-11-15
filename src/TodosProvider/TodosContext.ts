import React from 'react';

import { TodosContextType } from '../TodosProvider/types/TodosContextType';

export const TodosContext = React.createContext<TodosContextType>({
  todos: [],
  setTodos: () => {},
});
