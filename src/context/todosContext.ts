import { createContext, Dispatch } from 'react';
import { Todo } from '../types/Todo';
import { Action } from '../types/Action';

export interface TypeTodosContext {
  todos: Todo[];
  dispatch: Dispatch<Action>;
}

export const todosContext = createContext<TypeTodosContext>({
  todos: [],
  dispatch: () => {},
});
