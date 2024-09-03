import { createContext, Dispatch } from 'react';
import { ITodosAction, ITodosState } from './types';
import { TodoStatus } from '../../../types/Todo';

export const LOCAL_STORAGE_TODOS_KEY = 'todos';

interface ITodoContext {
  state: ITodosState;
  dispatch: Dispatch<ITodosAction>;
}

export const TodosStateContext = createContext<ITodoContext>({
  state: { todos: [], filterByStatus: TodoStatus.All },
  dispatch: () => {},
});
