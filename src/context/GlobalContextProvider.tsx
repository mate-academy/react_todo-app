import React, { useEffect, useReducer } from 'react';
import { reducer } from './reducer';
import { todoService } from '../services/todoService';
import { FilterOption } from '../types/FilterOption';
import { RootState } from '../types/RootState';
import { Action } from '../types/Action';

interface Props {
  children: React.ReactNode;
}

export const initialState: RootState = {
  todos: todoService.getAll(),
  filter: FilterOption.all,
};

export const StateContext = React.createContext<RootState>(initialState);

export const DispatchContext = React.createContext<React.Dispatch<Action>>(
  () => {},
);

export const GlobalContextProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    todoService.saveAll(state.todos);
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
