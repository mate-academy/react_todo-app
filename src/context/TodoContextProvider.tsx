import React, { useEffect, useReducer } from 'react';
import { FilterType } from '../types/FilterType';
import { reducer } from '../reducer/reducer';
import { State } from '../types/State';
import { Action } from '../types/Action';

const initialState = {
  todos: [],
  filter: FilterType.All,
  focusHeader: false,
};

export const StateContext = React.createContext<State>(initialState);

export const DispatchContext = React.createContext<(_action: Action) => void>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const StateContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    const todosFromStorage = JSON.parse(localStorage.getItem('todos') || '[]');

    if (todosFromStorage.length) {
      dispatch({ type: 'setTodos', payload: todosFromStorage });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(state.todos));
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
