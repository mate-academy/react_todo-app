/* eslint-disable @typescript-eslint/indent */
import { FilterType, Todo } from '../types/globalTypes';

export type GlobalState = {
  todos: Todo[] | [];
  mainInputHTMLElement: HTMLInputElement | null;
  filterType: FilterType;
};

export type Action =
  | { type: 'todoAdd'; payload: Todo }
  | { type: 'todoDelete'; payload: Pick<Todo, 'id'> }
  | { type: 'todoDeleteAllCompleted' }
  | { type: 'todosCompleteAll' }
  | { type: 'todosActiveAll' }
  | {
      type: 'todoUpdate';
      payload: {
        id: Todo['id'];
        title?: Todo['title'];
        completed?: Todo['completed'];
      };
    }
  | { type: 'addMainInputElement'; payload: HTMLInputElement | null }
  | { type: 'isMainInputFocused'; payload: boolean }
  | { type: 'updateFilterType'; payload: FilterType };
