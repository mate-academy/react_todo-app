import { useRef } from 'react';

export const useTodoInput = () => {
  const inputRef = useRef<HTMLInputElement>(null);

  const onFocus = () => {
    inputRef.current?.focus();
  };

  return { inputRef, onFocus };
};
