import React from 'react';

import { Action, State, Status } from './Types';
import { useLocalStorage } from './useLocalStorage';

export const StateContext = React.createContext<State>({
  todos: [],
  visible: Status.All,
});
/* eslint-disable @typescript-eslint/no-unused-vars */
export const DispatchContext = React.createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const TodosContext: React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorage('todos', {
    todos: [],
    visible: Status.All,
  });

  return (
    <DispatchContext.Provider value={dispatch}>
      <StateContext.Provider value={state}>
        {children}
      </StateContext.Provider>
    </DispatchContext.Provider>
  );
};
