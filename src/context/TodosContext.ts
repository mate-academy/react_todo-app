import React from 'react';
import { Context, ContextUpdate } from '../types/Context';
import { Status } from '../types/Status';

export const TodosContext = React.createContext<Context>({
  todos: [],
  setTodos: () => { },
  filterTodos: Status.all,
  setFilterTodos: () => { },
});

export const TodoUpdateContext = React.createContext<ContextUpdate>({
  deleteTodo: () => { },
  clearCompleted: () => { },
});
