import React, {
  createContext,
  useContext,
  useRef,
  useCallback,
  useEffect,
} from 'react';
import { useTodos } from './TodosContext';

interface FocusContextType {
  focusInput: () => void;
  inputRef: React.RefObject<HTMLInputElement>;
}

const FocusContext = createContext<FocusContextType | undefined>(undefined);

export const FocusProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { todos } = useTodos();

  const focusInput = useCallback(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  useEffect(() => {
    if (todos.length) {
      const input = document.querySelector(
        '[data-cy="NewTodoField"]',
      ) as HTMLInputElement;

      input?.focus();
    }
  }, [todos.length]);

  return (
    <FocusContext.Provider value={{ focusInput, inputRef }}>
      {children}
    </FocusContext.Provider>
  );
};

export const useFocus = () => {
  const context = useContext(FocusContext);

  if (!context) {
    throw new Error('useFocus must be used within a FocusProvider');
  }

  return context;
};
