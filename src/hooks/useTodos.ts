import { useContext } from 'react';

import { TodosContext } from '../contexts';

export function useTodos() {
  return useContext(TodosContext);
}
