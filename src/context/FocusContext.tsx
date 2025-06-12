import React, { createContext, useCallback, useRef } from 'react';

type FocusContextType = {
  inputRef: React.RefObject<HTMLInputElement> | null;
  focusInput: () => void;
};

export const FocusContext = createContext<FocusContextType>({
  inputRef: null,
  focusInput: () => {},
});

type Props = {
  children: React.ReactNode;
};

export const FocusProvider = ({ children }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  const focusInput = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <FocusContext.Provider value={{ inputRef, focusInput }}>
      {children}
    </FocusContext.Provider>
  );
};
