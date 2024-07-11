import React, { useReducer } from 'react';

import { Dispatch, State, reducer } from './reducer';
import { contextFactory } from '../utils/contextFactory';

interface Props {
  children: React.ReactNode;
}

const initialState: State = {
  todos: [],
  filter: 'all',
};

const { context: StateContext, useContext: useStore } = contextFactory<State>({
  initialValue: initialState,
});

const { context: DispatchContext, useContext: useDispatch } =
  contextFactory<Dispatch>({
    initialValue: () => {},
  });

const StoreProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>{children}</StateContext.Provider>
    </DispatchContext.Provider>
  );
};

export { StoreProvider, useStore, useDispatch };
