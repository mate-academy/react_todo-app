import { Action } from './Action';
import { Todo } from './Todo';

export type TypeContext = {
  locationPage: string;
  todos: Todo[];
  dispatch: (action: Action) => void;
};
