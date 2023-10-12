import React, {
  createContext, MutableRefObject, ReactNode, useRef, useState,
} from 'react';

type Props = {
  children: ReactNode,
};

type ContextValue = {
  inputRef: MutableRefObject<HTMLInputElement>,
  disableInput: () => void,
  focusInput: () => void,
  addTodoIdToLoading: (currentTodoId: number) => void,
  deleteTodoIdFromLoading: (currentTodoId: number) => void,
  isTodoLoading: (currentTodoId: number) => boolean,
  isAnyLoading: () => boolean,
};

export const LoadingContext = createContext({} as ContextValue);

export const LoadingContextProvider: React.FC<Props> = ({ children }) => {
  const [todosIdsOnLoading, setTodosIdsOnLoading] = useState<number[]>([]);
  const inputRef = useRef() as MutableRefObject<HTMLInputElement>;

  const addTodoIdToLoading = (currentTodoId: number) => {
    setTodosIdsOnLoading(prevState => {
      return [...prevState, currentTodoId];
    });
  };

  const deleteTodoIdFromLoading = (currentTodoId: number) => {
    setTodosIdsOnLoading(prevState => {
      return prevState.filter((id) => id !== currentTodoId);
    });
  };

  const isTodoLoading = (currentTodoId: number) => {
    return todosIdsOnLoading.some((id) => id === currentTodoId);
  };

  const isAnyLoading = () => {
    return !!todosIdsOnLoading.length;
  };

  const disableInput = () => {
    inputRef.current.disabled = true;
  };

  const focusInput = () => {
    inputRef.current.disabled = false;
    inputRef.current.focus();
  };

  const contextValue = {
    inputRef,
    disableInput,
    focusInput,
    addTodoIdToLoading,
    deleteTodoIdFromLoading,
    isTodoLoading,
    isAnyLoading,
  };

  return (
    <LoadingContext.Provider value={contextValue}>
      {children}
    </LoadingContext.Provider>
  );
};
