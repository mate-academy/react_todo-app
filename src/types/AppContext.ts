import { Dispatch } from 'react';
import { Action } from './Action';
import { State } from './State';
import { Filter } from './Filter';
import { Todo } from './Todo';

export interface AppContextType {
  state: State;
  dispatch: Dispatch<Action>;
  filter: Filter;
  setFilter: (filter: Filter) => void;
  filteredTodos: State['todos'];
  globalList: Todo[];
}

export const initialAppContext: AppContextType = {
  state: {
    todos: [],
  },
  dispatch: () => null,
  filter: 'all',
  setFilter: () => null,
  filteredTodos: [],
  globalList: [],
};
