import React, { createContext } from 'react';
import { useLocalStorageReducer } from '../../hooks/useLocalStorageReducer';
import { todosReducer } from './todosReducer';
import { State } from './State';
import { Action } from './Action';

const initialState: State = [];

const LOCAL_STORAGE_TODOS_KEY = 'todos';

export const TodosStateContext = createContext<State>(initialState);
export const TodosDispatchContext = createContext<React.Dispatch<Action>>(
  () => {},
);

type Props = {
  children: React.ReactNode;
};

export const TodosProvider: React.FC<Props> = ({ children }) => {
  const [todosState, dispatch] = useLocalStorageReducer(
    LOCAL_STORAGE_TODOS_KEY,
    todosReducer,
    initialState,
  );

  return (
    <TodosDispatchContext.Provider value={dispatch}>
      <TodosStateContext.Provider value={todosState}>
        {children}
      </TodosStateContext.Provider>
    </TodosDispatchContext.Provider>
  );
};
