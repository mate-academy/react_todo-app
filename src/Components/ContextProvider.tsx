import React, { RefObject } from 'react';
import { Todo } from '../types/Todo';

interface ContextProps {
  todos: Todo[];
  setTodos: (value: Todo[]) => void;
  setErrorMessage: (value: string) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export const Context = React.createContext<ContextProps>({
  todos: [],
  setTodos: () => {},
  setErrorMessage: () => {},
  inputRef: { current: null },
});

export const ContextProvider = ({
  children,
  context,
}: {
  children: React.ReactNode;
  context: ContextProps;
}) => {
  return <Context.Provider value={context}>{children}</Context.Provider>;
};
