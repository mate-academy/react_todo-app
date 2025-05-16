/* eslint-disable @typescript-eslint/indent */
import React, { createContext, useContext } from 'react';
import { useGeneral } from '../hooks/General';

type StateContext = Pick<
  ReturnType<typeof useGeneral>,
  'activeCount' | 'visibleTodos' | 'filter' | 'todos' | 'inputRef'
>;
type ActionContext = Pick<
  ReturnType<typeof useGeneral>,
  'addTodo' | 'editTodo' | 'deleteTodo' | 'toggle' | 'setFilter' | 'clear'
>;

const TodoStateContext = createContext<StateContext | null>(null);
const TodoActionContext = createContext<ActionContext | null>(null);

export const TodoProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const general = useGeneral();

  const { activeCount, visibleTodos, filter, todos, inputRef, ...actions } =
    general;

  return (
    <TodoStateContext.Provider
      value={{ todos, filter, visibleTodos, activeCount, inputRef }}
    >
      <TodoActionContext.Provider value={{ ...actions }}>
        {children}
      </TodoActionContext.Provider>
    </TodoStateContext.Provider>
  );
};

export const useTodoState = () => {
  const context = useContext(TodoStateContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};

export const useTodoActions = () => {
  const context = useContext(TodoActionContext);

  if (!context) {
    throw new Error('');
  }

  return context;
};
