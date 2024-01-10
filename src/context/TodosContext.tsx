import React from 'react';

import { Context } from '../types/Context';
import { FiltredBy } from '../types/FiltredBy';

export const TodosContext = React.createContext<Context>({
  todos: [],
  leftTodo: 0,
  filterParam: FiltredBy.all,
  addNewTodo: () => { },
  deleteTodo: () => { },
  filtredTodos: () => [],
  handleCompletedChange: () => { },
  setFilterParams: () => { },
  clearCompleted: () => { },
  handleToggleAll: () => { },
  updateTodo: () => {},
});
