import React, { useEffect, useReducer } from 'react';
import { Status } from './types/Status';
import { Todo } from './types/Todo';
import { Action } from './types/Action';
import { State } from './types/State';
import { useLocalStorage } from './hooks/useLocalStorage';
import { reducer } from './utils/reducer';

type ActionType = (action: Action) => void;

const initialState: State = {
  status: Status.All,
  todos: [],
};

export const StateContext = React.createContext(initialState);
export const DispatchContext = React.createContext<ActionType>(() => {});

type Props = {
  children: React.ReactNode;
};

export const GlobalStateProvider: React.FC<Props> = ({ children }) => {
  const [storageState, setStorageState] = useLocalStorage<Todo[]>(
    'todos',
    initialState.todos,
  );

  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    todos: [...storageState],
  });

  useEffect(() => {
    setStorageState(state.todos);
  }, [state, setStorageState]);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};
