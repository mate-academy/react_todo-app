import { Todo } from './Todo';

export type TodoChanges = {
  add: (data: Todo) => void;
  remove: (id: number[]) => void;
  toggle: (items: Todo[]) => void;
};
