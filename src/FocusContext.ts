import { createContext } from 'react';

export const FocusContext =
  createContext<React.RefObject<HTMLInputElement> | null>(null);
