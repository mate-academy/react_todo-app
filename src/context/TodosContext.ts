import React from 'react';
import { Context } from '../types/Context';

export const TodosContext = React.createContext<Context>({
  todos: [],
  setTodos: () => { },
});
