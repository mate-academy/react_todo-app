import React from 'react';
import { Context } from '../types/Context';
import { Status } from '../types/Status';

export const TodosContext = React.createContext<Context>({
  todos: [],
  setTodos: () => { },
  filterTodos: Status.all,
  setFilterTodos: () => { },
});
