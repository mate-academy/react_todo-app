import React, { useReducer } from 'react';

import { Actions } from '../../types/Actions';
import { FILTER } from '../../types/Filter';
import { State } from '../../types/State';
import { reducer } from '../../store/Reducer';

const initialState: State = {
  filterTodo: FILTER.ALL,
  todos: JSON.parse(localStorage.getItem('todos') || '[]'),
};

type Props = {
  children: React.ReactNode;
};

type CustomDispatch = (action: Actions) => void;

export const contextDefault: CustomDispatch = () => {};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext(contextDefault);

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [todos, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={todos}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
