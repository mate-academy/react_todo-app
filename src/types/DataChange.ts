import { Todo } from './Todo';

export type DataChange = {
  add: (data: Todo) => void,
  remove: (id: number[]) => void,
  toggle: (items: Todo[]) => void,
};
