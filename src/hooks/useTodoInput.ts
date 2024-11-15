import { useCallback, useRef } from 'react';

export const useTodoInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = useCallback(() => {
    inputRef.current?.focus();
  }, []);

  return { inputRef, onFocus };
};
