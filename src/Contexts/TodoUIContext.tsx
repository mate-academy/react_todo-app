import React, {
  createContext,
  useState,
  useMemo,
  useCallback,
  useRef,
} from 'react';
import { FilterTodo } from '../types/FilterTodo';
import { AppError } from '../types/Errors';

type TodoUIType = {
  filter: FilterTodo;
  setFilter: (filter: FilterTodo) => void;
  errorMessage: AppError | null;
  addErrorMessage: (message: string, isServerError: boolean) => void;
  clearErrorMessage: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
};

export const TodoUIContext = createContext<TodoUIType | null>(null);

export const TodoUIProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [filter, setFilter] = useState<FilterTodo>(FilterTodo.all);
  const [errorMessage, setErrorMessage] = useState<AppError | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const timerCloseId = useRef(0);

  const addErrorMessage = useCallback(
    (message: string, isServerError: boolean) => {
      setErrorMessage({ message, isServerError });
      timerCloseId.current = window.setTimeout(() => {
        setErrorMessage(null);
      }, 3000);
    },
    [],
  );

  const clearErrorMessage = useCallback(() => {
    window.clearTimeout(timerCloseId.current);
    timerCloseId.current = 0;
    setErrorMessage(null);
  }, []);

  const value = useMemo(
    () => ({
      filter,
      setFilter,
      errorMessage,
      addErrorMessage,
      clearErrorMessage,
      inputRef,
    }),
    [filter, errorMessage, addErrorMessage, clearErrorMessage],
  );

  return (
    <TodoUIContext.Provider value={value}>{children}</TodoUIContext.Provider>
  );
};
