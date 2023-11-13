import React, { useEffect, useReducer } from 'react';
import { FilterType, State } from '../types/Todo';
import { Action, reduser } from '../redusecers/reduser';
import { getStoredTodos, saveToLocalStorage } from '../api/localStorageApi';

const getFilterBy = () => {
  if (document.URL.endsWith('/#/completed')) {
    return FilterType.COMPLITED;
  }

  if (document.URL.endsWith('/#/active')) {
    return FilterType.ACTIVE;
  }

  return FilterType.ALL;
};

const initialState: State = {
  todos: getStoredTodos(),
  filterBy: getFilterBy(),
};

type Props = {
  children: React.ReactNode;
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React
  .createContext<React.Dispatch<Action>>(() => { });

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useReducer(reduser, initialState);

  useEffect(() => {
    if (state.todos) {
      saveToLocalStorage(state.todos);
    }
  }, [state.todos]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
