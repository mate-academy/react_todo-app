import { Todo } from './Todo';

export type MakeChanges = {
  add: (data: Todo) => void,
  remove: (id: number[]) => void,
  toggle: (items: Todo[]) => void,
};
