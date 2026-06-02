import { useContext } from 'react';
import { TodoInputRefContext } from '../context/TodoContext';

export const useInputRef = () => {
  const inputRef = useContext(TodoInputRefContext);

  if (!inputRef) {
    throw new Error('useInputRef must be used within TodoProvider');
  }

  return inputRef;
};
