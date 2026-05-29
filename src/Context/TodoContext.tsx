import React, { useEffect } from 'react';
import { createContext, useContext, useReducer } from 'react';
import { Todo } from '../types/Todo';
import { Action, todoReducer } from './TodoReducer';
import { StatusType } from '../types/Status';
import { loadTodos, saveTodos } from '../utils/localStorage';

export type TodoState = {
  todos: Todo[];
  filter: StatusType;
};

const initialState: TodoState = {
  todos: loadTodos(),
  filter: StatusType.All,
};

type TodoContextValue = {
  state: TodoState;
  dispatch: React.Dispatch<Action>;
};

export const TodoContext = createContext<TodoContextValue | null>(null);

type Props = {
  children: React.ReactNode;
};

export const useTodos = () => {
  const context = useContext(TodoContext);

  if (!context) {
    throw Error('useTodos must be used within TodoProvider');
  }

  return context;
};

export const TodoProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(todoReducer, initialState);

  useEffect(() => {
    saveTodos(state.todos);
  }, [state.todos]);

  return (
    <TodoContext.Provider value={{ state, dispatch }}>
      {children}
    </TodoContext.Provider>
  );
};
