import { createContext } from 'react';

import { DispatchAction, Todo } from '../types';

type TodosContextValue = {
  todos: Todo[];
  dispatch: React.Dispatch<DispatchAction>;
};

export const TodosContext = createContext<TodosContextValue>({
  todos: [],
  dispatch: () => {},
});
