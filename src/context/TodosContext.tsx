import { createContext, Dispatch, useReducer, useRef } from 'react';
import { Action, initialState, State, TodoReducer } from './TodosReducer';

interface TodosContextType {
  state: State;
  dispatch: Dispatch<Action>;
  focusInput: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

export const TodosContext = createContext<TodosContextType | null>(null);

interface Props {
  children: React.ReactNode;
}

export const TodosProvider = ({ children }: Props) => {
  const [state, dispatch] = useReducer(TodoReducer, initialState);

  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = () => {
    inputRef.current?.focus();
  };

  return (
    <TodosContext.Provider value={{ state, dispatch, focusInput, inputRef }}>
      {children}
    </TodosContext.Provider>
  );
};
