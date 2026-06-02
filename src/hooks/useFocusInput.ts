import { useInputRef } from './useInputRef';

export const useFocusInput = () => {
  const inputRef = useInputRef();

  return () => inputRef.current?.focus();
};
