import { createContext, Dispatch } from 'react';
import { Action, initialState, State } from '../reduces/TodoReducer';

interface TodoContextProps {
  state: State;
  dispatch: Dispatch<Action>;
}

export const TodoContext = createContext<TodoContextProps>({
  state: initialState,
  dispatch: () => null,
});
