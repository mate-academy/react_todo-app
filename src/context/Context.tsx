import React, { createContext, useContext, useEffect, useReducer } from 'react';
import { reducer, initialState } from './todoReducer';
import { Action, State } from './types';

const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<React.Dispatch<Action> | null>(null);

const init = (defaultState: State): State => {
  const savedTodos = localStorage.getItem('todos');

  if (savedTodos) {
    try {
      return {
        ...defaultState,
        todos: JSON.parse(savedTodos),
      };
    } catch {
      return defaultState;
    }
  }

  return defaultState;
};

export const TodoProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatchTodo] = useReducer(reducer, initialState, init);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatchTodo}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export const useGlobalState = () => {
  const context = useContext(StateContext);

  if (!context) {
    throw new Error('useTodoState must be used inside TodoProvider');
  }

  return context;
};

export const useDispatch = () => {
  const context = useContext(DispatchContext);

  if (!context) {
    throw new Error('useTodoDispatch must be used inside TodoProvider');
  }

  return context;
};
