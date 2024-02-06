import React from 'react';
import { TodoContext } from '../types/TodoContext';

export const TodosContext = React.createContext<TodoContext>({
  todos: [],
  addTodo: () => { },
  setCompleted: () => { },
  setAllCompletedOrRemoveCompleted: () => { },
  query: '',
  setQuery: () => { },
  filteredTodosForList: [],
  deleteCompletedTodos: () => { },
  deleteTodo: () => { },
  saveEditingTitle: () => { },
});
