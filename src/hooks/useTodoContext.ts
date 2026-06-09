import { useContext } from 'react';

import { TodoContext } from '../context/TodoContext';

export const useTodoContext = () => {
  return useContext(TodoContext);
};
