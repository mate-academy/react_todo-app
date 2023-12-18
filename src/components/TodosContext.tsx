import React from 'react';

import { Context } from '../types/Context';

export const TodosContext = React.createContext<Context>({
  todos: [],
  addTodo: () => { },
  deleteTodo: () => { },
  editingTodo: () => { },
  toggleTodo: () => { },
  deleteCompletedTodos: () => { },
  handleToggleAll: () => { },
  todoCount: 0,
  completedTodos: false,
  filterTodos: () => [],
});

export type Props = {
  children: React.ReactNode;
};
