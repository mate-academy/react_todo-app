import { Todo } from './Todo';

export type MakeChange = {
  add: (data: Todo) => void,
  remove: (id: number[]) => void,
  toggle: (items: Todo[]) => void,
};
