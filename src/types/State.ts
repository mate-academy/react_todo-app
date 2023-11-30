import { Status } from './Filter';
import { ToDo } from './todo';

export type State = {
  todos: ToDo[],
  filtred: Status,
};
