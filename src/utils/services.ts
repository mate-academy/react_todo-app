import { RefObject } from 'react';

export const focusInput = (inputRef: RefObject<HTMLInputElement>) => {
  if (inputRef.current) {
    inputRef.current.focus();
  }
};
