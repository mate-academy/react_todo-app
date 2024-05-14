import { Action } from './Action';
import { ToDo } from './ToDo';

export type TypeContext = {
  locationPage: string;
  todos: ToDo[];
  dispatch: (action: Action) => void;
};
