import { useContext, useEffect, useRef } from 'react';
import { TodoContext } from '../context/TodoContext';

export const useAutoFocus = () => {
  const { todos } = useContext(TodoContext);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [todos]);

  return inputRef;
};
