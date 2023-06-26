import React from 'react';
import { Sort } from '../types/Sort';
import { TodosContextType } from '../types/TodoContext';

const emptyFunction = () => {};

const TodosContext = React.createContext<TodosContextType>({
  isLoading: false,
  todos: [],
  addTodo: emptyFunction,
  deleteTodo: emptyFunction,
  editTodo: emptyFunction,
  isInputDisabled: false,
  handleRemoveCompletedTodos: emptyFunction,
  setSort: emptyFunction,
  sort: Sort.All,
  errorType: '',
  setErrorType: emptyFunction,
  handleToggleAll: emptyFunction,
  loadingTodo: [],
  tempTodo: null,
  activeTodos: [],
  completedTodos: [],
  isCompletedTodos: false,
});

export const useTodosContext = () => {
  const context = React.useContext(TodosContext);

  if (context === undefined) {
    throw new Error('Context must be used within a Provider');
  }

  return context;
};

export default TodosContext;
