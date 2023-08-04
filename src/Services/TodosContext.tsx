/* eslint-disable max-len */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { createContext } from 'react';
import {
  Action, State, Status,
} from './Types';
import { useLocalStorage } from './useLocalStorage';

export const TodoContextList = createContext<State>({ todos: [], filter: Status.All });
export const TodoContextDispatch = createContext((_action: Action) => {});

type Props = {
  children: React.ReactNode;
};

export const TodosContext:React.FC<Props> = ({ children }) => {
  const [state, dispatch] = useLocalStorage('todos', { todos: [], filter: Status.All });

  return (
    <TodoContextList.Provider value={state}>
      <TodoContextDispatch.Provider value={dispatch}>
        {children}
      </TodoContextDispatch.Provider>
    </TodoContextList.Provider>
  );
};
