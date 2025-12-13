import { useContext } from 'react';
import { TodoUIContext } from '../Contexts/TodoUIContext';

export const useTodoUI = () => {
  const ctx = useContext(TodoUIContext);

  if (!ctx) {
    throw new Error('TodoUIContext missing');
  }

  return ctx;
};
