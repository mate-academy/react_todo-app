import { createContext } from 'react';
import type React from 'react';
import type { State, Action } from '../App';

interface TodoContextType {
  state: State;
  dispatch: React.Dispatch<Action>;
}

export const TodoContext = createContext<TodoContextType | null>(null);
